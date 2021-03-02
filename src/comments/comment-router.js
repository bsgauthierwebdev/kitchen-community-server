const path = require('path')
const express = require('express')
const xss = require('xss')
const CommentService = require('./comment-service')
const { json } = require('express')

const commentRouter = express.Router()
const jsonParser = express.json()

const serializeComment = comment => ({
    ...comment,
    name: xss(comment.name),
    content: xss(comment.content)
})

commentRouter
    .route('/')
    .get((req, res, next) => {
        CommentService.getAllComments(req.app.get('db'))
        .then(comments => {
            res.json(comments.map(serializeComment))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {name, content, recipeId} = req.body
        const newComment = {name, content, recipeId}

        for (const [key, value] of Object.entries(newComment)) {
            if (value == null) {
                return res.statusCode(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
            }
        }

        CommentService.insertComment(req.app.get('db'), newComment)
            .then(comment => {
                res.statusCode(201)
                    .location(path.posix.join(req.originalUrl, `${recipeId}`))
                    .json(serializeComment(comment))
            })
            .catch(next)
    })

commentRouter
    .route('/:recipeId/commentId')
    .all;;((req, res, next) => {
        CommentService.getById(req.app.get('db'), req.params.commentId)
            .then(comment => {
                if (!comment) {
                    return res.status(404).json({
                        error: {message: `Comment doesn't exist`}
                    })
                }
                res.comment = comment
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeComment(res.comment))
    })
    .patch(jsonParser, (req, res, next) => {
        const {name, content, recipeId} = req.body
        const commentToUpdate = {name, content, recipeId}

        if (!name &&!content && !recipeId) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain a 'name', 'content' and 'recipeId' field`
                }
            })
        }

        CommentService.updateComment(
            req.app.get('db'),
            req.params.commentId,
            commentToUpdate
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        CommentService.deleteComment(req.app.get('db'), req.params.commentId)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    module.exports = commentRouter