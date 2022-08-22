export const buildReviewsUrl = (config) => {
  const { serviceName, serviceArgs, commonArgs, base, dependence = null } = config;
  const { company } = commonArgs;
  const url = new URL(base);

  if (company !== 'ignore' && !company) {
    // eslint-disable-next-line no-console
    console.warn(`No find company name for ${serviceName} service.`);
    return false;
  }

  if (dependence) {
    const check = dependence.every((item) => serviceArgs[item]);

    if (!check) {
      // eslint-disable-next-line no-console
      console.warn('Parameters keys must be equals to dependence!');
      return false;
    }
  }

  // set service args
  if (serviceArgs) {
    Object.entries(serviceArgs).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(`service[${serviceName}][${key}]`, value);
      }
    });
  }

  if (!serviceArgs) {
    url.searchParams.set(`service[${serviceName}]`, '');
  }

  // set common args
  Object.entries(commonArgs).forEach(([key, value]) => {
    if (value && value !== 'ignore') {
      url.searchParams.set(key, value);
    }
  });

  return url.href;
};
