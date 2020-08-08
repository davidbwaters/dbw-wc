import {html, render} from 'lit-html'
import { VideoHero } from './scripts/components/VideoHero3d.js';
import { TopBar } from './scripts/components/TopBar.js'

customElements.define('c-top-bar', TopBar)
customElements.define('c-video-hero', VideoHero);

render(
  html`
    <c-top-bar>
      <a slot="logo" href="/">
        <img src="../static/images/logo.svg" alt="logo" />
      </a>
      <a slot="link" href="#about">About</a>
      <a slot="link" href="#work">Work</a>
    </c-top-bar>
    <c-video-hero halftone>
      <video slot="video" class="u-filter-trippy">
        <source
          src="../static/videos/mold-tint.mp4"
          type="video/mp4"
        >
        <source 
          src="../static/videos/mold-tint.webm"
          type="video/webm"
        >
      </video>
      <span slot="content">
        <div class="o-wrapper">
          <div class="u-5/6">
            <h1 class="u-text-accent">
            I Create Digital Solutions to Promote Growth.
            </h1>
            <span>David B. Waters</span>
            </span>
          </div>
        </div>
      </span>
    </c-video-hero>
  `, document.body
)

