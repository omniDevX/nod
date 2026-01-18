// index.js
<<<<<<< HEAD
require("dotenv").config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json'); // Path to your downloaded JSON file
const nodemailer = require("nodemailer");

=======
const admin = require('firebase-admin');
const serviceAccount = require('../src/serviceAccount.json'); // Path to your downloaded JSON file
>>>>>>> faff61b25dd111ba818ded1338910caeeb78c62c

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

<<<<<<< HEAD
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
=======

// // index.js
// const admin = require('firebase-admin');
// const serviceAccount = require('../src/serviceAccount.json'); // Path to your downloaded JSON file

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     // databaseURL: "https://<DATABASE_NAME>.firebaseio.com" // Replace with your project's database URL if using Realtime Database
// });

// console.log('Firebase Admin SDK initialized successfully!');

// // Example: Accessing a Firestore database instance
// const db = admin.firestore();



// // Example: Fetching a user by UID (Admin SDK functionality)
// async function getUserData(uid) {
//     try {
//         const userRecord = await admin.auth().getUser(uid);
//         console.log(`Successfully fetched user data for user: ${userRecord.uid}`);
//         return userRecord.toJSON();
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//     }
// }

// // Call the function as an example
// getUserData('some-user-uid');





// const fs = require("fs");
// const path = require("path");
// const admin = require("firebase-admin");
// const nodemailer = require("nodemailer");

// // Load Firebase service account
// const serviceAccount = process.env.FIREBASE_KEY_JSON
//     ? JSON.parse(process.env.FIREBASE_KEY_JSON)
//     : require(path.resolve(__dirname, "../src/serviceAccount.json"));

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "a04344001@smtp-brevo.com",
//         pass: process.env.SMTP_PASS,
//     },
// });

// const THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48 hours

// async function run() {
//     const now = Date.now();
//     const snapshot = await db.collection("users").get();

//     for (const doc of snapshot.docs) {
//         const { email, lastActive } = doc.data();
//         if (!email || !lastActive) continue;

//         const last = lastActive.toDate();
//         if (now - last.getTime() > THRESHOLD_MS) {
//             await transporter.sendMail({
//                 from: '"Aidres" <nod.aidres@aidres.com>',
//                 to: email,
//                 subject: "We miss you",
//                 text: "You have been inactive for more than 48 hours.",
//             });
//             console.log(`Sent → ${email}`);
//         }
//     }
// }

// run().catch((err) => {
//     console.error(err);
//     process.exit(1);
// });
>>>>>>> faff61b25dd111ba818ded1338910caeeb78c62c
