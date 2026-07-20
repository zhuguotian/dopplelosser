# 影子日记 · dopplelosser

一个用 Capacitor 包装的 Android App：内核是网页（`www/` 目录），外面套了一层 Capacitor 原生壳。

## 怎么拿到 .apk（不需要在自己电脑装任何东西）

1. 把这个项目推送到你的 GitHub 仓库（见下方"推送方法"）。
2. 推送后打开仓库页面顶部的 **Actions** 标签，会看到一个叫 "Build Android APK" 的工作流正在跑（第一次大约 3–5 分钟）。
3. 跑完之后点进这次运行记录，页面最下方 **Artifacts** 里有一个 `shadow-diary-debug-apk`，点击下载，是个 zip，解压出来就是 `app-debug.apk`。
4. 把这个 `.apk` 传到 Android 手机上（微信传输助手 / 网盘都行），手机上点开安装即可（首次安装可能需要在设置里允许"安装未知来源应用"）。

## 推送方法

在你自己电脑的终端里（Mac 自带终端，或 Windows 装个 Git Bash）：

```bash
cd 解压出来的项目文件夹
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:zhuguotian/dopplelosser.git
git push -u origin main
```

如果你之前没配置过 SSH key，把最后一行换成 HTTPS 版本（GitHub 会弹窗要求登录）：

```bash
git remote add origin https://github.com/zhuguotian/dopplelosser.git
git push -u origin main
```

## 以后要改代码，就改这个文件

`www/index.html` 是整个 App 的全部前端代码（React + Chart.js，写在一个文件里，方便沙盒环境直接生成）。
以后我们迭代功能，改的都是这一个文件；改完你重新 `git add . && git commit && git push`，
GitHub 会自动重新编译一版新的 `.apk`，不需要你做任何额外操作。

## 关于签名

这次生成的是 **debug 版 APK**（用测试用的调试签名），可以直接装在手机上试用，
但不能上架 Google Play——上架需要用你自己的正式签名 key 重新签一次。等你确定要上架了我们再处理这一步。
