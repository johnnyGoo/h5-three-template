<template>
  <div class="pa_100" >
  <div >

      <div  style="padding-top: 250px">
        <transition name="loadingfade" mode="out-in"  appear>
        <div v-if="!completed" class="precent">{{precent}}%</div>
        </transition>
      </div>



  </div>
  </div>
</template>

<script>
  import SmartLoader from 'smart-loader'

  const requireContext = require.context("./assets/img", true, /\/([^\/]*?\.(jpg|png|gif))/i);
  const images = requireContext.keys().map(requireContext);


  export default {
    name: "loading",
    props: {
    },
    data: function () {
      return {completedCount: 0, totalCount: 1, completed: false}
    },
    methods: {

    },

    computed: {
      precent: function () {
        return (this.completedCount / this.totalCount * 100).toFixed(0)
      }
    },
    mounted: function () {
      let self = this;

      let loader = new SmartLoader({capacity: 2});
      if (!window.AssetsLoader) {
        window.AssetsLoader = loader
        for (let i = 0; i < images.length; i++) {
          loader.addImage(images[i], ['image'], 9)
        }

      }
      loader.addCompletionListener(function () {
        setTimeout(function () {
          self.completed = true;
          setTimeout(function () {
            self.$emit('completed')
          }, 300)
        }, 500)

      });


      loader.addProgressListener(function (e) {
        self.totalCount = e.totalCount;
        self.completedCount = e.completedCount
        //  console.log('loaded:' + e.resource.getName() + ' ' + e.completedCount + ' / ' + e.totalCount)
      });
      // begin downloading images
      loader.start(['image']);
    }, components: {}
  }
</script>

<style scoped>

  .pa_100 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .precent {
    /*font-family: "din";*/
    font-size: 2em;
  }
  .loadingfade-enter-active, .loadingfade-leave-active {
    transition: all 0.3s ease-in-out;
    opacity: 1;
    transform: translateY(0px);
  }

  .loadingfade-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .loadingfade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }



</style>
