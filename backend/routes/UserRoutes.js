const {Router} = require('express');
const leaderHandles = require('../controllers/leaderActions');


const router = Router();


router.post('/signup', leaderHandles.signup);
router.post('/login', leaderHandles.login);
router.post('/add-member', leaderHandles.addMember);
router.post('/add-task', leaderHandles.addTask);

module.exports = router;