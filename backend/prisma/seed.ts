import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const food_array = [
    {
        name: "Delicious Pizza",
        price: 12.99,
        tags: ["vegan", "italian"],
        favorite: true,
        stars: 5,
        imageUrl: "./assets/food1.jpg",
        origins: ["Italy"],
        cookTime: "30"
    },
    {
        name: "Tasty Burger",
        price: 8.99,
        tags: ["gluten-free", "american"],
        favorite: false,
        stars: 4,
        imageUrl: "./assets/food2.jpg",
        origins: ["USA"],
        cookTime: "20"
    },
    {
        name: "Yummy Pasta",
        price: 10.99,
        tags: ["vegetarian", "italian"],
        favorite: true,
        stars: 3.5,
        imageUrl: "./assets/food3.jpg",
        origins: ["Italy"],
        cookTime: "25"
    }
];

const sample_users = [
    {
        email: "john@gmail.com",
        password: "12345",
        name: "John Doe",
        address: "Toronto On",
        isAdmin: true,
        balance: 0
    },
    {
        email: "Jane@gmail.com",
        password: "12345",
        name: "Jane Doe",
        address: "Shanghai",
        isAdmin: false,
        balance: 0
    }
];

async function seedDatabase() {
    console.log("Seeding database...");

    // Очистка базы перед добавлением данных (необязательно, но полезно для тестов)
    await prisma.food.deleteMany();
    await prisma.user.deleteMany();

    // Добавляем еду
    for (const food of food_array) {
        await prisma.food.create({ data: food });
    }

    // Добавляем пользователей
    for (const user of sample_users) {
        await prisma.user.create({ data: user });
    }

    console.log("Database seeded successfully!");
}

seedDatabase()
    .catch((error) => {
        console.error("Error seeding database:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export { seedDatabase };