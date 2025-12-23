// testTwilio.js


import twilio from "twilio";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Log values to confirm they are being read correctly
console.log("Testing Twilio Credentials:");
console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("PHONE:", process.env.TWILIO_PHONE_NUMBER);

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Function to send a test message
async function sendTestMessage() {
  try {
    const response = await client.messages.create({
      body: "Hello! This is a test message from Twilio 🚀",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+918143666507" // Replace with your actual phone number
    });

    console.log("Message sent successfully!");
    console.log("Message SID:", response.sid);
  } catch (error) {
    console.error("Twilio Error:", error.message);
    console.error(error);
  }
}

sendTestMessage();
