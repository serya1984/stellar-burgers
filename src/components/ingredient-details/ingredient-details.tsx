import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { selectIngredientById } from '../../../src/services/ingridients/slices';
import { useSelector } from '../../../src/services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const selector = useSelector();
  const ingredient = selector(selectIngredientById(id));
  const ingredientData = ingredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
