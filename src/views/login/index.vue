<template>
    <div>
        <div class="title-line">
            <span class="tit" style="font-size: 38px;">登录</span>
        </div>
        <div class="form-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="账号" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-button">
                <el-button 
                    class="button" 
                    type="primary" 
                    :disabled="isDisabled"
                    @click="loginHandle">登录</el-button>
                <el-button class="button" @click="registerHandle">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            ruleForm: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        isDisabled() {
            return !this.ruleForm.email || !this.ruleForm.password;
        }
    },
    methods: {
        ...mapMutations({
            updateLoginHandle: 'updateLoginStatus'
        }),
        async loginHandle() {
            // const { ruleForm } = this;
            // const params = {
            //     email: ruleForm.email,
            //     password: ruleForm.password
            // }
            // const res = await this.$store.dispatch('loginAction', params);
            // if (res && res.code === '200') {
            //     this.$router.push({path: '/home'});
            // }
            this.updateLoginHandle(true);
            this.$router.push({path: '/home'});
        },
        registerHandle() {
            this.$router.push({path: '/register'});
        }
    }
}
</script>

<style lang="less" scoped>
    .title-line {
        width: 980px;
        height: 28px;
        margin: 0 auto;
        border-bottom: 1px solid #ddd;
        margin-bottom: 28px;
        text-align: center;
        .tit {
            height: 56px;
            line-height: 56px;
            margin: 0 auto;
            padding: 0 20px;
            font-size: 40px;
            background: #fff;
            text-align: center;
        }
    }
    .form-box {
        width: 490px;
        margin: 0 auto;
        padding: 100px 0;
        .login-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 100px;
            .button {
                width: 200px;
            }
        }
    }
</style>