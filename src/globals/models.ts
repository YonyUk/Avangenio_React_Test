export interface Game {
    id: number
    name: string
    background_image: string
    tags: GameTag[]
}

interface GameTag {
    id: number
    name: string
    image_url: string
}
export interface StreamQueryResult {
    user_id: string
    user_login: string
    user_name: string
}

export interface ClientCredentials {
    access_token: string
    expires_in: number
    token_type: string
}

export interface TwitchUserSearchResult {
    display_name: string
    login: string
    profile_image_url: string
    offline_image_url: string
}