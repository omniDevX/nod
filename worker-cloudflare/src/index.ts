export default {
    async fetch(req) {
        return new Response(
            'This Worker is a scheduled task. Cron runs happen in scheduled() handler.'
        );
    },

    async scheduled(event, env, ctx): Promise<void> {
        try {
            console.log(`Cron triggered at ${new Date().toISOString()}`);

            // 1️⃣ Calculate cutoff timestamp (48h ago)
            const cutoffISO = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

            // 2️⃣ Firestore REST API query
            const query = {
                structuredQuery: {
                    from: [{ collectionId: "checkIns" }],
                    where: {
                        fieldFilter: {
                            field: { fieldPath: "timestamp" },
                            op: "LESS_THAN",
                            value: { timestampValue: cutoffISO },
                        },
                    },
                },
            };

            const res = await fetch(
                `https://firestore.googleapis.com/v1/projects/${env.PROJECT_ID}/databases/(default)/documents:runQuery`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${env.FIREBASE_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(query),
                }
            );

            const docs = await res.json();

            // 3️⃣ Log the results
            const emails: string[] = [];
            docs.forEach((doc: any) => {
                if (doc.document) {
                    const data = doc.document.fields;
                    const email = data.email?.stringValue;
                    const name = data.name?.stringValue;
                    const deviceId = data.deviceId?.stringValue;
                    const timestamp = data.timestamp?.timestampValue;

                    console.log(`Record: ${deviceId} | ${name} | ${email} | ${timestamp}`);
                    if (email) emails.push(email);
                }
            });

            console.log(`Total records to process: ${emails.length}`);

            // 4️⃣ TODO: send emails for each entry
            // emails.forEach(email => sendEmail(email))

        } catch (err) {
            console.error("Worker error:", err);
        }
    },
} satisfies ExportedHandler<Env>;


// /**
//  * Welcome to Cloudflare Workers!
//  *
//  * This is a template for a Scheduled Worker: a Worker that can run on a
//  * configurable interval:
//  * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
//  *
//  * - Run `npm run dev` in your terminal to start a development server
//  * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your Worker in action
//  * - Run `npm run deploy` to publish your Worker
//  *
//  * Bind resources to your Worker in `wrangler.jsonc`. After adding bindings, a type definition for the
//  * `Env` object can be regenerated with `npm run cf-typegen`.
//  *
//  * Learn more at https://developers.cloudflare.com/workers/
//  */

// export default {
// 	async fetch(req) {
// 		const url = new URL(req.url);
// 		url.pathname = '/__scheduled';
// 		url.searchParams.append('cron', '* * * * *');
// 		return new Response(`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`);
// 	},

// 	// The scheduled handler is invoked at the interval set in our wrangler.jsonc's
// 	// [[triggers]] configuration.
// 	async scheduled(event, env, ctx): Promise<void> {
// 		// A Cron Trigger can make requests to other endpoints on the Internet,
// 		// publish to a Queue, query a D1 Database, and much more.
// 		//
// 		// We'll keep it simple and make an API call to a Cloudflare API:
// 		let resp = await fetch('https://api.cloudflare.com/client/v4/ips');
// 		let wasSuccessful = resp.ok ? 'success' : 'fail';

// 		// You could store this result in KV, write to a D1 Database, or publish to a Queue.
// 		// In this template, we'll just log the result:
// 		console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
// 	},
// } satisfies ExportedHandler<Env>;
