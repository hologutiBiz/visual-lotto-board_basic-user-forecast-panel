window.showErrorMessage = function(message) {
    const mainElement = document.getElementById("main-el");
    const generalError = document.getElementById("error-message");

    if (mainElement && generalError) {
        mainElement.style.display = "none";
        generalError.textContent = message;
        generalError.style.display = "block";
    }
} 