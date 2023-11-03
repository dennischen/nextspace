/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */

import I18nInfo from '@/components/I18nInfo'
import LanguageSwitcher from '@/language-switcher/LanguageSwitcher'
import LazyPreloader from '@/lazy-preloader/LazyPreloader'
import SequentialProcessor from '@/sequential-processor/SequentialProcessor'
import WorkspaceBoundary from './WorkspaceBoundary'
import translationLoader from './components/translationLoader'
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress



//short wait for async ui operation
const shortWait = 100;

const EnTranslationLoader = translationLoader("en", () => import('@/i18n/EnTranslationLoader'))
const ZhTranslationLoader = translationLoader("zh", () => import('@/i18n/ZhTranslationLoader'))


function fixProgressIndicator(cy: Cypress.cy & CyEventEmitter) {
    //https://www.cypress.io/blog/2023/02/16/component-testing-next-js-with-cypress
    //fix SimpleProgressIndicator image lost in testing
    cy.readFile('./src/assets/spin.svg', null).then((img) => {
        // Intercept requests to Next.js backend image endpoint
        cy.intercept('_next/static/media/spin.*.svg', {
            statusCode: 200,
            headers: { 'Content-Type': 'image/svg+xml' },
            body: img.buffer,
        })
    })
}

// Cypress Component Test
describe('<WorkspaceBoundary />', () => {

    it('should render nothing', () => {
        cy.mount(<WorkspaceBoundary />)

        cy.get('[data-cy-root]').children().should('not.exist')
    },)
    it('should render children whitout any internal html element', () => {
        cy.mount(<WorkspaceBoundary >
            <div id="test1">My Children</div>
        </WorkspaceBoundary>)

        cy.get('[data-cy-root]')
            .children().should('have.length', 1)
            .first().should('have.id', "test1").contains("My Children")

    },)
    it('should render i18n correctly', () => {
        cy.mount(<WorkspaceBoundary defaultLanguage='en' translations={[EnTranslationLoader]}>
            <I18nInfo id="test1" labelKey='en' />
            <I18nInfo id="test2" labelKey='zh' />
        </WorkspaceBoundary>)

        cy.get("#test1").within(() => {
            const node = cy.root()
            node.get("[data-locale]").contains("en")
            node.get("[data-label]").contains("English")
            node.find("[data-na]").should('not.exist')
        })
        cy.get("#test2").within(() => {
            const node = cy.root()
            node.get("[data-locale]").contains("en")
            node.get("[data-label]").contains("Chinese")
            node.find("[data-na]").should('not.exist')
        })

        cy.mount(<WorkspaceBoundary defaultLanguage='zh' translations={[EnTranslationLoader, ZhTranslationLoader]}>
            <I18nInfo id="test1" labelKey='en' />
            <I18nInfo id="test2" labelKey='zh' />
        </WorkspaceBoundary>)

        cy.get("#test1").within(() => {
            const node = cy.root()
            node.get("[data-locale]").contains("zh")
            node.get("[data-label]").contains("英文")
            node.find("[data-na]").should('not.exist')
        })
        cy.get("#test2").within(() => {
            const node = cy.root()
            node.get("[data-locale]").contains("zh")
            node.get("[data-label]").contains("中文")
            node.find("[data-na]").should('not.exist')
        })

    },)
    it('should render & siwtch language correctly', () => {
        cy.mount(<WorkspaceBoundary defaultLanguage='en' translations={[EnTranslationLoader, ZhTranslationLoader]}>
            <I18nInfo id="test1" labelKey='en' />
            <LanguageSwitcher id="test2" />
        </WorkspaceBoundary>)
        cy.get("#test2").within(() => {
            let node = cy.get('option').should('have.length', 2).first()
            node.should('have.value', 'en').contains('English').should('have.attr', 'selected')
            node = cy.get('option').eq(1)
            node.should('have.value', 'zh').contains('Chinese').should('not.have.attr', 'selected')
        })
        cy.get('select').select('zh')
        cy.wait(shortWait)

        cy.get("#test1").within(() => {
            const node = cy.root()
            node.get("[data-locale]").contains("zh")
            node.get("[data-label]").contains("英文")
            node.find("[data-na]").should('not.exist')
        })

        cy.get("#test2").within(() => {
            let node = cy.get('option').should('have.length', 2).first()
            node.should('have.value', 'en').contains('英文').should('not.have.attr', 'selected')
            node = cy.get('option').eq(1)
            node.should('have.value', 'zh').contains('中文').should('have.attr', 'selected')
        })

        cy.get('select').select('en')
        cy.wait(shortWait)

        cy.get("#test1").within(() => {
            const node = cy.root()
            node.get("[data-locale]").contains("en")
            node.get("[data-label]").contains("English")
            node.find("[data-na]").should('not.exist')
        })
        cy.get("#test2").within(() => {
            let node = cy.get('option').should('have.length', 2).first()
            node.should('have.value', 'en').contains('English').should('have.attr', 'selected')
            node = cy.get('option').eq(1)
            node.should('have.value', 'zh').contains('Chinese').should('not.have.attr', 'selected')
        })
    },)
    it('should run progress indicator correctly', () => {
        fixProgressIndicator(cy)

        cy.mount(<WorkspaceBoundary defaultLanguage='en' translations={[EnTranslationLoader, ZhTranslationLoader]}>
            <SequentialProcessor id="test1" procNumber={2} maxTimeout={1000} />
        </WorkspaceBoundary>)

        cy.get('.nextspace-spi').should('not.exist')

        cy.get("#test1").get("button").should('be.visible').should('be.enabled').click()

        cy.wait(shortWait)
        cy.get("#test1").get("button").should('be.visible').should('not.be.enabled')

        //default timeout of spi is 500
        cy.wait(500)

        cy.get('.nextspace-spi').should('be.visible')


        cy.wait(2000)
        cy.get("#test1").get("button").should('be.visible').should('be.enabled')

        cy.get('.nextspace-spi').should('not.exist')
    })

    it('should run lazyPreload correctly', () => {
        fixProgressIndicator(cy)

        cy.mount(<WorkspaceBoundary defaultLanguage='en' translations={[EnTranslationLoader]}>
            <LazyPreloader id="test1" />
        </WorkspaceBoundary>)

        cy.get(".btn1").should('be.visible')
        cy.get(".btn2").should('be.visible')

        cy.get(".panel1").should('not.exist')
        cy.get(".panel2").should('not.exist')
        cy.get(".nextspace-modal").should('not.exist')

        //test lazy
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

