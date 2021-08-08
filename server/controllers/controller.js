const Staff = require("../models/Staffs");
const isEmpty = require("lodash.isempty");
const staffValidator = require("../services/validation");

exports.sendLandingPage = (req, res) => {
  return res.render("landing");
};

exports.addPage = (req, res) => {
  return res.render("addStaff");
};

exports.addStaff = async (req, res) => {
  console.log(req.body);
  // check if the req.body is empty
  if (isEmpty(req.body)) {
    return res.status(400).json({ message: "Content Can not be empty" });
  }

  //   validate req.body
  const { error } = staffValidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //   create a new staff data
  const staff = new Staff({
    personalTitle: req.body.personalTitle,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    address: req.body.address,
    position: req.body.position,
  });

  try {
    const savedStaff = await staff.save();
    res.redirect("/view/staff");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.sortedStaffs = async (req, res) => {
  let gender = req.query.gender || null;
  let position = req.query.position || null;

  try {
    //   check for combined query
    if (gender && position) {
      const staffs = await Staff.find({
        gender: gender,
        position: position,
      }).lean();
      return res.render("dashboard", { staffs: staffs });
    } else if (gender) {
      const staffs = await Staff.find({ gender: gender }).lean();
      res.render("dashboard", { staffs: staffs });
    } else if (position) {
      const staffs = await Staff.find({ position: position }).lean();
      res.render("dashboard", { staffs: staffs });
    } else {
      const allStaffs = await Staff.find().lean();
      res.render("dashboard", { staffs: allStaffs });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
