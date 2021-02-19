CREATE TABLE recipes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    recipeTitle TEXT NOT NULL,
    modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    recipePrepTime TEXT,
    recipeCookTime TEXT,
    recipeServings INTEGER,
    recipeIngredients TEXT,
    recipeDirections TEXT,
    recipeFolder INTEGER
        REFERENCES folderId(id) ON DELETE CASCADE NOT NULL,
    content TEXT
);