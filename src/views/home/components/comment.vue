<template>
  <div class="comment-page">
    <div class="comment-container">
      <div class="comment-container-topbar">
        <div class="topbar-title">
          {{commentList.length}}条评论
        </div>
        <div class="topbar-options">
          选项
        </div>
      </div>
      <div class="comment-container-middle">
        <ul 
          class="comment-list"
          v-for="(item, index) in commentList"
          :key="index">
          <li class="comment-root">
            <div class="comment-item">
              <div class="item-top">
                <i></i>
                <span class="item-replay">{{item.senderId}}</span>
                <span class="float-right">{{item.createTime}}</span>
              </div>
              <div class="item-container">{{item.content}}</div>
              <div class="item-replay-icon">
                <i class="el-icon-chat-dot-square"></i>
                <span @click.stop="replayHandle(item, index)">回复</span>
              </div>
              <div v-show="item.showComment" class="item-replay-input">
                <input class="input" v-model="item.commentContent" type="text" :placeholder="`回复${item.senderId}`">
                <el-button size="mini" type="primary" @click="sendCommentHandle1(item)">发布</el-button>
              </div>
            </div>
          </li>
          <li 
            class="comment-child"
            v-for="(li, liIndex) in item.commentforcomList"
            :key="liIndex">
            <div class="comment-item">
              <div class="item-top">
                <i></i>
                <div class="item-replay">
                  <span>{{li.senderId}}</span>
                  <span>回复</span>
                  <span>{{item.senderId}}</span>
                </div>
                <span>{{li.createTime}}</span>
              </div>
              <div class="item-container">{{li.content}}</div>
              <div class="item-replay-icon">
                <i class="el-icon-chat-dot-square"></i>
                <span @click.stop="replayHandle(li, index, liIndex, true)">回复</span>
              </div>
              <div v-show="li.showComment" class="item-replay-input">
                <input class="input" v-model="li.commentContent" type="text" :placeholder="`回复${li.senderId}`">
                <el-button size="mini" type="primary" @click="sendCommentHandle1(li, item, true)">发布</el-button>
              </div>
            </div>
          </li>
        </ul>
        <div class="foot-replay-input">
          <input class="input" v-model="commentContent" type="text" placeholder="写下你的评论吧，这里需要你">
          <el-button size="mini" type="primary" @click="sendCommentHandle">发布</el-button>
        </div>
      </div>
      <div class="comment-container-foot"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    commentList: {
      type: Array,
      default() {
        return []
      }
    },
    sendId: {
      type: String | Number,
      default: ''
    },
    objectId: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      commentContent: ''
    }
  },
  computed: {
    ...mapState({
        getUserInfo: state => state.userInfo
      }),
      cardList: state => state.cardList,
      getIndex() {
        return this.cardList.findIndex(x => x.objectId === this.objectId)
      }
  },
  methods: {
    replayHandle(item, index, childIndex, isChild) {
      const showComment = item.showComment;
      if (isChild) {
        this.$set(this.commentList[index].commentforcomList[childIndex], 'showComment', !showComment);
        this.$store.commit('updata')
      } else {
        this.$set(this.commentList[index], 'showComment', !showComment);
      }
      
    },
    async sendCommentHandle1(item, pItem, child = false) {
      if (!item.commentContent) return;
      const params = {
        senderId: this.getUserInfo.objectId,
        recipId: item.senderId,
        commentId: child ? pItem.objectId : item.objectId,
        content: item.commentContent 
      };
      const res = await this.$store.dispatch('addcomment', params); 
      if (res) {
        this.$emit('commentSuccess');
      }
    },
    async sendCommentHandle() {
       if (!this.commentContent) return;
      const params = {
        senderId: this.getUserInfo.objectId,
        recipId: this.sendId,
        dyId: this.objectId,
        content: this.commentContent 
      };
      const res = await this.$store.dispatch('addcommentDynamic', params); 
      if (res) {
        this.commentContent = '';
        this.$emit('commentSuccess');
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-page {
  width: 100%;
  height: 100%;
  .comment-container {
    border: 1px solid #ebebeb;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    background: #fff;
    margin-top: 12px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    &-topbar {
      background: #fff;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 20px;
      .topbar-title {
        font-size: 15px;
        color: #000;
        font-weight: 600;
        flex: 1;
      }
    }
    &-middle {
      .comment-list {
        .comment-root, .comment-child {
          .comment-item {
            position: relative;
            padding: 12px 20px 10px;
            font-size: 15px;
            .item-top {
              position: relative;
              height: 24px;
              padding-right: 3px;
              padding-left: 1px;
              margin-bottom: 4px;
              line-height: 24px;
              display: flex;
              align-items: center;
              i {
                width: 24px;
                height: 24px;
                background: url('~@/views/assets/images/comment-icon.jpg') no-repeat center;
                background-size: cover;
              }
              .item-replay {
                flex: 1;
                margin-left: 20px;
              }
            }
            .item-container {
              padding-left: 33px;
            }
            .item-replay-icon {
              display: flex;
              align-items: center;
              padding: 10px 0 0 33px;
              font-size: 14px;
              cursor: pointer;
              i {
                margin-right: 5px;
              }
            }
            .item-replay-input {
              padding: 12px 12px 12px 33px;
              display: flex;
              align-items: center;
              .input {
                flex: 1;
                height: 30px;
                border-radius: 4px;
                outline: none;
                border: 1px solid #8590a6;
                padding-left: 6px;
                margin-right: 10px;
              }
            }
          }
        }
        .comment-child {
          padding-left: 33px;
        }
      }
    }
  }
}
.foot-replay-input {
  padding: 12px 12px 12px 33px;
  display: flex;
  align-items: center;
  .input {
    flex: 1;
    height: 30px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #8590a6;
    padding-left: 6px;
    margin-right: 10px;
  }
}
.float-right {
  float: right;
}
</style>