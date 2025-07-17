import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RenderHTML from 'react-native-render-html';

const { height: screenHeight } = Dimensions.get('window');

const languageMap = {
  English: 'en',
  Hindi: 'hi',
  Marathi: 'mr',
  Punjabi: 'pa',
  Gujarati: 'gu',
  Bengali: 'bn',
  Tamil: 'ta',
  Telugu: 'te',
  Kannada: 'kn',
  Malayalam: 'ml',
  Urdu: 'ur',
  Assamese: 'as',
  Odia: 'or',
  Sindhi: 'sd',
  Sanskrit: 'sa',
  Manipuri: 'mni',
  Konkani: 'kok',
  Nepali: 'ne',
  Bodo: 'brx',
  Dogri: 'doi',
  Santhali: 'sat',
  Maithili: 'mai',
};

const reverseLanguageMap = Object.entries(languageMap).reduce((acc, [label, code]) => {
  acc[code] = label;
  return acc;
}, {});

const ConsentModal = ({ visible, onClose, onAgree, lang, setLang, templateText }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const { width } = useWindowDimensions();

  const generateDropdownItems = (data) => {
    return Object.keys(data)
      .filter((lang) => languageMap[lang])
      .map((lang) => ({
        label: lang,
        value: languageMap[lang],
      }));
  };

  useEffect(() => {
    if (templateText && typeof templateText === 'object') {
      const dropdownItems = generateDropdownItems(templateText);
      setItems(dropdownItems);
    }
  }, [templateText]);

  const selectedLangName = reverseLanguageMap[lang];
  const selectedContentRaw = templateText?.[selectedLangName]?.content || '';
  const selectedContent = typeof selectedContentRaw === 'string' ? selectedContentRaw : '';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
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

            <Text style={styles.title}>Consent Notice</Text>

            {selectedContent.length > 0 ? (
              <View style={styles.htmlWrapper}>
                <ScrollView nestedScrollEnabled>
                  <RenderHTML contentWidth={width} source={{ html: selectedContent }} />
                </ScrollView>
              </View>
            ) : (
              <Text style={styles.desc}>No content available for selected language.</Text>
            )}

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
    maxHeight: screenHeight * 0.85,
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
    marginBottom: 10,
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
  htmlWrapper: {
    maxHeight: 350,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
});
