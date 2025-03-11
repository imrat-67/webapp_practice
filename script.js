let id = null;
let ran;
let gues;
let dif = 5;
function start(){
    if(id) return;
    gues = parseInt(document.getElementById("in").value);
    if(isNaN(gues)){
        alert("guess first");
        return;
    }
    id = setInterval(() => {
        document.getElementById("random").textContent = ""; 
            ran = Math.floor(Math.random() * 100);
            document.getElementById("random").textContent = ran;
    }, 100); 
}

function stop(){
    if(id === null){
        alert("start first");
        return
    }
    clearInterval(id);
    id = null;
    if(Math.abs(ran - gues) <= dif) {
        document.getElementById("r2").innerHTML = Math.max(ran, gues) + '-' + Math.min(ran, gues) + '=' + Math.abs(ran - gues) + "&nbsp;&nbsp;<=&nbsp;" + dif + "&nbsp;&nbsp;<br>(You win)";
    } else {
        document.getElementById("r2").innerHTML = Math.max(ran, gues) + '-' + Math.min(ran, gues) + '=' + Math.abs(ran - gues) + "&nbsp;&nbsp;>&nbsp;" + dif + "&nbsp;&nbsp;<br>(You lose)";
    }
}