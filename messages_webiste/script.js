let deviceID = "";

async function getDeviceID() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;

    // Generate a consistent 4-digit number from the visitorId
    const hash = simpleHash(visitorId);
    const fourDigitCode = (hash % 10000).toString().padStart(4, '0');

    // Create a unique name string
    deviceID = `${fourDigitCode}`;
    localStorage.setItem("deviceID", deviceID);
}

// Simple hash function to generate a consistent number from a string
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

getDeviceID(); // Initialize Fingerprint

// Save Data to Database
async function saveData() {
    let text = document.getElementById("message").value.trim();
    if (text === "") {
        alert("Please enter some text!");
        return;
    }

    if (!deviceID) {
        deviceID = localStorage.getItem("deviceID") || await getDeviceID();
    }

    fetch("server_input.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "text=" + encodeURIComponent(text) + "&deviceID=" + encodeURIComponent(deviceID)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("message").value = ""; // Clear textarea after sending
    })
    .catch(error => console.error("Error:", error));
}

// Fetch Messages
function fetchData() {
    fetch("server_output.php")
        .then(response => response.text())
        .then(data => {
            const chatBox = document.getElementById("chat-box");
            const wasScrolledToBottom = chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 10; // Check if user is at the bottom

            chatBox.innerHTML = data; // Update chat box content

            // Scroll to the bottom only if the user was already at the bottom
            if (wasScrolledToBottom) {
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        })
        .catch(error => console.error("Error:", error));
}

// Clear Messages with Password
function clearMessages() {

    // Get the deviceID of the user whose last message should be deleted
    const deviceID = localStorage.getItem("deviceID");
    if (!deviceID) {
        alert("Device ID not found!");
        return;
    }

    // Send a request to delete the last message of the user
    fetch("server_clear.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "deviceID=" + encodeURIComponent(deviceID)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchData(); // Refresh chat box
    })
    .catch(error => console.error("Error:", error));
}

// Auto-refresh messages
setInterval(fetchData, 500);
window.onload = fetchData;
