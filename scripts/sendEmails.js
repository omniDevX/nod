require("dotenv").config();
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// ===== Firebase init =====
// const serviceAccount = require("./serviceAccount.json"); // local
const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")); // GitHub

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

// ===== Mailer init =====
const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_SERVER,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
    },
});

// ===== Email function =====
async function sendEmail(email) {
    await transporter.sendMail({
        from: '"Nod" <nod.aidres@aidres.com>',
        to: email,
        subject: "URGENT: Please check on me immediately (Automated Message)!",
        text: "I have not been able to check in for over 48 hours. This is the alert I set up for you. Please reach out to me or come by my place to check on me.",
    });

    console.log(`Sent → ${email}`);
}

// ===== Firestore query =====
async function getInactiveCheckIns(hours = 48) {
    const cutoff = admin.firestore.Timestamp.fromMillis(
        Date.now() - hours * 60 * 60 * 1000
    );

    const snapshot = await db
        .collection("checkIns")
        .where("timestamp", "<=", cutoff)
        .get();

    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            deviceId: doc.id,
            email: data.email,
            timestamp: data.timestamp.toDate(),
        };
    });
}

// ===== Orchestrator =====
async function run() {
    const inactiveUsers = await getInactiveCheckIns(48);

    console.log(`Found ${inactiveUsers.length} outdated records`);

    for (const user of inactiveUsers) {
        if (!user.email) continue;
        await sendEmail(user.email);
    }

    await transporter.close();
}

// ===== Entry point =====
run().catch(err => {
    console.error(err);
    process.exit(1);
});
