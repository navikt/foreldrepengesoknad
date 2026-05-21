import { getFloatFromString } from '@navikt/fp-utils';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../felles/LeggTilEllerEndrePeriodeFellesForm';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';
import { Regel, Regelgruppe, ValideringInput, i18n } from './types';

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

const erUtfyltForSamtidigUttak = (values: LeggTilEllerEndrePeriodeFormFormValues): boolean =>
    values.forelder === 'BEGGE' &&
    values.samtidigUttaksprosentMor !== undefined &&
    values.samtidigUttaksprosentFarMedmor !== undefined &&
    values.skalDuKombinereArbeidOgUttakMor !== undefined &&
    values.skalDuKombinereArbeidOgUttakFarMedmor !== undefined &&
    values.kontoTypeFarMedmor !== undefined &&
    values.kontoTypeMor !== undefined &&
    (!values.skalDuKombinereArbeidOgUttakMor || values.stillingsprosentMor !== undefined) &&
    (!values.skalDuKombinereArbeidOgUttakFarMedmor || values.stillingsprosentFarMedmor !== undefined);

const REGLER: ReadonlyArray<Regel<SamtidigUttakKontekst>> = [
    {
        id: 'KanIkkeHaMerEnn150Prosent',
        beskrivelse:
            'Mor og far/medmor kan ikke ta ut mer enn 150 % foreldrepenger til sammen. ' +
            'Unntak: når de har valgt flerbarnsdager.',
        erBrutt: (k) => k.kombinertUttaksprosent > 150 && !k.ønskerFlerbarnsdager,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMerEnn150Prosent'),
    },
    {
        id: 'KanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        beskrivelse:
            'Når foreldrene har valgt flerbarnsdager, må summen av samtidige uttak være minst 100 %.',
        erBrutt: (k) => k.ønskerFlerbarnsdager && k.kombinertUttaksprosent < 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager'),
    },
    {
        id: 'MindreEnn100Prosent',
        beskrivelse:
            'Når foreldrene til sammen har mindre enn 100 % foreldrepenger, må hver forelder kombinere arbeid ' +
            'og foreldrepenger slik at summen blir nøyaktig 100 % per forelder.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent < 100 && (k.totalProsentMor !== 100 || k.totalProsentFarMedmor !== 100),
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.MindreEnn100Prosent'),
    },
    {
        id: 'Nøyaktig100ProsentMorsAktivitet',
        beskrivelse:
            'Når kombinert uttak er nøyaktig 100 % og far/medmor bruker fellesperiode, må mor enten ha 100 % ' +
            'aktivitet (arbeid + foreldrepenger) eller være i annen godkjent aktivitet.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent === 100 &&
            k.kontoTypeFarMedmor === 'FELLESPERIODE' &&
            k.totalProsentMor !== 100 &&
            !k.morsAktivitet,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Nøyaktig100ProsentMorsAktivitet'),
    },
    {
        id: 'Maks50ProsentFelles',
        beskrivelse:
            'Når kombinert uttak er mellom 100 % og 150 %, kan hver forelder maks bruke 50 % av fellesperioden. ' +
            'Unntak: flerbarnsdager.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            (k.farMedmorsFellesperiodeErStørreEnn50 || k.morsFellesperiodeErStørreEnn50) &&
            !k.ønskerFlerbarnsdager,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Maks50ProsentFelles'),
    },
    {
        id: 'ToKvoterMerEnn100Prosent',
        beskrivelse:
            'Når kombinert uttak er over 100 %, kan ikke begge foreldre ta sin egen kvote (mødrekvote og ' +
            'fedrekvote) samtidig — bare én av dem kan bruke kvote.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            k.kontoTypeFarMedmor === 'FEDREKVOTE' &&
            k.kontoTypeMor === 'MØDREKVOTE',
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.ToKvoterMerEnn100Prosent'),
    },
    {
        id: 'MåHa100Prosent',
        beskrivelse:
            'Når kombinert uttak er mellom 100 % og 150 %, må summen av arbeid og foreldrepenger være 100 % ' +
            'for hver forelder.',
        erBrutt: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            (k.totalProsentMor < 100 || k.totalProsentFarMedmor < 100),
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.MåHa100Prosent'),
    },
];

export const SAMTIDIG_UTTAK_GRUPPE: Regelgruppe<SamtidigUttakKontekst> = {
    id: 'samtidigUttak',
    beskrivelse:
        'Regler for samtidig uttak når begge foreldre tar ut foreldrepenger samtidig utenfor verneperioden ' +
        'rundt fødsel (dvs. ikke fra 2 uker før til 6 uker etter fødsel).',
    byggKontekst: (input: ValideringInput): SamtidigUttakKontekst | null => {
        const { formValues, perioder, familiehendelsedato, termindato } = input;

        if (!erUtfyltForSamtidigUttak(formValues)) {
            return null;
        }

        const inneholderPerioderRundtFødsel =
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
            morsFellesperiodeErStørreEnn50:
                formValues.kontoTypeMor === 'FELLESPERIODE' && samtidigUttaksprosentMor > 50,
        };
    },
    regler: REGLER,
};
