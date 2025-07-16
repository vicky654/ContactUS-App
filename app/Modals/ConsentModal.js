import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const { height: screenHeight } = Dimensions.get('window');

const ConsentModal = ({ visible, onClose, onAgree, lang, setLang }) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Marathi', value: 'mr' },
  ]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.label}>Language:</Text>

            <DropDownPicker
              open={open}
              value={lang}
              items={items}
              setOpen={setOpen}
              setValue={setLang}
              setItems={setItems}
              zIndex={1000}
              placeholder="Select Language"
              style={{ marginBottom: 12 }}
            />

            <Text style={styles.title}>
              Thank you for contacting DPDP Consultants,
            </Text>
            <Text style={styles.desc}>
              We request your explicit consent to process your personal data in
              accordance with DPDP Act, 2023...
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={onAgree} style={styles.agreeBtn}>
                <Text style={styles.agreeText}>Agree</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ConsentModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: screenHeight * 0.7,
  },
  modalContent: {
    padding: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agreeBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  agreeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeText: {
    fontWeight: 'bold',
  },
});
