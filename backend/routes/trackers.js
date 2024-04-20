const express = require('express');
const router = express.Router();
const 
{
    createTracker,
    getAllTrackers,
    getTracker,
    deleteTracker,
    updateTracker
} 
= require('../controllers/trackerController');


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