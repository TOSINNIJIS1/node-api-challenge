const express = require('express')
const router = express.Router()
const Project = require('./helpers/projectModel')

router.use(express.json())

//create 

router.post(`/`, (req, res) => {
    const body = req.body

    Project.insert(body)
    .then(info => {
        res.status(201).json({success: true, info})
    })
    .catch(error => res.status(500).json({success: false, error}))
})

//create

router.get('/', (req, res) => {
    Project.get().then(info => {
        if(info) {
            res.status(200).json({success: true, info})
        } else {
            res.status(404).json({success: false, message: 'Info not Found!!!'})
        }
    })
    .catch(error => res.status(500).json({success: false, error}))
 })

 //edit

 router.put('/:id', (req, res) => {

    const body = req.body;
    const {id} = req.params;

    Project.update(id, body).then(edit => {
        if (edit) {
            res.status(201).json({success: true, edited})
        } else {
            res.status(404).json({success: false, message: 'id not found'})
        }
    })
    .catch(error => {
        res.status(500).json({success: false, error})
    })
 })

 //delete

router.delete(`/:id`, (req, res) => {
    const {id} = req.params;

    Project.remove(id)
    .then(erase => {
        if (erase) {
        res.status(204).json({success: true, message: 'id erased'});
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
    Project.getProjectActions(id)
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