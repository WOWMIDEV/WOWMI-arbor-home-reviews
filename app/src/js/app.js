import onChange from 'on-change';

import { fetchAll } from './api';
import { render } from './render';
import { getContentElement, buildReviewsUrl, webflowRestart } from './utils';

const BASE_URL = 'https://review.wowmi.us/api/web/api/v1/reviews';

const STATUS_IDLE = 'idle';
const STATUS_ERROR = 'error';
const STATUS_LOADING = 'loading';
const STATUS_SUCCESS = 'success';

const initRequestReviews = async (state, configRequest, urls) => {
  state.status = STATUS_LOADING;

  const response = await fetchAll(urls);
  const mergedData = response
    .map(({ data, error, url }) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.warn(`${error.message} from ${decodeURI(url)}`);
        state.status = STATUS_ERROR;
        return false;
      }

      return data;
    })
    .flat();

  if (mergedData.includes(false)) {
    return null;
  }

  if (mergedData.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('No reviews');
    state.status = STATUS_ERROR;
    return false;
  }

  state.reviews = mergedData;

  state.status = STATUS_SUCCESS;
  return true;
};

export const app = (wrappers) => {
  const elements = {
    wrappers,
    roots: document.querySelectorAll('[data-home-slide="root"]'),
    arrows: document.querySelectorAll('[data-home-slide="arrows"]'),
    company: document.querySelector('[data-reviews="company"]'),
    agent_email: document.querySelector('[data-reviews="agent_email"]'),
    email: document.querySelector('[data-reviews="email"]'),
    placeId: document.querySelector('[data-reviews="place_id"]'),
  };

  const configRequest = {
    base: BASE_URL,
    args: {
      rate_min: 4,
      agent_email: getContentElement(elements.agent_email),
    },
  };

  // GOOGLE CONFIG
  const googleUrlConf = {
    serviceName: 'google',
    serviceArgs: {
      place_id: getContentElement(elements.placeId),
    },
    commonArgs: {
      company: 'ignore',
      ...configRequest.args,
    },
    base: configRequest.base,
  };

  const {
    serviceArgs: { place_id: placeId },
  } = googleUrlConf;

  const googleUrl = placeId ? buildReviewsUrl(googleUrlConf) : false;

  const urls = [googleUrl].filter((url) => url);

  const state = {
    status: STATUS_IDLE,
    reviews: null,
  };

  const watchedState = onChange(state, (path, value, prevValue) => {
    render(value, watchedState, elements);

    if (prevValue !== STATUS_IDLE && value === STATUS_IDLE) {
      webflowRestart();
    }
  });

  initRequestReviews(watchedState, configRequest, urls);
};
