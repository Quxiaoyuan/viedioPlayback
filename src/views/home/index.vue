<template>
  <div class="app-home">
    <div class="home-left-slide">
      <div class="left-header"></div>
      <div class="left-container">
        <div class="left-container-scroll">
          <div class="left-card" v-for="(item, index) in cardList" :key="index">
            <div class="left-card-title">227事件对肖战会有不利影响吗？</div>
            <div class="left-card-container">
              <video width="350" height="180" controls="controls">
                <source :src="getUrl(item.content)" type="video/mp4" />您的浏览器不支持视频播放
              </video>
              <span>别在这和我bb什么雪花不雪花</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-right-slide">
      <div class="card">
        <span class="card-span" @click="toEditArticle">
          <i class="icon-article"></i>
          <span>写文章</span>
        </span>
        <span class="card-span">写文章</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "http://106.13.198.47:20",
      cardList: [],
      src: "../assets/video/video.mp4"
    };
  },
  created() {
    this.reqDynamicList();
  },
  methods: {
    async reqDynamicList() {
      const res = await this.$store.dispatch("dynamicList");
      if (res) {
        debugger;
        const data = res.data || {};
        this.cardList = data.data || [];
      }
    },
    toEditArticle() {
      this.$router.push({ path: "/editArticle" });
    },
    getUrl(base64) {
      // debugger;
      // return `data:video/mp4;base64,${base64}`;
      return `http://localhost:8088${base64}`;
      // return this.dataURLtoFile(base64, '');
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      debugger;
      const arr = dataurl.split(",");
      // const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }
};
</script>

<style lang="less" scoped>
.app-home {
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
      overflow: scroll;
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
      }
    }
  }
}
</style>