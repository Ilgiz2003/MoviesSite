
function calculateHeelHeight() {
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var footLength = document.getElementById("footLength").value;
    var resultText = "";
    var shoeImage = document.getElementById("shoeImage");

    if (gender === "male") {
        resultText = "Высота каблука 1 см.";
        shoeImage.src = "images/boot2.png";
    } else if (gender === "female") {
        var heelHeight = footLength / 7;
        resultText = "Высота каблука " + heelHeight.toFixed(0) + " см.";
        if (heelHeight > 5) {
            shoeImage.src = "images/boot3.png";
        } else {
            shoeImage.src = "images/boot1.png";
        }
    }

    document.getElementById("resultText").textContent = resultText;
    shoeImage.style.display = "block";
}

function showDialog() {
    var response = confirm("Приступаем?");
    if (response == true) {
        document.getElementById("calculationSection").style.display = "block";
    } else {
        document.getElementById("barefootSection").style.display = "block";
    }
}

window.onload = function() {
    showDialog();
}