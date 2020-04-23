describe("Appointments", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.request("GET", "/api/debug/reset")
  });
  
  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click()
      .should("have.class", "day-list__item--selected");

    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })
})