import type { ResharedResult } from '../types';
import { EXTENSION_MIMETYPES } from './constants';

export const sortData = (data: any): Array<ResharedResult> => {
  const objects: ResharedResult = {
    filePath: null,
    text: null,
    weblink: null,
    mimeType: null,
    contentUri: null,
    fileName: null,
    extension: null,
  };
  const file = data;
  if (file.startsWith('text:')) {
    const text = file.replace('text:', '');
    if (isValidUrl(text)) {
      const object: Array<ResharedResult> = [{ ...objects, weblink: text }];
      return object;
    }
    let object = [{ ...objects, text: text }];
    return object;
  } else if (file.startsWith('webUrl:')) {
    const weblink: string = file.replace('webUrl:', '');
    const object: Array<ResharedResult> = [{ ...objects, weblink: weblink }];
    return object;
  } else {
    try {
      const files = JSON.parse(file);
      const object = [];
      for (let i = 0; i < files.length; i++) {
        const path = files[i].path;
        const obj = {
          ...objects,
          fileName: getFileName(path),
          extension: getExtension(path),
          mimeType: getMimeType(path),
          filePath: path,
        };
        object.push(obj);
      }
      return object;
    } catch (error) {
      return [{ ...objects }];
    }
  }
};

export const getFileName = (file: string) => {
  return file.replace(/^.*(\\|\/|:)/, '');
};

export const getExtension = (fileName: string) => {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
};

export const getMimeType = (file: string) => {
  const ext = getExtension(file);
  const extension = '.' + ext.toLowerCase();
  const type = Object.entries(EXTENSION_MIMETYPES).find((mime) => mime[0] === extension);
  if (type) return type[1];
  return null;
};

export const isValidUrl = (url: string) => {
  // TODO: should this support other protocols?
  if (/^https?:\/\//.test(url)) {
    return true;
  }
  return false;
};
