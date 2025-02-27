describe('batch translation', () => {
  beforeEach(() => {
    cy.exec('yarn reset')
  })

  it('should translate all articles', () => {
    cy.intercept('/translate/batch-translate').as('batchTranslateExecution')
    cy.intercept('/translate/batch-translate/content-types/').as(
      'batchTranslateContentTypes'
    )

    // Login and Navigate to Translate Page
    cy.login()
    cy.get('nav').contains('Translate').click()

    cy.wait('@batchTranslateContentTypes')

    // Start batch translation

    cy.get('button[data-cy="api::article.article.de.translate"]').focus()
    cy.get('button[data-cy="api::article.article.de.translate"]').click()

    // Complete dialog
    cy.get('div[role=dialog]')
      .contains('label', 'Locales')
      .invoke('attr', 'for')
      .then((id) => {
        cy.get('#' + id)
      })
      .click()
    cy.get('li[data-strapi-value=en]').click()
    cy.get('div[role=dialog] button').filter(':contains("Translate")').click()

    // Verify translation finished

    cy.wait('@batchTranslateContentTypes')

    cy.get('[data-cy="api::article.article.de"]')
      .contains('Job finished')
      .should('exist')
    cy.get('[data-cy="api::article.article.de"]')
      .contains('complete')
      .should('exist')
  })

  it('should translate and publish all articles', () => {
    cy.intercept('/translate/batch-translate').as('batchTranslateExecution')
    cy.intercept('/translate/batch-translate/content-types/').as(
      'batchTranslateContentTypes'
    )

    // Login and Navigate to Translate Page
    cy.login()
    cy.get('nav').contains('Translate').click()

    cy.wait('@batchTranslateContentTypes')

    // Start batch translation

    cy.get('button[data-cy="api::article.article.de.translate"]').focus()
    cy.get('button[data-cy="api::article.article.de.translate"]').click()

    // Complete dialog
    cy.get('div[role=dialog]')
      .contains('label', 'Locales')
      .invoke('attr', 'for')
      .then((id) => {
        cy.get('#' + id)
      })
      .click()
    cy.get('li[data-strapi-value=en]').click()
    cy.get('div[role=dialog]')
      .contains('label', 'Auto-Publish')
      .invoke('attr', 'for')
      .then((id) => {
        cy.get('#' + id)
      })
      .parent()
      .click()
    cy.get('div[role=dialog] button').filter(':contains("Translate")').click()

    // Verify translation finished

    cy.wait('@batchTranslateContentTypes')

    cy.get('[data-cy="api::article.article.de"]')
      .contains('Job finished')
      .should('exist')
    cy.get('[data-cy="api::article.article.de"]')
      .contains('complete')
      .should('exist')
  })
})
