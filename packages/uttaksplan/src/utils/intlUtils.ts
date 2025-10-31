import { IntlShape } from 'react-intl';

export const intlHasKey = (intl: IntlShape, key: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
    return intl.messages[key] !== undefined;
};
