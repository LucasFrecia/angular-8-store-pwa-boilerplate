// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/** INIT: Material Commands */
Cypress.Commands.add("selectMaterialDropDown", (formControlName, selectOption) => {
    cy.get(`[formcontrolname="${formControlName}"]`).click().then(() => {
        cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text`).should('contain', selectOption);
        cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text:contains("${selectOption}")`).first().click().then(() => {
            // After click, mat-select should contain the text of the selected option
            cy.get(`[formcontrolname="${formControlName}"]`).contains(selectOption);
        });
    });
});



Cypress.Commands.add("selectMaterialDropDownAssertItemIsPresent", (formControlName, selectOption, totalExpectedItems) => {
    cy.get(`[formcontrolname="${formControlName}"]`).click().then(() => {
        cy.get('mat-option').should('have.length', totalExpectedItems);
        cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text`).should('contain', selectOption).first().click().then(() => {
            cy.get(`[formcontrolname="${formControlName}"]`).contains(selectOption);
        });
    });
});