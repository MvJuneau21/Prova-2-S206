describe('Testes login', () => {
  it('Teste de login falho', () => {
    // Ignorar erros de origem cruzada (como CORS) pois estava dando erros em alguns testes
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });

    cy.visit('https://www.saucedemo.com')

    const { user, senha } = gerarLoginSenhaAleatorios()

    cy.get('[data-test="username"]').type(user)
    cy.get('[data-test="password"]').type(senha)
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('exist')
  });
  it('Teste de login com sucesso', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })
});

describe('Teste de compras', () =>{
  it('Realiza compra com sucesso', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('CARLINHOS')
    cy.get('[data-test="lastName"]').type('CAVALOS')
    cy.get('[data-test="postalCode"]').type('37490000')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="complete-header"]').should('exist')
  })
})

// Função para gerar usuário e senha aleatórios
function gerarLoginSenhaAleatorios() {
  const letras = 'abcdefghijklmnopqrstuvwxyz'
  const numeros = '0123456789'
  const especiais = '!@#$%&'

  const randomString = (length, chars) =>
    Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

  const user = 'user_' + randomString(6, letras + numeros)
  const senha =
    randomString(2, letras.toUpperCase()) +
    randomString(2, letras) +
    randomString(2, numeros) +
    randomString(2, especiais)

  return { user, senha }
}
