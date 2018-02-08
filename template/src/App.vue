<template>
  <div id="app">
    <three :width="width" :height="height"></three>

  </div>
</template>

<script>
  import fastclick from 'fastclick'
  import WechatShare from 'johnny-wechat-share'
  import Three from "./Three";

//import files
  const requireContext = require.context("./assets/img", true, /^\.\/.*\.png$/);
  const images = requireContext.keys().map(requireContext);
  console.log(images)


  //wechat share

  let option={}
  option.api='http://h5.2smart.cn/wechat/js/'
  option.shareData={
    appmessage: {
      title: "",//好友分享标题
      desc: "",//好友分享描述
      img_url: "",//好友分享图片
      link: "" //好友分享链接
    }, timeline: {
      title: "",//朋友圈分享标题
      img_url: "",//朋友圈分享图片
      link: ""//朋友圈分享链接
    }
  }

  window.WECHAT_SHARE = new WechatShare( option);





  export default {
    components: {Three:Three},
    name: 'app',
    data:function() {
      return {width: window.innerWidth, height: window.innerHeight}
    },
    methods: {
      onWindowResize: function (e) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      }
    }
    ,
    mounted: function () {

      fastclick.attach(this.$el)
      window.addEventListener('resize', this.onWindowResize, false);
    }, beforeDestroy: function () {
      window.removeEventListener('resize', this.onWindowResize);
    }
  }
</script>

<style{{#sass}} lang="scss"{{/sass}}>
@import "assets/css/base.css";
@import "assets/css/mobile_h5.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
