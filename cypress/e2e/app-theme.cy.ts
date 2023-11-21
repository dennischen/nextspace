/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('Theme', () => {
    it('should navigate to theme-switcher page', () => {
        cy.visit('http://localhost:3000/theme-switcher')

        let node = cy.get('option').should('have.length', 2).first()
        node.should('have.value', 'light').contains('Light').should('have.attr', 'selected')
        node = cy.get('option').eq(1)
        node.should('have.value', 'dark').contains('Dark').should('not.have.attr', 'selected')

        cy.get('#p1').contains('light')
        cy.get('#p2').contains('False')
        cy.get('#p3').contains('/_next/static/media/light.')
        cy.get('#p4').should('have.css', 'background-color', 'rgb(0, 0, 0)')
        cy.get('#p4').should('have.css', 'color', 'rgb(255, 255, 255)')
        cy.get('#p5').contains('333px')


        cy.get('select').select('dark')
        cy.wait(shortWait)


        node = cy.get('option').should('have.length', 2).first()
        node.should('have.value', 'light').contains('Light').should('not.have.attr', 'selected')
        node = cy.get('option').eq(1)
        node.should('have.value', 'dark').contains('Dark').should('have.attr', 'selected')

        cy.get('#p1').contains('dark')
        cy.get('#p2').contains('True')
        cy.get('#p3').contains('/_next/static/media/dark.')
        cy.get('#p4').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        cy.get('#p4').should('have.css', 'color', 'rgb(0, 0, 0)')
        cy.get('#p5').contains('334px')

        cy.get('select').select('light')
        cy.wait(shortWait)

        cy.get("#test1").within(() => {
            let node = cy.get('option').should('have.length', 2).first()
            node.should('have.value', 'light').contains('Light').should('have.attr', 'selected')
            node = cy.get('option').eq(1)
            node.should('have.value', 'dark').contains('Dark').should('not.have.attr', 'selected')
        })

    })

})

// Prevent TypeScript from reading file as legacy script
export { }

