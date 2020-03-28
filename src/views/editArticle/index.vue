<template>
    <div class="edit-article">
        <!-- <el-upload
            class="avatar-uploader"
            :action="actionUrl"
            accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'
            :data="paramsdata"                                
            :show-file-list="false"
            :before-upload="beforeUploadVideo"
            :on-success="handleVideoSuccess"                   
            :on-progress="uploadVideoProcess"
            :on-error="handleVideoError">
            <div slot="tip" class="uploader-tips">上传视频</div>
            <video
                v-if="Video !='' && videoFlag == false"
                :src="Video"
                width="350"
                height="180"
                controls="controls">您的浏览器不支持视频播放</video>
            <i
                v-else-if="Video =='' && videoFlag == false"
                class="el-icon-plus avatar-uploader-icon"
            ></i> 
            <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top:30px"
            ></el-progress>
        </el-upload> -->
        <el-form label-position="right" ref="ruleForm" label-width="80px" :model="formLabelAlign" :rules="rules">
            <el-form-item label="动态标题" prop="title">
                <el-input v-model="formLabelAlign.title"></el-input>
            </el-form-item>
            <el-form-item label="视频地址" prop="address">
                <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
            <el-form-item label="动态描述" prop="description">
                <el-input v-model="formLabelAlign.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即发表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            videoFlag:false,      //刚开始的时候显示为flase
            videoUploadPercent: '0%',  //进度条刚开始的时候为0%
            paramsdata:{
                description: '222',
                title: '111'
            },
            Video: '',
            formLabelAlign: {
                title: '',
                address: 'https://www.runoob.com/try/demo_source/movie.mp4',
                description: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入动态标题', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入视频地址', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请填写动态描述', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
    },
    computed: {
        ...mapState({
            getUserInfo: state => state.userInfo
        })
    },
    methods: {
        submitForm(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.dynamicPost();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async dynamicPost() {
            const { title, address, description } = this.formLabelAlign;
            const params = {
                video: address,
                sendId: this.getUserInfo.objectId,
                title,
                description
            };
            const res = await this.$store.dispatch('dynamicPost', params);
            if (res && res.data.code == '0') {
                this.$router.push('/home');
            }

        }
    }
}
</script>

<style lang="less" scoped>
.edit-article {
    margin: 47px auto;
    width: 660px;
    .avatar-uploader /deep/ .el-upload {
        width: 100%;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        height: 178px;
        display: block;
    }
    .uploader-tips {
        text-align: center;
    }
}
</style>
