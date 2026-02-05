const API_URL = "http://localhost:3000/chat";

document.getElementById("user-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const imageInput = document.getElementById("image-input");
  const chatBox = document.getElementById("chat-box");

  const message = userInput.value.trim();
  // Optionally, we can allow sending an image-only prompt too.
  if (!message && imageInput.files.length === 0) return;

  // Add user message bubble
  addMessageBubble("user", message, null);
  userInput.value = "";
  
  // Check if an image file was selected
  let imageData = null;
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    imageData = await readFileAsDataURL(file);
    // Optionally display the image in the chat
    addMessageBubble("user", "", imageData);
    // Clear the file input after reading
    imageInput.value = "";
  }

  try {
    // Send both text and image (if any) to the API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, image: imageData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API Response:", data);

    // Format and display bot response
    const formattedReply = formatResponse(data.reply || "I couldn't understand that.");
    addMessageBubble("bot", formattedReply, null);
  } catch (error) {
    console.error("❌ Error communicating with AI:", error);
    addMessageBubble("bot", "Error communicating with AI.", null);
  }
}

function addMessageBubble(sender, text, imageSrc) {
  const chatBox = document.getElementById("chat-box");
  // Build the message content
  let content = "";
  if (text) {
    content = `<span>${text}</span>`;
  }
  if (imageSrc) {
    content += `<img src="${imageSrc}" alt="uploaded image" class="chat-image" />`;
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender} fade-in`;
  messageDiv.innerHTML = content;

  chatBox.appendChild(messageDiv);
  // Auto-scroll to the bottom after a short delay (allowing the animation to start)
  setTimeout(() => {
    messageDiv.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 100);
}

function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
    .replace(/\* (.*?)\n/g, "<li>$1</li>") // Bullet points
    .replace(/\n/g, "<br>"); // New lines
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
