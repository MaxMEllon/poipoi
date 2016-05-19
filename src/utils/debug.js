module.exports = (str, fg = 'blue', bg = '#F1F2F1') => {
  console.log(`%c${str}`, `color: ${fg}; background-color: ${bg};`);
};
