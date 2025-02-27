interface RecipeIngredients {
    Id: Number,
    RecipeId: Number,
    IngredientId: Number,
    Quantity: Number,
    Measurement: Measurement,
    Recipe: Recipe | undefined
    Ingredient: Ingredient | undefined
}