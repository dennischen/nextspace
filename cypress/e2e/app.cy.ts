/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100;

// Cypress E2E Test
describe('Navigation', () => {
    it('should navigate to home page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')

        // Nextspace string in main
        cy.get('main').contains("Nextspace")

    })
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
    it('should navigate to sequential-processor page', () => {
        cy.visit('http://localhost:3000/sequential-processor')

        cy.get('.nextspace-spi').should('not.exist')

        cy.get("#test1").get("button").should('be.visible').should('be.enabled')

        //click too fast doen't work in e2e
        cy.wait(shortWait)
        cy.get("#test1").get("button").click()
        cy.wait(shortWait)
        
        cy.get("#test1").get("button").should('be.visible').should('not.be.enabled')

        //default timeout of spi is 500
        cy.wait(500)

        cy.get('.nextspace-spi').should('be.visible')


        cy.wait(2000)
        cy.get("#test1").get("button").should('be.visible').should('be.enabled')

        cy.get('.nextspace-spi').should('not.exist')

    })
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
        //lazy show a loading in workspace boundary
        //Suspense fallback use style{display:none} to hide contain, the dom is still here
        cy.get("#test1").should('not.be.visible')
        cy.get(".btn1").should('not.be.visible')
        cy.get(".btn2").should('not.be.visible')

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
        //default timeout of spi is 500
        cy.wait(500)
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
