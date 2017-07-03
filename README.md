# Git原理概念和简单操作
  版本控制是一种记录一个或若个文件内容变化，以便将来查询特定版本修订情况的系统。
 
 **集中式版本控制系统：** 版本库是集中存放在中央服务器的，所以每次操作的时候都要先从中央服务器取得最新的版本，然后操作（修改）完，再推送给中央服务器，下次再改的时候，再从中央服务器取。
 弊端：版本库存放在服务器上，服务器出现问题，就不能干活了；每次都要服务器上传送，所以需要联网才能工作。
 
**分布式版本控制系统：** 每个人的电脑上都有一个完整的版本库（仓库），操作完先提交到本地的自己仓库，如果没有什么问题的话，再提交到远处仓库。
优点：断网时，可以提交到本地仓库，等有网再提交远程仓库，不影响工作；出现问题时，只要有一台没问题，就可以完好的拷贝出来。
Git是一种分布式版本控制系统。
 
三种状态：
```
已提交（committed）：该文件已经被安全地保存在本地数据库中。
已修改（modified）：修改某个文件，但还没有提交保存。
已暂存（staged）：把已修改的文件放在下次要提交时保存的清单中。
```

 
## 查看当前文件状态：git status
```
    untracked files：未跟踪文件（还没添加到暂存区）
    changes to be commmited：已暂存
    changes not staged for commit：已跟踪文件的内容发生了变化，但还没有放到暂存区。
```

## 把当前目录下的新增和修改添加到暂存区：git add  .
## 把暂存区的更新提交到本地库：git commit -am “add file”
## 把本地仓库推送到远程仓库的master分支：git push origin master
## 把远程仓库的变动更新合并到本地仓库：git pull

当远程仓库发生变动时，在本地仓库添加修改文件，提交后，推送到远程仓库会报错，因为远程仓库和本地仓库没有一致。
 
在本地仓库对文件做修改、删除之前，要先把远程仓库的变动更新合并到本地仓库git pull；再对本地仓库进行修改或者删除；
```
vim  a.md 修改文件
git add . 添加到暂存区
git commit -am “modified a” 把暂存区的更新提交到本地仓库
git push origin master 推送到远程仓库master分支
 
 
rm -rf b.md 删除文件
vim  a.md 修改文件
git add . 添加到暂存区
git commit -am “modified a” 把暂存区的更新提交到本地仓库
git push origin master 推送到远程仓库master分支
```
 
#本地创建一个git项目推送到远程空仓库
```
mkdir blogtest 创建空目录
cd blogtest
touch README.md
git init 把blogtest初始化为git仓库（多了隐藏文件.git）
git add .
git commit -am "init information"
git remote add origin git@github.com:lwq945/blogtest.git （添加原仓库的名字为origin，远程库的名字可以取别的，git默认是origin，）
git push -u origin master（第一次推送后用git push origin master）
 
 也可删除原仓库的名字
git remove add abc git@github.com:lwq945/blogtest.git
git remote remove abc
 
修改origin标签对应的地址
git remote set-url origin git@github.com:lwq945/XXX.git
```

# 分支操作
## 查看所有所有分支：
```
git branch -a
```

## 创建本地库dev分支
```
git branch dev
```
## 切换到dev分支
```
git checkout dev
```

## 在dev分支创建文件
```
touch b.md
git add .
git commit -am "add b.md"
```

## 推送到origin地址的远程dev分支上
```
git push origin dev
```

## 切换到master
```
git checkout master
```

## 把dev分支的内容合并到当前分支（master）上（合并完master和dev的内容一样）
```
git merge dev
```

# 冲突
当自己和别人改同一个文件的同一个地方，在执行git pull更新本地合并时会出现冲突。

## 解决

1.手动修改冲突文件
2.重新提交
 