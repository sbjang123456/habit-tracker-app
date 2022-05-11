import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from './HabitAddForm';

describe('HabitAddForm', () => {
  let onAdd;
  let input;
  let button;
  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    input = screen.getByPlaceholderText('Habit');
    button = screen.getByText('Add');
  });

  it('calls onAdd when button is clicked valid habit is entered', () => {

    // input 에 습관 이름 타이핑 (given)
    userEvent.type(input, 'New Habit');

    // add 버튼 클릭 (when)
    userEvent.click(button);

    // onAdd 가 input 에 입력된 이름과 함께 호출 (Then)
    expect(onAdd).toHaveBeenCalledWith('New Habit');

  });

  it('does not call onAdd when the habit is empty', () => {
    userEvent.clear(input);
    userEvent.click(button);
    expect(onAdd).toHaveBeenCalledTimes(0);
  });
});