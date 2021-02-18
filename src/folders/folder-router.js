const path = require('path')
const express = require('express')
const xss = require('xss')
const FolderService = require('./folder-service')

const folderRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    ...folder,
    name: xss(folder.name)
})

folderRouter
    .route('/')
    .get((req, res, next) => {
        FolderService.getAllFolders(req.app.get('db'))
            .then(Folders => {
                res.json(Folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {name} = req.body
        const newFolder = {name}

        for (const [key, value] of Object.entries(newFolder)) {
            if (value == null) {
                return res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
            }
        }

        FolderService.insertFolder(req.app.get('db'), newFolder)
            .then(folder => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl, `${folder.id}`))
                    .json(serializeFolder(folder))
            })
            .catch(next)
    })

folderRouter
    .route('/:folderId')
    .all((req, res, next) => {
        FolderService.getById(req.app.get('db'), req.params.folderId)
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: {message: `Folder doesn't exist`}
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeFolder(res.folder))
    })
    .patch(jsonParser, (req, res, next) => {
        const {name} = req.body
        const folderToUpdate = {name}

        if (!name) {
            return res.status(400).json({
                error: {message: `Request body must contain a 'name`}
            })
        }

        FolderService.updateFolder(
            req.app.get('db'),
            req.params.folderId,
            folderToUpdate
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        FolderService.deleteFolder(req.app.get('db'), req.params.folderId)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    
module.exports = folderRouter