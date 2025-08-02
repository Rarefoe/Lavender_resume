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
      const resumeHTML = `
        <style>
          .resume-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h2 {
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .contact-info {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 15px 0;
          }
          .contact-info p {
            margin: 5px;
          }
        </style>
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

          ${experienceHTML ? `
          <div class="section">
            <h2>Work Experience</h2>
            ${experienceHTML}
          </div>
          ` : ''}

          ${skills ? `
          <div class="section">
            <h2>Skills</h2>
            <p>${skills}</p>
          </div>
          ` : ''}

          ${languages ? `
          <div class="section">
            <h2>Languages</h2>
            <p>${languages}</p>
          </div>
          ` : ''}

          ${projects ? `
          <div class="section">
            <h2>Projects</h2>
            <p>${projects.replace(/\n/g, "<br>")}</p>
          </div>
          ` : ''}

          ${certifications ? `
          <div class="section">
            <h2>Certifications</h2>
            <p>${certifications.replace(/\n/g, "<br>")}</p>
          </div>
          ` : ''}

          ${references ? `
          <div class="section">
            <h2>References</h2>
            <p>${references.replace(/\n/g, "<br>")}</p>
          </div>
          ` : ''}
        </div>
      `;

      document.body.innerHTML = `
        <h1 style="text-align:center; margin: 20px 0;">Your Generated Resume</h1>
        ${resumeHTML}
        <div style="text-align: center; margin: 30px 0;">
          <button onclick="window.print()" class="btn" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 0 10px;">Download as PDF</button>
          <button onclick="location.reload()" class="btn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 0 10px;">Create Another Resume</button>
        </div>
      `;
    }
  });

  // Dynamic field addition functions
  window.addEducation = function () {
    const container = document.getElementById("educationSection");
    const newDiv = document.createElement("div");
    newDiv.className = "education-entry";
    newDiv.innerHTML = `
      <hr style="margin: 20px 0;">
      <label>Degree:</label>
      <select name="degree[]" required>
        <option value="">--Select Degree--</option>
        <option>High School</option>
        <option>Diploma</option>
        <option>Bachelor's</option>
        <option>Master's</option>
        <option>PhD</option>
      </select><br><br>
      <label>Institution:</label>
      <input type="text" name="institution[]" required><br><br>
      <label>Graduation Year:</label>
      <input type="number" name="gradYear[]" min="1900" max="2025" required><br><br>
    `;
    container.appendChild(newDiv);
  };

  window.addExperience = function () {
    const container = document.getElementById("experienceSection");
    const newDiv = document.createElement("div");
    newDiv.className = "experience-entry";
    newDiv.innerHTML = `
      <hr style="margin: 20px 0;">
      <label>Job Title:</label>
      <input type="text" name="jobTitle[]"><br><br>
      <label>Company:</label>
      <input type="text" name="company[]"><br><br>
      <label>Start Date:</label>
      <input type="month" name="startDate[]"><br><br>
      <label>End Date:</label>
      <input type="month" name="endDate[]"><br><br>
      <label>Responsibilities / Achievements:</label>
      <textarea name="responsibilities[]" rows="4" placeholder="Use bullet points for clarity"></textarea><br><br>
    `;
    container.appendChild(newDiv);
  };

  window.addSkill = function () {
    const container = document.getElementById("skillsSection");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <label>Skill:</label>
      <input type="text" name="skills[]" placeholder="e.g., Python, Project Management"><br><br>
    `;
    container.appendChild(newDiv);
  };

  window.addLanguage = function () {
    const container = document.getElementById("languageSection");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <label>Language:</label>
      <input type="text" name="languages[]" placeholder="e.g., Spanish, French"><br><br>
    `;
    container.appendChild(newDiv);
  };
};
