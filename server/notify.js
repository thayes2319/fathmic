// Resend for the one transactional email this app sends (new BLUEPRINT
// candidate alerts) — picked for near-zero setup: no domain verification
// needed to send from their shared onboarding@resend.dev address on the
// free tier. Kept in this one function so swapping providers later doesn't
// touch any calling code.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.BLUEPRINT_NOTIFY_EMAIL || "thomas@gohw.net";

async function sendBlueprintCandidateEmail({ subject, example }) {
  if (!RESEND_API_KEY) {
    console.warn(`[notify] RESEND_API_KEY not set — skipping email for new BLUEPRINT candidate: "${subject}"`);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "FATHmic <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `New BLUEPRINT candidate: ${subject}`,
        text: `A new subject that fits the BLUEPRINT criterion showed up and isn't on the known list yet.\n\nSubject: ${subject}\nExample inquiry: "${example}"\n\nFull candidate list: GET /api/blueprint-candidates\n\nIf it's a good fit, add it to BLUEPRINT_SUBJECTS in public/app.js and mirror it into KNOWN_BLUEPRINT_SUBJECTS in server/gate.js so the gate stops flagging it as new.`
      })
    });
    if (!res.ok) {
      console.error("[notify] Resend API error", res.status, await res.text());
    }
  } catch (err) {
    console.error("[notify] failed to send blueprint candidate email", err);
  }
}

module.exports = { sendBlueprintCandidateEmail };
