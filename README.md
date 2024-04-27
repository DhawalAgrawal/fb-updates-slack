# Slack-Facebook Integration Documentation

This documentation guides you through setting up and using a Slack-Facebook integration. The integration automatically sends a message to a designated Slack channel (`facebook-updates`) whenever a new message is received in your Facebook inbox.

## Prerequisites

Before using this integration, ensure you have the following prerequisites:

1. **Slack Access Token**: Obtain a Slack access token issued to your Slack application. Each application installation generates a workspace-specific access token.

   - Create a new Slack application following the steps in our [Basic app setup documentation](https://api.slack.com/start/quickstart#creating).
   - Set the necessary permissions your app will request as per our [scopes documentation](https://api.slack.com/start/quickstart#scopes).
   - Install the app to your workspace as outlined in the [installation guide](https://api.slack.com/start/quickstart#installing).
   - Obtain your access token by going to api.slack.com, selecting your app, navigating to the OAuth & Permissions section, and copying the 'Bot User OAuth Token'.
   - Create a Slack channel named `facebook-updates` and add your app to this channel.

2. **Facebook Token**: Use any hash string as your Facebook token.

3. **Channel ID**: Obtain the channel ID of the `facebook-updates` channel on Slack.

## Installation Steps

Follow these steps to install and set up the integration:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/DhawalAgrawal/fb-updates-slack
   ```

2. **Install Dependencies**:

   ```bash
   cd fb-updates-slack
   yarn install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file from `.env.example`.
   - Set the following values in the `.env` file:
     ```plaintext
     SLACK_TOKEN=your_slack_auth_token
     FACEBOOK_TOKEN=your_facebook_hash_string
     CHANNEL_ID=your_facebook_updates_channel_id
     PORT=3000
     ```

## Integrate Facebook Messenger with ngrok

### Step 1: Set up ngrok for Facebook Messenger

1. **Download and Install ngrok**:

   - Visit [ngrok's download page](https://ngrok.com/download) and download the ngrok executable for your operating system.
   - Install ngrok by following the installation instructions provided for your OS.

2. **Sign Up/Login to ngrok**:

   - Go to [ngrok's website](https://dashboard.ngrok.com/signup) and sign up for a free ngrok account or log in if you already have an account.

3. **Authenticate ngrok on Your Machine**:
   - Open a terminal or command prompt window.
   - Navigate to the directory where ngrok is installed or place the ngrok executable in a directory accessible from your command line.
   - Authenticate ngrok on your machine using the command:
     ```bash
     ./ngrok authtoken <your_ngrok_auth_token>
     ```
     Replace `<your_ngrok_auth_token>` with the authentication token obtained from your ngrok account dashboard.

### Step 2: Set up ngrok Webhooks for Facebook Messenger

1. **Start ngrok to Generate a Public URL**:

   - In your terminal or command prompt, start ngrok to generate a public URL for your local server where your Facebook Messenger webhook will be hosted. Use the command:
     ```bash
     ./ngrok http <port_number>
     ```
     Replace `<port_number>` with the port number where your local server (hosting the Facebook Messenger webhook) is running, typically port 3000 or a custom port if specified.

2. **Copy the ngrok Forwarding URL**:
   - After starting ngrok, you will see a console with information about the tunnel, including a Forwarding URL (e.g., `https://randomstring.ngrok.io`). Copy this URL as it will be used as your webhook URL in the Facebook Developer Dashboard.

### Step 3: Configure Facebook Developer Dashboard

1. **Access Facebook Developer Dashboard**:

   - Go to [Facebook for Developers](https://developers.facebook.com/) and log in with your Facebook account.

2. **Create or Select Your App**:

   - If you haven't already created a Facebook app for your integration, create a new app in the Facebook Developer Dashboard.
   - If you already have an app, select it from the dashboard.

3. **Set Up Webhooks**:

   - In your app dashboard, navigate to the "Webhooks" section.
   - Click on "Add Callback URL" or "Set Up Webhooks."
   - Paste the ngrok Forwarding URL copied earlier into the "Callback URL" field.
   - Set the verify token (set 'your_facebook_hash_string' ) in the "Verify Token" field. This token will be used to verify requests from Facebook.
   - Select 'messages' in the types of events you want to subscribe to.
   - Save your webhook settings.

4. **Subscribe Your App to the Facebook Page**:
   - In the same "Webhooks" section, you can also click on "Subscribe" next to the page event 'messages' to subscribe it.
   - Check the scope has 'chat:write' iff not select it.

### Step 4: Test Your Integration

1. **Verify Webhook Connection**:

   - After configuring the webhook in the Facebook Developer Dashboard, Facebook will send a verification request to your ngrok URL.
   - Ensure your local server is running and can handle verification requests by responding with the correct challenge code provided by Facebook.

2. **Test with Facebook Messenger**:
   - Use another Facebook account or a test account to send messages to the Facebook page associated with your app.
   -

Check your ngrok console for incoming webhook requests and verify that your integration is receiving and processing messages correctly.

## Running the Integration

Once everything is set up:

1. Start the application:

   ```bash
   yarn start
   ```

2. Go to your Facebook page and send a message from another account.

3. You will start receiving messages from Facebook in the `facebook-updates` channel on Slack.

You are now ready to use the Slack-Facebook integration.

---

**Note**: Ensure all sensitive information such as tokens and IDs are kept secure and not shared publicly.
