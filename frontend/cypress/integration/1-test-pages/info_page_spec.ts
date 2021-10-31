describe('Testing info page - Info.tsx', () => {
    before('successfully loads', () => {
      cy.visit('/info/520') // URL for pokemon nr. 391, Monferno
  
    })

    describe('Check top info', () => {
        it("Name is correct", () => {
            cy.get(".pokename").contains("Monferno")
        })
        it("Pokemon number is correct", () => {
            cy.get(".pokenum").contains("#391")
        })
        it("Species and generation is correct", () => {
            cy.get(".more-info").contains("Playful Pokémon")
            cy.get(".more-info").contains("Generasjon: 4")
        })
    })
    describe('Check middle info', () => {
        it("Height and weight is correct", () => {
            cy.get(".middle-container").contains("Weight: 22kg")
        })
    })
    describe('Check bottom info', () => {
        it("Stats are correct", () => {
            cy.get(".stats-table>tr").eq(0).contains(64)
            cy.get(".stats-table>tr").eq(1).contains(78)
            cy.get(".stats-table>tr").eq(2).contains(52)
            cy.get(".stats-table>tr").eq(3).contains(78)
            cy.get(".stats-table>tr").eq(4).contains(52)
            cy.get(".stats-table>tr").eq(5).contains(81)
            cy.get(".stats-table>tr").eq(6).contains(405)
        })
        it("Abilities are correct", () => {
            cy.get(".ability-list>span").eq(0).contains("Blaze")
            cy.get(".ability-list>span").eq(1).contains("Iron Fist")
        })
    })
    
})