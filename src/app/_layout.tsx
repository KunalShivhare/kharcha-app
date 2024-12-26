// import { ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import React, { useEffect } from 'react';
// import { StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AuthProvider from '../providers/AuthProvider';
// import { useSelfStore } from '../stores/selfStore';

// const RootLayout = () => {
//   const { addSelf } = useSelfStore();

//   useEffect(() => {
//     addSelf({
//       firstName: 'Kunal',
//       image: 'https://picsum.photos/200',
//       lastName: 'Shivhare',
//       name: 'Kunal Shivhare',
//       phoneNumber: '9990312010',
//       email: 'kunalshivharesucks@phub.com',
//     });
//   }, []);

//   return (
//     <SafeAreaView style={StyleSheet.absoluteFill}>
//       <AuthProvider>
//         <ThemeProvider
//           value={{
//             dark: true,
//             colors: {
//               primary: '#00A86B',
//               background: '#212325',
//               card: '#292B2D',
//               text: 'rgb(229, 229, 231)',
//               border: 'rgb(39, 39, 41)',
//               notification: 'rgb(255, 69, 58)',
//             },
//           }}
//         >
//           <Stack
//             initialRouteName="(tabs)"
//             screenOptions={{
//               headerShown: false,
//             }}
//           >
//             <Stack.Screen name="(tabs)" />
//             <Stack.Screen
//               name="modal/index"
//               options={{
//                 presentation: 'transparentModal',
//                 animation: 'slide_from_bottom',
//               }}
//             />
//             <Stack.Screen
//               name="addExpense/index"
//               options={{
//                 presentation: 'modal',
//                 animation: 'fade_from_bottom',
//               }}
//             />
//           </Stack>
//         </ThemeProvider>
//       </AuthProvider>
//     </SafeAreaView>
//   );
// };

// export default RootLayout;
