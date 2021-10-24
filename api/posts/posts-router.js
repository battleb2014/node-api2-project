const express = require('express');
const router = express.Router();
const Posts = require('./posts-model');

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(() => {
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(post => {
            if(!post) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                res.json(post)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'The post information could not be retrieved'
            })
        })
})

router.post('/', (req, res) => {
    const post = req.body;
    Posts.insert(post)
        .then(newPost => {
            if(!post.title || !post.contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                res.json(newPost)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    Posts.update(id, post)
        .then(updatedPost => {
            if(!id) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else if(!post.title || !post.contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                res.status(200).json(updatedPost)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'The post information could not be modified'
            })
        })
})

module.exports = router;