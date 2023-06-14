// prettier-ignore
const preposisjonerNor = ['OM', 'OVENFOR', 'ETTER', 'MOT', 'BLANT', 'RUNDT', 'SOM', 'PÅ', 'FØR', 'BAK', 'NEDENFOR', 'UNDER', 'MELLOM', 'UTOVER', 'MEN', 'AV', 'NED', 'UNNTATT', 'FOR', 'FRA', 'I', 'INNSIDEN', 'INN', 'NESTE', 'AV', 'PÅ', 'MOTSATT', 'UT', 'UTENFOR', 'OVER', 'PER', 'RUNDE', 'SIDEN', 'ENN', 'GJENNOM', 'TIL', 'TIL', 'MOT', 'UNDER', 'TIL', 'OPP', 'VIA', 'MED', 'INNEN', 'UTEN', 'DETTE'];

// prettier-ignore
const preposisjonerEng = ['ABOUT', 'ABOVE', 'AFTER', 'AGAINST', 'AMONG', 'AROUND', 'AS', 'AT', 'BEFORE', 'BEHIND', 'BELOW', 'BENEATH', 'BETWEEN', 'BEYOND', 'BUT', 'BY', 'DOWN', 'EXCEPT', 'FOR', 'FROM', 'IN', 'INSIDE', 'INTO', 'NEXT', 'OF', 'ON', 'OPPOSITE', 'OUT', 'OUTSIDE', 'OVER', 'PER', 'ROUND', 'SINCE', 'THAN', 'THROUGH', 'TILL', 'TO', 'TOWARD', 'UNDER', 'UNTIL', 'UP', 'VIA', 'WITH', 'WITHIN', 'WITHOUT', 'THIS'];

const preposisjoner = [...preposisjonerNor, ...preposisjonerEng];
const forkortelser = ['AS', 'ASA'];

const normalizeWord =
    (isFirstWord: boolean) =>
    (word: string): string => {
        if (forkortelser.includes(word)) {
            return word;
        } else if (preposisjoner.includes(word) && !isFirstWord) {
            return word.toLowerCase();
        } else {
            return word.slice(0, 1) + word.slice(1).toLowerCase();
        }
    };

const SPACE = ' ';
const COMMA = ',';
const HYPHEN = '-';

const normalizeName = (name: string) => {
    return name
        .split(COMMA)
        .map((chunkOfName) =>
            chunkOfName
                .split(SPACE)
                .map((word, wordIndex) =>
                    word
                        .split(HYPHEN)
                        .map(normalizeWord(wordIndex === 0))
                        .join(HYPHEN)
                )
                .join(SPACE)
        )
        .join(COMMA);
};

export default normalizeName;
