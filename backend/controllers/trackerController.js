const Tracker = require('../models/trackerModel');
const mongoose = require('mongoose');

// get all trackers
const getAllTrackers = async (req, res) => {
    const user_id = req.user._id;
    const trackers = await Tracker.find({user_id})
    .sort({createdAt: -1});
    res.status(200).json(trackers);
}

// get tracker by ID
const getTracker = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'Tracker does not Exist'});
    }
    try {
        const tracker = await Tracker.findById(id);
        res.status(200).json(tracker);
    } catch (err) {
        res.status(400).json({error: err.message});
    } 
}


// create/post a new tracker
const createTracker = async (req, res) => {
    const {title, description} = req.body;
    //add
    try{
        const user_id = req.user._id;
        const tracker = await Tracker.create({title, description, user_id})
        res.status(200).json(tracker);
    }
    catch(err){
        res.status(400).json({err: err.message});
    }
}

// delete tracker by ID
const deleteTracker = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'Tracker does not Exist'});
    }
    try {
        const tracker = await Tracker.findByIdAndDelete({_id: id});
        if(!tracker){
            return res.status(404).json({error: 'Tracker not found'});
        }
        res.status(200).json(tracker);
    } catch (err) {
        res.status(400).json({error: err.message}); 
    }    
}


// update tracker by ID
const updateTracker = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'Tracker does not Exist'});
    }   
        const tracker = await Tracker.findByIdAndUpdate({_id: id},{...req.body})
        if(!tracker){
            return res.status(404).json({error: 'Tracker not found'});
        }
        res.status(200).json(tracker);
    try {   
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}


//Exports
module.exports = {
    createTracker,
    getTracker,
    getAllTrackers,
    deleteTracker,
    updateTracker
}