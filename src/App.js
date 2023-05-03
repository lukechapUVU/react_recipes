import React, { useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    ingredients: '',
    instructions: ''
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  function handleAddRecipe(event) {
    event.preventDefault();
    const newRecipe = {
      id: recipes.length,
      name: form.name,
      ingredients: form.ingredients,
      instructions: form.instructions
    };
    setRecipes([...recipes, newRecipe]);
    setForm({
      id: '',
      name: '',
      ingredients: '',
      instructions: ''
    });
  }

  function handleEditRecipe(recipeId) {
    const editedRecipe = recipes.find(recipe => recipe.id === recipeId);
    setForm({
      id: editedRecipe.id,
      name: editedRecipe.name,
      ingredients: editedRecipe.ingredients,
      instructions: editedRecipe.instructions,
      isFavorite: editedRecipe.isFavorite
    });
    handleDeleteRecipe(recipeId);
  }

  function handleDeleteRecipe(recipeId) {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
  }

  function handleFavoriteRecipe(recipeId, isFavorite) {
    if(!isFavorite) {
      const favoritedRecipe = recipes.find(recipe => recipe.id === recipeId);
      setFavoriteRecipes([...favoriteRecipes, favoritedRecipe]);
      const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId)
      setRecipes(updatedRecipes);
    }
    else {
      const unfavoritedRecipe = favoriteRecipes.find(recipe => recipe.id === recipeId);
      setRecipes([...recipes, unfavoritedRecipe]);
      const updatedFavoriteRecipes = favoriteRecipes.filter(recipe => recipe.id !== recipeId)
      setFavoriteRecipes(updatedFavoriteRecipes);
    }
    
  }

  return (
    <div className="App">
      <div class="flex">
        <div>
          <h1>Recipes</h1>
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id}>
                <h2>{recipe.name}</h2>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Instructions: {recipe.instructions}</p>
                <button onClick={() => handleEditRecipe(recipe.id)}>Edit</button>
                <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
                <button onClick={() => handleFavoriteRecipe(recipe.id, false)}>Favorite</button>
              </li>
            ))}
          </ul>
        </div>
        <div class="ml-4">
          <h1>Favorite Recipes</h1>
          <ul>
            {favoriteRecipes.map(recipe => (
              <li key={recipe.id}>
                <h2>{recipe.name}</h2>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Instructions: {recipe.instructions}</p>
                <button onClick={() => handleFavoriteRecipe(recipe.id, true)}>Unfavorite</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleAddRecipe}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea name="ingredients" value={form.ingredients} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Instructions:
          <textarea name="instructions" value={form.instructions} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default App;
