// src/theme/home.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    topSection: {
        alignItems: 'center',
        marginTop: 60,
        gap: 16,
    },

    editableText: {
        fontSize: 16,
        color: COLORS.textMuted,
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
        backgroundColor: COLORS.ring,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },

    innerCircle: {
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoPlaceholder: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: COLORS.onPrimary,
        marginBottom: 10,
    },

    checkInText: {
        color: COLORS.onPrimary,
        fontSize: 18,
        fontWeight: '600',
    },

    noticeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: 24,
        marginBottom: 32,
        padding: 14,
        borderRadius: 14,
    },

    noticeIcon: {
        color: COLORS.primary,
        fontWeight: '700',
        marginRight: 8,
    },

    noticeText: {
        flex: 1,
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 18,
    },
    checkInCard_old: {
        backgroundColor: '#F2FBF7',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginTop: 20,
    },

    checkInCard: {
        position: 'absolute',
        top: '72%',          // ← CHANGE THIS NUMBER
        alignSelf: 'center',

        backgroundColor: '#F2FBF7',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },

    checkInPrimary: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2E7D63',
        lineHeight: 28,
    },

    checkInSecondary: {
        marginTop: 6,
        fontSize: 13,
        fontWeight: '400',
        color: '#9CA3AF',
        lineHeight: 18,
    },

});
