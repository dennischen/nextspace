/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('Navigation', () => {
    it('should navigate to home page', () => {
        cy.visit('http://localhost:3000/')
    })

    it('should navigate to sequential-processor page', () => {
        cy.visit('http://localhost:3000/sequential-processor')
    })

    it('should navigate to lazy-preloader page', () => {
        cy.visit('http://localhost:3000/lazy-preloader')
    })

    it('should navigate to language-switcher page', () => {
        cy.visit('http://localhost:3000/language-switcher')
    })
    it('should navigate to theme-switcher page', () => {
        cy.visit('http://localhost:3000/theme-switcher')  
    })
    it('should navigate to link-route-indicator page', () => {
        cy.visit('http://localhost:3000/link-route-indicator')
    })
    it('should navigate to server-translation page', () => {
        cy.visit('http://localhost:3000/server-translation')
    })
})

// Prevent TypeScript from reading file as legacy script
export { }

