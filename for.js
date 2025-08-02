window.onload = function () {
  document.getElementById("resumeForm").addEventListener("submit", function (event) {
    if (!confirm("Are you sure you want to submit this resume form?")) {
      event.preventDefault();
      return;
    }