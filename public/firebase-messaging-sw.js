importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyBpOB_TTjcFz98hPv_6HesdjTHbvOJ3Xe8',
  authDomain: 'hanaharmoney-c35b3.firebaseapp.com',
  projectId: 'hanaharmoney-c35b3',
  storageBucket: 'hanaharmoney-c35b3.firebasestorage.app',
  messagingSenderId: '915268016076',
  appId: '1:915268016076:web:e6f7be515dca80330c6f69',
  measurementId: 'G-8GFYLL6Y9V',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + ' (onBackgroundMessage)';
  const notificationOptions = {
    body: payload.notification.body,
    // icon: 'https://avatars.githubusercontent.com/sasha1107',
  };

  self.registration.showNotification(title, notificationOptions);
});
//
// onMessage(messaging, (payload) => {
//   const title = payload.notification.title + ' (fore)';
//   const notificationOptions = {
//     body: payload.notification.body,
//     // icon: 'https://avatars.githubusercontent.com/sasha1107',
//   };
//
//   self.registration.showNotification(title, notificationOptions);
// });
