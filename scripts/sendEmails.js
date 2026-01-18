// index.js
const doten = require("dotenv").config();
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");

// serviceAccount = require("./serviceAccount.json");// Local development
serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8"));// GitHub Actions
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), });
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
    await transporter.close();
}
//     }
// }

run().catch((err) => {
    console.error(err);
    process.exit(1);
});

