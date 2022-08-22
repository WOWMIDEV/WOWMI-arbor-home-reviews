import { app } from './app';
import '../scss/styles.scss';

const init = () => {
  const maskSlider = document.querySelectorAll('[data-home-slide="mask"]');

  if (maskSlider.length === 0) {
    return false;
  }

  return app(maskSlider);
};

init();
