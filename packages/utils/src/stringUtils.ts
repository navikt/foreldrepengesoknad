export const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const LOWERCASE_WORDS = ['og', 'and', 'i', 'in'];
const UPPERCASE_WORDS = ['as'];
export const capitalizeFirstLetterInEveryWordOnly = (s?: string): string | undefined => {
    if (!s) {
        return undefined;
    }
    return s
        .toLowerCase()
        .split(' ')
        .map((p) => {
            if (UPPERCASE_WORDS.includes(p)) {
                return p.toUpperCase();
            } else if (LOWERCASE_WORDS.includes(p)) {
                return p;
            }
            return capitalizeFirstLetter(p);
        })
        .join(' ');
};

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string, locale: string): string => {
    if (locale !== 'nb') {
        return navn;
    }
    if (navnSlutterPåSLyd(navn)) {
        return `${navn}'`;
    }
    return `${navn}s`;
};
