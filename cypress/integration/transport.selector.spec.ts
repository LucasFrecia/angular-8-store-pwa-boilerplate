describe('Transports Selector', () => {

    beforeEach(() => {
        cy.visit('/').wait(2000);
    });

    it('NAVIGATES TO HOME PAGE AND ENTERS TRANSPORT SELECTION PAGE', () => {
        cy.get('[data-test-id=choose-transport-router-btn]')
            .should('be.visible')
            .and('be.enabled')
            .click()
            .wait(1500);

        cy.get('[data-test-id=toolbar-title]').contains('Select Transport');
    });

    it('SETS DIFFERENT MAIN IMAGA FOR MOBILE', () => {

        cy.viewport('iphone-6');

        cy.get('[data-test-id=main-image]').should('be.visible').wait(1000);
        cy.get('[data-test-id=main-image]').invoke('attr', 'src').should('contain', './assets/main-narrow.gif');
    });

    it('SHOULD FILTER COLORS WHEN SELECTING CAR TYPE AND BRANDS WHEN SELECTING COLOR', () => {

        cy.get('[data-test-id=choose-transport-router-btn]')
            .should('be.visible')
            .and('be.enabled')
            .click()
            .wait(1500);

        cy.selectMaterialDropDown('type', 'Car')
            .wait(1000);

        /** Check expected color quantity is present and click on one to continue */
        cy.selectMaterialDropDownAssertItemIsPresent('color', 'Red', 5);

        /** Check expected brand quantity is present and click on one to continue */
        cy.selectMaterialDropDownAssertItemIsPresent('brand', 'Bugatti Veyron', 7);

    });

    it('SHOULD FILTER ITEMS AND RETURN CORRECT ITEMS', () => {

        cy.get('[data-test-id=choose-transport-router-btn]')
            .click()
            .wait(1500);

        cy.selectMaterialDropDown('type', 'Car');

        cy.selectMaterialDropDownAssertItemIsPresent('color', 'Red', 5);

        cy.selectMaterialDropDownAssertItemIsPresent('brand', 'Bugatti Veyron', 7);

        cy.get('[data-test-id=filter-transports-btn]')
            .should('be.visible')
            .and('be.enabled')
            .click()
            .wait(1500);

        /** There should be only one card with the item searched for */
        cy.get('[data-test-id=item-card]')
            .should('have.length', 1);

        cy.get('[data-test-id=item-card-title]')
            .should('have.length', 1)
            .contains('Bugatti Veyron');

        cy.get('[data-test-id=item-card-subtitle]')
            .should('have.length', 1)
            .contains('Car');
    });
});
