# vue-cookie-demo

> vue项目实现表单登录页保存账号和密码到cookie功能,觉得对你有帮助的话，star下哦。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

![登陆页面](https://user-gold-cdn.xitu.io/2018/1/30/161462f165cc17dc?w=443&h=335&f=png&s=12535)
### 实现功能： 
1.记住密码勾选，点登陆时，将账号和密码保存到cookie，下次登陆自动显示到表单内 
 2.不勾选，点登陆时候则清空之前保存到cookie的值，下次登陆需要手动输入 
>大体思路就是通过存/取/删cookie实现的；每次进入登录页，先去读取cookie，如果浏览器的cookie中有账号信息，就自动填充到登录框中，存cookie是在登录成功之后，判断当前用户是否勾选了记住密码，如果勾选了，则把账号信息存到cookie当中，效果图如上：
### 直接上主要的代码

###  HTML部分
```html
<div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <br>
            <br>
            <div class="login-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
        </el-form>
    </div>

```
###  JS部分
```js

    //页面加载调用获取cookie值
    mounted() {
        this.getCookie();
    },
    methods: {
        submitForm(formName) {
			             const self = this;
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        if (self.checked == true) {
                            console.log("checked == true");
                            //传入账号名，密码，和保存天数3个参数
                            self.setCookie(self.ruleForm.username, self.ruleForm.password, 7);
                        }else {
                          console.log("清空Cookie");
                          //清空Cookie
                          self.clearCookie();
                        }
                        
                        //与后端请求代码，本功能不需要与后台交互所以省略
                        
                        console.log("登陆成功");
                  
                });
            },
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
    


```
> 浏览器中的cookie信息如下图，注意这里的cookie的expire/Max-Age过期时间，这个时间是格林尼治标准时间GMT，世界统一的时间，GMT+8小时就是北京时间。(这里不做加密功能)

![这里写图片描述](https://user-gold-cdn.xitu.io/2018/1/30/161462f165b73ac8?w=1649&h=283&f=png&s=47768)

#### 源码链接 [vue项目实现表单登录页保存账号和密码到cookie功能](https://github.com/mgbq/vue-cookie-demo)
#### 觉得对你有帮助的话，star下哦。







