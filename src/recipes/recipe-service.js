const RecipeService = {
    getAllRecipes(knex) {
        return knex.select('*').from('recipes')
    },

    insertRecipe(knex, newRecipe) {
        return knex
            .insert(newRecipe)
            .into('recipes')
            .returning('*')
            .then(rows => rows[0])
    },

    getById(knex, id) {
        return knex
            .from('recipes')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteRecipe(knex, id) {
        return knex('recipes')
            .where({id})
            .delete()
    },

    updateRecipe(knex, id, newRecipeFields) {
        return knex('recipes')
            .where({id})
            .update(newRecipeFields)
    }
}

module.exports = RecipeService