import "./styles.css";

const app = document.getElementById("app");

const renderNewVoterForm = () => {
  app.innerHTML = `
    <form id="voterForm" class="space-y-4">
        <h1 class="text-red-500 text-3xl">Tailwind is working!</h1>
      <div>
        <label class="block">Name</label>
        <input type="text" name="name" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label class="block">Email</label>
        <input type="email" name="email" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label class="block">Phone</label>
        <input type="tel" name="phone" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label class="block">Registration Number</label>
        <input type="text" name="regNo" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label class="block">Faculty</label>
        ${[
          "Faculty Of Health",
          "Faculty Of Engineering & Technology",
          "Faculty Of Law",
          "Institute Of Gender Women & Development Studies",
          "Faculty Of Arts & Social Sciences",
          "Faculty Of Veterinary Medicine & Surgery",
          "Faculty Of Environment & Resources Development",
          "Faculty Of Agriculture",
          "Faculty Of Commerce",
          "Faculty Of Education & Community Studies",
        ]
          .map(
            (faculty) => `
          <label class="block">
            <input type="radio" name="faculty" value="${faculty}" required> ${faculty}
          </label>
        `
          )
          .join("")}
      </div>
      <div>
        <label class="block">Hall</label>
        ${[
          "Holywood",
          "Mt Kilimanjaro",
          "Mt Kenya",
          "Mt Elgon",
          "Bogoria",
          "Elementaita",
          "Tsavo",
          "Amboseli",
          "Victoria",
          "Aberdare",
          "R Tana",
          "Naivasha",
          "Turkana",
          "Mau",
          "Riverview",
          "Taifa",
          "Mama Ngina",
          "Barret",
          "Uganda",
          "Old Hall",
          "Ruwenzori",
          "Riverside",
          "Thornton",
          "Mombasa",
          "Eldoret",
          "Nairobi",
          "Maringo",
          "Argentina",
          "Diaspora - Main Gate",
          "Diaspora - Njokerio",
          "NTCC - Upper Zone",
          "NTCC - Lower Zone",
          "Mara",
        ]
          .map(
            (hall) => `
          <label class="block">
            <input type="radio" name="hall" value="${hall}" required> ${hall}
          </label>
        `
          )
          .join("")}
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  `;

  document.getElementById("voterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Voter registered successfully!");
  });
};

const renderVoterList = async () => {
  const response = await fetch("http://localhost:3000/users");
  const voters = await response.json();

  app.innerHTML = `
    <input type="text" id="search" placeholder="Search..." class="w-full p-2 border rounded mb-4">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th class="p-2">Name</th>
          <th class="p-2">Email</th>
          <th class="p-2">Phone</th>
          <th class="p-2">Registration Number</th>
          <th class="p-2">Faculty</th>
          <th class="p-2">Hall</th>
        </tr>
      </thead>
      <tbody>
        ${voters
          .map(
            (voter) => `
          <tr class="border-t">
            <td class="p-2">${voter.name}</td>
            <td class="p-2">${voter.email}</td>
            <td class="p-2">${voter.phone}</td>
            <td class="p-2">${voter.regNo}</td>
            <td class="p-2">${voter.faculty}</td>
            <td class="p-2">${voter.hall}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.getElementById("search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "" : "none";
    });
  });
};

// Router
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#/voter-list") {
    renderVoterList();
  } else {
    renderNewVoterForm();
  }
});

// Initial render
if (window.location.hash === "#/voter-list") {
  renderVoterList();
} else {
  renderNewVoterForm();
}
