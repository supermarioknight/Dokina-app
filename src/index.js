import { AppRegistry, Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import Root from './app/containers/Root';

AppRegistry.registerComponent('dokina', () => Root);

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}
