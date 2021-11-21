describe('Testing info page - Info.tsx', () => {
    before('successfully loads', () => {
        cy.visit('/')
        cy.get(".search").type("meta")
        cy.get("#root > div > div > div.list > div > div.listAsGrid > div:nth-child(3) > a").click()
    })

    describe('Check top info', () => {
        it("Name is correct", () => {
            cy.get(".pokename").should("contain", "Metagross")
        })
        it("Pokemon number is correct", () => {
            cy.get(".pokenum").should("contain", "#376")
        })
        it("Species and generation is correct", () => {
            cy.get(".more-info").should("contain", "Iron Leg Pokémon")
            cy.get(".more-info").should("contain", "Generasjon: 3")
        })
    })
    describe('Check middle info', () => {
        it("Height and weight is correct", () => {
            cy.get(".middle-container").contains("Weight: 550kg")
            cy.get(".middle-container").contains("Height: 1.6m")
        })
    })
    describe('Check bottom info', () => {
        it("Stats are correct", () => {
            cy.get(".stats-table>tbody>tr").eq(0).should("contain", 80)
            cy.get(".stats-table>tbody>tr").eq(1).should("contain", 135)
            cy.get(".stats-table>tbody>tr").eq(2).should("contain", 130)
            cy.get(".stats-table>tbody>tr").eq(3).should("contain", 95)
            cy.get(".stats-table>tbody>tr").eq(4).should("contain", 90)
            cy.get(".stats-table>tbody>tr").eq(5).should("contain", 70)
            cy.get(".stats-table>tbody>tr").eq(6).should("contain", 600)
        })
        it("Abilities are correct", () => {
            cy.get(".ability-list>span").eq(0).should("contain", "Clear Body")
            cy.get(".ability-list>span").eq(1).should("contain", "Light Metal")
        })
    })
    
})