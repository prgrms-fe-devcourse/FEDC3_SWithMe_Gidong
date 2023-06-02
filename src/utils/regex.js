export const cleanMarkdown = (markdownText) => {
  const cleanText = markdownText
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove image syntax
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Remove link syntax
    .replace(/^>\s*(.*)$/gm, '$1') // Remove blockQuote syntax
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove Raw HTML syntax
    .replace(/^#+\s+(.*)$/gm, '$1') // Remove heading syntax
    .replace(/(\*\*|__|\*|_)(.*?)\1/g, '$2') // Remove bold and italic syntax
    .replace(/(\*\*|~~)(.*?)\1/g, '$2'); // Remove tilde syntax

  return cleanText;
};

export const cleanWordSpacing = (text) => {
  const cleanText = text.replace(/\s/gi, '');

  return cleanText;
};
