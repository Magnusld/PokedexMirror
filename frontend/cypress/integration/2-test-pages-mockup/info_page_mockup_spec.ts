const FULL_STAR_COLOR = 'rgb(241, 165, 69)'
const EMPTY_STAR_COLOR = 'rgb(204, 204, 204)'

describe('Testing info page with mocking - Info.tsx', () => {
    describe('Testing "TestPokemon1"', () => {
        before('successfully loads', () => {
            cy.visit('/')
            cy.get(".search").type("1")
            cy.get(".listingAsGrid").click()
        })
        describe('Check top info', () => {
            it("Name is correct", () => {
                cy.get(".pokename").should("contain", "TestPokemon1")
            })
            it("Pokemon number is correct", () => {
                cy.get(".pokenum").should("contain", "#5")
            })
            it("Species and generation is correct", () => {
                cy.get(".more-info").should("contain", "Test1")
                cy.get(".more-info").should("contain", "Generasjon: 1")
            })
        })
        describe('check rating functionality', () => {
            /**
             * checks the last span(star) if it is yellow
             * If last is yellow, means rating is a total of 5 stars (since all stars are then yellow)
             */
            it("aggregated rating is 5 stars", () => {
                cy.get(".aggregated-rating-container > span > span").eq(4).should('not.have.css', 'color', EMPTY_STAR_COLOR)
                cy.get(".aggregated-rating-container > span > span").eq(4).should('have.css', 'color', FULL_STAR_COLOR)
            })

            it("set personal rating to 1", () => {
                cy.get(".personal-rating-container > span > span").eq(0).click()

                cy.get(".aggregated-rating-container > span > span").eq(4).should('have.css', 'color', EMPTY_STAR_COLOR)
                cy.get(".aggregated-rating-container > span > span").eq(3).should('have.css', 'color', EMPTY_STAR_COLOR)
                cy.get(".aggregated-rating-container > span > span").eq(2).should('have.css', 'color', FULL_STAR_COLOR)
            })
        })
        describe('Check middle info', () => {
            it("Height and weight is correct", () => {
                cy.get(".middle-container").should("contain", "Weight: 5kg")
                cy.get(".middle-container").should("contain", "Height: 5m")
            })
        })
        describe('Check bottom info', () => {
            it("Stats are correct", () => {
                cy.get(".stats-table>tbody>tr").eq(0).should("contain", 5)
                cy.get(".stats-table>tbody>tr").eq(1).should("contain", 5)
                cy.get(".stats-table>tbody>tr").eq(2).should("contain", 5)
                cy.get(".stats-table>tbody>tr").eq(3).should("contain", 5)
                cy.get(".stats-table>tbody>tr").eq(4).should("contain", 5)
                cy.get(".stats-table>tbody>tr").eq(5).should("contain", 5)
                cy.get(".stats-table>tbody>tr").eq(6).should("contain", 30)
            })
            it("Abilities are correct", () => {
                cy.get(".ability-list>span").eq(0).should("contain", "TestAbility1")
                cy.get(".ability-list>span").eq(1).should("contain", "TestAbility2")
                cy.get(".ability-list>span").eq(2).should("contain", "TestAbility3")
            })
        })
    })

    describe('Testing "TestPokemon2"', () => {
        before('successfully loads', () => {
            cy.visit('/')
            cy.get(".search").type("2")
            cy.get(".listingAsGrid").click()
        })
        describe('check rating functionality', () => {
            it("personal and aggregated rating is empty", () => {
                for (let i = 0; i < 5; i++) {
                    cy.get(".aggregated-rating-container > span > span").eq(i).should('have.css', 'color', EMPTY_STAR_COLOR)
                    cy.get(".personal-rating-container > span > span").eq(i).should('have.css', 'color', EMPTY_STAR_COLOR)
                }
            })

            it("change personal to 5 star", () => {
                cy.get(".personal-rating-container > span > span").eq(4).click()
                for (let i = 0; i < 5; i++) {
                    cy.get(".personal-rating-container > span > span").eq(i).should('have.css', 'color', FULL_STAR_COLOR)
                }
            })

            it("check if aggregated is 5 star", () => {
                for (let i = 0; i < 5; i++) {
                    cy.get(".aggregated-rating-container > span > span").eq(i).should('have.css', 'color', FULL_STAR_COLOR)
                }
            })
        })

    })
    
})