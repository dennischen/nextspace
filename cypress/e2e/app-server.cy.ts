/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('I18n', () => {

    it('should navigate to server-translation page', () => {
        cy.visit('http://localhost:3000/server-translation')

        cy.get("#lang").contains("en")
        cy.get("#language").contains("en")
        cy.get("#label").contains("English")

        cy.visit('http://localhost:3000/server-translation?lang=zh')

        cy.get("#lang").contains("zh")
        cy.get("#language").contains("zh")
        cy.get("#label").contains("中文")
        
        cy.visit('http://localhost:3000/server-translation?lang=xyz')

        cy.get("#lang").contains("xyz")
        cy.get("#language").contains("en")
        cy.get("#label").contains("English")

    })
})

// Prevent TypeScript from reading file as legacy script
export { }

