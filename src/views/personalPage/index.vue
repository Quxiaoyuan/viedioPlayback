<template>
  <div class="personal-page">
    <div class="back-clip">
      <div class="personal-info">
        <div class="avator-info">
          <div class="personal-avator" @mouseenter="showUploadFn" @mouseleave="hideUploadFn">
            <el-upload
              class="avatar-uploader"
              action="123"
              :http-request="upLoad"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="headUrl" :src="headUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="upload-operate" v-if="isUploadShow">
                <div class="el-icon-camera"></div>
                <div>修改图片</div>
              </div>
            </el-upload>
          </div>

          <div class="personal-name">
            <h2 class="nick-name">{{getUserInfo.userName}}</h2>
            <div class="user-info">
              <!-- <span>女</span> -->
              <div>
                <span class="label">年龄：</span>
                <span>{{getUserInfo.age || tips}}</span></div>
              <div>
                <span class="label">生日：</span>
                <span class="value">{{getUserInfo.birthday || tips}}</span>
              </div>
              <div>
                <span class="label">住址：</span>
                <span class="value">{{getUserInfo.address || tips}}</span>
              </div>
              <div>
                <span class="label">教育：</span>
                <span class="value">{{getUserInfo.educational || tips}}</span>
              </div>
              <div>
                <span class="label">个人简介：</span>
                <span class="value">{{getUserInfo.introduction || tips}}</span>
              </div>
            </div>
            <!-- <div class="detail-info" @click="showDetailInfo">
              查看详细资料
              <span class="el-icon-arrow-down" v-if="!isDetailShow"></span>
              <span class="el-icon-arrow-up" v-else></span>
            </div> -->
          </div>
        </div>
        <div class="editor-info">
          <button @click="dialogFormVisible = true">编辑个人资料</button>
        </div>
      </div>
    </div>

    <el-dialog title="编辑资料" :center="true"
               :modal="true" 
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input class="app-el-input" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="女" value="women"></el-option>
            <el-option label="男" value="man"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input class="app-el-input" v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-input class="app-el-input" v-model="form.birthday" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" :label-width="formLabelWidth">
          <el-input class="app-el-input" v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教育" :label-width="formLabelWidth">
          <el-input class="app-el-input" v-model="form.eduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="30" v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      fits: ["cover"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      isDetailShow: false,
      dialogImageUrl: "",
      dialogVisible: false,
      headUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      isUploadShow: false,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      form: {
        name: '',
        // sex: '',
        age: '',
        birthday: '',
        address: '',
        eduction: '',
        description: ''
      }
    };
  },
  computed: {
    ...mapState({
        getUserInfo: state => state.userInfo
      }),
      tips() {
        return '用户太懒，还未填写'
      }
  },
  methods: {
    showDetailInfo() {
      this.isDetailShow = !this.isDetailShow;
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    upLoad(file) {
      // todo图片上传
    },
    showUploadFn() {
      this.isUploadShow = true;
    },
    hideUploadFn() {
      this.isUploadShow = false;
    },
    async submitForm() {
      const { name, age, birthday, address, eduction, description } = this.form;
      const params = {
        objectId: this.getUserInfo.objectId,
        userName: name,
        introduction: description,
        address: address,
        age: age,
        educational: eduction
      };
      const res = await this.$store.dispatch('updateUserInfo', params);
      if (res) {
        this.dialogFormVisible = false;
        this.updataUserInfo();
      }
    },
    async updataUserInfo() {
      const params = {
        objectId: this.getUserInfo.objectId
      };
      const res = await this.$store.dispatch('queryUserInfo', params);
      if (res) {
        this.$store.commit('updateUserInfo', res.data.data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.personal-page {
  .back-clip {
    background: #ddd;
    padding: 30px 15px 10px 15px;
    .personal-info {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .avator-info {
        display: flex;
        .personal-avator {
          position: relative;
          .avatar-uploader {
            .avatar {
              width: 100px;
              height: 100px;
              border-radius: 50%;
            }
          }
          .upload-operate {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            width: 100px;
            height: 100px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            color: #fff;
            justify-content: center;
            flex-direction: column;
          }
        }
        .personal-name {
          margin-left: 20px;
          margin-top: 46px;
          .user-info {
            div {
              display: flex;
              align-items: center;
              margin-top: 3px;
              .label {
                width: 100px;
                text-align: left;
                color: #000;
                font-size: 16px;
              }
            }
          }
          .detail-info {
            margin-top: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: 14px;
            &:hover {
              color: #39f;
            }
            .el-icon-arrow-down,
            .el-icon-arrow-up {
              &:before {
                padding-left: 5px;
              }
            }
          }
        }
      }
      .editor-info {
        border: 1px solid #39f;
        border-radius: 5px;
        padding: 5px 10px;
        background: #39f;
        &:hover {
          background: #2e89e5;
        }
        button {
          color: #fff;
        }
      }
    }
  }
}
.app-el-input {
  width: 160px;
}
</style>