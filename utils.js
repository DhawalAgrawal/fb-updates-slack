/**
 * Extracts the message from the request body based on the message format.
 * @param {Object} body - The request body containing the message.
 * @returns {string} - The extracted message.
 */
function extractMessageFromRequest(body) {
  let message = "";

  // Check if the request body contains a messaging entry and if it has a message
  if (
    body &&
    body.entry &&
    body.entry[0] &&
    body.entry[0].messaging &&
    body.entry[0].messaging[0] &&
    body.entry[0].messaging[0].message
  ) {
    const { messaging } = body.entry[0]; // Extract messaging array
    const firstMessage = messaging[0].message; // Get the first message

    // Check if the message has text content
    if (firstMessage.text) {
      message = firstMessage.text;
    } else if (
      firstMessage.attachments &&
      firstMessage.attachments[0] &&
      firstMessage.attachments[0].payload &&
      firstMessage.attachments[0].payload.url
    ) {
      // Check if the message has attachments with a URL
      message = firstMessage.attachments[0].payload.url;
    }
  }

  return message;
}
