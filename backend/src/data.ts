export const food_array: any[] = [
    {
        id: '1',
        name: 'Delicious Pizza',
        price: 12.99,
        tags: ['vegan', 'italian'],
        favorite: true,
        stars: 5,
        imageUrl: './assets/food1.jpg',
        origins: ['Italy'],
        cookTime: 30
    },
    {
        id: '2',
        name: 'Tasty Burger',
        price: 8.99,
        tags: ['gluten-free', 'american'],
        favorite: false,
        stars: 4,
        imageUrl: './assets/food2.jpg',
        origins: ['USA'],
        cookTime: 20
    },
    {
        id: '3',
        name: 'Yummy Pasta',
        price: 10.99,
        tags: ['vegetarian', 'italian'],
        favorite: true,
        stars: 3.5,
        imageUrl: './assets/food3.jpg',
        origins: ['Italy'],
        cookTime: 25
    },
    {
        id: '4',
        name: 'Spicy Sushi',
        price: 15.99,
        tags: ['spicy', 'japanese'],
        favorite: false,
        stars: 4,
        imageUrl: './assets/food4.jpg',
        origins: ['Japan'],
        cookTime: 15
    },
    {
        id: '5',
        name: 'Savory Salad',
        price: 7.99,
        tags: ['vegan', 'gluten-free'],
        favorite: true,
        stars: 5,
        imageUrl: './assets/food5.jpg',
        origins: ['France'],
        cookTime: 10
    },
    {
        id: '6',
        name: 'Delicious Tacos',
        price: 9.99,
        tags: ['spicy', 'mexican'],
        favorite: false,
        stars: 4,
        imageUrl: './assets/food6.jpg',
        origins: ['Mexico'],
        cookTime: 20
    },
    {
        id: '7',
        name: 'Tasty Ramen',
        price: 13.99,
        tags: ['spicy', 'japanese'],
        favorite: true,
        stars: 5,
        imageUrl: './assets/food7.jpg',
        origins: ['Japan'],
        cookTime: 35
    },
    {
        id: '8',
        name: 'Yummy Pancakes',
        price: 6.99,
        tags: ['dessert', 'american'],
        favorite: false,
        stars: 4,
        imageUrl: './assets/food8.jpg',
        origins: ['USA'],
        cookTime: 15
    },
    {
        id: '9',
        name: 'Savory Dumplings',
        price: 11.99,
        tags: ['chinese', 'gluten-free'],
        favorite: true,
        stars: 5,
        imageUrl: './assets/food9.jpg',
        origins: ['China'],
        cookTime: 25
    },
    {
        id: '10',
        name: 'Spicy Curry',
        price: 14.99,
        tags: ['spicy', 'indian'],
        favorite: false,
        stars: 4,
        imageUrl: './assets/food10.jpg',
        origins: ['India'],
        cookTime: 40
    },
    {
        id: '11',
        name: 'Crispy Spring Rolls',
        price: 7.49,
        tags: ['appetizer', 'chinese'],
        favorite: true,
        stars: 4,
        imageUrl: './assets/food11.jpg',
        origins: ['China'],
        cookTime: 15
    },
    {
        id: '12',
        name: 'Grilled Chicken',
        price: 12.49,
        tags: ['gluten-free', 'healthy'],
        favorite: false,
        stars: 4,
        imageUrl: './assets/food12.jpg',
        origins: ['USA'],
        cookTime: 35
    },{
        id: '13',
        name: 'Spicy Chicken Wings',
        price: 9.99,
        tags: ['spicy', 'american'],
        favorite: true,
        stars: 5,
        imageUrl: './assets/food13.jpg',
        origins: ['USA'],
        cookTime: 25
}]

export const sample_users: any[] = [
    {
      name: "John Doe",
      email: "john@gmail.com",
      password: "12345",
      address: "Toronto On",
      isAdmin: true,
      balance:0
    },
    {
      name: "Jane Doe",
      email: "Jane@gmail.com",
      password: "12345",
      address: "Shanghai",
      isAdmin: false,balance:0},];

export const tokens_email: Record<string, boolean> = {};