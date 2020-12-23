# ReactNativeStudy
react native 学习

## code push

登录

```
# 安装appcenter（如果已经安装，则跳过该步骤
npm install -g appcenter-cli

# 登录
appcenter login

# 按回车后，浏览器会弹出一个带有key的弹窗，将该key复制到终端，然后再点击回车
```

查看key

```
appcenter codepush deployment list -a chenkunhan1991-gmail.com/ReactNativeStudy -k
```

版本发布

```
# （需修改命令中的版本号 `1.0.0 - 1.0.0`，这个指的是客户端版本范围是大于等于 1.0.0 版本，小于等于 1.0.0 版本，例如我现在要发的热更新版本是 1.0.3，则需要修改为 `1.0.0 - 1.0.2`）
# -m：强制更新，下载完更新包之后，马上更新页面，如果没有加该参数，则在下载完更新包之后，会在下一次app启动的时候更新页面。
appcenter codepush release-react -a chenkunhan1991-gmail.com/ReactNativeStudy -d Production -t "1.0.0 - 1.0.1" -m --description "这是更新内容"
```

指令说明
```
https://docs.microsoft.com/zh-cn/appcenter/distribution/codepush/cli

appcenter codepush release-react -a <ownerName>/<appName> -d <deploymentName> -t <targetBinaryVersion>

[-t|--target-binary-version <targetBinaryVersion>]
[-o|--output-dir]
[-s|--sourcemap-output]
[-c|--build-configuration-name <arg>]
[--plist-file-prefix]
[-p|--plist-file]
[-g|--gradle-file]
[-e|--entry-file]
[--development]
[-b|--bundle-name <bundleName>]
[-r|--rollout <rolloutPercentage>]
[--disable-duplicate-release-error]
[-k|--private-key-path <privateKeyPath>]
[-m|--mandatory]
[-x|--disabled]
[--description <description>]
[-d|--deployment-name <deploymentName>]
[-a|--app <ownerName>/<appName>]
[--disable-telemetry]
[-v|--version]
```
