window.showErrorMessage = function(message) {
    let mainElement = document.querySelector("main");
    let errorPara = document.getElementById("error-message");

    if (errorPara) {
        mainElement.style.display = "none";
        errorPara.textContent = message;
        errorPara.style.display = "block";
    }
} 