import React from 'react';
import { StatusBar } from 'react-native';

import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import { Device } from 'utils';
import { images } from 'assets';
import { Icon } from 'components';
import Navigation from './navigation';
import { Style, colors, sizes } from 'core';
import { UserProvider } from 'contexts';

export default function App() {
  const toastConfig = {
    // eslint-disable-next-line react/no-unstable-nested-components
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[
          Style.toastStyle,
          { backgroundColor: '#C4F2DD', height: sizes.s100 },
        ]}
        contentContainerStyle={{ padding: sizes.s12 }}
        renderLeadingIcon={() => (
          <Icon
            source={images.ic_comment_check}
            size={sizes.s24}
            style={Style.top12}
          />
        )}
        renderTrailingIcon={() => (
          <Icon
            source={images.ic_close}
            size={sizes.s12}
            style={[Style.top4, Style.right4]}
          />
        )}
        onPress={() => Toast.hide()}
        text1Style={[Style.txt14, Style.bold, { color: colors.green900 }]}
        text2Style={[Style.txt14, { color: colors.green900 }]}
      />
    ),

    // eslint-disable-next-line react/no-unstable-nested-components
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={[
          Style.toastStyle,
          { backgroundColor: '#FDE0DE', height: sizes.s100 },
        ]}
        contentContainerStyle={{ padding: sizes.s12 }}
        renderLeadingIcon={() => (
          <Icon
            source={images.ic_shield_exclamation}
            size={sizes.s24}
            style={Style.top12}
          />
        )}
        renderTrailingIcon={() => (
          <Icon
            source={images.ic_close}
            size={sizes.s12}
            style={[Style.top4, Style.right4]}
          />
        )}
        onPress={() => Toast.hide()}
        text1Style={[Style.txt14, Style.bold, { color: colors.error }]}
        text2Style={[Style.txt14, Style.bold, { color: colors.error }]}
        text2NumberOfLines={2}
      />
    ),
  };

  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          hidden={false}
          translucent={true}
        />
        <Navigation />
      </SafeAreaProvider>
      <Toast config={toastConfig} topOffset={Device.getStatusBarHeight()} />
    </UserProvider>
  );
}


// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//   StatusBar,
//   Image,
//   FlatList,
//   Dimensions,
//   Animated,
//   Text,
//   View,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// const { width } = Dimensions.get('screen');
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// // import { EvilIcons } from '@expo/vector-icons';
// import {
//   GestureHandlerRootView,
//   FlingGestureHandler,
//   Directions,
//   State,
// } from 'react-native-gesture-handler';

// interface EventData {
//   title: string;
//   location: string;
//   date: string;
//   poster: string;
// }

// const DATA: EventData[] = [
//   {
//     title: 'Afro vibes',
//     location: 'Mumbai, India',
//     date: 'Nov 17th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
//   },
//   {
//     title: 'Jungle Party',
//     location: 'Unknown',
//     date: 'Sept 3rd, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
//   },
//   {
//     title: '4th Of July',
//     location: 'New York, USA',
//     date: 'Oct 11th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
//   },
//   {
//     title: 'Summer festival',
//     location: 'Bucharest, Romania',
//     date: 'Aug 17th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
//   },
//   {
//     title: 'BBQ with friends',
//     location: 'Prague, Czech Republic',
//     date: 'Sept 11th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
//   },
//   {
//     title: 'Festival music',
//     location: 'Berlin, Germany',
//     date: 'Apr 21th, 2021',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
//   },
//   {
//     title: 'Beach House',
//     location: 'Liboa, Portugal',
//     date: 'Aug 12th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
//   },
// ];

// const OVERFLOW_HEIGHT = 70;
// const SPACING = 10;
// const ITEM_WIDTH = width * 0.76;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
// const VISIBLE_ITEMS = 3;

// const OverflowItems: React.FC<{ data: EventData[]; scrollXAnimated: Animated.Value }> = ({
//   data,
//   scrollXAnimated,
// }) => {
//   const inputRange = [-1, 0, 1];
//   const translateY = scrollXAnimated.interpolate({
//     inputRange,
//     outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
//   });
//   return (
//     <View style={styles.overflowContainer}>
//       <Animated.View style={{ transform: [{ translateY }] }}>
//         {data.map((item, index) => {
//           return (
//             <View key={index} style={styles.itemContainer}>
//               <Text style={[styles.title]} numberOfLines={1}>
//                 {item.title}
//               </Text>
//               <View style={styles.itemContainerRow}>
//                 <Text style={[styles.location]}>
//                   <EvilIcons
//                     name='location'
//                     size={16}
//                     color='black'
//                     style={{ marginRight: 5 }}
//                   />
//                   {item.location}
//                 </Text>
//                 <Text style={[styles.date]}>{item.date}</Text>
//               </View>
//             </View>
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

