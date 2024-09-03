document.addEventListener("DOMContentLoaded", function () {
  const email = document.getElementById("email");
  email.addEventListener("input", () => validateEmail(email));

  const dobInput = document.getElementById("dob");
  const today = new Date();
  const minAge = 18;
  const maxAge = 55; // Correct age capping logic

  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate() + 1
  );
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate() + 1
  );

  dobInput.min = minDate.toISOString().split("T")[0];
  dobInput.max = maxDate.toISOString().split("T")[0];

  const validateEmail = (element) => {
    const value = element.value;
    let message = "";

    if (value === "") {
      message = "Email cannot be blank.";
    } else if (!/@/.test(value)) {
      message = "Email must contain '@'.";
    } else if (!/\./.test(value.split("@")[1])) {
      message = "Email must contain '.' after '@'.";
    } else {
      message = "";
    }

    element.setCustomValidity(message);
    element.reportValidity();
  };

  const userForm = document.getElementById("user-form");

  const retrieveEntries = () => {
    let entries = localStorage.getItem("users");
    if (entries) {
      return JSON.parse(entries);
    } else {
      return [];
    }
  };

  const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries
      .map((entry) => {
        const namec = `<td >${entry.name}</td>`;
        const emailc = `<td >${entry.email}</td>`;
        const passwordc = `<td >${entry.password}</td>`;
        const dobc = `<td >${entry.dob}</td>`;
        const acceptTermsc = `<td >${
          entry.termsandconditions ? "true" : "false"
        }</td>`;

        return `<tr>${namec}${emailc}${passwordc}${dobc}${acceptTermsc}</tr>`;
      })
      .join("\n");

    const table = `<h2 style="font-size: 30px;text-align:center;margin-bottom:10px">Entries</h2><table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Dob</th>
              <th>Accepted Terms?</th>
            </tr>
          </thead>
          <tbody>${tableEntries}</tbody>
        </table>`;

    document.getElementById("user-entries").innerHTML = table;
  };

  const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsandconditions = document.getElementById("acceptTerms").checked;

    const entry = {
      name,
      email,
      password,
      dob,
      termsandconditions,
    };

    let userEntries = retrieveEntries();
    userEntries.push(entry);

    localStorage.setItem("users", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset(); // Resets the form to allow multiple entries
  };

  userForm.addEventListener("submit", saveUserForm);

  displayEntries(); // Initializes table with existing entries on page load
});
