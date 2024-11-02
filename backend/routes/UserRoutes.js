const {Router} = require('express');
const leaderHandles = require('../controllers/leaderActions');
const authMiddlewares = require('../middlewares/authMiddleware');


const router = Router();


router.post('/signup', leaderHandles.signupLeader);
router.post('/login', leaderHandles.loginLeader);
router.post('/add-member',authMiddlewares.isThisLeader, leaderHandles.addMember);
router.post('/add-task',authMiddlewares.isThisLeader,leaderHandles.addTask);
router.post('/update-task-status', leaderHandles.updateTaskStatus);
router.post('/assign-task',authMiddlewares.isThisLeader, leaderHandles.assignTask);
router.post('/loginmember', leaderHandles.loginMember);


module.exports = router;