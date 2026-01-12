// app/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/src/theme/home.styles';

export default function HomeScreen() {
    return (
        <View style={styles.container}>

            {/* Top editable fields */}
            <View style={styles.topSection}>
                <Text style={styles.editableText}>Your Name ✎</Text>
                <Text style={styles.editableText}>Emergency Contact Email ✎</Text>
            </View>

            {/* Check-in Button */}
            <View style={styles.centerSection}>
                <View style={styles.outerRing}>
                    <TouchableOpacity style={styles.innerCircle} activeOpacity={0.85}>
                        <View style={styles.logoPlaceholder} />
                        <Text style={styles.checkInText}>Check In Today</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Info Message */}
            <View style={styles.noticeBox}>
                <Text style={styles.noticeIcon}>!</Text>
                <Text style={styles.noticeText}>
                    If you miss check-in for 2 days, the system will notify your emergency
                    contact by email on your behalf.
                </Text>
            </View>

        </View>
    );
}
