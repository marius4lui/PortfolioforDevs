import data from '../../data.json';

export interface Venture {
    title: string;
    description: string;
    tag: string;
    url: string;
}

export interface Config {
    setupDismissed?: boolean;
    githubUsername: string;
    logoText: string;
    hero: {
        subtitle: string;
        title: string;
        titleSuffix: string;
    };
    ventures: Venture[];
    theme: {
        accentColor: string;
        textColor: string;
        secondaryColor: string;
        backgroundColor: string;
    };
}

export const config: Config = data;
