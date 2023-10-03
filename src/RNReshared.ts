import createRNReshared from './createRNReshared';
import { Platform, Linking, AppState } from 'react-native';
import { sortData } from './utils/helpers';

const nativeInstance = createRNReshared();

// TODO: what is this for?
let isClear = false;
const RNReshared = {
  /**
   * TODO: document
   */
  getSharedContent: (handler: (data: any) => void, errorHandler: (err: unknown) => void, scheme: string): void => {
    if (Platform.OS === 'ios') {
      Linking.getInitialURL()
        .then((res: any) => {
          if (res && res.startsWith(`${scheme}://dataUrl`) && !isClear) {
            RNReshared.getFileNames(handler, errorHandler, res);
          }
        })
        .catch(() => {});
      Linking.addEventListener('url', (res: any) => {
        const url = res ? res.url : '';
        if (url.startsWith(`${scheme}://dataUrl`) && !isClear) {
          RNReshared.getFileNames(handler, errorHandler, res.url);
        }
      });
    } else {
      AppState.addEventListener('change', (status: string) => {
        if (status === 'active' && !isClear) {
          RNReshared.getFileNames(handler, errorHandler, '');
        }
      });
      if (!isClear) RNReshared.getFileNames(handler, errorHandler, '');
    }
  },
  /**
   * TODO: document
   */
  getFileNames: (handler: Function, errorHandler: Function, url: string) => {
    if (Platform.OS === 'ios') {
      nativeInstance
        .getFileNames(url)
        .then((data: any) => {
          let files = sortData(data);
          handler(files);
        })
        .catch((e: any) => errorHandler(e));
    } else {
      nativeInstance
        .getFileNames()
        .then((fileObject: any) => {
          let files = Object.keys(fileObject).map((k) => fileObject[k]);
          handler(files);
        })
        .catch((e: any) => errorHandler(e));
    }
  },
  /**
   * TODO: document
   */
  clearReceivedFiles: () => {
    isClear = true;
  },
};

export default RNReshared;
