import {useState, useEffect} from "react";
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(()=>{

    const fetchMeals = async() =>{

      const response =  await fetch('https://react-api-3eddb-default-rtdb.firebaseio.com/meals.json');

       if(!response.ok){
        setIsError(true);
        throw new Error("Something went wrong!!");
      }
      const data = await response.json();
      const loadedMeals = [];


      for(const key in data){

        loadedMeals.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

      fetchMeals().catch((error)=>{

      setIsLoading(false);
      setIsError(error.message);
      });
  
 
  },[])


  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
      {isLoading && <h2>loading...</h2>}

        <ul>{mealsList}</ul>
          {!isLoading && isError && <h2>{isError}</h2>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
