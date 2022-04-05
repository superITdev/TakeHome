// e2e test, make it very simple right now with only navigation test
describe('Navigation', () => {
    it('should navigate to the posts page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "posts" and click it
        cy.get('a[href*="posts"]').click()

        // The new url should include "/posts"
        cy.url().should('include', '/posts')
    })
})