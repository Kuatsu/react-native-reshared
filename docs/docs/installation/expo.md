---
sidebar_position: 1
---

# Install in Expo Managed project

:::caution

This library is not compatible with Expo Go. You need to use a [development client](https://docs.expo.dev/development/create-development-builds/).

:::

First, install the library using your favorite package manager:

```sh
npm install react-native-reshared
# or
yarn add react-native-reshared
```

Because this library needs to make native code changes at build time, you will need to use an [Expo development client](https://docs.expo.dev/development/create-development-builds/). In order to make the necessary changes, this library provides an Expo config plugin. To use it, simply add the library to the `plugins` section of your `app.json` (see below). Your `app.json` will also need to have a version, a scheme and an iOS build number configured:

```json
{
  "expo": {
    "version": "1.0.0",
    "scheme": "your-scheme",
    "ios": {
      "buildNumber": "1"
    },
    "plugins": ["react-native-reshared"]
  }
}
```

The config plugin supports several configuration options. All of them are optional. You can add them to the `plugins` section of your `app.json`:

_Work in progress... Feel free to contribute!_

Finally, rebuild your development client.
