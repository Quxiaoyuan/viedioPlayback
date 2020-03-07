<template>
    <div>
        <div class="title-line">
            <span class="tit" style="font-size: 38px;">注册</span>
        </div>
        <div class="form-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label=" " prop="email">
                    <el-input v-model="ruleForm.email" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="password">
                    <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
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
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
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
        async registerHandle() {
            const { ruleForm } = this;
            const params = {
                email: ruleForm.email,
                password: ruleForm.password
            }
            const res = await this.$store.dispatch('registerAction', params);
            if (res) {
                debugger;
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