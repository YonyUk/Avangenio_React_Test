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