const fileTypeRegExp = /(.*)(?:\.([^.]+$))/;
const sliceFileName = fileName => fileName.slice(0, 10) + '...';
const getfiletype = fileName => {
  try {
    return fileName.match(fileTypeRegExp)[2];
  } catch (_err) {
    return '';
  }
};

export {
  getfiletype,
}
