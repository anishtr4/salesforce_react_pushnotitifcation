import {Alert} from 'react-native';
import {Component} from 'react';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class PushNotificationHandler extends Component {
  componentDidMount() {
    
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    if (notification.userInteraction) {
      console.log("user opened notificiation while app runnign in baground/forground",notification)
   
  
      
     }

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
PushNotificationIOS.addNotificationRequest({
  fireDate: new Date(Date.now() + (5 * 1000)).toISOString(),
  title: "sdk test Alarm",
  subtitle: "Wake up",
  body: "Some more description",
  sound: "Alarm.wav",
  category: "userAction",
  userInfo: {
    name: "Test",
    userId: "48932nmfe98ryhe9-oi32yrhfo"
  },
  id: new Date().toString(),
  threadId: "490uio3rji",
  repeats: "day"
})
// 
// PushNotification.popInitialNotification((notification) => {
//   console.log('Initial Notification', notification);
// });

PushNotificationIOS.getInitialNotification().then(notification => {
  console.log('Log - notification from closed', notification);
  if (!notification) {
    return;
  }
  const data = notification.getData();
  console.log('notification data',data);
  Alert.alert(JSON.stringify({data, source: 'ClosedApp'}));
});

  }


  render() {
    return null;
  }
  
}

export default PushNotificationHandler;
