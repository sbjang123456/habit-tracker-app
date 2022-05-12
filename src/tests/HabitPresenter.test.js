import HabitPresenter from '../HabitPresenter';

describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 1 },
    { id: 2, name: 'Running', count: 0 },
  ];
  let presenter;
  let update;

  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it('초기화 시 habits 을 갖고있는지 체크', () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it('habit item 증가 테스트', () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it('habit item 감소 테스트', () => {
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('0 보다 작은 숫자로 셋팅되지 않는지 체크', () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it('목록에서 habit item 삭제 체크', () => {
    presenter.delete(habits[0], update);

    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe('Running');
    checkUpdateIsCalled();
  });

  it('목록에 새로운 habit item 추가 테스트', () => {
    presenter.add('Eating', update);

    expect(presenter.getHabits()[2].name).toBe('Eating');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('habit의 개수가 3 이상 일 시 정상적으로 에러가 발생하는지 체크', () => {
    presenter.add('Eating', update);
    expect(() => {
      presenter.add('Eating', update);
    }).toThrow('습관의 갯수는 3 이상이 될 수 없습니다');
  });

  describe('reset', () => {
    it('모든 habit item 의 count 가 0 으로 변경되었는지 체크', () => {
      presenter.reset(update);
      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    it('habit item 의 count 가 0 일 때는 새로운 객체를 생성해서 교체하지 않는지 체크', () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updatedHabits = presenter.getHabits();

      expect(updatedHabits[1]).toBe(habits[1]);
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
