import { html } from 'lit-html';
import VideoHero from '../src/components/VideoHero.js';

customElements.define('c-video-hero', VideoHero);

export default {
  title: 'c-video-hero',
};

export const App = () =>
  html`
    <c-video-hero></c-video-hero>
  `;
