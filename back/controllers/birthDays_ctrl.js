
const pool = require("../connection/sqlConnection");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs').promises;

exports.getBirthDaysByAuth = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const [birthDays] = await pool.execute("SELECT * FROM birthdays WHERE user_id = ?", [userId]);
        if (birthDays.length === 0) return res.status(200).json({ birthDays: [] });
        return res.status(200).json({ birthDays: birthDays });
    } catch (err) {
        return res.status(500).json({ msg: `error : ${err}` })
    }
};

exports.getOneBirthDay = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(500).json({ msg: `error : ${err}` })
    }
};

exports.addBirthDay = async (req, res, next) => {
    try {
        const { name, lastName, date } = req.body;
        if (!name || !lastName || !date) return res.status(400).json({ msg: "All fields are required" });
        const userId = req.auth.userId;
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ msg: "format incorrect" });
        }
        const uuid = uuidv4();
        await pool.execute("INSERT INTO birthdays (id, user_id, name, last_name, date) Values (?, ?, ?, ?, ?)", [uuid, userId, name, lastName, parsedDate]);
        return res.status(201).json({ msg: "birthDay created" });
    } catch (err) {
        return res.status(500).json({ msg: `error : ${err}` })
    }
};

exports.updateBirthday = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(500).json({ msg: `error : ${err}` })
    }
};

exports.deleteBirthDay = async (req, res, next) => {
    try {
        const id = req.params.id;
        await pool.execute("DELETE FROM birthdays WHERE id = ?", [id]);
        return res.status(200).json({ msg: "BirthDate deleted." });
    } catch (err) {
        return res.status(500).json({ msg: `error : ${err}` })
    }
};