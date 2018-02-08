/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {
  webgl: ( function () {
    try {

      var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

    } catch ( e ) {

      return false;

    }

  } )()
};

// browserify support
if ( typeof module === 'object' ) {

  module.exports = Detector;

}
