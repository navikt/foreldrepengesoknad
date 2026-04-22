import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Barn, isAdoptertBarn, isFødtBarn, isIkkeUtfyltTypeBarn } from '@navikt/fp-types';

import { Uttaksdagen } from './uttak/Uttaksdagen';

export const beregnBarnehagestartDato = (dato: string | undefined): string | undefined => {
    if (!dato) return undefined;

    if (dayjs(dato).month() < 8) {
        return Uttaksdagen.denneEllerForrige(
            dayjs(dato).month(7).add(1, 'year').endOf('month').format(ISO_DATE_FORMAT),
        ).getDato();
    }
    if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) {
        return Uttaksdagen.denneEllerForrige(
            dayjs(dato).add(1, 'year').endOf('month').format(ISO_DATE_FORMAT),
        ).getDato();
    }
    return Uttaksdagen.denneEllerForrige(
        dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').endOf('week').endOf('month').format(ISO_DATE_FORMAT),
    ).getDato();
};

export const barnehagestartDato = (barnet: Barn): string | undefined => {
    if (isAdoptertBarn(barnet) || isIkkeUtfyltTypeBarn(barnet)) {
        return undefined;
    }

    const dato = isFødtBarn(barnet) ? barnet.fødselsdatoer[0]! : barnet.termindato;
    return beregnBarnehagestartDato(dato);
};
