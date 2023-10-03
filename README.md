# 📡 react-native-reshared

Receive share intents to your React Native app from iOS & Android – fully compatible with Expo

![npm bundle size](https://img.shields.io/bundlephobia/min/react-native-reshared?style=flat-square) ![GitHub](https://img.shields.io/github/license/kuatsu/react-native-reshared?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/kuatsu/react-native-reshared?style=flat-square)

**⚠️ WARNING**: This project is still considered unstable. The API might change drastically in new versions. Please proceed with caution and report any issues you're encountering.

## Installation

```sh
npm install react-native-reshared
# or
yarn add react-native-reshared
```

### Apply `xcode` patch

Due to an issue in the [`cordova-node-xcode`](https://npmjs.com/package/xcode) project (which `@expo/config-plugins` relies on), you need to apply a patch to the `xcode` package which this library installs. Unfortunately, this has to be done manually as `react-native-reshared` cannot do it for you.

You only need to do this if you're using Expo and the config plugin. If you're using React Native CLI, you can skip this step.

First, install `patch-package` using your favorite package manager:

```sh
npm install -D patch-package
# or
yarn add -D patch-package
```

Then add the following script to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

Create a `patches` directory in the root of your project and add a file called `xcode+3.0.1.patch`. Copy the contents of the [same file from this repository](https://github.com/Kuatsu/react-native-reshared/blob/main/patches/xcode%2B3.0.1.patch) into it. Finally, run `patch-package` to apply the patch:

```sh
npx patch-package
# or
yarn patch-package
```

**Note**: There's an [open issue](https://github.com/expo/expo-cli/issues/4293) in the Expo repository regarding this problem. Once it's resolved, this step will no longer be necessary.

## Documentation

The documentation is located [here](https://react-native-reshared.vercel.app/docs/intro).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Attribution

This project is heavily based on two great, sadly unmaintained libraries:

- [react-native-receive-sharing-intent](https://github.com/ajith-ab/react-native-receive-sharing-intent)
- [expo-config-plugin-ios-share-extension](https://github.com/timedtext/expo-config-plugin-ios-share-extension)

The codebases of both libraries were used as a starting point for this project. They have been merged together, updated, cleaned up, documented and extended with new features.

## License

MIT
