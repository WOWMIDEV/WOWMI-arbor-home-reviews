import { removeRoot } from './renderRemoveRoot';
import { renderReviews } from './renderReviews';

const STATUS_IDLE = 'idle';
const STATUS_ERROR = 'error';
const STATUS_SUCCESS = 'success';

export const render = (type, state, elements) => {
  const { wrappers } = elements;

  if (type === STATUS_ERROR) {
    removeRoot(elements);

    return false;
  }

  if (type === STATUS_SUCCESS) {
    const html = renderReviews(state.reviews);

    wrappers.forEach((wrapper) => {
      wrapper.innerHTML = '';
      wrapper.insertAdjacentHTML('afterbegin', html);
    });

    state.status = STATUS_IDLE;
  }

  return true;
};
