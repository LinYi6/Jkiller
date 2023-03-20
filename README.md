# Jkiller简介
## 实现  
目前实现了360加壳应用的hook  
## 测试机型  
真机和模拟器均可，但都需要***root***
## 描述  
* JS版本和Python内容一致，只是运行的方式有点不同

* 利用的IDE是Vscode

* 运行JS版本需要在Vscode里配置JScript环境，具体方法自行查询。

  * 在vscode命令行运行 `frida -R app名/PID -l JS_Jkiller.js`

* Python版本需配置Python环境，然后直接运行即可  

## 环境版本  
**Python、frida、frida-tools都升级到最新即可，没什么大的要求，但要确保frida-server的版本要和frida版本、手机或模拟器配套**
