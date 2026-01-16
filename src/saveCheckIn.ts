// src/firestore/saveCheckIn.ts
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

type CheckInPayload = {
    deviceId: string;
    name: string;
    email: string;
};

export const saveCheckInToFirestore = async ({
    deviceId,
    name,
    email,
}: CheckInPayload) => {
    await setDoc(
        doc(db, 'checkIns', deviceId),
        {
            deviceId,
            name,
            email,
            timestamp: serverTimestamp(),
        },
        { merge: true }
    );
};
