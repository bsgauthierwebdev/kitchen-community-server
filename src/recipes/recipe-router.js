const path = require('path')
const express = require('express')
const xss = require('xss')
const RecipeService = require('./recipe-service')

const recipeRouter = express.Router()
const jsonParser = express.json()

const serializeRecipe = recipe => ({
    ...recipe,
    name: xss(recipe.name),
    description: xss(recipe.description),
    prepTime: xss(recipe.prepTime),
    cookTime: xss(recipe.cookTime),
    servings: xss(recipe.servings),
    ingredients: xss(recipe.ingredients),
    directions: xss(recipe.directions)
})

recipeRouter
    .route('/')
    .get((req, res, next) => {
        RecipeService.getAllRecipes(req.app.get('db'))
            .then(recipes => {
                res.json(recipes.map(serializeRecipe))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {
            name, 
            description, 
            prepTime, 
            cookTime, 
            servings, 
            ingredients, 
            directions, 
            folderId
        } = req.body
        const newRecipe = {
            name, 
            description, 
            prepTime, 
            cookTime, 
            servings, 
            ingredients, 
            directions, 
            folderId
        }

        //check for missing fields
        for (const [key, value] of Object.entries(newRecipe)) {
            if (value == null) {
                return res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
            }
        }

        RecipeService.insertRecipe(req.app.get('db'), newRecipe)
            .then(recipe => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl, `${recipe.id}`))
                    .json(serializeRecipe(recipe))
            })
            .catch(next)
    })

recipeRouter
    .route('/:recipe_id')
    .all((req, res, next) => {
        RecipeService.getById(req.app.get('db'), req.params.recipe_id)
            .then(recipe => {
                if (!recipe) {
                    return res.status(404).json({
                        error: {message: `Recipe doesn't exist`}
                    })
                }
                res.recipe = recipe //save the Recipe for the next middleware
                next() //don't forget to call next so the next middleware happens
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeRecipe(res.recipe))
    })
    .patch(jsonParser, (req, res, next) => {
        const {
            name, 
            description, 
            prepTime, 
            cookTime, 
            servings, 
            ingredients, 
            directions, 
            folderId
        } = req.body
        const recipeToUpdate = {
            name, 
            description, 
            prepTime, 
            cookTime, 
            servings, 
            ingredients, 
            directions, 
            folderId
        }
        
        if (!name && !description && !directions && !folderId) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain a 'name', 'description', 'directions' or 'folderId' field`
                }
            })
        }

        RecipeService.updateRecipe(
            req.app.get('db'),
            req.params.recipe_id,
            recipeToUpdate
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        RecipeService.deleteRecipe(req.app.get('db'), req.params.recipe_id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = recipeRouter