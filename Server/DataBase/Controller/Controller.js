// const { request } = require('express');
const express = require('express');
const User = require('../Model/user')


// Create New User 
const Create = async (req, res) => {
    const { Name, Email, image, Phoen_No, uid } = req.body;
    try {
        console.log(req.body);
        const NewUser = await User.create({ Name, Email, image, Phoen_No, uid });
        res.status(201).json(NewUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

// Read All User data 
const Read = async (req, res) => {
    try {
        const AllUser = await User.find();
        res.status(200).json(AllUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}

// Read Single User
const SingleRead = async (req, res) => {
    const { id } = req.params;
    try {
        const SingleUser = await User.findById({ _id: id });
        res.status(200).json(SingleUser);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



// Read Single User
// Read By apiKey
const FindDatabase = async (req, res) => {
    const uid = req.params.uid;
    try {
        const SingleUser = await User.find({ uid });
        res.status(200).json(SingleUser);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}





// Update User
const Update = async (req, res) => {
    const { id } = req.params;
    // const {Name,Email,Phoen_No} = req.body;
    try {
        const UpdateUser = await User.findByIdAndUpdate(id, req.body, { new: true, });
        res.status(200).json(UpdateUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}


// Delete  User
const Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteUser = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(DeleteUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = { Create, Read, SingleRead, Delete, Update, FindDatabase };