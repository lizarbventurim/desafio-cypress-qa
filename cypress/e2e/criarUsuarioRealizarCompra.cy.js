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

describe("Cenário 09: Realizar compra com o usuário criado", () => {
  it("Adicionar produto ao carrinho e finalizar compra", () => {
    cy.get(".logo-in-theme > .logo > a > .logo-img")
      .should("be.visible")
      .click();
    cy.get(".product-block").first().click();
    cy.get(".single_add_to_cart_button").click();
    cy.get(".button-variable-item-XS").should("be.visible").click();
    cy.get(".button-variable-item-Orange").should("be.visible").click();
    cy.get(".single_add_to_cart_button").should("be.visible").click();
    cy.get(".product_title").then((res) => {
      itemName = res[0].innerText;
      cy.get(".woocommerce-message")
        .should("be.visible")
        .contains(`“${itemName}” foi adicionado no seu carrinho.`);
    });
    cy.get(".woocommerce-message > .button").should("be.visible").click();
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/carrinho/");
    cy.get(".page-title").should("be.visible").contains("Carrinho");
    cy.get(".checkout-button").should("be.visible").click();
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/checkout/");

    // Preencher os dados de faturamento
    cy.get("#billing_first_name").type(faker.person.firstName(), { delay: 0 });
    cy.get("#billing_last_name").type(faker.person.lastName(), { delay: 0 });
    cy.get("#billing_address_1").type(faker.location.streetAddress(), { delay: 0 });
    cy.get("#billing_city").type(faker.location.city(), { delay: 0 });
    cy.get("#billing_postcode").type(faker.location.zipCode("########"), { delay: 0 });
    cy.get("#billing_phone").type(faker.phone.number({ style: "national" }), { delay: 0 });
    cy.get("#billing_email").should("have.value", email);
    cy.get("#terms").should("be.visible").click();
    cy.get("#place_order").should("be.visible").click();
    cy.intercept("POST", "/?wc-ajax=checkout")
    cy.url().should("include", "/checkout/order-received/");
    cy.get(".woocommerce-notice")
      .should("be.visible")
      .contains("Obrigado. Seu pedido foi recebido.");

  });
});
