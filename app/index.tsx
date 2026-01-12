// app/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
            {/* Logo placeholder */}
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

const PRIMARY_GREEN = '#31E289';
const RING_GREEN = '#00DE6D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topSection: {
    alignItems: 'center',
    marginTop: 60,
    gap: 16,
  },

  editableText: {
    fontSize: 16,
    color: '#BDBDBD',
  },

  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  outerRing: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: RING_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.35,
  },

  innerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },

  checkInText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 14,
    borderRadius: 14,
  },

  noticeIcon: {
    color: PRIMARY_GREEN,
    fontWeight: '700',
    marginRight: 8,
  },

  noticeText: {
    flex: 1,
    color: '#8E8E8E',
    fontSize: 13,
    lineHeight: 18,
  },
});
