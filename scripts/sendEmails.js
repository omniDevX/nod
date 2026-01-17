import admin from "firebase-admin";
import nodemailer from "nodemailer";

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// 48 hours in milliseconds
const THRESHOLD = 48 * 60 * 60 * 1000;

async function sendInactiveEmails() {
    const snapshot = await db.collection("users").get();
    const now = Date.now();

    for (const doc of snapshot.docs) {
        const data = doc.data();
        if (!data.lastActive || !data.email) continue;

        const lastActive = data.lastActive.toDate ? data.lastActive.toDate() : new Date(data.lastActive);
        if (now - lastActive.getTime() > THRESHOLD) {
            await transporter.sendMail({
                from: '"NoReply" <nod.aidres@aidres.com>',
                to: data.email,
                subject: "We miss you!",
                text: "Hi! It's been over 48 hours since your last activity. Come back!"
            });
            console.log(`Email sent to ${data.email}`);
        }
    }
}

sendInactiveEmails().catch(console.error);
