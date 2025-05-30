export const users: User[] = [
    {
        username: "YonyUk",
        password: "Yony01Uk@family"
    },
    {
        username: "Brayan",
        password: "030221"
    }
]

export const game_categories: GameCategory[] = [
    {
        categoryName: 'Actions Games'
    },
    {
        categoryName: 'Sports Games'
    },
    {
        categoryName: 'Adventures Games'
    },
    {
        categoryName: 'Arcade Games'
    },
    {
        categoryName: 'Fantasy Games'
    },
    {
        categoryName: 'Strategy Games'
    },
    {
        categoryName: 'Shooter Games'
    }
]

interface User {
    username: string,
    password: string
}

interface GameCategory {
    categoryName: string
}