<template>
  <div class="app-home">
    <div class="home-left-slide">
      <div class="left-header"></div>
      <div class="left-container">
        <div class="left-container-scroll">
          <div class="left-card" v-for="(item, index) in cardList" :key="index">
            <div class="left-card-title">{{item.title}}</div>
            <div class="left-card-container">
              <video :ref="'video' + index" width="350" height="180" controls="controls">
                <source :src="item.content" type="video/mp4" />您的浏览器不支持视频播放
              </video>
              <!-- <video width="350" height="180" controls="controls">
                <source :src="src" type="video/mp4" />您的浏览器不支持视频播放
              </video> -->
              <span>{{item.description}}</span>
            </div>
            <div class="card-foot">
              <!-- <el-button 
                icon="el-icon-view" 
                size="small" 
                type="primary"
                @click="attentionHandle">关注</el-button> -->
              <div class="card-food-common" @click="commentHandle(item, index)">
                <i class="el-icon-s-comment"></i>
                <span>{{item.showComment ? '收起评论' : '评论'}}</span>
              </div>
              <div class="card-food-common" @click="collectHandle(item, index)">
                <i class="el-icon-star-on"></i>
                <span>{{item.type === 1 ? '取消收藏' : '收藏'}}</span>
              </div>
            </div>
            <comment 
              v-show="item.showComment" 
              :commentList="item.commentList"
              :sendId="item.sendId"
              :objectId="item.objectId"
              @commentSuccess="commentHandle(item, index)"></comment>
          </div>
        </div>
      </div>
    </div>
    <div class="home-right-slide">
      <div class="card">
        <span class="card-span" @click="toEditArticle">
          <i class="el-icon-edit-outline"></i>
          <span>发表动态</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import comment from './components/comment';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      baseUrl: "http://106.13.198.47:20",
      cardList: [],
      src: ""
    };
  },
  created() {
    this.reqDynamicList();
  },
  components: {
    comment
  },
  computed: {
    ...mapState({
        getUserInfo: state => state.userInfo
      })
  },
  methods: {
    async reqDynamicList() {
      const params = {
        objectId: this.getUserInfo.objectId
      };
      const res = await this.$store.dispatch("dynamicList", params);
      if (res) {
        const data = res.data || {};
        this.cardList = data.data || [];
        this.$nextTick(() => {
          this.setSrc();
          this.setPropShowComment();
        })
      }
    },
    setPropShowComment() {
      this.cardList.forEach((item) => {
        this.$set(item, 'showComment', false);
        this.$set(item, 'commentList', []);
      })
    },
    setSrc() {
      this.cardList.forEach((item, index) => {
        const refs = this.$refs[`video${index}`] || [];
        if (refs.length) {
          refs.forEach((ref) => {
            ref && ref.load();
          })
        }
      })
    },
    toEditArticle() {
      this.$router.push({ path: "/editArticle" });
    },
    attentionHandle() {

    },
    async commentHandle(item, index) {
      item.showComment = !item.showComment;
      if (!item.showComment) return;
      const params = {
        dyId: item.objectId
      };
      const res = await this.$store.dispatch('commentInput', params);
      if (res && res.data) {
        const commentList = res.data.data;
        if (commentList.length) {
          commentList.forEach((it) => {
            if (it.commentforcomList && it.commentforcomList.length) {
              it.commentforcomList.forEach((x) => {
                x.showComment = false;
                x.commentContent = '';
              })
            }
            it.showComment = false;
            it.commentContent = '';
          })
          this.$set(this.cardList[index], 'commentList', commentList);
        }
      }
      console.log(this.cardList);
    },
    async collectHandle(item, index) {
      const params = {
        userId: this.getUserInfo.objectId,
        dyId: item.objectId
      };
      const type = this.cardList[index].type;
      const url = type === 1 ? 'cancelFavorite' : 'addFavorite';
      const res = await this.$store.dispatch(url, params);
      if (res && res.data) {
        const setType = type === 0 ? 1 : 0;
        this.$set(this.cardList[index], 'type', setType);
        this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'success'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app-home {
	width: 100%;
	height: 100%;
	display: flex;
  .home-left-slide {
    width: 694px;
    margin-right: 10px;
    .left-header {
      width: 100%;
      height: 100px;
      background: url("~@/views/assets/images/home_header.jpg") no-repeat center;
      background-size: cover;
    }
    .left-container {
      height: calc(100% - 100px);
      overflow: auto;
      position: relative;
      .left-container-scroll {
        padding-bottom: 100px;
      }
      .left-card {
        margin-bottom: 0;
        box-shadow: none;
        padding: 20px;
        border-bottom: 1px solid #f0f2f7;
        .left-card-title {
          font-size: 18px;
          font-weight: 600;
        }
        .left-card-container {
          display: flex;
        }
        .card-foot {
          display: flex;
          align-items: center;
          padding: 10px 0;
          color: #8590a6;
          font-size: 16px;
          .card-food-common {
            margin-left: 20px;
            cursor: pointer;
            i {
              font-size: 15px;
            }
          }
        }
      }
    }

  }
  .home-right-slide {
    flex: 1;
    .card {
      margin-bottom: 10px;
      background: #fff;
      overflow: hidden;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .card-span {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex: 0 0 98px;
        flex-direction: column;
        height: 94px;
        justify-content: center;
        position: relative;
        font-size: 14px;
        i {
          font-size: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>