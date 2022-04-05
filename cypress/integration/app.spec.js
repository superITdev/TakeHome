// e2e test, make it very simple right now with only navigation test
describe('Navigation', () => {
    it('should navigate to the posts page', () => {
        // Start from the index page -> redirected to '/posts'
        cy.visit('/')

        // The new url should include "/posts"
        cy.url().should('include', '/posts')
    })
})