<template>
    <div>
        <div class="title-line">
            <span class="tit" style="font-size: 38px;">注册</span>
        </div>
        <div class="form-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label=" " prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="password">
                    <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="email">
                    <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-button">
                <el-button class="button" :disabled="isDisabled" @click="registerHandle">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                password: '',
                email: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        isDisabled() {
            return !this.ruleForm.email || !this.ruleForm.password || !this.ruleForm.username;
        }
    },
    methods: {
        async registerHandle() {
            const { ruleForm } = this;
            const params = {
                email: ruleForm.email,
                password: ruleForm.password,
                username: ruleForm.username
            }
            const res = await this.$store.dispatch('registerAction', params);
            if (res && res.status === 200) {
                this.$router.push({ path: '/login' });
            }
        },
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
                width: 100%;
            }
        }
    }
</style>