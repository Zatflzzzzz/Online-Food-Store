# 🍔 Food Store Project

[![Angular](https://img.shields.io/badge/Frontend-Angular-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📋 Описание проекта

**Food Store** — это веб-приложение для просмотра, выбора и покупки еды. Оно подойдет как для пользователей, которые хотят быстро найти и заказать блюда, так и для владельцев ресторанов, стремящихся предоставить своим клиентам удобный способ оформления заказов.

### Основные возможности:
- Просмотр каталога еды с подробной информацией о каждом блюде.
- Добавление товаров в корзину и оформление заказа.
- Современный и интуитивно понятный интерфейс.
- Поддержка работы с базой данных MongoDB для хранения информации о продуктах и заказах.

---

## 🛠️ Используемые технологии

- **Frontend**: Angular
- **Backend**: Node.js с использованием Express.js
- **Database**: MongoDB

---

## 🚀 Запуск проекта

Следуйте этой инструкции, чтобы развернуть проект локально.

### 1. Клонирование репозитория

    git clone <ссылка-на-репозиторий>
    cd the-final-project

2. Настройка Backend

    Перейдите в директорию backend:

        cd backend

Установите зависимости:

    npm install

Настройте подключение к базе данных:

В папке the-final-project/backend/src/ создайте файл .env
Добавьте в него строку с вашей ссылкой на MongoDB, вашим email и паролем:

        MONGO_URI=ваша_ссылка_на_bазу
        JWT_SECRET=ваш jwt secret
        email=ваш email
        password=ваш password

3. Запуск Frontend

    Перейдите в директорию frontend:

        cd ../frontend

    Запустите приложение:
    
        ng serve

4. Запуск Backend

    Вернитесь в директорию backend:

        cd ../backend

    Установите зависимости:

        npm install

   Запустите сервер:

        npm start

📂 Структура проекта

    the-final-project/
    │
    ├── frontend/            # Исходный код клиентской части (Angular)
    ├── backend/             # Исходный код серверной части (Node.js)
    │   ├── src/             # Основные файлы Backend
    │   └── .env             # Файл для переменных среды
    └── README.md            # Документация проекта

📖 Дополнительная информация

Если у вас возникли вопросы или вы хотите внести свой вклад, обратитесь через Issues в репозитории или свяжитесь с нами по электронной почте.

🧑‍💻 Контакты

    Автор: [Пашкович Тимофей Алексеевич]
    Email: [timofeysangjey@gmail.com]
