document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "index.html"; // Redirect to login page if not logged in
  }

  let resumeData = []; // Store the data globally for later use

  // Fetch data from JSON file
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      resumeData = data.resume;
      // Display all applicants initially
      displayApplicants(resumeData);
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Function to handle search
  function handleSearch() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    // Filter applicants based on search input
    const filteredApplicants = resumeData.filter((applicant) => {
      return (
        applicant.basics.name.toLowerCase().includes(searchInput) ||
        applicant.basics.AppliedFor.toLowerCase().includes(searchInput)
      );
    });
    displayApplicants(filteredApplicants);
    // Display "No such result found" message if no applicants match the search
    if (filteredApplicants.length === 0) {
      const resumeDetails = document.getElementById("resumeDetails");
      resumeDetails.innerHTML = ""; // Clear previous content
      const noResultsMsg = document.createElement("div");
      noResultsMsg.className = "no-results";
      noResultsMsg.textContent = "No such result found 🙃"; // Emoji added
      resumeDetails.appendChild(noResultsMsg);
    }
  }

  // Event listener for search button click
  document.getElementById("searchBtn").addEventListener("click", handleSearch);

  // Event listener for Enter key press in search input
  document
    .getElementById("searchInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
});

function displayApplicants(applicants) {
  const resumeDetails = document.getElementById("resumeDetails");
  resumeDetails.innerHTML = ""; // Clear previous content

  if (applicants.length === 0) {
    return; // No need to display anything if there are no applicants
  }

  applicants.forEach((applicant) => {
    const applicantDiv = document.createElement("div");
    applicantDiv.classList.add("applicant");

    // Display basic details
    const nameHeading = document.createElement("h3");
    nameHeading.textContent = applicant.basics.name;
    applicantDiv.appendChild(nameHeading);

    const jobTitlePara = document.createElement("p");
    jobTitlePara.textContent = "Applied for: " + applicant.basics.AppliedFor;
    applicantDiv.appendChild(jobTitlePara);

    // Display additional details
    const detailsList = document.createElement("ul");
    detailsList.classList.add("details-list");

    // Display skills
    const skillsItem = createListItem(
      "Skills",
      applicant.skills.keywords.join(", ")
    );
    detailsList.appendChild(skillsItem);

    // Display work experience
    const workItem = createListItem("Work Experience", applicant.work.Summary);
    detailsList.appendChild(workItem);

    // Display internship details
    const internshipItem = createListItem(
      "Internship",
      applicant.Internship.Summary
    );
    detailsList.appendChild(internshipItem);

    // Display project details
    const projectItem = createListItem(
      "Project",
      applicant.projects.description
    );
    detailsList.appendChild(projectItem);

    // Display education details
    const educationItem = createListItem(
      "Education",
      `UG: ${applicant.education.UG.institute}, Senior Secondary: ${applicant.education["Senior Secondary"].institute}, High School: ${applicant.education["High School"].institute}`
    );
    detailsList.appendChild(educationItem);

    // Display achievements
    const achievementsItem = createListItem(
      "Achievements",
      applicant.achievements.Summary.join(", ")
    );
    detailsList.appendChild(achievementsItem);

    // Display interests
    const interestsItem = createListItem(
      "Interests",
      applicant.interests.hobbies.join(", ")
    );
    detailsList.appendChild(interestsItem);

    applicantDiv.appendChild(detailsList);

    resumeDetails.appendChild(applicantDiv);
  });
}

function createListItem(label, value) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<strong>${label}:</strong> ${value}`;
  return listItem;
}
