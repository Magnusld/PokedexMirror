describe('Testing info page - Info.tsx', () => {
    before('successfully loads', () => {
        cy.visit('/')
        cy.get(".search").type("meta")
        cy.get("#root > div > div > div.list > div > div.listAsGrid > div:nth-child(3) > a").click()
    })

    describe('Check top info', () => {
        it("Name is correct", () => {
            cy.get(".pokename").contains("Metagross")
        })
        it("Pokemon number is correct", () => {
            cy.get(".pokenum").contains("#376")
        })
        it("Species and generation is correct", () => {
            cy.get(".more-info").contains("Iron Leg Pokémon")
            cy.get(".more-info").contains("Generasjon: 3")
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
            cy.get(".stats-table>tr").eq(0).contains(80)
            cy.get(".stats-table>tr").eq(1).contains(135)
            cy.get(".stats-table>tr").eq(2).contains(130)
            cy.get(".stats-table>tr").eq(3).contains(95)
            cy.get(".stats-table>tr").eq(4).contains(90)
            cy.get(".stats-table>tr").eq(5).contains(70)
            cy.get(".stats-table>tr").eq(6).contains(600)
        })
        it("Abilities are correct", () => {
            cy.get(".ability-list>span").eq(0).contains("Clear Body")
            cy.get(".ability-list>span").eq(1).contains("Light Metal")
        })
    })
    
})