document.addEventListener("DOMContentLoaded", function () {
    let savedValue = localStorage.getItem("box1");
    if (savedValue !== null) {
        document.getElementById("box1").value = savedValue;
    }

    savedValue = localStorage.getItem("box2");
    if (savedValue !== null) {
        document.getElementById("box2").value = savedValue;
    }
});


function box1writing() {
    let inputValue = document.getElementById("box1").value;
    localStorage.setItem("box1", inputValue);
}

function box2writing() {
    let inputValue = document.getElementById("box2").value;
    localStorage.setItem("box2", inputValue);
}

function showMessage(msg) {
    let messageBox = document.createElement("div");
    messageBox.innerText = msg;
    messageBox.style.cssText = "position:fixed; top:10px; left:50%; transform:translateX(-50%); background:#333; color:white; padding:10px 20px; border-radius:5px; z-index:1000;";
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 700);
}

function clearr(val) {
    let targetBox = val === 1 ? "box1" : "box2";
    document.getElementById(targetBox).value = "";
    localStorage.setItem(targetBox, "");
    showMessage("Cleared!");
}


function copy(val) {
    let targetBox = val === 1 ? "box1" : "box2";
    let copytext = document.getElementById(targetBox);

    navigator.clipboard.writeText(copytext.value).then(function () {
        showMessage("Copied to clipboard!");
    }).catch(function () {
        showMessage("Failed to copy!");
    });
}

function paste(val) {
    let targetBox = val === 1 ? "box1" : "box2";
    let copytext = document.getElementById(targetBox);

    navigator.clipboard.readText().then(function (text) {
        copytext.value += text;
        localStorage.setItem(targetBox, copytext.value);
    }).catch(function () {
        showMessage("Failed to paste!");
    });
}

function move(val) {
    let targetBox = val === 2 ? "box1" : "box2";
    let sourceBox = val === 2 ? "box2" : "box1";

    let sourceText = document.getElementById(sourceBox).value;
    document.getElementById(targetBox).value += sourceText;
    document.getElementById(sourceBox).value = "";
    localStorage.setItem(sourceBox, "");
    localStorage.setItem(targetBox, document.getElementById(targetBox).value);
}
