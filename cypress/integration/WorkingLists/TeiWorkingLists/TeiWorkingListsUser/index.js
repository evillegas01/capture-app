import '../../sharedSteps';
import '../../../sharedSteps';

beforeEach(() => {
    cy.loginThroughForm();
});

Given('you open the main page with Ngelehun and child programme context', () => {
    cy.visit('#/?programId=IpHINAT79UW&orgUnitId=DiszpKrYNg8');
});

Given('you open the main page with Ngelehun and malaria focus investigation program context', () => {
    cy.visit('#/?programId=M3xtLkYBlKI&orgUnitId=DiszpKrYNg8');
});

Then('the default working list should be displayed', () => {
    const names = [
        'Filona',
        'Gertrude',
        'Frank',
        'Maria',
        'Joe',
        'Anthony',
        'Alan',
        'Heather',
        'Andrea',
        'Donald',
        'Frances',
        'Julia',
        'Elizabeth',
        'Donald',
        'Wayne',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});

When('you select the working list called completed enrollments', () => {
    cy.get('[data-test="workinglists-template-selector-chips-container"]')
        .contains('Completed enrollments')
        .click();
});

Then('the list should display teis with a completed enrollment', () => {
    const names = [
        'Filona Ryder',
        'Gertrude Fjordsen',
        'Frank Fjordsen',
        'Emma Johnson',
        'Alan Thompson',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 6)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[0])
                    .should('exist');

                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[1])
                    .should('exist');
            }
        });
});

Then('the enrollment status filter button should show that the completed filter is in effect', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status: Completed')
        .should('exist');
});

When('you set the enrollment status filter to completed', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status')
        .click();

    cy.get('[data-test="list-view-filter-contents"]')
        .contains('Completed')
        .click();
});

When('you set the enrollment date to a relative range', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Date of enrollment')
        .click();
    cy.get('[data-test="date-range-filter-start"]')
        .type('5');
    cy.get('[data-test="date-range-filter-end"]')
        .type('3');
});

When('you apply the current filter', () => {
    cy.get('[data-test="list-view-filter-apply-button"]')
        .click();
});

When('you set the enrollment status filter to active', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status')
        .click();

    cy.get('[data-test="list-view-filter-contents"]')
        .contains('Active')
        .click();
});

When('you set the assginee filter to none', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Assigned to')
        .click();

    cy.get('[data-test="list-view-filter-contents"]')
        .contains('None')
        .click();
});

Then('the enrollment status filter button should show that the active filter is in effect', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Enrollment status: Active')
        .should('exist');
});

Then('the assignee filter button should show that unassigned filter is in effect', () => {
    cy.get('[data-test="tei-working-lists"]')
        .contains('Assigned to: None')
        .should('exist');
});

Then('the list should display teis with an active enrollment and unassinged events', () => {
    const names = [
        'Maria',
        'Joe',
        'Anthony',
        'Alan',
        'Heather',
        'Andrea',
        'Donald',
        'Frances',
        'Julia',
        'Elizabeth',
        'Donald',
        'Wayne',
        'Johnny',
        'Donna',
        'Sharon',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});

Then('the list should display teis with John as the first name', () => {
    const names = [
        'Johnny',
        'John',
        'John',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 4)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});


When('you open the column selector', () => {
    cy.get('button[title="Select columns"]')
        .click();
});

When('you select the registering unit and save from the column selector', () => {
    cy.get('div[role="dialog"]')
        .contains('Registering unit')
        .find('input')
        .click();

    cy.get('div[role="dialog"]')
        .contains('Save')
        .click();
});

Then('the registering unit should display in the list', () => {
    cy.get('[data-test="online-list-table"]')
        .contains('Registering unit')
        .should('exist');
});

Then('the list should display data for the second page', () => {
    const names = [
        'Johnny',
        'Donna',
        'Sharon',
        'Scott',
        'Tom',
        'Emma',
        'Alan',
        'Anna',
        'Jack',
        'Tim',
        'James',
        'Noah',
        'Emily',
        'Lily',
        'Olvia',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[0])
                    .should('exist');
            }
        });
});

