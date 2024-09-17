import { MorsAktivitet } from '@navikt/fp-common';

import { hasValue } from './validationUtil';

export const getMorsAktivitet = (
    aktivitetskravMorValue: string | undefined,
    erMorForSykValue: boolean | undefined,
): MorsAktivitet | undefined => {
    if (hasValue(aktivitetskravMorValue)) {
        return aktivitetskravMorValue as MorsAktivitet;
    }
    if (erMorForSykValue) {
        return MorsAktivitet.TrengerHjelp;
    }
    return undefined;
};
