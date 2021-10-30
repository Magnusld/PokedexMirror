describe('Testing home page - App.tsx', () => {
  before('successfully loads', () => {
    cy.visit('/') // URL for homepage

  })


  describe('Using options button', () => {

    it("can use navbar options", () => {
      cy.contains("Innstillinger").click()

      cy.get(".optionsContainer").children().contains("Gen 3")
      cy.get(".optionsContainer").children().contains("Fjerne alle valg")

      cy.get(".optionsButtonsContainer").find("svg").should("have.length", 18)
    })

    it("can close navbar options", () => {
      cy.contains("Innstillinger").click()

      cy.get(".optionsContainer").find(".optionsButtonsContainer").should("have.length", 0)
    })
  })

  describe('Changing content of List/Grid', () => {
    it("Remove all generations", () => {
      cy.get(".listAsGrid").children().should("have.length", 15)


      cy.contains("Innstillinger").click()
      cy.get(".optionsContainer").children().contains("Fjerne alle valg").click()

      cy.get(".listAsGrid").children().should("have.length", 0)

    })

    it("Add generation 4", () => {
      cy.get(".optionsButtonsContainer").contains("Gen 4").click()

      cy.get(".listAsGrid").contains("#387")
      cy.get(".listAsGrid").contains("#401")
    })

    it("Remove grass type", () => {
      cy.get("#root > div > div.optionsContainer > div:nth-child(3) > div > div.optionsButtonsContainer > label:nth-child(20)").click()

      cy.get(".listAsGrid").contains("#387").should("not.exist")
    })
    it("Search for Lucario", () => {
      cy.get(".search").type("Lucar")
      cy.get(".listAsGrid").contains("#448").should("exist")
      cy.get(".listAsGrid").contains("#387").should("not.exist")

    })
  })

  describe('Swap grid/list', () => {
    it("Grid to list", () => {
      cy.get(".list-grid-swap .active").click()
      cy.get(".listAsList").should("exist")
      cy.get(".listAsGrid").should("not.exist")

      cy.get(".list-grid-swap .active").click()
      cy.get(".listAsList").should("not.exist")
      cy.get(".listAsGrid").should("exist")
    })
  })
    
})