/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('I18n', () => {

    it('should navigate to language-switcher page', () => {
        cy.visit('http://localhost:3000/language-switcher')

        let node = cy.get('option').should('have.length', 2).first()
        node.should('have.value', 'en').contains('English').should('have.attr', 'selected')
        node = cy.get('option').eq(1)
        node.should('have.value', 'zh').contains('Chinese').should('not.have.attr', 'selected')

        cy.get('select').select('zh')

        cy.wait(shortWait)

        node = cy.get('option').should('have.length', 2).first()
        node.should('have.value', 'en').contains('英文').should('not.have.attr', 'selected')
        node = cy.get('option').eq(1)
        node.should('have.value', 'zh').contains('中文').should('have.attr', 'selected')

        cy.get('select').select('en')

        node = cy.get('option').should('have.length', 2).first()
        node.should('have.value', 'en').contains('English').should('have.attr', 'selected')
        node = cy.get('option').eq(1)
        node.should('have.value', 'zh').contains('Chinese').should('not.have.attr', 'selected')

    })
})

// Prevent TypeScript from reading file as legacy script
export { }

