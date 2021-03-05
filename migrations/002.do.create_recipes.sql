CREATE TABLE recipes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    description TEXT NOT NULL,
    "prepTime" TEXT,
    "cookTime" TEXT,
    servings INTEGER,
    ingredients TEXT NOT NULL,
    directions TEXT NOT NULL,
    "folderId" INTEGER
        REFERENCES folders(id) ON DELETE CASCADE NOT NULL
);

TRUNCATE recipes, folders RESTART IDENTITY CASCADE;

INSERT INTO folders (name)
VALUES
    ('Asian'),
    ('BBQ'),
    ('Comfort Food'),
    ('Italian'),
    ('Kitchen Hints and Hacks'),
    ('Mediterranean'),
    ('Seafood'),
    ('Vegetarian / Vegan');

INSERT INTO recipes (name, description, "prepTime", "cookTime", servings, ingredients, directions, "folderId")
VALUES
    ('Sweet Potato Power Bowl', 'Vegan meets Southwest', '10 minutes', '30 minutes', 4, 'Cubed sweet potato, olive oil, canned black beans, chopped onion, bell pepper, garlic, chili powder, adobo powder, oregano, hominy, vegetable stock', 'Heat oil and saute pepper, onion and garlic until soft. Add seasonings and allow to toast in oil. Add sweet potato and stock, cover and steam 10 minutes. Add black beans and heat through. Taste for seasoning. Add hominy and bring to temp.', 8),
    ('Asian Test Seed', 'Testing Seeds', '10 seconds', '10 seconds', 1, 'Words', 'Put text and integers in the proper place', 1);