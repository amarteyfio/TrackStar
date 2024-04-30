const express = require('express');
const 
{
    createTracker,
    getAllTrackers,
    getTracker,
    deleteTracker,
    updateTracker
} 
= require('../controllers/trackerController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth
router.use(requireAuth);

//GET all trackers
router.get('/', getAllTrackers);

//GET tracker by ID
router.get('/:id', getTracker);

//POST a new tracker
router.post('/', createTracker);

//DELETE tracker by ID
router.delete('/:id', deleteTracker);

//UPDATE tracker by ID
router.patch('/:id', updateTracker);


module.exports = router;