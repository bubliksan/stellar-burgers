import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../../src/services/store';
import { selectIngredientsSelector } from '../../../src/services/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useSelector(selectIngredientsSelector);
  const { id } = useParams();
  const ingredientData = ingredients.find((item) => item._id == id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
