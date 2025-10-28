import { useMemo } from 'react';

import { Forelder } from '@navikt/fp-constants';
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
                //todo denne er alltid undefined
                førsteUttaksdagNesteBarnsSak: undefined,
                modus,
            }),
        [søkersPerioder, annenPartsPerioder],
    );

    return komplettPlan;
};

export const getSøkersPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
) => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter((p) =>
              erFarEllerMedmor ? p.forelder === Forelder.farMedmor : p.forelder === Forelder.mor,
          )
        : gjeldendeUttaksplan;
};

export const getAnnenpartsPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
) => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter((p) =>
              erFarEllerMedmor ? p.forelder === Forelder.mor : p.forelder === Forelder.farMedmor,
          )
        : [];
};
