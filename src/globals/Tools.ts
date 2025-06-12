import { Theme } from "./Themes";

export const getThemeName = (theme: Theme): string => {
    switch (theme) {
        case Theme.LIGHT:
            return 'light';

        case Theme.DARK:
            return 'dark';

        default:
            return ''
    }
}

export const TWITCH_STREAMS_API_URL = 'https://api.twitch.tv/helix/streams'
export const TWITCH_AUTH_API_URL = 'https://id.twitch.tv/oauth2/token'
export const TWITCH_USERS_API_URL = 'https://api.twitch.tv/helix/users'
export const TWITCH_MATCHS_API_URL = 'https://api.twitch.tv/helix/esports/schedule'
export const TWITCH_TOURNAMENTS_API_URL = 'https://api.twitch.tv/helix/esports/tournaments'