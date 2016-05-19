// file name helper
const fileTypeRegExp = /(.*)(?:\.([^.]+$))/;
const sliceFileName = fileName => fileName.slice(0, 30) + '...';
const getfiletype = fileName => {
  try {
    return fileName.match(fileTypeRegExp)[2];
  } catch (error) {
    return '';
  }
}
//

// back ground coloer helper
const bg = () => document.getElementsByTagName('body')[0].style.backgroundColor;
const getBackGroundColor = () => bg() === '' ? 'white' : bg();

// icon selector
const selectIcon = fileType => {
  switch (fileType.toLowerCase()) {
  case 'jpeg': case 'jpg': case 'png': case 'gif':
    return 'fa-file-image-o';
  case 'wave': case 'mp3': case 'wav': case 'ogg': case 'aac':
    return 'fa-file-audio-o';
  case 'zip': case 'lzh': case 'rar':
    return 'fa-file-archive-o';
  case 'mp4': case 'mpg': case 'mpeg': case 'avi': case 'flv': case 'mov':
    return 'fa-file-video-o';
  case 'doc': case 'docx':
    return 'fa-file-word-o';
  case 'xls': case 'xlsx':
    return 'fa-file-excel-o';
  case 'ppt': case 'pptx':
    return 'fa-file-powerpoint-o';
  case 'pdf':
    return 'fa-file-pdf-o';
  case 'txt': case 'log':
    return 'fa-file-text-o';
  default:
    return 'fa-file-o';
  }
}

// calc table row by window size
const getFileManagerColumns = () => {
  const width = window.innerWidth;
  if (width > 1250) {
    return 5;
  } else if (width > 1050) {
    return 4;
  } else if (width > 750) {
    return 3;
  } else {
    return 2;
  }
}

const isMultipleAtoB = (a, b) => a !== 0 && a % b === 0;

const MENU_ACTION_TYPE = {
  download: Symbol('download'),
  rename: Symbol('rename'),
  remove: Symbol('remove'),
};

export {
  sliceFileName,
  getBackGroundColor,
  getfiletype,
  selectIcon,
  getFileManagerColumns,
  isMultipleAtoB,
  MENU_ACTION_TYPE,
};
