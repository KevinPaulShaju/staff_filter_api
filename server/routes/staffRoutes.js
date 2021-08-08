const express = require("express");
const router = express.Router();
const {
  addStaff,
  sortedStaffs,
  sendLandingPage,
  addPage
} = require("../controllers/controller");

/**
 * @description show add page
 * @method GET /add
 */
router.get("/stories/add", addPage);

/**
 * @description post a new staff data
 * @method POST /
 */
router.post("/stories/add", addStaff);

/**
 * @description root page
 * @method GET /
 */
router.get("/", sendLandingPage);

/**
 * @description post a new staff data
 * @method GET /view/staff
 */

router.get("/view/staff", sortedStaffs);

module.exports = router;
