const express = require('express');
const router = express.Router();
// validation
const { check, validationResult } = require('express-validator/check');

//model imports
const Techs = require('../models/Techs');

// @route     GET api/techs
// @desc      Get all techs
// @access    Public
router.get('/', async (req, res) => {
  try {
    const techs = await Techs.find();
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/techs/:id
// @desc      Get a tech by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let tech = await Techs.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/techs
// @desc      Add a tech
// @access    Public
router.post(
  '/',
  [
    check('firstName')
      .not()
      .isEmpty(),
    check('lastName')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName } = req.body;
    try {
      const newTech = new Techs({
        firstName,
        lastName
      });

      const tech = await newTech.save();
      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Sever error');
    }
  }
);

// @route     PUT api/techs:id
// @desc      Update a tech by id
// @access    Public
router.put('/:id', async (req, res) => {
  const { firstName, lastName } = req.body;

  //build a tech object
  const techFields = {};
  if (firstName) techFields.firstName = firstName;
  if (lastName) techFields.lastName = lastName;

  try {
    let tech = await Techs.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    tech = await Techs.findByIdAndUpdate(
      req.params.id,
      { $set: techFields },
      { new: true }
    );
    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever error');
  }
});

// @route     DELETE api/techs/:id
// @desc      Delete a tech by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let tech = await Techs.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Techs.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Tech Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever error');
  }
});

module.exports = router;
