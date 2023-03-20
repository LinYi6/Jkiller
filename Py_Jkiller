import frida
import sys

# js代码
jscode = """
if(Java.available) {
    Java.perform(function(){
        //类名
        var StubApp = Java.use("com.stub.StubApp");
        //这里写要Hook的方法名  以及参数，overload为重载，hook多个相同函数。因为加固，所以需要获取classloader，一般获取attachBaseContext方法来获得classloader
        StubApp.attachBaseContext.overload('android.content.Context').implementation = function(context){
            send("正在hook"); //发送信息，用于回调python中的函数
            send("已经hook");
            var b = this.attachBaseContext(context);
            var classloader = context.getClassLoader();
            send("已获得classloader："+context.getClassLoader());//send一定要用+连接字符，，否则错误，卡了好久.console.log("checkUserLogin",ret);log中,和+均可
            Java.classFactory.loader = classloader;//将classloader赋值给Java.classFactory.loader，以便后续获取加固后的类、方法
            //以下为正常hook过程了，要用Java.classFactory.use
            var MainItem = Java.classFactory.use("com.main.MainItem");
            send("进入"+MainItem);
            MainItem.setTitle.implementation = function(str){
                console.log("已经hook str",str);
                this.setTitle(s)
            }                

        }       

    });    
}
"""

def on_message(message, data):  # js中执行send函数后要回调的函数
    # message是一个字典，如{'type': 'send', 'payload': '参数j：'}
    if message["type"] == 'send':
        print(message['payload'])
    else:
        print(message)


#hook 360加壳必须要用下面这个方法载入js，否则获取不到数据
process = frida.get_remote_device()
pid = process.spawn('APP包名')//以spawn模式注入脚本
session = process.attach(pid)#加载进程号
script = session.create_script(jscode)#加载上面写好的js代码
script.on('message',on_message) #加载回调函数，也就是js中执行send函数规定要执行的python函数
script.load()  # 载入js脚本
process.resume(pid)  # 重启app
sys.stdin.read()  # 等待系统输入
