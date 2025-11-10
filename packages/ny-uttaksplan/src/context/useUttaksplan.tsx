import { useMemo } from 'react';

import { SaksperiodeNy } from '@navikt/fp-types';

import { Planperiode } from '../types/Planperiode';
import { utledKomplettPlan } from '../utils/periodeUtils';
import { useUttaksplanData } from './UttaksplanDataContext';

export const useUttaksplan = (saksperioder: SaksperiodeNy[]): Planperiode[] => {
    const {
        familiesituasjon,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        erFarEllerMedmor,
        modus,
        bareFarMedmorHarRett,
        erDeltUttak,
    } = useUttaksplanData();

    const søkersPerioder = getSøkersPerioder(erDeltUttak, saksperioder, erFarEllerMedmor);
    const annenPartsPerioder = getAnnenpartsPerioder(erDeltUttak, saksperioder, erFarEllerMedmor);

    const komplettPlan = useMemo(
        () =>
            utledKomplettPlan({
                familiehendelsedato,
                erFarEllerMedmor,
                søkersPerioder,
                annenPartsPerioder,
                gjelderAdopsjon: familiesituasjon === 'adopsjon',
                bareFarMedmorHarRett,
                harAktivitetskravIPeriodeUtenUttak,
                //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
                førsteUttaksdagNesteBarnsSak: undefined,
                modus,
            }),
        [
            søkersPerioder,
            annenPartsPerioder,
            erFarEllerMedmor,
            bareFarMedmorHarRett,
            familiehendelsedato,
            familiesituasjon,
            harAktivitetskravIPeriodeUtenUttak,
            modus,
        ],
    );

    return komplettPlan;
};

export const getSøkersPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
) => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter((p) => (erFarEllerMedmor ? p.forelder === 'FAR_MEDMOR' : p.forelder === 'MOR'))
        : gjeldendeUttaksplan;
};

export const getAnnenpartsPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
) => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter((p) => (erFarEllerMedmor ? p.forelder === 'MOR' : p.forelder === 'FAR_MEDMOR'))
        : [];
};
