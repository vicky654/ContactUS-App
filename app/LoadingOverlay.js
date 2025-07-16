import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const LoadingOverlay = ({ visible }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Dim background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: 'rgba(11,12,42,0.8)', // Slightly transparent dark box
    padding: 20,
    borderRadius: 12,
  },
});
