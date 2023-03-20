//js版本代码
//执行此脚本命令：frida -R app名称/PID -l JS_Jkiller.js

function hook(){
if(Java.available) {
    Java.perform(function(){
        //类名
        var StubApp = Java.use("com.stub.StubApp");//固定写法
        //这里写要Hook的方法名  以及参数，overload为重载，hook多个相同函数。因为加固，所以需要获取classloader，一般获取attachBaseContext方法来获得classloader
        StubApp.attachBaseContext.overload('android.content.Context').implementation = function(context){
            console.log("正在hook"); 
            var b = this.attachBaseContext(context);//执行attachBaseContext(context)
            var classloader = context.getClassLoader();
            console.log("已获得classloader："+context.getClassLoader());
            Java.classFactory.loader = classloader;//将classloader赋值给Java.classFactory.loader，以便后续获取加固后的类、方法
            //以下就是正常hook应用的过程了，要用Java.classFactory.use
            //例
            var MainItem = Java.classFactory.use("com.main.MainItem");
            console.log("进入"+MainItem);
            MainItem.setTitle.implementation = function(str){
                console.log("进入setTitle");
                
                console.log("已经hook str",str);
            }               
            //return b;//如果attachBaseContext方法有返回值，则取消该行注释，否则报错。
        }
        
        //除用attachBaseContext获得classloader外，还可以用enumerateClassLoaders获得classloader。但该方法不适用在Python版
        /*Java.enumerateClassLoaders({
            onMatch: function (loader) {
                try {
                    if(loader.findClass("com.iyuba.voaseries.ui.main.MainItem")){
                        console.log("Successfully found loader")
                        console.log(loader);
                        Java.classFactory.loader = loader ;
                    }
                }
                catch(error){
                    console.log("find error:" + error)
                }
            },
            onComplete: function () {
                console.log("end1")
            }
        })
            var MainItem = Java.use("com.iyuba.voaseries.ui.main.MainItem");
            send("进入"+MainItem);
            MainItem.setTitle.implementation = function(str){
                send("MainItem");
                //var ret = this.setTitle(str)
                var s = "1287056563"
                console.log("已经hook str",str);
                this.setTitle(s)
            }*/


        });
    
    }
}

setImmediate(hook) //调用函数
