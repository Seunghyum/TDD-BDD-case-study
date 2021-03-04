describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:8080'); // https://seunghyum.github.io/TDD-BDD-case-study/

    cy.wait(1000);

    let before = 0;
    let after = 0;

    cy.get('[data-testid=infinite-scroll-container]')
      .then((el) => el.outerHeight())
      .then((res) => (before = res));

    cy.scrollTo('bottom');

    cy.wait(500);

    cy.get('[data-testid=infinite-scroll-container]')
      .then((el) => el.outerHeight())
      .then((res) => (after = res));

    cy.then(() => {
      cy.log('before : ', before);
      cy.log('after : ', after);
      expect(before < after).to.be.true;
    });
  });
});
