import { Suspense, useEffect } from 'react';
import CalculatorCalorieForm from 'components/CalculatorСalorieForm/CalculatorСalorieForm';
import { RightSideBar } from 'components/RightSideBar/RightSideBar';
import { Box } from './Calculator.styled';
import { useDispatch } from 'react-redux';
import { dayInfo } from 'redux/day/day-operations';
import Recommendations from 'components/Modal/Recommendations/Recommendations';
import { useWidth } from 'hooks/useWidth';
import { useSelector } from 'react-redux';
import { getIsModalOpen } from 'redux/modal/modal-selectors';

function Calculator() {
  const dispatch = useDispatch();
  const width = useWidth();
  const isModalOpen = useSelector(getIsModalOpen);

  const exportDate = () => {
    let date = new Date();
    let dateString = date.toISOString().split('T')[0];
    return { date: dateString };
  };
  console.log(exportDate());
  useEffect(() => {
    dispatch(dayInfo(exportDate()));
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box>
        {isModalOpen && width <= 768 ? (
          <Recommendations />
        ) : (
          <>
            <CalculatorCalorieForm />
            <RightSideBar />
          </>
        )}
      </Box>
    </Suspense>
  );
}
export default Calculator;
