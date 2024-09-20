import { IntlShape } from 'react-intl';

export const intlHasKey = (intl: IntlShape, key: string) => {
    // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
    return intl.messages[key] !== undefined;
};
