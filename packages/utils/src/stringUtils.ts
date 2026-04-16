import { IntlShape } from 'react-intl';

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
    const sisteBokstav = (navn.at(-1) ?? '').toLowerCase();
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

const usynligeCharsRegex = /[\p{Cf}\p{Zs}]/gu;

export const replaceInvisibleCharsWithSpace = (inputString: string): string | null => {
    if (inputString === '') {
        return null;
    }

    return inputString.replace(usynligeCharsRegex, '\u0020');
};

/**
 * Legger til oppramsing av strenger. Eksempelvis ["epler", "bananer", "pærer] blir "epler, bananer og pærer.
 */
export const formatOppramsing = (strenger: string[], intl: IntlShape) => {
    // "nn" (nynorsk) er ikkje støtta av Intl.ListFormat i alle nettlesarar, og fell då tilbake til engelsk.
    // Sidan "nb" og "nn" brukar same konjunksjon ("og"), kan vi bruke "nb" som fallback.
    const locale = intl.locale === 'nn' ? 'nb' : intl.locale;
    const formatterer = new Intl.ListFormat(locale, {
        style: 'long',
        type: 'conjunction',
    });
    return formatterer.format(strenger);
};
