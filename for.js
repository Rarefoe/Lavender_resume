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
// Handle profile picture
    const profilePicInput = document.getElementById("profilePic");
    let profilePicHTML = "";
    if (profilePicInput.files && profilePicInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePicHTML = `<img src="${e.target.result}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">`;
        generateResume();
      };
      reader.readAsDataURL(profilePicInput.files[0]);
      return; // Wait for image to load
    } else {
      generateResume();
    }
     function generateResume() {
      // Collect dynamic education data
      const degrees = Array.from(document.getElementsByName("degree[]")).map(d => d.value);
      const institutions = Array.from(document.getElementsByName("institution[]")).map(i => i.value);
      const gradYears = Array.from(document.getElementsByName("gradYear[]")).map(y => y.value);

      let educationHTML = "";
      for (let i = 0; i < degrees.length; i++) {
        if (degrees[i] && institutions[i] && gradYears[i]) {
          educationHTML += `<p><strong>${degrees[i]}</strong>, ${institutions[i]} (${gradYears[i]})</p>`;
        }
      }
      // Collect dynamic experience data
      const jobTitles = Array.from(document.getElementsByName("jobTitle[]")).map(j => j.value);
      const companies = Array.from(document.getElementsByName("company[]")).map(c => c.value);
      const startDates = Array.from(document.getElementsByName("startDate[]")).map(s => s.value);
      const endDates = Array.from(document.getElementsByName("endDate[]")).map(e => e.value);
      const responsibilities = Array.from(document.getElementsByName("responsibilities[]")).map(r => r.value);

      let experienceHTML = "";
      for (let i = 0; i < jobTitles.length; i++) {
        if (jobTitles[i] || companies[i]) {
          experienceHTML += `
            <div style="margin-bottom: 15px;">
              <p><strong>${jobTitles[i] || 'Position'}</strong> at ${companies[i] || 'Company'}</p>
              <p><em>${startDates[i] || 'Start'} - ${endDates[i] || 'End'}</em></p>
              <p>${responsibilities[i] ? responsibilities[i].replace(/\n/g, "<br>") : ''}</p>
            </div>
          `;
        }
      }
       // Collect dynamic skills
      const skillsList = Array.from(document.getElementsByName("skills[]")).map(s => s.value).filter(s => s);
      const skills = skillsList.join(", ");

      // Collect dynamic languages
      const languagesList = Array.from(document.getElementsByName("languages[]")).map(l => l.value).filter(l => l);
      const languages = languagesList.join(", ");
       // Create resume HTML with proper styling
      const resumeHTML = 
      <div class="resume-container">
          <div class="header">
            ${profilePicHTML}
            <h1>${fullName}</h1>
            <div class="contact-info">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Address:</strong> ${address}</p>
              ${links ? `<p><strong>Portfolio:</strong> <a href="${links}" target="_blank">${links}</a></p>` : ''}
            </div>
          </div>
           ${careerObjective ? `
          <div class="section">
            <h2>Career Objective</h2>
            <p>${careerObjective.replace(/\n/g, "<br>")}</p>
          </div>
          ` : ''}

          ${educationHTML ? `
          <div class="section">
            <h2>Education</h2>
            ${educationHTML}
          </div>
          ` : ''}