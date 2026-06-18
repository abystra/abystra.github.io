---
title: Git 常用命令速查
date: 2026-06-18
---

<span class="category-meta"><span class="emoji">📝</span> 指令备忘</span>

# Git 常用命令速查

那些每次用都要搜一遍的命令，整理在这里。

## 基础操作

```bash
# 初始化仓库
git init

# 克隆仓库
git clone <url>
git clone -b <branch> <url>          # 克隆指定分支

# 查看状态
git status
git status -s                         # 简洁模式

# 添加文件
git add <file>                        # 添加指定文件
git add .                             # 添加所有变更
git add -p                            # 交互式暂存，逐个确认

# 提交
git commit -m "msg"
git commit -am "msg"                  # add + commit（仅已跟踪文件）
git commit --amend                    # 追加到上一次提交（修改 commit message）
git commit --amend --no-edit          # 追加变更但不改 message
```

## 分支管理

```bash
# 查看分支
git branch                            # 本地分支列表
git branch -a                         # 含远程分支
git branch -v                         # 分支最近一次提交

# 创建 / 切换 / 删除
git branch <name>                     # 创建分支
git checkout <branch>                 # 切换分支
git checkout -b <name>                # 创建并切换
git switch <branch>                   # 新版切换命令（推荐）
git switch -c <name>                  # 新版创建并切换
git branch -d <name>                  # 删除已合并分支
git branch -D <name>                  # 强制删除

# 合并
git merge <branch>                    # 合并到当前分支
git merge --no-ff <branch>            # 禁用快进，保留分支痕迹
git merge --squash <branch>           # 压缩为单个提交再合并

# 变基
git rebase <branch>                   # 将当前分支变基到目标分支
git rebase -i HEAD~3                  # 交互式变基最近 3 次提交（squash/fixup/reword）
git rebase --continue                 # 解决冲突后继续
git rebase --abort                    # 放弃变基
```

## 撤销与回退

```bash
# 撤销工作区改动
git checkout -- <file>                # 丢弃单个文件改动
git restore <file>                    # 新版恢复命令

# 取消暂存
git reset HEAD <file>                 # 从暂存区移除
git restore --staged <file>           # 新版取消暂存

# 回退提交
git reset --soft HEAD~1               # 撤销提交，改动回到暂存区
git reset --mixed HEAD~1              # 撤销提交，改动回到工作区（默认）
git reset --hard HEAD~1               # 彻底丢弃最近一次提交

# 安全回退（推荐用于已推送的提交）
git revert <commit>                   # 生成一个新提交来撤销指定提交
git revert -m 1 <merge-commit>        # 撤销合并提交，保留主线（1=parent 1）
```

## 日志与历史

```bash
# 查看日志
git log --oneline                     # 简洁单行
git log --oneline --graph --all       # 分支图
git log --author="name"               # 按作者过滤
git log --since="2026-01-01"          # 按时间过滤
git log -p <file>                     # 查看文件的提交历史 + diff

# 一行装逼日志
git log --oneline --graph --decorate --all

# 查看某次提交
git show <commit>                     # 提交详情
git show <commit>:<file>              # 查看某次提交时的文件内容

# 差异对比
git diff                              # 工作区 vs 暂存区
git diff --staged                     # 暂存区 vs 最新提交
git diff HEAD~1                       # 当前 vs 上一次提交
git diff <branch1>..<branch2>         # 两个分支差异

# 谁改的
git blame <file>                      # 逐行查看修改人和提交
git blame -L 10,30 <file>             # 只看 10-30 行
```

## 暂存与暂藏

```bash
# Stash
git stash                             # 暂藏当前改动
git stash save "描述"                 # 带备注的暂藏
git stash list                        # 查看暂藏列表
git stash pop                         # 恢复最近的暂藏并删除记录
git stash apply                       # 恢复但是不删除记录
git stash drop stash@{0}              # 删除某个暂藏

# 清理
git clean -n                          # 预览将要删除的未跟踪文件
git clean -f                          # 删除未跟踪文件
git clean -fd                         # 同时删除未跟踪目录
```

## 远程仓库

```bash
# 查看 / 管理远程
git remote -v                         # 查看远程地址
git remote add origin <url>           # 添加远程仓库
git remote set-url origin <url>       # 修改远程地址
git remote prune origin               # 清理本地已删除的远程分支引用

# 拉取与推送
git fetch origin                      # 拉取远程更新但不合并
git pull                              # fetch + merge
git pull --rebase                     # fetch + rebase（推荐，保持历史线性）
git push origin <branch>              # 推送到远程
git push -u origin <branch>           # 推送并设置上游（之后直接 git push）
git push --force-with-lease           # 安全强制推送（检测远程是否有新提交）
```

## 标签

```bash
git tag                               # 列出所有标签
git tag v1.0.0                        # 创建轻量标签
git tag -a v1.0.0 -m "说明"           # 创建附注标签
git push origin v1.0.0                # 推送指定标签
git push origin --tags                # 推送全部标签
git tag -d v1.0.0                     # 删除本地标签
```

## 实用进阶

```bash
# Cherry-pick — 摘取单个提交到当前分支
git cherry-pick <commit>
git cherry-pick --continue

# Reflog — 后悔药，找回丢失的提交
git reflog                            # 查看所有 HEAD 操作历史
git reset --hard HEAD@{2}             # 回到 2 步之前的状态

# Bisect — 二分法定位 bug 引入点
git bisect start
git bisect bad HEAD
git bisect good v1.0.0                # 告诉 git 哪版是好的，它会自动二分

# 别名 — 懒人必备
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

## 常见场景速查

| 场景 | 命令 |
|------|------|
| 提交到了错误分支 | `git reset --soft HEAD~1` → `git stash` → 切分支 → `git stash pop` → 重新提交 |
| 修改上次 commit message | `git commit --amend` |
| 回退已推送的提交 | `git revert <commit>` 然后 push |
| 合并多个 commit | `git rebase -i HEAD~N` → squash |
| 放弃本地所有改动 | `git reset --hard origin/main` |
| 查看某个文件某行是谁改的 | `git blame -L <行号> <文件>` |
| 找回误删的分支 | `git reflog` 找到 SHA → `git checkout -b <name> <SHA>` |

---

*最后更新：2026 年 6 月 18 日*
