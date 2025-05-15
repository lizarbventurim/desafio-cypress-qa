
describe("Cenário 1: Validar acesso o site e verificar o título da página", () => {
  it("Acessar o site e verificar o carregamento da página ", () => {
    cy.visit("/");
    cy.url().should("include", "lojaebac.ebaconline.art.br");
    cy.get(".logo-img").should("be.visible");
  });
});
