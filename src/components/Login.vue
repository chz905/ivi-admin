<template>
    <div class="login">
        <div class="container">
            <h3>后台管理系统</h3>
            <div class="input-log">
                <Input prefix="ios-contact" v-model="admin" placeholder="用户名" size="large" clearable @on-blur="contact" style="width: 100%;height: 100%" />
                <p class="remind">{{nadmin}}</p>
            </div>
            <div class="input-log">
                <Input type="password" v-model="password" prefix="md-lock" placeholder="用户名" size="large" clearable @on-blur="lock" style="width: 100%;height: 100%" />
                <p class="remind">{{npassword}}</p>
            </div>
            <Button type="primary" :loading="loging" size="large" long @click="submit">Login</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data(){
        return{
            admin:"",
            nadmin: "",
            password:"",
            npassword: "",
            loging: false,
        }
    },
    methods: {
        contact(){
            if(this.admin !== 'admin'){
                this.nadmin = "账号为admin"
            }else{
                this.nadmin = ''
            }
        },
        lock(){
            if(this.password !== 'admin'){
                this.npassword = "请输入正确的密码"
            }else{
                this.nadmin = ''
            }
        },
        submit(){
            if(this.admin == 'admin' && this.password == 'admin'){
                this.loging = true;
                //登陆成功设置缓存
                localStorage.setItem('token',true)
                this.$router.push("/");
            }else{
                if(this.admin !== 'admin'){
                    this.nadmin = "账号为admin"
                }
                if(this.password !== 'admin'){
                    this.npassword = "请输入密码"
                }
            }
        }
    },
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    background: #2d3a4b;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center
}
.container{
    max-width: 100%;
    width: 520px;
    padding: 0 35px;
    /* text-align: center; */
    /* margin: 0 auto; */
    overflow: hidden;
}
.container>h3{
    font-size: 26px;
    color: #eee;
    margin: 0px auto 30px auto;
    text-align: center;
    letter-spacing: 4px;
}
.input-log{
    height: 50px;
    width: 100%;
    margin-bottom: 22px;
}
.remind{
    color:#e66565;
    position: relative;
    top: -10px;
}
</style>