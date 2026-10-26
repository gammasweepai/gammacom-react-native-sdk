# Gammacom React Native Widget

Add Gammacom live chat to your React Native app (iOS and Android).

![](https://img.shields.io/npm/v/@gammacom/react-native-widget?style=flat)
![](https://img.shields.io/npm/l/@gammacom/react-native-widget)

## Installation

```sh
npm install --save @gammacom/react-native-widget
# or
yarn add @gammacom/react-native-widget
```

This library depends on [react-native-webview](https://www.npmjs.com/package/react-native-webview) and
[async-storage](https://github.com/react-native-async-storage/async-storage). Install them if your app doesn't have them yet:

```sh
npm install --save react-native-webview @react-native-async-storage/async-storage
# Expo apps: use `npx expo install` so the versions match your Expo SDK
npx expo install react-native-webview @react-native-async-storage/async-storage
```

For bare React Native apps on iOS, install the pods:

```sh
cd ios && pod install
```

## Platform setup

- **iOS:** file attachments use the system file picker. Add `NSPhotoLibraryUsageDescription` and
  `NSCameraUsageDescription` to your `Info.plist` (Expo: `ios.infoPlist` in `app.json`); without them the app closes
  when a user chooses "Take Photo".

## Usage

1. In Gammacom, create a **Website** inbox and copy its **website token** (Settings → Inboxes → your inbox → Configuration).
2. Use your Gammacom URL as `baseUrl`.

```js
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import GammacomWidget from '@gammacom/react-native-widget';

const App = () => {
  const [showWidget, toggleWidget] = useState(false);
  const user = {
    identifier: 'john@gmail.com',
    name: 'John Samuel',
    avatar_url: '',
    email: 'john@gmail.com',
    identifier_hash: '',
  };
  const customAttributes = { accountId: 1, pricingPlan: 'paid', status: 'active' };
  const websiteToken = 'WEBSITE_TOKEN';
  const baseUrl = 'YOUR_GAMMACOM_URL';
  const locale = 'en';
  const colorScheme = 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => toggleWidget(true)}>
          <Text style={styles.buttonText}>Open chat</Text>
        </TouchableOpacity>
      </View>
      {showWidget && (
        <GammacomWidget
          websiteToken={websiteToken}
          locale={locale}
          baseUrl={baseUrl}
          closeModal={() => toggleWidget(false)}
          isModalVisible={showWidget}
          user={user}
          customAttributes={customAttributes}
          colorScheme={colorScheme}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { height: 48, marginTop: 32, padding: 8, backgroundColor: '#15F5BA', borderRadius: 8, justifyContent: 'center' },
  buttonText: { color: '#03211B', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});

export default App;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `baseUrl` | String | - | Your Gammacom URL |
| `websiteToken` | String | - | Website inbox token |
| `isModalVisible` | Boolean | required | Show or hide the chat |
| `closeModal` | Function | - | Called when the chat is closed |
| `locale` | String | `en` | Chat language |
| `colorScheme` | String | `light` | `light`, `dark` or `auto` |
| `user` | Object | `{}` | Logged-in user details: `identifier`, `name`, `email`, `avatar_url`, `identifier_hash` |
| `customAttributes` | Object | `{}` | Extra information about the customer |

### Identifying logged-in users

Pass `user.identifier` (your own user ID or email) so the same person keeps the same conversation history across devices.

To stop others from impersonating your users, turn on **Enforce user identity validation** in the inbox settings and pass
`user.identifier_hash`: an HMAC-SHA256 of `identifier`, generated on **your server** with the inbox's HMAC token.
Never put the HMAC token in your app.

## Example app

The `Example` folder is an Expo app that uses the code in this repo:

1. Set `YOUR_GAMMACOM_URL` and `YOUR_WEBSITE_TOKEN` in `Example/App.js`.
2. Install and start it. `--install-links` copies the SDK into the example instead of linking it, so the bundler can
   resolve it:

   ```sh
   cd Example
   npm install --install-links
   npx expo start
   ```

3. Open it in the **Expo Go** app (it must match the example's Expo SDK version):
   - **Android:** scan the QR code, or over USB run `adb reverse tcp:8081 tcp:8081` and open `exp://127.0.0.1:8081`.
   - **iPhone:** run `npx expo login` on your computer, sign in to Expo Go with the same account, then scan the QR code
     with the Camera app.

After changing the SDK code, run `npm install --install-links` again so the example picks up the change.

## License

Released under the MIT License. See [LICENSE](LICENSE).
