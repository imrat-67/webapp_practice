// Save data to the database
function saveData() {
    let text = document.getElementById("textInput").value;
    if (text === "") {
        alert("Please enter some text!");
        return;
    }

    fetch("http://webapp67.free.nf/server_input.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "text=" + encodeURIComponent(text)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById("textInput").value = "";
    })
    .catch(error => console.error("Error:", error));
}

// Fetch data from the database and display
function fetchData() {
    fetch("http://webapp67.free.nf/server_output.php")
    .then(response => response.text())
    .then(data => {
        document.getElementById("outputBox").innerHTML = data;
    })
    .catch(error => console.error("Error:", error));
}
