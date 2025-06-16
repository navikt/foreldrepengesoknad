import groupBy from 'lodash/groupBy';

import { uttaksplanRegler } from '.';
import { Søknadsinfo } from '../types/Søknadsinfo';
import { RegelStatus, UttaksplanRegelTestresultat } from './../types/regelTypes';
import { getRegelAvvik, hasRegelFeil, regelHarAvvik, regelPasserer } from './../utils/regelUtils';

const REGEL_INTL_PREFIX = 'uttaksplan.validering';

export const sjekkUttaksplanOppMotRegler = (valideringsgrunnlag: Søknadsinfo): RegelStatus[] => {
    return uttaksplanRegler().map((regel) => {
        const resultat = regel.test(valideringsgrunnlag);
        return resultat.passerer
            ? regelPasserer(regel)
            : regelHarAvvik(regel, REGEL_INTL_PREFIX, resultat.info, resultat.periodeId);
    });
};

export const validerUttaksplan = (søknadsinfo: Søknadsinfo): UttaksplanRegelTestresultat => {
    const resultat = sjekkUttaksplanOppMotRegler(søknadsinfo);

    const avvik = getRegelAvvik(resultat);
    const avvikPerPeriode = groupBy(
        avvik.filter((a) => a.periodeId !== undefined),
        (r) => r.periodeId,
    );

    const harFeil = hasRegelFeil(avvik);
    return {
        resultat,
        avvik,
        avvikPerPeriode,
        harFeil,
    };
};
