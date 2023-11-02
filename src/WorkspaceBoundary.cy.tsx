import I18nInfo from '@cypress/components/I18nInfo'
import WorkspaceBoundary from './WorkspaceBoundary'
import TranslationRegister from './components/TranslationRegister'
import translationLoader, { TranslationLoaderProps } from './components/translationLoader'
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


const XyzTranslationLoader = translationLoader("xyz", () => import('@cypress/components/XyzTranslationLoader'))

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
        cy.mount(<WorkspaceBoundary defaultLanguage='xyz' translations={[XyzTranslationLoader]}>
            <I18nInfo id="test1" labelKey='abc' />
        </WorkspaceBoundary>)

        cy.get("#test1").within(()=>{
            cy.root().get("[data-locale]").contains("xyz")
            cy.root().get("[data-label]").contains("DEF")
            cy.root().find("[data-na]").should('not.exist')
        })

    },)
})

// Prevent TypeScript from reading file as legacy script
export { }
