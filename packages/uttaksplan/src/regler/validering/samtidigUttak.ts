import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { ValideringInput, Valideringsområde, Valideringsregel } from './types';
import { erUtfyltForSamtidigUttak } from './utils';

export const lagSamtidigUttakOmråde = (intl: IntlShape): Valideringsområde<SamtidigUttakKontekst> => ({
    id: 'samtidigUttak',
    område: 'Samtidig uttak utanfor verneperioden rundt fødsel',
    beskrivelse:
        'Regler for samtidig uttak når begge foreldre tar ut foreldrepenger samtidig utenfor verneperioden ' +
        'rundt fødsel (dvs. ikke fra 2 uker før til 6 uker etter fødsel).',
    byggKontekst: byggSamtidigUttakKontekst,
    regler: lagRegler(intl),
});

type SamtidigUttakKontekst = {
    kombinertUttaksprosent: number;
    samtidigUttaksprosentMor: number;
    totalProsentMor: number;
    totalProsentFarMedmor: number;
    kontoTypeMor: string;
    kontoTypeFarMedmor: string;
    morsAktivitet: LeggTilEllerEndrePeriodeFormFormValues['morsAktivitet'];
    ønskerFlerbarnsdager: boolean;
    farMedmorsFellesperiodeErStørreEnn50: boolean;
    morsFellesperiodeErStørreEnn50: boolean;
};

const lagRegler = (intl: IntlShape): ReadonlyArray<Valideringsregel<SamtidigUttakKontekst>> => [
    {
        id: 'samtidigUttak.kanIkkeHaMerEnn150Prosent',
        beskrivelse:
            'Mor og far/medmor kan ikke ta ut mer enn 150 % foreldrepenger til sammen. ' +
            'Unntak: når de har valgt flerbarnsdager.',
        erBrutt: (k) => k.kombinertUttaksprosent > 150 && !k.ønskerFlerbarnsdager,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMerEnn150Prosent',
        }),
    },
    {
        id: 'samtidigUttak.kanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        beskrivelse: 'Når foreldrene har valgt flerbarnsdager, må summen av samtidige uttak være minst 100 %.',
        erBrutt: (k) => k.ønskerFlerbarnsdager && k.kombinertUttaksprosent < 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        }),
    },
    {
        id: 'samtidigUttak.mindreEnn100Prosent',
        beskrivelse:
            'Når foreldrene til sammen har mindre enn 100 % foreldrepenger, må hver forelder kombinere arbeid ' +
            'og foreldrepenger slik at summen blir nøyaktig 100 % per forelder.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent < 100 && (k.totalProsentMor !== 100 || k.totalProsentFarMedmor !== 100),
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.MindreEnn100Prosent',
        }),
    },
    {
        id: 'samtidigUttak.nøyaktig100ProsentMorsAktivitet',
        beskrivelse:
            'Når kombinert uttak er nøyaktig 100 % og far/medmor bruker fellesperiode, må mor enten ha 100 % ' +
            'aktivitet (arbeid + foreldrepenger) eller være i annen godkjent aktivitet.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent === 100 &&
            k.kontoTypeFarMedmor === 'FELLESPERIODE' &&
            k.totalProsentMor !== 100 &&
            !k.morsAktivitet,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Nøyaktig100ProsentMorsAktivitet',
        }),
    },
    {
        id: 'samtidigUttak.maks50ProsentFelles',
        beskrivelse:
            'Når kombinert uttak er mellom 100 % og 150 %, kan hver forelder maks bruke 50 % av fellesperioden. ' +
            'Unntak: flerbarnsdager.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            (k.farMedmorsFellesperiodeErStørreEnn50 || k.morsFellesperiodeErStørreEnn50) &&
            !k.ønskerFlerbarnsdager,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Maks50ProsentFelles',
        }),
    },
    {
        id: 'samtidigUttak.toKvoterMerEnn100Prosent',
        beskrivelse:
            'Når kombinert uttak er over 100 %, kan ikke begge foreldre ta sin egen kvote (mødrekvote og ' +
            'fedrekvote) samtidig — bare én av dem kan bruke kvote.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            k.kontoTypeFarMedmor === 'FEDREKVOTE' &&
            k.kontoTypeMor === 'MØDREKVOTE',
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.ToKvoterMerEnn100Prosent',
        }),
    },
    {
        id: 'samtidigUttak.måHa100Prosent',
        beskrivelse:
            'Når kombinert uttak er mellom 100 % og 150 %, må summen av arbeid og foreldrepenger være 100 % ' +
            'for hver forelder.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            (k.totalProsentMor < 100 || k.totalProsentFarMedmor < 100),
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.MåHa100Prosent',
        }),
    },
];

const byggSamtidigUttakKontekst = (input: ValideringInput): SamtidigUttakKontekst | null => {
    const { formValues, perioder, familiehendelsedato, termindato, familiesituasjon } = input;

    if (!erUtfyltForSamtidigUttak(formValues)) {
        return null;
    }

    const inneholderPerioderRundtFødsel =
        familiesituasjon !== 'adopsjon' &&
        UttaksperiodeValidatorer.erNoenPerioderIMellomToUkerFørFamiliehendelsesdatoEllerEtterSeksUkerFamiliehendelsedato(
            perioder,
            familiehendelsedato,
            termindato,
        );

    if (inneholderPerioderRundtFødsel) {
        return null;
    }

    const samtidigUttaksprosentMor = getFloatFromString(formValues.samtidigUttaksprosentMor!.trim())!;
    const samtidigUttaksprosentFarMedmor = getFloatFromString(formValues.samtidigUttaksprosentFarMedmor!.trim())!;
    const stillingsprosentMor = getFloatFromString(formValues.stillingsprosentMor) ?? 0;
    const stillingsprosentFarMedmor = getFloatFromString(formValues.stillingsprosentFarMedmor) ?? 0;

    return {
        kombinertUttaksprosent: samtidigUttaksprosentMor + samtidigUttaksprosentFarMedmor,
        samtidigUttaksprosentMor,
        totalProsentMor: samtidigUttaksprosentMor + stillingsprosentMor,
        totalProsentFarMedmor: samtidigUttaksprosentFarMedmor + stillingsprosentFarMedmor,
        kontoTypeMor: formValues.kontoTypeMor!,
        kontoTypeFarMedmor: formValues.kontoTypeFarMedmor!,
        morsAktivitet: formValues.morsAktivitet,
        ønskerFlerbarnsdager: formValues.ønskerFlerbarnsdager === true,
        farMedmorsFellesperiodeErStørreEnn50:
            formValues.kontoTypeFarMedmor === 'FELLESPERIODE' && samtidigUttaksprosentFarMedmor > 50,
        morsFellesperiodeErStørreEnn50: formValues.kontoTypeMor === 'FELLESPERIODE' && samtidigUttaksprosentMor > 50,
    };
};
