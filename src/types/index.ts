import type { EXTENSION_MIMETYPES } from '../utils/constants';

// TODO: improve typing
export interface NativeRNReshared {
  getFileNames: Function;
}

// TODO: improve typing
export interface ResharedResult {
  filePath?: any | string;
  text?: any | string;
  weblink?: any | string;
  mimeType?: any | string; // (typeof EXTENSION_MIMETYPES)[keyof typeof EXTENSION_MIMETYPES] | null;
  contentUri?: any | string;
  fileName?: any | string;
  extension?: any | string;
}

export enum SharedContentType {
  TEXT = 'text',
  URL = 'url',
  FILE = 'file',
}

export type SharedTextContent = {
  type: SharedContentType.TEXT;
  text: string;
};

export type SharedUrlContent = {
  type: SharedContentType.URL;
  url: string;
};

export type SharedFileContent = {
  type: SharedContentType.FILE;
  fileUri: string;
  mimeType: (typeof EXTENSION_MIMETYPES)[keyof typeof EXTENSION_MIMETYPES] | null;
  fileName: string;
};

export type SharedContent = SharedTextContent | SharedUrlContent | SharedFileContent;
