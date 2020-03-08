<template>
    <div class="edit-article">
        <el-upload
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
        </el-upload>
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
            actionUrl: 'http://106.13.198.47:8088/dynamic/saveDynamic'
        }
    },
    created() {
        const objectId = this.getUserInfo.objectId || '';
        this.paramsdata.sendId = objectId;
    },
    computed: {
        ...mapState({
            getUserInfo: state => state.userInfo
        })
    },
    methods: {
        beforeUploadVideo(file) {          //视频上传之前判断他的大小
            const isLt10M = file.size / 1024 / 1024  < 2000;
            if (!isLt10M) {
                this.$message.error('上传视频大小不能超过2000MB哦!');
                return false;
            }
            this.paramsdata.video = file;
        },
        uploadVideoProcess(event, file, fileList){    //视频上传的时候获取上传进度传给进度条
            this.videoFlag = true;
            this.videoUploadPercent = parseInt(file.percentage);
            console.log(this.videoUploadPercent)
        },
        handleVideoSuccess(res, file) {           //视频上传成功之后返回视频地址
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            console.log(res)
            const url = URL.createObjectURL(file.raw); 
            this.Video = url;
        },
        handleVideoError(err, file, fileList) {
            debugger;
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
