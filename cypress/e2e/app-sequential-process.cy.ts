/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('Sequential Process', () => {

    it('should navigate to sequential-processor page', () => {
        cy.visit('http://localhost:3000/sequential-processor')

        cy.get('.nextspace-spi').should('not.exist')

        cy.get("#test1").get("button").should('be.visible').should('be.enabled')

        //click too fast doen't work in e2e
        cy.wait(shortWait)
        cy.get("#test1").get("button").click()
        cy.wait(shortWait)

        cy.get("#test1").get("button").should('be.visible').should('not.be.enabled')

        //default timeout of spi is 1000
        cy.wait(1000)

        cy.get('.nextspace-spi').should('be.visible')


        cy.wait(2000)
        cy.get("#test1").get("button").should('be.visible').should('be.enabled')

        cy.get('.nextspace-spi').should('not.exist')

    })
})

// Prevent TypeScript from reading file as legacy script
export { }

