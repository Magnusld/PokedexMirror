
describe('Testing home page', () => {
  before('successfully loads', () => {
    cy.visit('/') // URL for homepage

  })

  describe('Using options button', () => {

    it("can use navbar options", () => {
      cy.contains("Innstillinger").click()

      cy.get(".optionsContainer").children().should("contain", "Gen 3")
      cy.get(".optionsContainer").children().should("contain", "Fjerne alle valg")

      cy.get(".optionsButtonsContainer").find("svg").should("have.length", 18)
    })

    it("can close navbar options", () => {
      cy.contains("Innstillinger").click()

      cy.get(".optionsContainer").find(".optionsButtonsContainer").should("have.length", 0)
    })
  })

  describe('Swap between grid/list', () => {
    it("Grid to list", () => {
      cy.get(".list-grid-swap .active").click()
      cy.get(".listAsList").should("exist")
      cy.get(".listAsGrid").should("not.exist")

      cy.get(".list-grid-swap .active").click()
      cy.get(".listAsList").should("not.exist")
      cy.get(".listAsGrid").should("exist")
    })
  })

  describe('Changing content of List/Grid (using navbar)', () => {
    it("Search for Lucario", () => {
      cy.get(".search").type("Lucar")
      cy.get(".listAsGrid").contains("#448").should("exist")
      cy.get(".listAsGrid").contains("#387").should("not.exist")

    })
  })

  describe('Changing content of List/Grid (not using navbar)', () => {
    // Refresh page - resets content on page
    before('successfully refreshes', () => {
      cy.visit('/') // URL for homepage
  
    })

    it("Remove all generations", () => {
      cy.get(".listAsGrid").children().should("have.length", 15)


      cy.contains("Innstillinger").click()

      // hides navbar to access content behind
      cy.get(".topbar").hide()

      cy.get("#genOptions > button.clearAllButton.btn.btn-secondary").click()

      cy.get(".listAsGrid").children().should("have.length", 0)

    })

    it("Add generation 4", () => {
      cy.get(".optionsButtonsContainer").contains("Gen 4").click()

      cy.get(".listAsGrid").should("contain", "#387")
      cy.get(".listAsGrid").should("contain", "#401")
    })

    it("Remove grass type", () => {
      cy.get("#typeOptions > div.optionsButtonsContainer > label:nth-child(20)").click()
      cy.get(".listAsGrid").contains("#387").should("not.exist")
    })
  })

  describe('Using pagination', () => {
    it('"Forrige side" button disabled on page 1', () => {
      cy.get(".page-counter").should("contain", 1)
      cy.get(".showMore > .PageNavButtonGroups").contains("Forrige side").should("be.disabled")
    })

    it('Can change to page 7', () => {
      for(let n = 0; n < 6; n ++){
        cy.get(".showMore > .PageNavButtonGroups").contains("Neste side").click()
      }

      cy.get(".page-counter").should("contain", 7)
      cy.get(".showMore > .PageNavButtonGroups").contains("Forrige side").should("be.enabled")
      cy.get(".showMore > .PageNavButtonGroups").contains("Neste side").should("be.disabled")
      cy.get(".listAsGrid").should("contain", "Arceus")
    })

    it('Can return to page 1', () => {
      cy.get(".showMore > .PageNavButtonGroups").contains("Første side").click()
      cy.get(".page-counter").should("contain", 1)
    })
  })  
  
  describe('Can use sorting', () => {
    it("Sort after name, ascending", () => {
      cy.get('[aria-label="Sorting type"]').select("name")

      cy.get(".listAsGrid").should("contain", "Arceus")
      cy.get(".listAsGrid").should("not.contain", "Monferno")

    })

    it("Sort after name, descending", () => {
      cy.get('[aria-label="Sorting order"]').select("desc")

      cy.get(".listAsGrid").should("contain", "Uxie")
      cy.get(".listAsGrid").should("not.contain", "Monferno")

    })

    it("Sort after number, descending", () => {
      cy.get('[aria-label="Sorting type"]').select("pokedexNr")

      cy.get(".listAsGrid").should("contain", "Darkrai")
      cy.get(".listAsGrid").should("not.contain", "Monferno")

    })
    it("Sort after number, ascending", () => {
      cy.get('[aria-label="Sorting order"]').select("asc")

      cy.get(".listAsGrid").should("contain", "Monferno")
      cy.get(".listAsGrid").should("not.contain", "Darkrai")
    })
  })

  describe('Home page state is kept after changing page', () => {
    it("Go to info page and back to home page", () => {
      cy.get("#root > div > div > div.list > div > div.listAsGrid > div:nth-child(3) > a").click()
      cy.get(".back-button-link").click()
      cy.get(".back-button-link").should("not.exist")
    })

    it("State persists", () => {
      // Checks if grass type is removed
      cy.get(".listAsGrid").should("not.contain", "#387")

      // Checks if only generation enabled is gen 4
      // Chimchar should be first pokemon on page 1 if gen is 4
      cy.get(".listAsGrid").should("contain", "Chimchar")

      // Checks if Arceus is last pokemon
      // If Arceus is on last page, only gen 4 is enabled
      cy.get('[aria-label="Sorting order"]').select("desc", {force: true})
      cy.get(".listAsGrid").should("contain", "Arceus")
    })
  })
  
})