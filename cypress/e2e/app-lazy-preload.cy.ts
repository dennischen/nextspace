/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('Lazy Preload', () => {
    
    it('should navigate to lazy-preloader page', () => {
        cy.visit('http://localhost:3000/lazy-preloader')

        cy.get(".btn1").should('be.visible')
        cy.get(".btn2").should('be.visible')

        cy.get(".panel1").should('not.exist')
        cy.get(".panel2").should('not.exist')
        cy.get(".nextspace-modal").should('not.exist')

        //test lazy
        cy.wait(shortWait)
        cy.get(".btn1").click()
        cy.wait(shortWait)
        
        //a modal loading... in test
        cy.get("#test1").should('be.visible')
        cy.get(".btn1").should('be.visible')
        cy.get(".btn2").should('be.visible')

        cy.get(".nextspace-modal").should('be.visible')
        cy.get(".nextspace-modal p").contains('Loading')


        //delay in LazyPreloader is 2000
        cy.wait(2000)
        cy.get("#test1").should('be.visible')
        cy.get(".btn1").should('be.visible').should('not.be.enabled')
        cy.get(".btn2").should('be.visible').should('be.enabled')

        cy.get(".panel1").should('exist').contains('Panel1')
        cy.get(".panel2").should('not.exist')
        cy.get(".nextspace-modal").should('not.exist')


        //test lazy preload
        cy.wait(shortWait)
        cy.get(".btn2").click()
        cy.wait(shortWait)
        cy.get("#test1").should('be.visible')
        cy.get(".btn1").should('be.visible')
        cy.get(".btn2").should('be.visible')

        //progress indicator should show up
        //default timeout of spi is 1000
        cy.wait(1000)
        cy.get('.nextspace-spi').should('be.visible')

        cy.get(".panel1").should('exist').contains('Panel1')
        cy.get(".panel2").should('not.exist')
        cy.get(".nextspace-modal").should('not.exist')

        //panel2 should be load finally
        //delay in LazyPreloader is 2000
        cy.wait(2000)
        cy.get("#test1").should('be.visible')
        cy.get(".btn1").should('be.visible').should('be.enabled')
        cy.get(".btn2").should('be.visible').should('not.be.enabled')

        cy.get(".panel1").should('not.exist')
        cy.get(".panel2").should('exist').contains('Panel2')
        cy.get(".nextspace-modal").should('not.exist')

        //test panel1 and panel2 again, there should not any lazy anymore
        cy.get(".btn1").click()
        cy.get("#test1").should('be.visible')
        cy.get(".btn1").should('be.visible').should('not.be.enabled')
        cy.get(".btn2").should('be.visible').should('be.enabled')
        cy.get(".panel1").should('exist').contains('Panel1')
        cy.get(".panel2").should('not.exist')
        cy.get(".nextspace-modal").should('not.exist')

        cy.get(".btn2").click()
        cy.get("#test1").should('be.visible')
        cy.get(".btn1").should('be.visible').should('be.enabled')
        cy.get(".btn2").should('be.visible').should('not.be.enabled')
        cy.get(".panel1").should('not.exist')
        cy.get(".panel2").should('exist').contains('Panel2')
        cy.get(".nextspace-modal").should('not.exist')

    })

})

// Prevent TypeScript from reading file as legacy script
export { }

