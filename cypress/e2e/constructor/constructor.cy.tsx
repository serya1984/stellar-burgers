/// <reference types="cypress" />

describe('тесты для страницы конструктора бургера', () => {
  const testUrl = 'http://localhost:4000/';
  const selectorIngredient = 'data-cy^="ingredient-item-';
  const modalWindowSelector = '[data-cy="modal-window"]';
  const buttonCloseSelector = '[data-cy="button-close"]';
  const topBunSelector = '[data-cy="topBun"]';
  const bottomBunSelector = '[data-cy="bottomBun"]';
  const fillingSelector = '[data-cy="filling"]';
  it('тест возврата фиктивных данных для тестового запроса', () => {
    cy.fixture('ingredients.json').then((mockIngredients) => {
      cy.intercept('GET', '**/api/ingredients', {
        statusCode: 200,
        body: mockIngredients
      }).as('getIngredients');

      cy.visit(testUrl);
      cy.wait('@getIngredients');


      cy.get(`[${selectorIngredient}"]`).should(
        'have.length',
        mockIngredients.data.length
      );
      cy.get(`[${selectorIngredient}2"]`).should(
        'contain.text',
        'Флюоресцентная булка R2-D3'
      );
    });
  });
  it('тест добавления ингредиентов в конструктор', () => {
    cy.fixture('ingredients.json').then((mockIngredients) => {
      cy.intercept('GET', '**/api/ingredients', {
        status: 200,
        body: mockIngredients
      }).as('getIngredients');

      cy.visit(testUrl);
      cy.wait('@getIngredients');

      cy.get(`[${selectorIngredient}2"]`)
        .should('contain.text', 'Флюоресцентная булка R2-D3')
        .contains('Добавить')
        .click();
      cy.get(topBunSelector).should(
        'contain.text',
        'Флюоресцентная булка R2-D3 (верх)'
      );
      cy.get(bottomBunSelector).should(
        'contain.text',
        'Флюоресцентная булка R2-D3 (низ)'
      );

      cy.get(`[${selectorIngredient}3"]`)
        .should('contain.text', "Филе Люминесцентного тетраодонтимформа")
        .contains('Добавить')
        .click();
      cy.get(fillingSelector).should(
        'contain.text',
        'Филе Люминесцентного тетраодонтимформа'
      );

      cy.get(`[${selectorIngredient}5"]`)
        .should('contain.text', 'Соус Spicy-X')
        .contains('Добавить')
        .click();
      cy.get(fillingSelector).should('contain.text', 'Соус Spicy-X');
    });
  });
  it('тест работы модальных окон', () => {
    cy.fixture('ingredients.json').then((mockIngredients) => {
      cy.intercept('GET', '**/api/ingredients', {
        status: 200,
        body: mockIngredients
      }).as('getIngredients');
    });

    cy.visit(testUrl);
    cy.wait('@getIngredients');

    cy.get(`[${selectorIngredient}1"]`)
      .should('contain.text', 'Краторная булка N-200i')
      .click();
    cy.get(modalWindowSelector).should(
      'contain.text',
      'Детали ингредиента'
    );
    cy.get(buttonCloseSelector).should('be.visible').click();
    cy.get(modalWindowSelector).should('not.exist');

    cy.get(`[${selectorIngredient}1"]`)
      .should('contain.text', 'Краторная булка N-200i')
      .click();
    cy.get(modalWindowSelector).should(
      'contain.text',
      'Детали ингредиента'
    );
    cy.get('[data-cy="overlay"]').click({ force: true });
    cy.get(modalWindowSelector).should('not.exist');
  });

  it('тест создания заказа', () => {
    cy.intercept('GET', '**/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'serya.198497@gmail.com', name: 'Sergey' }
      }
    }).as('getUser');

    cy.fixture('ingredients.json').then((mockIngredients) => {
      cy.intercept('GET', '**/api/ingredients', {
        status: 200,
        body: mockIngredients
      }).as('getIngredients');
    });
    cy.intercept('POST', '**/api/orders', {
      status: 200,
      body: {
        success: true,
        name: 'Био-марсианский люминесцентный краторный бургер',
        order: {
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa093f',
              name: 'Мясо бессмертных моллюсков Protostomia',
              type: 'main',
              proteins: 433,
              fat: 244,
              carbohydrates: 33,
              calories: 420,
              price: 1337,
              image: 'https://code.s3.yandex.net/react/code/meat-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-02-large.png',
              __v: 0
            }
          ],
          _id: '69d675e4a64177001b331f4c',
          owner: {
            name: 'Sergey',
            email: 'serya.198497@gmail.com',
            createdAt: '2026-02-10T15:28:39.659Z',
            updatedAt: '2026-02-16T16:58:58.640Z'
          },
          status: 'done',
          name: 'Бессмертный краторный бургер',
          createdAt: '2026-04-08T15:36:04.709Z',
          updatedAt: '2026-04-08T15:36:04.979Z',
          number: 103870,
          price: 2592
        }
      }
    }).as('createOrder');

    cy.intercept('get', '**/api/orders/all', {
      status: 200,
      body: {
        success: true,
        orders: [
          {
            number: 12345,
            name: 'Био-марсианский люминесцентный краторный бургер'
          }
        ]
      }
    }).as('getOrders');

    cy.setCookie('accessToken', 'Bearer test-token');

    cy.visit(testUrl);
    cy.wait('@getUser');
    cy.wait('@getIngredients');

    cy.get(`[${selectorIngredient}1"]`).contains('Добавить').click();
    cy.get(`[${selectorIngredient}3"]`).contains('Добавить').click();
    cy.get('[data-cy="orderButton"]').click();
    cy.wait('@createOrder');

    cy.get('body').then(($body) => {
      if ($body.find(modalWindowSelector).length > 0) {
        cy.log('Модальное окно найдено');
      } else {
        cy.log('Модальное окно не найдено!');
      }
    });

    cy.get(modalWindowSelector, { timeout: 10000 })
      .should('contain.text', '103870')
      .and('be.visible');

    cy.get(buttonCloseSelector).should('be.visible').click();
    cy.get(modalWindowSelector).should('not.exist');

    cy.get('[data-cy="constructor-price"]').should('have.text', '0');

    cy.get(topBunSelector).should('not.exist');
    cy.get(bottomBunSelector).should('not.exist');
    cy.get(fillingSelector).should('not.exist');
  });
});
