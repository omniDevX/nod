// index.js
require("dotenv").config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json'); // Path to your downloaded JSON file
const nodemailer = require("nodemailer");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://<DATABASE_NAME>.firebaseio.com" // For Realtime DB only
});

console.log('Firebase Admin SDK initialized successfully!');

// Access Firestore
const db = admin.firestore();

// List all top-level collections
async function listCollections() {
    try {
        const collections = await db.listCollections();
        console.log('Collections in Firestore:');
        collections.forEach(col => console.log('-', col.id));
    } catch (err) {
        console.error('Error listing collections:', err);
    }
}

// Run the function
listCollections();

console.log('Starting email sending script...', process.env.BREVO_SMTP_SERVER);

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
    },
});

// const THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48 hours

async function run() {
    // const now = Date.now();
    // const snapshot = await db.collection("users").get();

    // for (const doc of snapshot.docs) {
    //     const { email, lastActive } = doc.data();
    //     if (!email || !lastActive) continue;

    //     const last = lastActive.toDate();
    //     if (now - last.getTime() > THRESHOLD_MS) {
    const email = "aidres@aidres.com"
    
    await transporter.sendMail({
        from: '"Aidres" <nod.aidres@aidres.com>',
        to: email,
        subject: "We miss you2!",
        text: "You have been inactive for more than 48 hours.",
    });
    console.log(`Sent → ${email}`);
}
//     }
// }

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
