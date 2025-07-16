import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { callApi } from '../../utils/callApi';
import ConsentModal from './../Modals/ConsentModal';
const ContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter your full name'),
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    contact: Yup.string().matches(/^[0-9]{10}$/, 'Contact must be 10 digits').required('Contact is required'),
    topic: Yup.string().required('Please select a topic'),
    message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

export default function ContactUs() {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en');
    const [open, setOpen] = useState(false);
    const [topicValue, setTopicValue] = useState('Compliance Evaluation & Risk Assessment');
    const [items, setItems] = useState([
        { label: 'Compliance Evaluation & Risk Assessment', value: 'Compliance Evaluation & Risk Assessment' },
        { label: 'Consent Management Solution', value: 'Consent Management Solution' },
        { label: 'Data Mapping & Inventory', value: 'Data Mapping & Inventory' },
    ]);
    // Toast.show({
    //     type: 'success',
    //     text1: 'Success',
    //     text2: 'Your message has been sent!',
    // });

    // // For error
    // Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Something went wrong!',
    // });





    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            contact: '',
            topic: topicValue,
            message: '',
            otp: '',
        },
        // validationSchema: ContactSchema,
        onSubmit: async (values, { setValues }) => {
            const queryParams = {
                name: values.fullName,
                department: 'careers',
                email: values.email,
                phone: values.contact,
                message: values.message,
            };

            try {
                setLoading(true);
                const response = await callApi(
                    'https://tech.portal-uat.dpdpconsultants.com/api/v2/create_consent',
                    'POST',
                    queryParams
                );

                if (response?.code == '200' && !response?.data?.message.includes("Invalid Email")) {
                     Toast.show({
                                                            type: 'success',
                                                            text1: 'Success',
                                                            text2: 'OTP sent successfully on email',
                                                        });
                    setShowOTP(true);
                } else {
                       Toast.show({
                                                            type: 'error',
                                                            text1: 'Error',
                                                            text2: 'Invalid Email',
                                                        });
                    Alert.alert('Error', response?.message || 'Failed to send OTP');
                }

                if (response) {
                    setValues({ ...values, otp: '' });
                }
            } catch (error) {
                Alert.alert('Error', error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
    });

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0b0c2a" />

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Contact Us 💬</Text>
            </View>
            {/* <TouchableOpacity onPress={handlePress} style={styles.button}>
  <Text style={styles.buttonText}>Show Toast</Text>
</TouchableOpacity> */}

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollView, { paddingBottom: 100 }]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    keyboardShouldPersistTaps="handled"
                >
                    <Spinner visible={loading} textContent="Loading..." textStyle={styles.spinnerText} />

                    {!loading && (
                        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                            <View style={styles.footerBox}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.dpdpconsultants.com/')}>
                                    <Text style={[styles.footerTitle, styles.linkText]}>DPDP Consultants</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Linking.openURL('tel:18005311777')}>
                                    <Text style={[styles.footerText, styles.linkText]}>📞 1800-5311-777</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Linking.openURL('mailto:info@dpdpconsultants.com')}>
                                    <Text style={[styles.footerText, styles.linkText]}>📧 info@dpdpconsultants.com</Text>
                                </TouchableOpacity>
                                <Text style={[styles.footerText, { fontWeight: 'bold' }]}>Fill out your details to be contacted1</Text>
                            </View>
                            <Text style={styles.label}>Full Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                onChangeText={formik.handleChange('fullName')}
                                onBlur={formik.handleBlur('fullName')}
                                value={formik.values.fullName}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <Text style={styles.error}>{formik.errors.fullName}</Text>
                            )}

                            <Text style={styles.label}>Contact *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contact"
                                onChangeText={formik.handleChange('contact')}
                                onBlur={formik.handleBlur('contact')}
                                value={formik.values.contact}
                                keyboardType="phone-pad"
                            />
                            {formik.touched.contact && formik.errors.contact && (
                                <Text style={styles.error}>{formik.errors.contact}</Text>
                            )}

                            <Text style={styles.label}>Email *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                value={formik.values.email}
                                keyboardType="email-address"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <Text style={styles.error}>{formik.errors.email}</Text>
                            )}

                            <Text style={styles.label}>Select a Topic *</Text>
                            <DropDownPicker
                                open={open}
                                value={topicValue}
                                items={items}
                                setOpen={setOpen}
                                setValue={(callback) => {
                                    const val = callback(topicValue);
                                    setTopicValue(val);
                                    formik.setFieldValue('topic', val);
                                }}
                                setItems={setItems}
                                style={{ marginBottom: 16 }}
                                containerStyle={{ zIndex: 1000 }}
                                dropDownContainerStyle={{ zIndex: 999 }}
                            />
                            {formik.touched.topic && formik.errors.topic && (
                                <Text style={styles.error}>{formik.errors.topic}</Text>
                            )}

                            <Text style={styles.label}>Your Message *</Text>
                            <TextInput
                                style={[styles.input, styles.textarea]}
                                placeholder="Your Message"
                                onChangeText={formik.handleChange('message')}
                                onBlur={formik.handleBlur('message')}
                                value={formik.values.message}
                                multiline
                                numberOfLines={4}
                            />
                            {formik.touched.message && formik.errors.message && (
                                <Text style={styles.error}>{formik.errors.message}</Text>
                            )}

                            {!showOTP && (
                                <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
                                    <Text style={styles.buttonText}>Submit 📨</Text>
                                </TouchableOpacity>
                            )}

                            {showOTP && (
                                <>
                                    <Text style={styles.label}>Enter OTP *</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter OTP"
                                        onChangeText={formik.handleChange('otp')}
                                        onBlur={formik.handleBlur('otp')}
                                        value={formik.values.otp}
                                        keyboardType="numeric"
                                    />
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={async () => {
                                            if (!formik.values.otp || formik.values.otp.length !== 6) {
                                                console.log(formik.values.otp,
                                                    "formik.values.otp"
                                                )
                                                // showToast('error', 'Something went wronssssssssg.');
                                                Toast.show({
                                                    type: 'error',
                                                    text1: 'Error',
                                                    text2: 'OTP must be exactly 6 digits',
                                                });
                                                // Alert.alert('Invalid OTP', 'OTP must be exactly 6 digits');
                                            } else {
                                                try {
                                                    setLoading(true);
                                                    const response = await callApi(
                                                        'https://tech.portal-uat.dpdpconsultants.com/api/v2/create_consent',
                                                        'POST',
                                                        {
                                                            name: formik.values.fullName,
                                                            department: 'careers',
                                                            email: formik.values.email,
                                                            phone: formik.values.contact,
                                                            otp: formik.values.otp,
                                                        }
                                                    );
                                                    if (response?.code == 200 && response?.data?.message !== "OTP not matched") {
                                                        Toast.show({
                                                            type: 'success',
                                                            text1: 'Success',
                                                            text2: 'OTP Correct',
                                                        });
                                                        setShowConsentModal(true)
                                                    } else {

                                                        console.log(response?.data?.message, "response?.message")
                                                        Toast.show({
                                                            type: 'error',
                                                            text1: 'Error',
                                                            text2: response?.data?.message || 'OTP must be exactly 61 digits',
                                                        });
                                                    }

                                                } catch (error) {
                                                    Alert.alert('Error', error.message || 'OTP verification failed');
                                                } finally {
                                                    setLoading(false);
                                                }
                                            }
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Submit OTP</Text>
                                    </TouchableOpacity>
                                </>
                            )}

                            <ConsentModal
                                visible={showConsentModal}
                                onClose={() => setShowConsentModal(false)}
                                onAgree={() => {
                                    setShowConsentModal(false);
                                    Alert.alert('Consent Given', 'Thank you!');
                                }}
                                lang={selectedLang}
                                setLang={setSelectedLang}
                            />
                        </Animated.View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    headerContainer: {
        backgroundColor: '#0b0c2a',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
    headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    scrollView: { padding: 16 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    textarea: { height: 100, textAlignVertical: 'top' },
    button: { backgroundColor: '#0b0c2a', borderRadius: 8, padding: 14, marginTop: 10, marginBottom: 20 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    error: { color: 'red', fontSize: 12, marginBottom: 5 },
    footerBox: { backgroundColor: '#0b0c2a', borderRadius: 10, padding: 16, marginBottom: 20 },
    footerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
    footerText: { color: '#ccc', marginBottom: 6 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 4, marginTop: 10, color: '#333' },
    required: { color: 'red', fontWeight: 'bold' },
    spinnerText: { color: '#fff' },

});
