export type RNCloudStorageConfigPluginOptions =
  | {
      /**
       * TODO: comment
       */
      activationRules?: {
        NSExtensionActivationSupportsWebURLWithMaxCount?: number;
        NSExtensionActivationSupportsWebPageWithMaxCount?: number;
        NSExtensionActivationSupportsImageWithMaxCount?: number;
        NSExtensionActivationSupportsMovieWithMaxCount?: number;
      };
    }
  | undefined;
