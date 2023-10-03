---
sidebar_position: 1
---

# useSharedContent

The `useSharedContent` provides the content that's been shared with your app.

```ts
import { useSharedContent } from { react-native-reshared };
```

## API

**Parameters**:

- `scheme` (`string`): Required. The custom scheme of your app. When using Expo, this is the `scheme` property of your `app.json`. You can access it using Expo Constants: `Constants.expoConfig?.scheme`.

**Returns**: An object that implements the [`SharedContent`](../interfaces/SharedContent) interface, or `null` if no content has been shared.

The returned object is reset to `null` whenever the app is backgrounded so that, when the user shares the same content twice, the hook will notify any `useEffect`s listening to it again.

## Example

### Bare React Native

```tsx
import React, { useState, useEffect } from 'react';
import { useSharedContent } from { react-native-reshared };

const App: React.FC = () => {
  const sharedContent = useSharedContent('myapp'); // Replace with your custom scheme

  return (
    <View>
      <Text>{JSON.stringify(sharedContent)}</Text>
    </View>
  )
}
```

### Expo

```tsx
import React, { useState, useEffect } from 'react';
import { useSharedContent } from { react-native-reshared };
import Constants from 'expo-constants';

const SCHEME = (Array.isArray(Constants.expoConfig?.scheme) ? Constants.expoConfig?.scheme[0] : Constants.expoConfig?.scheme) ?? ';
const App: React.FC = () => {
  const sharedContent = useSharedContent(SCHEME);

  return (
    <View>
      <Text>{JSON.stringify(sharedContent)}</Text>
    </View>
  )
}
```
