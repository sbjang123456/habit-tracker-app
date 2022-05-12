/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Habit Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Habit Tracker').should('exist');
  });

  it('마지막에 새로운 habit 을 추가', () => {
    cy.findByPlaceholderText('Habit').type('New Habit');
    cy.findByText('Add').click();
    cy.findAllByTestId('habit-name').last().should('have.text', 'New Habit');
    cy.findAllByTestId('habit-count').last().should('have.text', '0');
  });

  it('count 증가', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '1');
  });

  it('count 감소', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('decrease').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('0 미만으로 감소할 수 없는지 확인', () => {
    cy.findAllByTitle('decrease').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('header 에 habit 활성화에 따른 개수 체크', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('increase').last().click();
    cy.findByTestId('total-count').should('have.text', '2');
  });

  it('reset all 버튼 클릭 시 각 아이템 count 0 으로 변경되는지 체크', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('increase').last().click();
    cy.findByText('Reset All').click();
    cy.findAllByTestId('habit-count').each((item) => {
      cy.wrap(item).should('have.text', '0');
    });
  });

  it('habit item 삭제', () => {
    cy.findAllByTitle('delete').first().click();
    cy.findAllByTestId('habit-name').findByText('Reading').should('not.exist');
  });

});