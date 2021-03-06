import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHealthBarListAction } from 'redux/modules/healthBar';
import { HealthBar } from 'components';
import { handleGetDietLists } from 'api/firestore';

export default function HealthBarContainer() {
  const { authUser } = useSelector(state => state.auth);
  const healthBar = useSelector(state => state.healthBar);
  const dispatch = useDispatch();

  const getTotalCalories = meals => {
    const totalCalories = meals.reduce((acc, cur) => acc + +cur.calories, 0);

    return totalCalories > 999
      ? totalCalories.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : totalCalories;
  };

  const getDate = i => {
    const dayNum = healthBar[i].meals[0].date.slice(4, 6);
    const dayStr = healthBar[i].meals[0].date.slice(7, 10);

    return `${dayNum} ${dayStr}`;
  };

  useEffect(() => {
    if (!authUser) return null;
    dispatch(handleGetDietLists(authUser, getHealthBarListAction));
    dispatch(getHealthBarListAction(authUser.dietList));
  }, [authUser, dispatch]);

  if (!authUser) return null;
  if (!healthBar[0]) return null;

  return (
    <HealthBar
      healthBar={healthBar}
      getTotalCalories={getTotalCalories}
      getDate={getDate}
    />
  );
}
