let id;
let ran;
let gues;

function start() {
    if (id) return; // Prevent starting the interval if already running
    gues = parseInt(document.getElementById("in").value);
    
    if (isNaN(gues)) {
        document.getElementById("random").textContent = "Please enter a valid number";
        return;
    }

    document.getElementById("random").textContent = "Guess first"; // Prompt the user

    id = setInterval(() => {
        document.getElementById("random").textContent = ""; // Clear the random number display
        setTimeout(() => {
            ran = Math.floor(Math.random() * 100); // Generate a random number
            document.getElementById("random").textContent = ran; // Display it
        }, 500); 
    }, 100); 
}

function stop() {
    clearInterval(id); // Stop the interval
    id = null;
    document.getElementById("random").textContent = ran; // Show the last random number
    if (gues === ran) {
        document.getElementById("result").textContent = "You win!";
    } else {
        document.getElementById("result").textContent = "You lose!";
    }
}
