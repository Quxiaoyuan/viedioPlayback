<template>
  <div class="comment-page">
    <div class="comment-container">
      <div class="comment-container-topbar">
        <div class="topbar-title">
          143条评论
        </div>
        <div class="topbar-options">
          选项
        </div>
      </div>
      <div class="comment-container-middle">
        <ul class="comment-list">
          <li class="comment-root">
            <div class="comment-item">
              <div class="item-top">
                <i></i>
                <span class="item-replay">jgdskgslk</span>
                <span class="float-right">21天前</span>
              </div>
              <div class="item-container">粉红色发哈开发</div>
              <div class="item-replay-icon" @click="replayHandle">
                <i class="el-icon-chat-dot-square"></i>
                <span>回复</span>
              </div>
              <div class="item-replay-input">
                <input class="input" type="text" placeholder="回复">
                <el-button size="mini" type="primary">发布</el-button>
              </div>
            </div>
          </li>
          <li class="comment-child">
            <div class="comment-item">
              <div class="item-top">
                <i></i>
                <div class="item-replay">
                  <span>kkkkk</span>
                  <span>回复</span>
                  <span>jgdskgslk</span>
                </div>
                <span>21天前</span>
              </div>
              <div class="item-container">后方可死灵法师开发</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment-container-foot"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    replayHandle() {

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
.float-right {
  float: right;
}
</style>