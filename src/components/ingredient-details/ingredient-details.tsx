import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../../src/services/store';
import { selectIngredientsSelector } from '../../services/ingredients/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(selectIngredientsSelector);
  const { id } = useParams();
  const ingredientData = ingredients.find((item) => item._id == id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