// const App: React.FC = () => {
//   const [data, setData] = useState<EventData[]>(DATA);
//   const scrollXIndex = useRef(new Animated.Value(0)).current;
//   const scrollXAnimated = useRef(new Animated.Value(0)).current;
//   const [index, setIndex] = useState(0);
//   const setActiveIndex = useCallback((activeIndex: number) => {
//     scrollXIndex.setValue(activeIndex);
//     setIndex(activeIndex);
//   }, [scrollXIndex]);

//   useEffect(() => {
//     if (index === data.length - VISIBLE_ITEMS - 1) {
//       // get new data
//       // fetch more data
//       const newData = [...data, ...data];
//       setData(newData);
//     }
//   }, [index, data]);

//   useEffect(() => {
//     Animated.spring(scrollXAnimated, {
//       toValue: scrollXIndex,
//       useNativeDriver: true,
//     }).start();
//   }, [scrollXAnimated, scrollXIndex]);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <FlingGestureHandler
//         key='left'
//         direction={Directions.LEFT}
//         onHandlerStateChange={(ev) => {
//           if (ev.nativeEvent.state === State.END) {
//             if (index === data.length - 1) {
//               return;
//             }
//             setActiveIndex(index + 1);
//           }
//         }}
//       >
//         <FlingGestureHandler
//           key='right'
//           direction={Directions.RIGHT}
//           onHandlerStateChange={(ev) => {
//             if (ev.nativeEvent.state === State.END) {
//               if (index === 0) {
//                 return;
//               }
//               setActiveIndex(index - 1);
//             }
//           }}
//         >
//           <SafeAreaView style={styles.container}>
//             <StatusBar hidden />
//             <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
//             <FlatList
//               data={data}
//               keyExtractor={(_, index) => String(index)}
//               horizontal
//               inverted
//               contentContainerStyle={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 padding: SPACING * 2,
//                 marginTop: 50,
//               }}
//               scrollEnabled={false}
//               removeClippedSubviews={false}
//               CellRendererComponent={({
//                 item,
//                 index,
//                 children,
//                 style,
//                 ...props
//               }) => {
//                 const newStyle = [style, { zIndex: data.length - index }];
//                 return (
//                   <View style={newStyle} index={index} {...props}>
//                     {children}
//                   </View>
//                 );
//               }}
//               renderItem={({ item, index }) => {
//                 const inputRange = [index - 1, index, index + 1];
//                 const translateX = scrollXAnimated.interpolate({
//                   inputRange,
//                   outputRange: [50, 0, -100],
//                 });
//                 const scale = scrollXAnimated.interpolate({
//                   inputRange,
//                   outputRange: [0.8, 1, 1.3],
//                 });
//                 const opacity = scrollXAnimated.interpolate({
//                   inputRange,
//                   outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
//                 });

//                 return (
//                   <Animated.View
//                     style={{
//                       position: 'absolute',
//                       left: -ITEM_WIDTH / 2,
//                       opacity,
//                       transform: [
//                         {
//                           translateX,
//                         },
//                         { scale },
//                       ],
//                     }}
//                   >
//                     <Image
//                       source={{ uri: item.poster }}
//                       style={{
//                         width: ITEM_WIDTH,
//                         height: ITEM_HEIGHT,
//                         borderRadius: 14,
//                       }}
//                     />
//                   </Animated.View>
//                 );
//               }}
//             />
//           </SafeAreaView>
//         </FlingGestureHandler>
//       </FlingGestureHandler>
//     </GestureHandlerRootView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '900',
//     textTransform: 'uppercase',
//     letterSpacing: -1,
//   },
//   location: {
//     fontSize: 16,
//   },
//   date: {
//     fontSize: 12,
//   },
//   itemContainer: {
//     height: OVERFLOW_HEIGHT,
//     padding: SPACING * 2,
//   },
//   itemContainerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   overflowContainer: {
//     height: OVERFLOW_HEIGHT,
//     overflow: 'hidden',
//   },
// });

// export default App;