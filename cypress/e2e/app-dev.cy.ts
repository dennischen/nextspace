/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('Navigation', () => {
    it('it is in dev', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Nextspace string in main
        cy.get('main').contains("Nextspace")

    })
})

// Prevent TypeScript from reading file as legacy script
export { }

