import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import Reshared from '../RNReshared';
import { isValidUrl } from '../utils/helpers';
import { SharedContentType, type SharedContent } from '../types';

const useSharedContent = (scheme: string) => {
  const appState = useRef(AppState.currentState);
  const [sharedContent, setSharedContent] = useState<SharedContent | null>(null);

  useEffect(() => {
    /* When the app goes to background, reset the shared content so that if the user shares the same content again,
    hook subscribers will be notified again. */
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        console.log('useSharedContent[to-background] reset intent');
        setSharedContent(null);
      }

      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    Reshared.getSharedContent(
      (data) => {
        const intent = data[0];
        if (intent.weblink) {
          setSharedContent({
            type: SharedContentType.URL,
            url: intent.weblink,
          });
        } else if (intent.text) {
          if (isValidUrl(intent.text)) {
            setSharedContent({
              type: SharedContentType.URL,
              url: intent.text,
            });
          } else {
            setSharedContent({
              type: SharedContentType.TEXT,
              text: intent.text,
            });
          }
        } else if (intent.filePath) {
          setSharedContent({
            type: SharedContentType.FILE,
            fileUri: intent.contentUri || intent.filePath,
            mimeType: intent.mimeType,
            fileName: intent.fileName,
          });
        } else {
          console.warn('Reshared received an intent with unknown content', intent);
        }
      },
      (err) => {
        // TODO: wrap in custom error
        console.warn(err);
      },
      scheme
    );

    return () => {
      Reshared.clearReceivedFiles();
    };
  }, [scheme]);

  return sharedContent;
};

export default useSharedContent;
