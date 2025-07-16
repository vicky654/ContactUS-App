import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message'; // ✅ Import Toast
import ContactUs from './../screens/ContactUs'; // ✅ Make sure the path is correct

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ContactUs />
      <Toast /> {/* Mount Toast here */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
