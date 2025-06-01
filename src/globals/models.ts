export interface Game {
    id: number
    name: string,
    background_image: string
    tags: GameTag[]
}

interface GameTag {
    id: number
    name: string
    image_url: string
}