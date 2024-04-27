// slackService.js
const { WebClient } = require("@slack/web-api");

class SlackService {
  constructor(token, channelId) {
    this.web = new WebClient(token); // Initialize WebClient with Slack token
    this.channelId = channelId; // Store the channel ID
  }

  async sendMessage(message) {
    try {
      console.log("Sending message:", message);
      const result = await this.web.chat.postMessage({
        text: message,
        channel: this.channelId,
      });
      console.log(`Message sent successfully: ${result.ts}`);
      return result;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  }

  // // Function to create a channel and add your app to it
  // async function createChannelAndAddApp() {
  //   try {
  //     console.log("Creating a channel facebook-updates");
  //     // Create a channel named "facebook-updates"
  //     const channelResponse = await web.conversations.create({
  //       name: "facebook-updates",
  //       is_private: false, // Set to true if you want a private channel
  //     });

  //     // Get the channel ID from the response
  //     const channelId = channelResponse.channel.id;

  //     // Invite your app to the newly created channel
  //     const inviteResponse = await web.conversations.invite({
  //       channel: channelId,
  //       users: token, // Replace with your app's ID
  //     });

  //     console.log("Channel created and app added successfully:", inviteResponse);
  //     conversationId = inviteResponse.channel.id;
  //   } catch (error) {
  //     console.error("Error creating channel or adding app:", error);
  //   }
  // }

  // Function to fetch the channel ID of your app
  // async function getAppChannelId() {
  //   try {
  //     console.error("Fetching channelId");
  //     // Call conversations.list API method to get a list of conversations
  //     const conversationsResponse = await web.conversations.list({
  //       types: "public_channel,private_channel", // Filter to channels only
  //     });

  //     // Find the channel ID of your app's channel
  //     const appChannel = conversationsResponse.channels.find(
  //       (channel) => channel.name === "facebook-updates"
  //     );

  //     if (appChannel) {
  //       console.log("App channel ID:", appChannel.id);
  //       conversationId = appChannel.id;
  //     } else {
  //       console.error("App channel not found");
  //       //   await createChannelAndAddApp();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching app channel ID:", error);
  //   }
  // }
}

module.exports = SlackService;
