window.showLoading = function(message = "Loading") {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;

  overlay.querySelector("p").textContent = message;
  overlay.style.display = "flex";
};

window.hideLoading = function() {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;

  overlay.style.display = "none";
};
