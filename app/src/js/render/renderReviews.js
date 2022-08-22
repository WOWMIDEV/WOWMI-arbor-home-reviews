/* eslint camelcase: 0 */

import starIco from '../../svg/star.svg';
import googleLogo from '../../svg/google.svg';
import { subString } from '../utils';

const vendorLogo = {
  google: googleLogo,
};

const stars = (rate) => {
  const rateArray = Array(5).fill(null);
  const grayscale = (index) => `grayscale(${index < rate ? 0 : 1})`;

  return rateArray
    .map(
      (_, index) =>
        `<img src="${starIco}"
         alt="star"
         style="filter: ${grayscale(index)}"
         class="test-star"/>`,
    )
    .join('');
};

const reviewItem = (review) => {
  const { first_name: firstName, last_name, content, service, rating } = review;

  const lastName = last_name ?? ' ';
  const name = `${firstName} ${lastName[0] ?? ''}.`;

  return `
    <div class="hero-slide w-slide">
      <div class="hero-slide-content">
        <div class="test-slide-card-top-line">
          <div class="test-card-avatar-core">
            <img src="${vendorLogo[service]}"
                 alt="${service}"
                 class="sq-avatar"/>
            <div class="hero-review-text-core">
              <div class="text-block-8">${subString(name, 25)}</div>
              <div class="test-starts">
                ${stars(+rating)}
              </div>
            </div>
          </div>
        </div>
        <div class="hero-slide-text">${content}</div>
      </div>
    </div>
  `;
};

export const renderReviews = (reviews) => reviews.map((review) => reviewItem(review)).join('');
