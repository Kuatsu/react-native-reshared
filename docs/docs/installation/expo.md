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

Because this library needs to make native code changes at build time, you will not be able to use Expo Go for development. Instead, you will need to prebuild your app and use an [Expo development client](https://docs.expo.dev/development/create-development-builds/). In order to make the necessary changes, this library provides an Expo config plugin. To use it, simply add the library to the `plugins` section of your `app.json` (see below). Your `app.json` will also need to have a version, a scheme and an iOS build number configured, as these are required by the iOS plugin:

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

The config plugin supports several configuration options. All of them are optional. You can add them to the `plugins` section of your `app.json`.

## Expo Config Plugin Options

### iOS (`ios` parent key)

- `activationRules`: Can either be an object containing `NSExtensionActivationSupports*` activation rules from [Apple's documentation](https://developer.apple.com/documentation/bundleresources/information_property_list/nsextension/nsextensionattributes/nsextensionactivationrule), or a string that defines a more granular activation rule using `SUBQUERY`.

When using an object, you can use the following keys:

- `NSExtensionActivationSupportsWebURLWithMaxCount`: (number) Maximum number of web URLs supported.
- `NSExtensionActivationSupportsWebPageWithMaxCount`: (number) Maximum number of web pages supported.
- `NSExtensionActivationSupportsImageWithMaxCount`: (number) Maximum number of images supported.
- `NSExtensionActivationSupportsMovieWithMaxCount`: (number) Maximum number of movies supported.
- `NSExtensionActivationSupportsFileWithMaxCount`: (number) Maximum number of files supported.
- `NSExtensionActivationSupportsText`: (boolean) Whether text sharing is supported.

When using a string, write a valid `SUBQUERY` expression. For example, this activation rule will make your app appear when the user shares a single image or video:

```json
{
  "ios": {
    "activationRules": "SUBQUERY ( extensionItems, $extensionItem, SUBQUERY( $extensionItem.attachments, $attachment, ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO \"public.image\" OR ANY $attachment.registeredTypeIdentifiers UTI-CONFORMS-TO \"public.movie\" ).@count == 1 ).@count == 1"
  }
}
```

If you do not specify any activation rules or omit the `ios` parent key, the config plugin will by default use the following configuration, which will make your app appear when the user shares a single web page or URL:

```json
{
  "ios": {
    "activationRules": {
      "NSExtensionActivationSupportsWebURLWithMaxCount": 1,
      "NSExtensionActivationSupportsWebPageWithMaxCount": 1
    }
  }
}
```

### Android (`android` parent key)

- `intentFilters`: An array of MIME types for Android intent filters. Supported values are:
  - `"text/*"`: For text content
  - `"image/*"`: For image content
  - `"video/*"`: For video content
  - `"*/*"`: For any content type
- `mainActivityAttributes`: An object containing additional attributes to be added to the main activity in the Android manifest.

If you do not specify any intent filters or omit the `android` parent key, the config plugin will by default use the following configuration, which will make your app appear when the user shares any kind of text, including web pages:

```json
{
  "android": {
    "intentFilters": ["text/*"]
  }
}
```

A config plugin configured to receive image files on both iOS and Android would look like this:

```json
{
  "plugins": [
    [
      "react-native-reshared",
      {
        "ios": {
          "activationRules": {
            "NSExtensionActivationSupportsImageWithMaxCount": 1
          }
        },
        "android": {
          "intentFilters": ["image/*"]
        }
      }
    ]
  ]
}
```

Finally, rebuild your development client.
