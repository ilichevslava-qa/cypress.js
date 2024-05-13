describe('Проверка авторизации', function () {

    it('1. Проверка на позитивный кейс авторизации', function () {
         cy.visit('https://login.qa.studio/'); //Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст. пароль

         cy.get('#mail').type('german@dolnikov.ru'); //Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
         cy.get('#loginButton').click(); //Нажал ввойти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Проверяю, что после авт. вижу текст
         cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Есть крестик и он виден для пользователя
     })


     it('2. Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст. пароль

        cy.get('#forgotEmailButton').click(); //Нажимаю восстановить пароль

        cy.get('#mailForgot').type('german@dolnikov.ru'); //Ввели почтовый адрес
        cy.get('#restoreEmailButton').click(); //Нажимаю отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Есть крестик и он виден для пользователя
    })


    it('3. Проверка на негативный кейс авторизации (НЕ правильный пароль)', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст. пароль

        cy.get('#mail').type('german@dolnikov.ru'); //Ввели верный логин
        cy.get('#pass').type('iLoveqastudio7'); //Ввели не верный пароль
        cy.get('#loginButton').click(); //Нажал ввойти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Есть крестик и он виден для пользователя
    })


    it('4. Проверка на негативный кейс авторизации (НЕ правильный логин)', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст. пароль

        cy.get('#mail').type('man@dolnikov.ru'); //Ввели не верный логин
        cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
        cy.get('#loginButton').click(); //Нажал ввойти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Есть крестик и он виден для пользователя
    })


    it('5. Проверка на негативный кейс валидации', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст. пароль

        cy.get('#mail').type('germandolnikov.ru'); //Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
        cy.get('#loginButton').click(); //Нажал ввойти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Есть крестик и он виден для пользователя
    })


    it('6. Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст. пароль

        cy.get('#mail').type('GerMan@Dolnikov.ru'); //Ввели верный логин (с заглавными буквами)
        cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
        cy.get('#loginButton').click(); //Нажал ввойти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); //Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Есть крестик и он виден для пользователя
    })
 })

 describe('Покупка аватара', function () {                               // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.me/');                          // переходим на сайт https://pokemonbattle.me/
         cy.get('input[type="email"]').type('USER_LOGIN');      // вводим логин
         cy.get('input[type="password"]').type('USER_PASSWORD');    // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
         cy.get('.header__btns > [href="/shop"]').click();               // нажимаем кнопку Магазин
         cy.get('.available > button').first().click();                  // кликаем по кнопке Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');                     // вводим номер карты
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
         cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });





