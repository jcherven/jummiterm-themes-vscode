/**************************************
 * /routes/api/expression.js
 **************************************/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Validator = require('validator');
const CronExp = require('../../models/CronExp');
const naturalizeCronExp = require('../../cronMagic/naturalizeCron.js');

const associateUsers = async () => {
  try {
    doSynchronousThings();
    const users = await getUsers();
    return users.map(user => user.getAddress());
  } catch (error) {
    console.error(err);
  }
};

/***************************************
 * @route       GET /api/expression
 * @desc        Get all expressions for all users
 * @access      Public
 **************************************/
router.get('/', (req, res) => {
  Expression.find()
    .sort({ date: -1 })
    .then(expressions => res.json(expressions))
    .catch(err =>
      res.status(404).json({ noExprsFound: 'No expressions retrieved' })
    );
});

/***************************************
 * @route       GET /api/expression/:id
 * @desc        Get an expression by _id
 * @access      Public
 **************************************/
router.get('/:id', (req, res) => {
  Expression.findById(req.params.id)
    .then(expression => res.json(expression))
    .catch(err =>
      res.status(404).json({ exprNotFound: 'No expression found with that ID' })
    );
});

/***************************************
 * @route       POST /api/expression
 * @desc        Create expression in current user's document
 * @access      Private
 **************************************/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, warnings, isValid } = validateExprInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const newExpr = new Expression({
      minute: req.body.minute,
      hour: req.body.hour,
      dayOfMonth: req.body.dayOfMonth,
      month: req.body.month,
      dayOfWeek: req.body.dayOfWeek,
      description: req.body.description,
      user: req.body.user,
      warnings: warnings,
    });
    newExpr.save().then(expression => res.json(expression));
  }
);

/***************************************
 * @route       DELETE /api/expression/:id
 * @desc        Delete expression by _id
 * @access      Private
 **************************************/
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (!Validator.isMongoId(req.params.id)) {
      return res
        .status(400)
        .json({ invalidDocId: 'Invalid document ID passed in request' });
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      Expression.findById(req.params.id).then(expression => {
        if (expression.user.toString() !== req.user.id) {
          return res.status(401).json({
            notAuthorized: 'User not authorized to delete this document',
          });
        }
        expression
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({
              exprNotFound: 'Could not find that document _id for deletion',
            })
          );
      });
    });
  }
);

module.exports = router;
