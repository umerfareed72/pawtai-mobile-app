export const ExtensionValidator = file => {
  let fileType;
  fileType = file.file_path.split('.').pop();
  //Images
  if (fileType == 'jpeg') {
    return 'image';
  } else if (fileType == 'jpg' || fileType == 'JPG') {
    return 'image';
  } else if (fileType == 'png' || fileType == 'PNG') {
    return 'image';
  } else if (fileType == 'HEIC' || fileType == 'heic') {
    return 'image';
  } else if (fileType == 'GIF' || fileType == 'gif') {
    return 'image';
  } else if (fileType == 'TIFF' || fileType == 'tiff') {
    return 'image';
  } else if (fileType == 'BMP' || fileType == 'bmp') {
    return 'image';
  } else if (fileType == 'EPS' || fileType == 'eps') {
    return 'image';
  } else if (fileType == 'svg' || fileType == 'SVG') {
    return 'image';
  } else if (
    fileType == 'cr2' ||
    fileType == 'nef' ||
    fileType == 'orf' ||
    fileType == 'sr2'
  ) {
    return 'image';
  }
  //Videos
  else if (fileType == 'mp3' || fileType == 'MP3') {
    return 'video';
  } else if (fileType == 'mp4' || fileType == 'MP4') {
    return 'video';
  } else if (fileType == 'mov' || fileType == 'MOV') {
    return 'video';
  } else if (fileType == 'wmv' || fileType == 'WMV') {
    return 'video';
  } else if (fileType == 'AVI' || fileType == 'avi') {
    return 'video';
  } else if (fileType == 'AVCHD' || fileType == 'avchd') {
    return 'video';
  } else if (fileType == 'FLV' || fileType == 'flv') {
    return 'video';
  } else if (fileType == 'F4V' || fileType == 'f4v') {
    return 'video';
  } else if (fileType == 'SWF' || fileType == 'swf') {
    return 'video';
  } else if (fileType == 'MKV' || fileType == 'mkv') {
    return 'video';
  } else if (fileType == 'WEBM' || fileType == 'webm') {
    return 'video';
  } else if (fileType == 'HTML5' || fileType == 'html5') {
    return 'video';
  } else if (fileType == 'MPEG-2' || fileType == 'mpeg-2') {
    return 'video';
  } else if (fileType == 'MPV' || fileType == 'mpv') {
    return 'video';
  } else if (fileType == 'M4P' || fileType == 'm4p') {
    return 'video';
  } else if (fileType == 'M4V' || fileType == 'm4v') {
    return 'video';
  } else if (
    fileType == 'MPG' ||
    fileType == 'MP2' ||
    fileType == 'MPEG' ||
    fileType == 'MPE'
  ) {
    return 'video';
  } else if (
    fileType == 'mpg' ||
    fileType == 'mp2' ||
    fileType == 'mpeg' ||
    fileType == 'mpe'
  ) {
    return 'video';
  }
};
