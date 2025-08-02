window.onload = function () {
  document.getElementById("resumeForm").addEventListener("submit", function (event) {
    if (!confirm("Are you sure you want to submit this resume form?")) {
      event.preventDefault();
      return;
    }
     event.preventDefault();

    // Collect static form data
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const links = document.getElementById("links").value;
    const careerObjective = document.getElementById("careerObjective").value;
    const certifications = document.getElementById("certifications").value;
    const projects = document.getElementById("projects").value;
    const references = document.getElementById("references").value;
