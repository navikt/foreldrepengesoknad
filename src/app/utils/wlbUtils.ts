import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import dayjs from 'dayjs';
import { isUttaksperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { andreAugust2022ReglerGjelder } from './dateUtils';
import { intlUtils, TidsperiodeDate } from '@navikt/fp-common';
import { finnAntallDagerÅTrekke } from 'app/steps/uttaksplan-info/utils/uttaksPlanStatus';
import { Situasjon } from 'app/types/Situasjon';
import { IntlShape } from 'react-intl';

export const ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL = 10;
const ANTALL_DAGER_TO_UKER = 2 * 7;
const ANTALL_DAGER_SEKS_UKER = 6 * 7;

export const gjelderWLBReglerFarMedmorRundtFødsel = (
    familiehendelsesdato: Date,
    søkerErFarEllerMedmor: boolean,
    morHarRett: boolean,
    situasjon: Situasjon
) => {
    const gjelderWLB = andreAugust2022ReglerGjelder(familiehendelsesdato);
    return gjelderWLB && søkerErFarEllerMedmor && morHarRett && situasjon === 'fødsel';
};

export const isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel = (periode: Periode): boolean => {
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

export const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: Periode,
    familiehendelsesdato: Date,
    termindato: Date | undefined
): boolean => {
    return (
        isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel(periode) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode.tidsperiode,
            familiehendelsesdato,
            termindato
        )
    );
};

export const isUttaksperiodeBareFarMedmorHarRett = (periode: Periode, morHarRett: boolean): boolean => {
    return isUttaksperiode(periode) && periode.forelder === Forelder.farMedmor && !morHarRett;
};

export const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: Date, termindato: Date | undefined): Date => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato !== undefined
            ? dayjs(termindato).subtract(ANTALL_DAGER_TO_UKER, 'day')
            : dayjs(familiehendelsesdato).subtract(ANTALL_DAGER_TO_UKER, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato));
    return Uttaksdagen(datoÅRegneFra.toDate()).denneEllerNeste();
};

export const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: Date): Date => {
    const førsteUttaksdagForPeriodeEtterFødsel = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    return Uttaksdagen(
        dayjs(førsteUttaksdagForPeriodeEtterFødsel).add(ANTALL_DAGER_SEKS_UKER, 'day').toDate()
    ).forrige();
};

export const starterTidsperiodeEtter2UkerFørFødsel = (
    tidsperiode: any,
    familiehendelsesdato: Date,
    termindato: Date | undefined
): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    return dayjs(tidsperiode.fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

export const starterUttaksperiodeFørFødsel = (periode: Periode, familiehendelsesdato: Date): boolean => {
    return isUttaksperiode(periode) && dayjs(periode.tidsperiode.fom).isBefore(familiehendelsesdato, 'day');
};

export const slutterTidsperiodeInnen6UkerEtterFødsel = (tidsperiode: any, familiehendelsesdato: Date): boolean => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    return dayjs(tidsperiode.tom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel, 'day');
};

export const starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    termindato: Date | undefined
) => {
    return (
        starterTidsperiodeEtter2UkerFørFødsel(tidsperiode, familiehendelsesdato, termindato) &&
        dayjs(tidsperiode.fom).isSameOrBefore(getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato), 'day')
    );
};

export const getFarMedmorUttakRundtFødsel = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    termindato: Date | undefined
): Periode[] => {
    return perioder.filter((p) => isUttaksperiodeFarMedmorPgaFødsel(p, familiehendelsesdato, termindato));
};

export const erFarMedmorSinWLBTidsperiodeRundtFødsel = (
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    periodetype: Periodetype,
    konto: StønadskontoType,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
    situasjon: Situasjon,
    erFlerbarnssøknad: boolean,
    ønskerFlerbarnsdager: boolean | undefined
): boolean => {
    return (
        tidsperiode !== undefined &&
        isValidTidsperiode(tidsperiode) &&
        erFarEllerMedmor &&
        situasjon === 'fødsel' &&
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        periodetype === Periodetype.Uttak &&
        (konto === StønadskontoType.Fedrekvote ||
            konto === StønadskontoType.Foreldrepenger ||
            konto === StønadskontoType.AktivitetsfriKvote) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            familiehendelsesdato,
            termindato
        ) &&
        (!erFlerbarnssøknad || ønskerFlerbarnsdager === false)
    );
};

export const getLengdePåForeslåttWLBUttakFarMedmor = (familiehendelsesdato: Date, startDatoUttak: Date): number => {
    const sisteUttaksDagFørFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    const antallUttaksdagerFraStartDato = finnAntallDagerÅTrekke({
        tidsperiode: { fom: startDatoUttak, tom: sisteUttaksDagFørFødsel },
    } as Periode);
    return Math.min(antallUttaksdagerFraStartDato, ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL);
};

export const appendPeriodeNavnHvisUttakRundtFødselFarMedmor = (
    intl: IntlShape,
    periodeNavn: string,
    periode: Periode,
    situasjon: Situasjon,
    familiehendelsesdato: Date,
    termindato: Date | undefined
): string => {
    return situasjon === 'fødsel' && isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
        ? periodeNavn + intlUtils(intl, 'rundtFødsel')
        : periodeNavn;
};

export const farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato = (
    periode: Periode,
    familiehendelsesdato: Date,
    morHarRett: boolean,
    termindato: Date | undefined
) => {
    return (
        (isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato) ||
            isUttaksperiodeBareFarMedmorHarRett(periode, morHarRett)) &&
        tidperiodeGårOverFamiliehendelsesdato(periode.tidsperiode, familiehendelsesdato)
    );
};

export const tidperiodeGårOverFamiliehendelsesdato = (
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date
): boolean => {
    return (
        dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day') &&
        dayjs(tidsperiode.tom).isSameOrAfter(familiehendelsesdato, 'day')
    );
};
