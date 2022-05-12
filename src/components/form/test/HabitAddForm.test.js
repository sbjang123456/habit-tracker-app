import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from '../HabitAddForm';
import renderer from 'react-test-renderer';

describe('HabitAddForm', () => {

  it('renders', () => {
    // 스냅샷 테스트 실행
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Form Submit', () => {
    let onAdd;
    let input;
    let button;
    beforeEach(() => {
      onAdd = jest.fn();
      render(<HabitAddForm onAdd={onAdd} />);
      input = screen.getByPlaceholderText('Habit');
      button = screen.getByText('Add');
    });

    it('추가 버튼 클릭 시 입력받은 habit 을 onAdd 에 정상적으로 담겨서 호출되는지 체크', () => {

      // input 에 습관 이름 타이핑 (given)
      userEvent.type(input, 'New Habit');

      // add 버튼 클릭 (when)
      userEvent.click(button);

      // onAdd 가 input 에 입력된 이름과 함께 호출 (Then)
      expect(onAdd).toHaveBeenCalledWith('New Habit');

    });

    it('텍스트박스에 값이 입력되지 않았을 때 onAdd 호출되지 않는지 체크', () => {
      userEvent.clear(input);
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});