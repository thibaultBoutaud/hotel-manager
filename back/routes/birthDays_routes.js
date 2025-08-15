const express = require("express");
const router = express.Router();
const birthDaysCtrl = require("../controllers/birthDays_ctrl");
const auth = require("../middlewares/auth");

router.get("/", auth, birthDaysCtrl.getBirthDaysByAuth);
router.get("/:id", auth, birthDaysCtrl.getOneBirthDay);
router.post("/", auth, birthDaysCtrl.addBirthDay);
router.put("/:id", auth, birthDaysCtrl.updateBirthday);
router.delete("/:id", auth, birthDaysCtrl.deleteBirthDay);

module.exports = router;  