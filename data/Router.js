const express = require('express')
const router = express.Router()
const Info = require('./helpers/projectModel.js')



//Create/Insert

router.post(`/`, (req, res) => {
    const info = req.body

    Info.insert(info)
    .then(info => {
        res.status(201).json({success: true, info})
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
})




//Read/Get

router.get(`/`, (req, res) => {
    Info.get().then(info => {
        if(info) {
            res.status(200).json({success: true, info})
        } else {
            res.status(500).json({success: false, message:'user info not found'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({success: false, error})
    })

})


//Put/Edit/Update

router.put(`/:id`, (req, res) => {
    const info = req.body;
    const {id} = req.params;

    Info.update(id, info)
    .then(edited => {
        if (edited) {
            res.status(201).json({success: true, edited})
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
})


//Delete/Remove

router.delete(`/:id`, (req, res) => {
    console.log(res)
    const {id} = req.params;

    Info.remove(id)
    .then(deleted => {
        if (deleted) {
        res.status(204).json();
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        console.log(error, 'Delete Error')
        res.status(500).json({success: false,  error})
    })
})

router.get(`/:id`, (req, res) => {
    const {id} = req.params;
    Info.getProjectActions(id)
    .then(info => {
        if (info) {
            res.status(200).json({success: true, message: 'OK', info})
        } else {
            res.status(404).json({success: false, message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json({success: false, error}))
})


module.exports = router