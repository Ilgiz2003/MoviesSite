const leftContainer = document.getElementById("left_container");
const topContainer = document.getElementById("top_container");
const parseButton = document.getElementById("parseBtn");
const textInp  = document.getElementById("input");
const outDiv = document.getElementById("output");

var draggedObj;


function createElement(str) {
    let el = document.createElement("div");
    el.setAttribute("class", "element");
    el.innerHTML = str;
    el.draggable = true;
    el.addEventListener('dragstart', function (event){
        draggedObj = event.target;
    })
    leftContainer.appendChild(el);
}

leftContainer.addEventListener('dragover', function (event){
    event.preventDefault();
});

leftContainer.addEventListener('drop', function (event){
    var nearestLeftBlock = null;
    var nearestRightBlock = null;
    var minDistanceToLeftBlock = Infinity;
    var minDistanceToRightBlock = Infinity;
    for(let i = 0; i < leftContainer.children.length; i++){
        var block = leftContainer.children[i];
        var rect = block.getBoundingClientRect();
        var distanceToLeftBlock = Math.abs(event.clientX - rect.right);
        var distanceToRightBlock = Math.abs(event.clientX - rect.left);
        if (distanceToLeftBlock >= 0 && distanceToLeftBlock < minDistanceToLeftBlock) {
            minDistanceToLeftBlock = distanceToLeftBlock;
            nearestLeftBlock = block;
        }
        if (distanceToRightBlock >= 0 && distanceToRightBlock < minDistanceToRightBlock) {
            minDistanceToRightBlock = distanceToRightBlock;
            nearestRightBlock = block;
        }
    }

    if(minDistanceToRightBlock < minDistanceToLeftBlock && nearestLeftBlock === nearestRightBlock){
        event.target.insertBefore(draggedObj, event.target.firstChild);
    } else if (minDistanceToRightBlock > minDistanceToLeftBlock && nearestLeftBlock === nearestRightBlock){
        event.target.append(draggedObj);
    } else if (nearestRightBlock == null){
        event.target.append(draggedObj);
    } else {
        event.target.insertBefore(draggedObj, nearestRightBlock);
    }
});

topContainer.addEventListener('dragover', function (event){
    event.preventDefault();
});

topContainer.addEventListener('drop', function (event){
    var nearestLeftBlock = null;
    var nearestRightBlock = null;
    var minDistanceToLeftBlock = Infinity;
    var minDistanceToRightBlock = Infinity;
    for(let i = 0; i < topContainer.children.length; i++){
        var block = topContainer.children[i];
        var rect = block.getBoundingClientRect();
        var distanceToLeftBlock = Math.abs(event.clientX - rect.right);
        var distanceToRightBlock = Math.abs(event.clientX - rect.left);
        if (distanceToLeftBlock >= 0 && distanceToLeftBlock < minDistanceToLeftBlock) {
            minDistanceToLeftBlock = distanceToLeftBlock;
            nearestLeftBlock = block;
        }
        if (distanceToRightBlock >= 0 && distanceToRightBlock < minDistanceToRightBlock) {
            minDistanceToRightBlock = distanceToRightBlock;
            nearestRightBlock = block;
        }
    }

    if(minDistanceToRightBlock < minDistanceToLeftBlock && nearestLeftBlock === nearestRightBlock){
        event.target.insertBefore(draggedObj, event.target.firstChild);
    } else if (minDistanceToRightBlock > minDistanceToLeftBlock && nearestLeftBlock === nearestRightBlock){
        event.target.append(draggedObj);
    } else if (nearestRightBlock == null){
        event.target.append(draggedObj);
    } else {
        event.target.insertBefore(draggedObj, nearestRightBlock);
    }
    fillOutput();
});

function onParseText() {
    let wordsAndNumbers = textInp.value.trim().split("-");
    for(let i = 0; i < wordsAndNumbers.length; i++){
        wordsAndNumbers[i].trim()
    }
    var words = wordsAndNumbers.filter(item => isNaN(item) && item !== '').sort();
    var numbers = wordsAndNumbers.filter(item => !isNaN(item) && item !== '').sort((a, b) => a - b);
    words.forEach((word, index) => {
        createElement("a" + (index + 1) + " " + word);
    });
    numbers.forEach((number, index) => {
        createElement("n" + (index + 1) + " " + number);
    });
}

function fillOutput() {
    outDiv.innerHTML = fillOutputText();
}

function fillOutputText() {
    let answer = "";
    for (let i = 0; i < topContainer.children.length; i++) {
        topContainer.children[i].innerHTML.split(" ").slice(1).forEach((s) => {
            answer += s + " ";
        })
    }
    return answer
}

parseButton.addEventListener("click", () => {
    if(textInp.value !== '' && textInp.value != null){
        onParseText()
    }
})