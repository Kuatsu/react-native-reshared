import { withMainActivity, type ConfigPlugin } from '@expo/config-plugins';

const IMPORT_STATEMENT = `import android.content.Intent;`;
export const withMainActivityExtension: ConfigPlugin = (pureConfig) => {
  return withMainActivity(pureConfig, (config) => {
    if (!config.modResults.contents.includes(IMPORT_STATEMENT)) {
      config.modResults.contents = config.modResults.contents.replace(
        /import android.os.Bundle;/,
        `import android.os.Bundle;\n${IMPORT_STATEMENT}`
      );
    }
    if (!config.modResults.contents.includes('onNewIntent')) {
      config.modResults.contents = config.modResults.contents.replace(
        /public class MainActivity extends ReactActivity {/,
        `public class MainActivity extends ReactActivity {
          @Override
          public void onNewIntent(Intent intent) {
            super.onNewIntent(intent);
            setIntent(intent);
          }\n`
      );
    }
    return config;
  });
};
