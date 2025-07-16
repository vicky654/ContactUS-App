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

// 🔤 Language Constants
export const LANGUAGES = {
  en: {
    heading: 'Thank you for contacting DPDP Consultants,',
    body1:
      'We request your explicit consent to process your personal data in accordance with DPDP Act, 2023...',
    agree: 'Agree',
    close: 'Close',
  },
  hi: {
    heading: 'डीपीडीपी कंसल्टेंट्स से संपर्क करने के लिए धन्यवाद',
    body1:
      'हम अनुरोध करते हैं कि आप अपनी व्यक्तिगत जानकारी को डीपीडीपी अधिनियम, 2023 के अनुसार संसाधित करने के लिए सहमति दें...',
    agree: 'सहमत हूँ',
    close: 'बंद करें',
  },
  mr: {
    heading: 'डीपीडीपी सल्लागारांशी संपर्क केल्याबद्दल धन्यवाद',
    body1:
      'कृपया आपल्या वैयक्तिक डेटावर प्रक्रिया करण्यासाठी आपली स्पष्ट संमती द्या...',
    agree: 'सहमती',
    close: 'बंद',
  },
  pa: {
    heading: 'DPDP ਕਨਸਲਟੈਂਟਸ ਨਾਲ ਸੰਪਰਕ ਕਰਨ ਲਈ ਧੰਨਵਾਦ',
    body1:
      'ਅਸੀਂ ਤੁਹਾਡੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਨੂੰ ਸੰਸਾਧਨ ਕਰਨ ਲਈ ਤੁਹਾਡੀ ਸਪਸ਼ਟ ਸਹਿਮਤੀ ਦੀ ਬੇਨਤੀ ਕਰਦੇ ਹਾਂ...',
    agree: 'ਸਹਿਮਤ',
    close: 'ਬੰਦ ਕਰੋ',
  },
};

const { height: screenHeight } = Dimensions.get('window');

const ConsentModal = ({ visible, onClose, onAgree, lang, setLang }) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Marathi', value: 'mr' },
    { label: 'Punjabi', value: 'pa' },
  ]);

  const translations = LANGUAGES[lang] || LANGUAGES['en'];

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
              placeholder="Select Language"
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              dropDownContainerStyle={styles.dropdownList}
              listMode="SCROLLVIEW"
              zIndex={1000}
              zIndexInverse={3000}
            />

            <Text style={styles.title}>{translations.heading}</Text>
            <Text style={styles.desc}>{translations.body1}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={onAgree} style={styles.agreeBtn}>
                <Text style={styles.agreeText}>{translations.agree}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>{translations.close}</Text>
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
    maxHeight: screenHeight * 0.8,
    zIndex: 1000,
  },
  modalContent: {
    padding: 20,
    zIndex: 1000,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 12,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 45,
    width: '100%',
  },
  dropdownList: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    zIndex: 999,
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
    marginTop: 10,
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
