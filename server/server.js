const express = require("express");
const { exec } = require("child_process");
const db = require("./database");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle user registration
app.post("/register", (req, res) => {
  const {
    full_name,
    phone_number,
    reg_no,
    email_address,
    faculty,
    hall_of_residence,
  } = req.body;

  if (
    !full_name ||
    !phone_number ||
    !reg_no ||
    !email_address ||
    !faculty ||
    !hall_of_residence
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Run the shell script to handle user registration
  exec(
    `./register_user.sh "${full_name}" "${phone_number}" "${reg_no}" "${email_address}" "${faculty}" "${hall_of_residence}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${stderr}`);
        return res.status(500).json({ error: "Failed to register user" });
      }

      // Insert the user into the SQLite database
      db.run(
        "INSERT INTO registered_users ( full_name, phone_number, reg_no, email_address, faculty, hall_of_residence) VALUES (?, ?, ?, ?, ?, ?)",
        [
          full_name,
          phone_number,
          reg_no,
          email_address,
          faculty,
          hall_of_residence,
        ],
        function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Failed to save registered user" });
          }

          res.status(201).json({
            message: "User registered successfully",
            userId: this.lastID,
          });
        }
      );
    }
  );
});

// Endpoint to get the list of registered users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM registered_users", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to retrieve users" });
    }

    res.status(200).json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
