const {Router} = require('express');
const leaderHandles = require('../controllers/leaderActions');


const router = Router();


router.post('/signup', leaderHandles.signupLeader);
router.post('/login', leaderHandles.loginLeader);
router.post('/add-member', leaderHandles.addMember);
router.post('/add-task', leaderHandles.addTask);
router.post('/update-task-status', leaderHandles.updateTaskStatus);
router.post('/assign-task',leaderHandles.assignTask);

module.exports = router;