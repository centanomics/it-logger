const express = require('express');
const router = express.Router();

// validation
const { check, validationResult } = require('express-validator/check');

//model imports
const Logs = require('../models/Logs');
const Techs = require('../models/Techs');

// @route     GET api/logs
// @desc      Get all logs
// @access    Public
router.get('/', async (req, res) => {
  try {
    const logs = await Logs.find();
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/logs/:id
// @desc      Get a log by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let log = await Logs.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/logs
// @desc      Add a log
// @access    Public
router.post(
  '/',
  [
    check('message')
      .not()
      .isEmpty(),
    check('attention').isBoolean(),
    check('tech')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, attention, tech } = req.body;

    try {
      const newLog = new Logs({
        message,
        attention,
        tech,
        date: Date.now()
      });
      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/logs:id
// @desc      Update a log by id
// @access    Public
router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;

  //build a log object
  const logFields = {};
  if (message) logFields.message = message;
  if (attention !== null) logFields.attention = attention;
  if (tech) logFields.tech = tech;

  try {
    let log = await Logs.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Logs.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/logs/:id
// @desc      Delete a log by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let log = await Logs.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Logs.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Tech Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
