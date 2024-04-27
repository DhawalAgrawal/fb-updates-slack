const express = require("express");
const SlackService = require("./slackService"); // Import the SlackService module
const dotenv = require("dotenv");
const { extractMessageFromRequest } = require("./utils"); // Import the helper function

dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000
const SLACK_TOKEN = process.env.SLACK_TOKEN; // Slack API token from environment
const CHANNEL_ID = process.env.CHANNEL_ID; // Channel ID from environment
const FACEBOOK_TOKEN = process.env.FACEBOOK_TOKEN;

const slackService = new SlackService(SLACK_TOKEN, CHANNEL_ID); // Initialize SlackService

app.use(express.json()); // Middleware for parsing JSON requests

// POST endpoint for receiving messages
app.post("/webhook", async (req, res) => {
  console.log("Received new message:", req.body);

  try {
    const message = extractMessageFromRequest(req.body); // Extract message from request
    await slackService.sendMessage(message); // Send message using SlackService
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error handling message:", error);
    res.status(500).json({ success: false, error: "Failed to handle message" });
  }
});

// GET endpoint for webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Handle webhook verification logic
  if (mode && token) {
    if (mode === "subscribe" && token === FACEBOOK_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge); // Respond with challenge token
    } else {
      console.log("Responding with 403 Forbidden");
      res.sendStatus(403); // Respond with 403 Forbidden for incorrect tokens
    }
  } else {
    res.json({ message: "Thank you for the message" }); // Default response
  }
});

// Start the server
app.listen(port, (error) => {
  if (!error) {
    if (!CHANNEL_ID || !FACEBOOK_TOKEN || !SLACK_TOKEN) {
      // getAppChannelId();
      throw new Error("Environment variables are missing!");
    }
    console.log(
      "Server is Successfully Running, and App is listening on port " + port
    );
  } else console.log("Error occurred, server can't start", error);
});
