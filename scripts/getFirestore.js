// index.js
const doten = require("dotenv").config();
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");

serviceAccount = require("./serviceAccount.json");// Local development
// serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8"));// GitHub Actions
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


async function getInactiveCheckIns(hours = 48) {
    const now = admin.firestore.Timestamp.now(); // current Firestore Timestamp
    const cutoff = admin.firestore.Timestamp.fromMillis(
        now.toMillis() - hours * 60 * 60 * 1000
    );

    const snapshot = await db
        .collection('checkIns')
        .where('timestamp', '<=', cutoff) // server-side filter
        .get();

    const results = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        results.push({
            deviceId: doc.id,
            email: data.email,
            name: data.name,
            timestamp: data.timestamp.toDate(), // convert Firestore Timestamp to JS Date
        });
    });

    return results;
}

// Example usage
(async () => {
    const inactiveUsers = await getInactiveCheckIns(4); // 84 hours cutoff
    console.log(`Found ${inactiveUsers.length} users older than 84 hours`);
    inactiveUsers.forEach(u => console.log(u.email, u.timestamp));
})();


async function sendEmail(email) {
    await transporter.sendMail({
        from: '"Aidres" <nod.aidres@aidres.com>',
        to: email,
        subject: "We miss you!",
        text: "You have been inactive for more than 48 hours.",
    });

    console.log(`Sent → ${email}`);
}


async function run() {
    const emails = [
        "aidres@aidres.com",
        // later: from Firestore
    ];

    for (const email of emails) {
        await sendEmail(email);
    }

    await transporter.close();
}
