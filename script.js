const mealsContainer = document.getElementById("meals-container");

const API_URL =
  "https://api.freeapi.app/api/v1/public/meals?page=1&limit=50";

async function fetchMeals() {
  mealsContainer.innerHTML = `<p class="loading">Loading meals...</p>`;

  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    const meals = result.data.data;

    displayMeals(meals);
  } catch (error) {
    mealsContainer.innerHTML = `
      <p class="error">Failed to load meals.</p>
    `;
    console.error(error);
  }
}

function displayMeals(meals) {
  mealsContainer.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      
      <div class="meal-content">
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
      </div>
    `;

    mealsContainer.appendChild(mealCard);
  });
}

fetchMeals();