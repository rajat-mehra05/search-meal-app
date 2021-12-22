

import { useState } from "react"
import axios from "axios"

const searchApiURL = "https://www.themealdb.com/api/json/v1/1/search.php";
const randomApiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [meals, setMeals] = useState([]);
    const [randomMeals, setRandomMeals] = useState([]);

    const handleSearch = () => {
        if(!searchValue) alert("Please enter your meal in search box!")
        handleSearchMealCall(searchValue)
    }

    // handling search meal call

    const handleSearchMealCall = async (searchItem) => {
        const res = await axios.get(`${searchApiURL}?s=${searchItem}`)
        setMeals(res.data.meals);
    }

    const handleRandomApiCall = async () => {
        const res = await axios.get(randomApiURL)
        setRandomMeals(res.data.meals);
    }


    return (
        <div className="min-h-full flex justify-center items-center flex-col bg-gradient-to-r from-orange-600 to-yellow-200">
         <h1 className="text-4xl text-gray-600 p-4 bg-gradient-to-r mt-4 from-cyan-300 to-green-400"> Search your meal </h1>      
            <div className="m-8">
            <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} placeholder="Search any meal..." className="border-2 rounded outline-2 border-red-400 p-2 w-72 " />
            </div>     

            <div className="flex-col sm:flex-row">

            <button onClick={handleSearch} className="rounded-full p-4 text-white border-red-500 bg-gradient-to-r from-red-600 to-red-800 w-36">Search</button>
            <button onClick={handleRandomApiCall} className="rounded-full p-4 text-white border-red-500 bg-gradient-to-r from-red-600 to-red-800 w-36 ml-4"> Random meal </button>
            </div>

            {/* showing user search meals */}

        {meals ? (
          <div className="border-amber-900 border-2 p-4 m-4">
            {meals.map((meal, index) => (
              <div key={index}>
                <h1 className="text-slate-900 text-2xl">{meal.strMeal}</h1>
                <h2 className="text-slate-900 text-2xl">{meal.strArea}</h2>
                <img src={meal.strMealThumb} alt="meal-thumbnail" height={240} width={340} loading="lazy" />
              </div>
            ))}
          </div>
        ) : (
          <p>Can't find the meal</p>
        )}

        {/* random meal */}

        {randomMeals ? (
          <div>
            {randomMeals.map((meal, index) => (
              <div key={index}>
                <h1>{meal.strMeal}</h1>
                <h2>{meal.strArea}</h2>
                <img src={meal.strMealThumb} alt="meal-thumbnail" />
              </div>
            ))}
          </div>
        ) : (
          <p>Can't find the meal</p>
        )}
        </div>
    )
}

export default Search
