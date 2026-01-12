import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/src/theme/home.styles';

const STORAGE_KEYS = {
    name: 'user_name',
    email: 'emergency_email',
    currentCheckIn: 'current_check_in',
};

type CheckInRecord = {
    timestamp: string;
    name: string;
    email: string;
};


export default function HomeScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkInMessage, setCheckInMessage] = useState<string | null>(null);


    const handleCheckIn = async () => {
        if (!name || !email) {
            console.warn('Name and email are required');
            return;
        }

        try {
            const existing = await AsyncStorage.getItem(STORAGE_KEYS.currentCheckIn);
            let previousTimestamp: string | null = null;

            if (existing) {
                const previous: CheckInRecord = JSON.parse(existing);
                previousTimestamp = previous.timestamp;
            }

            const newRecord: CheckInRecord = {
                timestamp: new Date().toISOString(),
                name,
                email,
            };

            await AsyncStorage.setItem(
                STORAGE_KEYS.currentCheckIn,
                JSON.stringify(newRecord)
            );

            if (previousTimestamp) {
                setCheckInMessage(
                    `You're all checked in. Have a good day!\nThe last time you checked in was ${new Date(
                        previousTimestamp
                    ).toLocaleString()}.`
                );
            } else {
                setCheckInMessage("You're all checked in. Have a good day!");
            }
        } catch (err) {
            console.warn('Failed to save check-in', err);
        }
    };

    /* Load saved data */
    useEffect(() => {
        const loadData = async () => {
            try {
                const savedName = await AsyncStorage.getItem(STORAGE_KEYS.name);
                const savedEmail = await AsyncStorage.getItem(STORAGE_KEYS.email);

                if (savedName) setName(savedName);
                if (savedEmail) setEmail(savedEmail);
            } catch (err) {
                console.warn('Failed to load user data');
            }
        };

        loadData();
    }, []);

    /* Persist changes */
    const saveName = async (value: string) => {
        setName(value);
        await AsyncStorage.setItem(STORAGE_KEYS.name, value);
    };

    const saveEmail = async (value: string) => {
        setEmail(value);
        await AsyncStorage.setItem(STORAGE_KEYS.email, value);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Top editable fields */}
            <View style={styles.topSection}>
                <TextInput
                    style={styles.editableText}
                    placeholder="Your Name ✏️"
                    value={name}
                    onChangeText={saveName}
                    placeholderTextColor="#9CA3AF"
                />

                <TextInput
                    style={styles.editableText}
                    placeholder="Emergency Contact Email 📩"
                    value={email}
                    onChangeText={saveEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            {/* Check-in Button */}
            <View style={styles.centerSection}>
                <View style={styles.outerRing}>
                    <TouchableOpacity
                        style={styles.innerCircle}
                        activeOpacity={0.85}
                        onPress={handleCheckIn}
                    >
                        <View style={styles.logoPlaceholder} />
                        <Text style={styles.checkInText}>Check In Today</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {checkInMessage && (
                <View style={styles.noticeBox}>
                    <Text style={styles.noticeText}>{checkInMessage}</Text>
                </View>
            )}
            {/* Info Message */}
            <View style={styles.noticeBox}>
                <Text style={styles.noticeIcon}>!</Text>
                <Text style={styles.noticeText}>
                    If you miss check-in for 2 days, the system will notify your emergency
                    contact by email on your behalf.
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}