Then('the list should display 10 rows of data', () => {
    const names = [
        'Filona',
        'Gertrud',
        'Frank',
        'Maria',
        'Joe',
        'Anthony',
        'Alan',
        'Heather',
        'Andrea',
        'Donald',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 11)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1].split(' ')[0])
                    .should('exist');
            }
        });
});

When('you click the first name column header', () => {
    cy.get('[data-test="online-list-table"]')
        .contains('First name')
        .click();
});

Then('the list should display data ordered ascendingly by first name', () => {
    const names = [
        'Alan',
        'Alan',
        'Andrea',
        'Anna',
        'Anthony',
        'Donald',
        'Donald',
        'Donna',
        'Elizabeth',
        'Emily',
        'Emma',
        'Emma',
        'Evelyn',
        'Filona',
        'Frances',
        'John',
    ];

    cy.get('[data-test="tei-working-lists"]')
        .find('tr')
        .should('have.length', 16)
        .each(($teiRow, index) => {
            if (index) {
                cy.wrap($teiRow)
                    .contains(names[index - 1])
                    .should('exist');
            }
        });
});


Then('you see the custom TEI working lists', () => {
    cy.get('[data-test="workinglists-template-selector-chips-container"]')
        .within(() => {
            cy.contains('Events assigned to me').should('exist');
            cy.contains('Cases not yet assigned').should('exist');
            cy.contains('Ongoing foci responses').should('exist');
        });
});

When('you save the list with the name My custom list', () => {
    cy.get('[data-test="list-view-menu-button"]')
        .click();
    cy.contains('Save current view')
        .click();
    cy.get('[data-test="view-name-content"]')
        .type('My custom list');
    cy.server();
    cy.route('POST', '**/trackedEntityInstanceFilters**').as('newTrackedEntityInstanceFilters');
    cy.get('button')
        .contains('Save')
        .click();
    cy.wait('@newTrackedEntityInstanceFilters', { timeout: 30000 });
});

When('you update the list with the name My custom list', () => {
    cy.get('[data-test="list-view-menu-button"]')
        .click();
    cy.server();
    cy.route('PUT', '**/trackedEntityInstanceFilters/**').as('editTrackedEntityInstanceFilters');
    cy.contains('Update view')
        .click();
    cy.wait('@editTrackedEntityInstanceFilters', { timeout: 30000 });
});

Then('you can load the view with the name Events assigned to me', () => {
    cy.get('[data-test="workinglists-template-selector-chips-container"]')
        .within(() => {
            cy.contains('Events assigned to me').click();
        });
});

When('you delete the name My custom list', () => {
    cy.get('[data-test="list-view-menu-button"]')
        .click();
    cy.contains('Delete view')
        .click();
    cy.server();
    cy.route('DELETE', '**/trackedEntityInstanceFilters/**').as('deleteTrackedEntityInstanceFilters');
    cy.get('button')
        .contains('Confirm')
        .click();
    cy.wait('@deleteTrackedEntityInstanceFilters', { timeout: 30000 });
});

Then('the new custom TEI working list is created', () => {
    cy.get('[data-test="workinglists-template-selector-chips-container"]')
        .within(() => {
            cy.contains('My custom list').should('exist');
        });
});

Then('the custom TEI is deleted', () => {
    cy.get('[data-test="workinglists-template-selector-chips-container"]')
        .within(() => {
            cy.contains('My custom list').should('not.exist');
        });
});

When('you change the sharing settings', () => {
    cy.get('[data-test="list-view-menu-button"]').click();
    cy.contains('Share view').click();
    cy.get('[placeholder="Search"]')
        .type('Boateng');

    cy.contains('Kevin Boateng').click();
    cy.contains('Select a level').click();
    cy.contains('View and edit').click({ force: true });

    cy.get('[data-test="dhis2-uicore-button"]').contains('Give access').click({ force: true });
    cy.get('[data-test="dhis2-uicore-button"]').contains('Close').click({ force: true });
});

When('you see the new sharing settings', () => {
    cy.get('[data-test="list-view-menu-button"]').click();
    cy.contains('Share view').click();
    cy.contains('Kevin Boateng')
        .should('exist')
        .should('exist')
        .parent()
        .parent()
        .parent()
        .find('.select')
        .click();
    cy.contains('Remove access').click();

    cy.contains('Kevin Boateng').should('not.exist');
    cy.contains('Close')
        .click();
});
