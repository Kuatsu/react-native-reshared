export type AndroidIntentFilter = 'text/*' | 'image/*' | 'video/*' | '*/*';

export type ResharedConfigPluginOptions = {
  ios?: {
    activationRules?: {
      NSExtensionActivationSupportsWebURLWithMaxCount?: number;
      NSExtensionActivationSupportsWebPageWithMaxCount?: number;
      NSExtensionActivationSupportsImageWithMaxCount?: number;
      NSExtensionActivationSupportsMovieWithMaxCount?: number;
    };
  };
  android?: {
    intentFilters?: AndroidIntentFilter[];
    mainActivityAttributes?: Record<string, any>;
  };
};
