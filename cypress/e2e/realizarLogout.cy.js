///<reference types="cypress" />
import { faker } from "@faker-js/faker";

let email = faker.internet.email();
let password = faker.internet.password({
  length: 15,
  numeric: true,
  symbols: true,
});
let emailTratado = email.split("@")[0].toLowerCase();
let regEmail = "#reg_email";
let regPassword = "#reg_password";
let regButton = "[class=button][name=register]";
let itemName;
beforeEach(() => {
  cy.visit("/");
  cy.get("i.icon-user-unfollow.icons").should("be.visible").click();
  cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
  cy.get(regEmail).should("be.visible").type(email, { delay: 0 });
  cy.get(regPassword).should("be.visible").type(password, { delay: 0 });
  cy.get(regPassword).should("have.value", password);
  cy.get(".woocommerce-password-strength")
    .should("be.visible")
    .contains("Forte");
  cy.get(regButton).click();
  cy.get("a > .hidden-xs")
    .should("be.visible")
    .contains("Welcome " + emailTratado);
});

describe("Cenário 10: Validar logout do usuário", () => {
  it("Acesar página do usuário logado e realizar logout", () => {
    cy.get('a[href*="action=logout"]').should("contain.text", "Logout").click();
    cy.get("i.icon-user-unfollow.icons").should("be.visible").click();
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
  });
});
