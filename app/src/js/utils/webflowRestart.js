/* eslint no-unused-expressions: 0 */
export const webflowRestart = () => {
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require('ix2').init();
  document.dispatchEvent(new Event('readystatechange'));
};
