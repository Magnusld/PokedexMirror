describe('Home page react pokedex', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL

    })

    it("can use navbar options", () => {
      cy.contains("Velg Generasjon").click()

      cy.get(".optionsContainer").children().contains("Gen 3")
      cy.get(".optionsContainer").children().contains("Fjerne alle valg")

      cy.contains("Velg Type").click()

      cy.get(".optionsButtonsContainer").find("svg").should("have.length", 18)
    })

    it("can close navbar options", () => {
      cy.contains("Velg Generasjon").click()

      cy.get(".optionsContainer").find(".optionsButtonsContainer").should("have.length", 1)

      cy.contains("Velg Type").click()

      cy.get(".optionsContainer").find(".optionsButtonsContainer").should("have.length", 0)
    })
})