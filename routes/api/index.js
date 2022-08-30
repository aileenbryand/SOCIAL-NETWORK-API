const router = require('express').Router();

// Set routes
const usersRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//  `/users` will take to user-routes
router.use('/users', usersRoutes);

// `/thoughts` will take to thought routes
router.use('/thoughts', thoughtRoutes);


module.exports = router;