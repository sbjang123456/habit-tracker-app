import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import App from '../App';
import HabitPresenter from '../HabitPresenter';

// 어플리케이션 영역은 사실상 Integration Test (통합테스트) 
describe('App', () => {
  let presenter;
  beforeEach(() => {
    presenter = new HabitPresenter([
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
  });

  it('renders', () => {
    const component = renderer.create(<App presenter={presenter} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Component', () => {
    beforeEach(() => {
      render(<App presenter={presenter} />);
    });

    it('habit 활성화 시 상단 navbar totalCount 개수 정상작동 체크', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      const count = screen.getByTestId('total-count');
      expect(count.innerHTML).toBe('2');
    });

    it('새로운 habit 정상 추가 테스트', () => {
      const newHabit = 'New Habit';
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      userEvent.type(input, newHabit);
      userEvent.click(button);
      const addedName = screen.getAllByTestId('habit-name')[3];
      expect(addedName.innerHTML).toBe(newHabit);
      const addedCount = screen.getAllByTestId('habit-count')[3];
      expect(addedCount.innerHTML).toBe('0');
    });

    it('habit item 정상 삭제 테스트', () => {
      const first = screen.getAllByTitle('delete')[0];
      userEvent.click(first);
      const next = screen.getAllByTestId('habit-name')[0];
      expect(next.innerHTML).not.toBe('Reading');
    });

    it('+버튼 클릭 시 숫자 정상 증가 테스트', () => {
      const button = screen.getAllByTitle('increase')[0];
      userEvent.click(button);
      const count = screen.getAllByTestId('habit-count')[0];
      expect(count.innerHTML).toBe('1');
    });

    it('-버튼 클릭 시 숫자 정상 감소 테스트', () => {
      const button = screen.getAllByTitle('decrease')[2];
      userEvent.click(button);
      const count = screen.getAllByTestId('habit-count')[2];
      expect(count.innerHTML).toBe('0');
    });

    it('리셋 버튼 클릭 시 전체 habit 아이템 count 0 초기화 테스트', () => {
      const button = screen.getByText('Reset All');
      userEvent.click(button);
      screen.getAllByTestId('habit-count').forEach((count) => {
        expect(count.innerHTML).toBe('0');
      });
    });
  });
});
