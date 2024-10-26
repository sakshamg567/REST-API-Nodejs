const express = require("express")

const router = express.Router()

// router.get("/", async (req, res) => {
//   const allDBusers = await User.find({});
//   return res.json(allDBusers);
// });

router.get("/", async (req, res) => {
  const allDBusers = await User.find({});
  const html = `
  <ul>
    ${allDBusers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
  </ul> `;
  res.send(html);
});

router
  .route("/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return user ? res.json(user) : res.status(404).send("User not found");
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.send("User deleted successfully");
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.send("User updated successfully");
  });

router.post("/", async (req, res) => {
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).send("Please fill all the fields");
  }

  try {
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;