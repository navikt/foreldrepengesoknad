import { ANTALL_UTTAKSDAGER_SEKS_UKER, isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import dayjs from 'dayjs';
import { isUttaksperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { andreAugust2022ReglerGjelder } from './dateUtils';
import { TidsperiodeDate } from '@navikt/fp-common';
import { finnAntallDagerÅTrekke } from 'app/steps/uttaksplan-info/utils/uttaksPlanStatus';
import { Situasjon } from 'app/types/Situasjon';

export const ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL = 10;
export const ANTALL_UTTAKSDAGER_TO_UKER = 10;

export const gjelderWLBReglerFarMedmorRundtFødsel = (
    familiehendelsesdato: Date,
    søkerErFarEllerMedmor: boolean,
    morHarRett: boolean,
    situasjon: Situasjon
) => {
    const gjelderWLB = andreAugust2022ReglerGjelder(familiehendelsesdato);
    return gjelderWLB && søkerErFarEllerMedmor && morHarRett && situasjon === 'fødsel';
};

export const isUttaksperiodeFarMedmorPgaFødsel = (periode: Periode): boolean => {
    return (
        isUttaksperiode(periode) &&
        periode.forelder === Forelder.farMedmor &&
        periode.konto === StønadskontoType.Fedrekvote &&
        !!periode.erMorForSyk === false &&
        periode.morsAktivitetIPerioden === undefined &&
        !!periode.ønskerFlerbarnsdager === false &&
        periode.ønskerSamtidigUttak === true
    );
};

export const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: Date): Date => {
    const førsteUttaksdagFørFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerForrige();
    return Uttaksdagen(førsteUttaksdagFørFamiliehendelsesdato).trekkFra(ANTALL_UTTAKSDAGER_TO_UKER);
};

export const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: Date): Date => {
    const førsteUttaksdagEtterFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    return Uttaksdagen(
        Uttaksdagen(førsteUttaksdagEtterFamiliehendelsesdato).leggTil(ANTALL_UTTAKSDAGER_SEKS_UKER)
    ).forrige();
};

export const starterTidsperiodeEtter2UkerFørFødsel = (tidsperiode: any, familiehendelsesdato: Date): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato);
    return dayjs(tidsperiode.fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

export const starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (
    tidsperiode: any,
    familiehendelsesdato: Date
) => {
    return (
        starterTidsperiodeEtter2UkerFørFødsel(tidsperiode, familiehendelsesdato) &&
        dayjs(tidsperiode.fom).isSameOrBefore(getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato), 'day')
    );
};

export const getFarMedmorUttakRundtFødsel = (perioder: Periode[], familiehendelsesdato: Date): Periode[] => {
    return perioder
        .filter((p) => isUttaksperiodeFarMedmorPgaFødsel(p))
        .filter((p) =>
            starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(p.tidsperiode, familiehendelsesdato)
        );
};

export const erFarMedmorSinWLBPeriodeRundtFødsel = (
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    periodetype: Periodetype,
    konto: StønadskontoType,
    erFarEllerMedmor: boolean
): boolean => {
    return (
        tidsperiode !== undefined &&
        isValidTidsperiode(tidsperiode) &&
        erFarEllerMedmor &&
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        periodetype === Periodetype.Uttak &&
        konto === StønadskontoType.Fedrekvote &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(tidsperiode, familiehendelsesdato)
    );
};

export const getLengdePåForeslåttWLBUttakFarMedmor = (familiehendelsesdato: Date, startDatoUttak: Date): number => {
    const sisteUttaksDagFørFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    const antallUttaksdagerFraStartDato = finnAntallDagerÅTrekke({
        tidsperiode: { fom: startDatoUttak, tom: sisteUttaksDagFørFødsel },
    } as Periode);
    return Math.min(antallUttaksdagerFraStartDato, ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL);
};
