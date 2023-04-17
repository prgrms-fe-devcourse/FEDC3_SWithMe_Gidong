export const cleanText = (markdownText) => {
  return markdownText.replace(/<\/?[^>]+(>|$)/g, '');
};
