<template>
  <div>
    <canvas ref="canvas" v-if="webgl" style="width: 100%;height: 100%"></canvas>
    <div v-if="!webgl" style="margin-top: 50px">Your graphics card does not seem to support WebGL</div>
  </div>
</template>

<script>
  import * as THREE from 'three';
  import Detector from './utils/Detector'
  let animation_iv
  let mesh;



  export default {
    name: "three",
    props:{
      width:{
        default:window.innerWidth
      },
      height:{
        default:window.innerHeight
      }
    },
    data: function () {
      return {webgl: Detector.webgl, renderer: null, camera: null, scene: null}
    },
    methods: {

      animate: function () {
        animation_iv=requestAnimationFrame(this.animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
      },
      update:function () {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width,this.height );
      }
    },

    watch:{
      width:function (o,n) {
        this.update()
      }
    },

    mounted: function () {
      if (this.webgl) {
        let width, height;
        width = this.width;
        height = this.height;

        this.renderer = new THREE.WebGLRenderer({canvas: this.$refs.canvas});
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(width, height);
        this.camera = new THREE.PerspectiveCamera(70, width/height, 1, 1000);
        this.camera.position.set(0, 0, 400);


        this.scene = new THREE.Scene();

        var texture = new THREE.TextureLoader().load( require('./assets/img/logo.png') );
        var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
        var material = new THREE.MeshBasicMaterial( { map: texture } );
        mesh = new THREE.Mesh( geometry, material );
        this.scene.add( mesh );


        this.renderer.render(this.scene, this.camera);

        this.animate()

      }

    },beforeDestroy(){
      cancelAnimationFrame(animation_iv)
      
    }
  }
</script>

<style scoped>

</style>
