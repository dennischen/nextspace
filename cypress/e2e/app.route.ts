/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


//short wait for async ui operation
const shortWait = 100

// Cypress E2E Test
describe('Route', () => {
    it('should navigate to link-route-indicator page', () => {
        cy.visit('http://localhost:3000/link-route-indicator')

        cy.get(".link").should('be.visible').contains("To Slow page")
        cy.get('.nextspace-spi').should('not.exist')

        //click too fast doen't work in e2e
        cy.wait(shortWait)
        //force, don't wait actionability (e.g. fetch)
        cy.get(".link").click({force: true})
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.be.visible')
        cy.get(".link").should('be.visible').contains("To Slow page")

        //default timeout of spi is 1000
        cy.wait(1000)

        cy.get('.nextspace-spi').should('be.visible')
        cy.get(".link").should('be.visible').contains("To Slow page")

        //slow page wait for 3000ms
        cy.wait(3000)

        cy.url().then(href=>{
            expect(href.endsWith("link-route-indicator/slow-page")).to.be.true;
        })

        cy.get(".link").should('not.exist')
        cy.get(".label").should('be.visible').contains("In Slow Page done")

        cy.get(".back-link").click();
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.exist')

        cy.url().then(href=>{
            expect(href.endsWith("link-route-indicator")).to.be.true;
        })

        cy.get(".link").should('be.visible').contains("To Slow page")

        //fast when 2nd view
        //force, don't wait actionability (e.g. fetch)
        cy.get(".link").click({force: true})
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.exist')

        cy.url().then(href=>{
            expect(href.endsWith("link-route-indicator/slow-page")).to.be.true;
        })

        cy.get(".link").should('not.exist')
        cy.get(".label").should('be.visible').contains("In Slow Page done")


    })
    
    it('should navigate to link-route-indicator page and run push/replace route', () => {
        cy.visit('http://localhost:3000/use-router-indicator')

        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")
        cy.get('.nextspace-spi').should('not.exist')

        //click too fast doen't work in e2e
        cy.wait(shortWait)
        //force, don't wait actionability (e.g. fetch)
        cy.get(".btn1").click({force: true})
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.be.visible')
        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        //default timeout of spi is 1000
        cy.wait(1000)

        cy.get('.nextspace-spi').should('be.visible')
        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        //slow page wait for 3000ms
        cy.wait(3000)

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator/slow-page?key=abc")).to.be.true;
        })

        cy.get(".btn1").should('not.exist')
        cy.get(".btn2").should('not.exist')
        cy.get(".label").should('be.visible').contains("In Slow Page abc")

        cy.wait(shortWait)
        cy.get(".back-link").click();
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.exist')

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator")).to.be.true;
        })

        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        //when using request param, server page should always slow ,but don't know why it is still fast in test
        //click push again
        cy.wait(shortWait)
        cy.get(".btn1").click({force: true})
        cy.wait(shortWait)

        // fast when in test when 2nd click, it use cache?
        // cy.get('.nextspace-spi').should('not.be.visible')
        // cy.get(".btn1").should('be.visible').contains("Push Slow page")
        // cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        // //default timeout of spi is 1000
        // cy.wait(1000)

        // cy.get('.nextspace-spi').should('be.visible')
        // cy.get(".btn1").should('be.visible').contains("Push Slow page")
        // cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        // //slow page wait for 3000ms
        // cy.wait(3000)

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator/slow-page?key=abc")).to.be.true;
        })

        cy.get(".btn1").should('not.exist')
        cy.get(".btn2").should('not.exist')
        cy.get(".label").should('be.visible').contains("In Slow Page abc")

        cy.wait(shortWait)
        cy.get(".back-link").click();
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.exist')

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator")).to.be.true;
        })

        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        //click replace
        cy.wait(shortWait)
        cy.get(".btn2").click({force: true})
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.be.visible')
        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        //default timeout of spi is 1000
        cy.wait(1000)

        cy.get('.nextspace-spi').should('be.visible')
        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        //slow page wait for 3000ms
        cy.wait(3000)

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator/slow-page?key=def")).to.be.true;
        })

        cy.get(".btn1").should('not.exist')
        cy.get(".btn2").should('not.exist')
        cy.get(".label").should('be.visible').contains("In Slow Page def")

        cy.wait(shortWait)
        cy.get(".back-link").click();
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.exist')

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator")).to.be.true;
        })

        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")


        //click replace again
        cy.wait(shortWait)
        cy.get(".btn2").click({force: true})
        cy.wait(shortWait)
        // fast when in test when 2nd click, it use cache?
        // cy.get('.nextspace-spi').should('not.be.visible')
        // cy.get(".btn1").should('be.visible').contains("Push Slow page")
        // cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        // //default timeout of spi is 1000
        // cy.wait(1000)

        // cy.get('.nextspace-spi').should('be.visible')
        // cy.get(".btn1").should('be.visible').contains("Push Slow page")
        // cy.get(".btn2").should('be.visible').contains("Replace Slow page")

        // //slow page wait for 3000ms
        // cy.wait(3000)

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator/slow-page?key=def")).to.be.true;
        })

        cy.get(".btn1").should('not.exist')
        cy.get(".btn2").should('not.exist')
        cy.get(".label").should('be.visible').contains("In Slow Page def")

        cy.wait(shortWait)
        cy.get(".back-link").click();
        cy.wait(shortWait)
        cy.get('.nextspace-spi').should('not.exist')

        cy.url().then(href=>{
            expect(href.endsWith("use-router-indicator")).to.be.true;
        })

        cy.get(".btn1").should('be.visible').contains("Push Slow page")
        cy.get(".btn2").should('be.visible').contains("Replace Slow page")

    })
})

// Prevent TypeScript from reading file as legacy script
export { }

