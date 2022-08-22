export const getContentElement = (element) => {
  const hasContent = element && element.textContent !== '';

  return hasContent ? element.textContent.trim() : null;
};
