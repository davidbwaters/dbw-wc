import { LitElement, html, css } from 'lit-element'
import * as THREE from "three"
import EffectComposer, {
  Pass,
  RenderPass,
  ShaderPass,
  TexturePass,
  ClearPass,
  MaskPass,
  ClearMaskPass,
  CopyShader,
} from '@johh/three-effectcomposer'

import fragmentShader from '../three/shader/fragment.glsl'
import vertexShader from '../three/shader/vertex.glsl'

import postvertex from '../three/post/vertex.glsl'
import postfragment from '../three/post/fragment.glsl'

export class VideoHero extends LitElement {
  static get styles() {
    return css`
      :host {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: 100%;
      }
      .c-video-hero__video {
        width: 0;
      }
      .c-video-hero__canvas {
        position: absolute;
      }
      .c-video-hero__content {
        position: relative;
      }
    `;
  }

  static get properties() {
    return {
      banner:  { type: String, attribute: true }
    }
  }

  firstUpdated() {

    super.firstUpdated()

    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth/window.innerHeight
    const camera = new THREE.PerspectiveCamera( 
      75, aspectRatio, 0.1, 1000 
    )
    
    const canvas = this.shadowRoot.querySelector('canvas')
    const renderer = new THREE.WebGLRenderer({'canvas': canvas})

    renderer.setSize( window.innerWidth, window.innerHeight )
    
    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener( 'resize', onWindowResize, false );

    const video = this.querySelector('video')
    video.muted = true
    video.autoplay = true
    video.loop = true
    
    const texture = new THREE.VideoTexture( video )

    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    const planeHeight = 10
    const planeWidth = aspectRatio * planeHeight
    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(planeWidth, planeHeight),
      new THREE.MeshBasicMaterial({ map: texture })
    )

    scene.add(mesh)
    camera.position.z = 5

    const dist = camera.position.z - mesh.position.z

    camera.fov = 2 * Math.atan(planeHeight / (2 * dist)) * (180 / Math.PI)
    camera.updateProjectionMatrix()

    // set up post processing
    const composer = new THREE.EffectComposer(renderer)
    const renderPass = new THREE.RenderPass(scene, camera)
    // rendering our scene with an image
    composer.addPass(renderPass)

    // our custom shader pass for the whole screen, to displace previous render
    const customPass = new ShaderPass({vertexShader,fragmentShader})
    // making sure we are rendering it.
    customPass.renderToScreen = true
    composer.addPass(customPass)

// actually render scene with our shader pass


    function animate() {
      requestAnimationFrame( animate )
      // renderer.render( scene, camera )
      composer.render()
    }
    animate()
  }


  render() {
    return html`
      <div  class="c-video-hero__video">
        <slot name="video"></slot>
      </div>
      <canvas class="c-video-hero__canvas">
      </canvas>
      <div class="c-video-hero__content">
        <slot name="content"></slot>
      </div>
      <div class="c-video-hero__overlay"></div>
    `;
  }
}
