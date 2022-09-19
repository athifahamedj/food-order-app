import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Chicken Biryani',
    description: 'Finest Chicken pieces on basmathi rice',
    price: 225.00,
  },
  {
    id: 'm2',
    name: 'Shawarma',
    description: 'Meat cut into thin slices!',
    price: 125.00,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 175.00,
  },
  {
    id: 'm4',
    name: 'Chicken Fried Rice',
    description: 'Subtly Fried',
    price: 180.00,
  },
   {
    id: 'm5',
    name: 'Chicken Noodles',
    description: 'Chinese food at its best',
    price: 180.00,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
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
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
