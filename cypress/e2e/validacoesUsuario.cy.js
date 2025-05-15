///<reference types="cypress" />
import { faker } from "@faker-js/faker";

let email = faker.internet.email();
let password = faker.internet.password({length: 15, numeric: true, symbols: true});
let emailTratado = email.split("@")[0].toLowerCase();
let messageError = ".woocommerce-error"
let regEmail = "#reg_email";
let regPassword = "#reg_password";
let regButton = '[class=button][name=register]';
let loginEmail = "#username";
let loginPassword = "#password";
let loginButton = '[class=button][name=login]';

beforeEach(() => {
  cy.visit("/");
})

describe("Cenário 2: Validar criação de novo cadastro de usuário", () => {
  it("Acessar a página e criar um novo usuário", () => {
    cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get(regEmail).should('be.visible').type(email, {delay: 0});
    cy.get(regPassword).should("be.visible").type(password, {delay: 0});
    cy.get(regPassword).should("have.value", password);
    cy.get('.woocommerce-password-strength').should("be.visible").contains("Forte");
    cy.get(regButton).click();
    cy.get('a > .hidden-xs').should("be.visible").contains("Welcome " + emailTratado);




  
  });
});

describe("Cenário 3: Validar criação  de novo cadastro com usuário já existente", () => {

    it("Acessar a página de cadastro e criar novo usuário com email já existente", () => {
        cy.visit("http://lojaebac.ebaconline.art.br/");
        cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
        cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
        cy.get(regEmail).should('be.visible').type(email, {delay: 0});
        cy.get(regPassword).should("be.visible").type(password, {delay: 0});
        cy.get(regPassword).should("have.value", password);
        cy.get(regButton).click();
        cy.get(messageError).should("be.visible").contains("Erro: Uma conta já está registrada com seu endereço de e-mail. ");
    });
})

describe("Cenário 4: Validar login com usuário criado", () => {
  it("Acessar a página de login e realizar login com usuário já existente", () => {
    cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get(loginEmail).should('be.visible').type(email, {delay: 0});
    cy.get(loginPassword).should("be.visible").type(password, {delay: 0});
    cy.get(loginPassword).should("have.value", password);
    cy.get(loginButton).click();
    cy.get('a > .hidden-xs').should("be.visible").contains("Welcome " + emailTratado);
  });
});

describe("Cenário 5: Validar login com usuário não existente", () => {
  it("Acessar a página de login e realizar login com usuário não existente", () => {
    cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get(loginEmail).should('be.visible').type(faker.internet.email(), {delay: 0});
    cy.get(loginPassword).should("be.visible").type(password, {delay: 0});
    cy.get(loginPassword).should("have.value", password);
    cy.get(loginButton).click();
    cy.get(messageError).should("be.visible").contains('Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.');
  });
});

describe("Cenário 6: Validar login com senha incorreta", () => {
  it("Acessar a página de login e realizar login com senha incorreta", () => {
    cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get(loginEmail).should('be.visible').type(email, {delay: 0});
    cy.get(loginPassword).should("be.visible").type(faker.internet.password(), {delay: 0});
    cy.get(loginButton).click();
    cy.get(messageError).should("be.visible").contains(`A senha fornecida para o e-mail ${email} está incorreta. Perdeu a senha?`);
  });
});

describe("Cenário 7: Validar recuperação de senha com email cadastrado", () => {
  it("Acessar a página de login e realizar recuperação de senha com email cadastrado", () => {
    cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get('.lost_password > a').should('be.visible').click();
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/lost-password/");
    cy.get('#user_login').should('be.visible').type(email, {delay: 0});
    cy.get('.woocommerce-Button').should('be.visible').click();
    cy.get('.woocommerce-message').should("be.visible").contains('O e-mail de redefinição de senha foi enviado.');
  });
})

describe("Cenário 8: Validar recuperação de senha com email não cadastrado", () => {
  it("Acessar a página de login e realizar recuperação de senha com email não cadastrado", () => {
    cy.get('i.icon-user-unfollow.icons').should('be.visible').click()
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get('.lost_password > a').should('be.visible').click();
    cy.url().should("eq", "http://lojaebac.ebaconline.art.br/minha-conta/lost-password/");
    cy.get('#user_login').should('be.visible').type(faker.internet.email(), {delay: 0});
    cy.get('.woocommerce-Button').should('be.visible').click();
    cy.get(messageError).should("be.visible").contains('Nome de usuário ou e-mail inválido.');
  });
})