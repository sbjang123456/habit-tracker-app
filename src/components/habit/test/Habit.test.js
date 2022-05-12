import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Habit from '../Habit';

describe('Habit Component', () => {
  const habit = { name: 'Habit', count: 4 };
  let HabitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    HabitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    )
  });

  it('renders', () => {
    const component = renderer.create(HabitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Button Click', () => {
    beforeEach(() => {
      render(HabitComponent);
    });
    
    it('+버튼 클릭 시 onIncrement 함수 호출 확인', () => {
      const button = screen.getByTitle('increase');
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });
    
    it('-버튼 클릭 시 onDecrement 함수 호출 확인', () => {
      const button = screen.getByTitle('decrease');
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });
    
    it('휴지통 버튼 클릭 시 onDelete 함수 호출 확인', () => {
      const button = screen.getByTitle('delete');
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});