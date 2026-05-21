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
            'Mor og far/medmor kan ikkje ta ut meir enn 150 % foreldrepengar til saman. ' +
            'Unntak: når dei har valt flerbarnsdagar.',
        erBrote: (k) => k.kombinertUttaksprosent > 150 && !k.ønskerFlerbarnsdager,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMerEnn150Prosent'),
    },
    {
        id: 'KanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        beskrivelse:
            'Når foreldra har valt flerbarnsdagar, må summen av samtidige uttak vere minst 100 %.',
        erBrote: (k) => k.ønskerFlerbarnsdager && k.kombinertUttaksprosent < 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager'),
    },
    {
        id: 'MindreEnn100Prosent',
        beskrivelse:
            'Når foreldra til saman har mindre enn 100 % foreldrepengar, må kvar forelder kombinere arbeid ' +
            'og foreldrepengar slik at summen blir nøyaktig 100 % per forelder.',
        erBrote: (k) =>
            k.kombinertUttaksprosent < 100 && (k.totalProsentMor !== 100 || k.totalProsentFarMedmor !== 100),
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.MindreEnn100Prosent'),
    },
    {
        id: 'Nøyaktig100ProsentMorsAktivitet',
        beskrivelse:
            'Når kombinert uttak er nøyaktig 100 % og far/medmor brukar fellesperiode, må mor anten ha 100 % ' +
            'aktivitet (arbeid + foreldrepengar) eller vere i annan godkjent aktivitet.',
        erBrote: (k) =>
            k.kombinertUttaksprosent === 100 &&
            k.kontoTypeFarMedmor === 'FELLESPERIODE' &&
            k.totalProsentMor !== 100 &&
            !k.morsAktivitet,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Nøyaktig100ProsentMorsAktivitet'),
    },
    {
        id: 'Maks50ProsentFelles',
        beskrivelse:
            'Når kombinert uttak er mellom 100 % og 150 %, kan kvar forelder maks bruke 50 % av fellesperioden. ' +
            'Unntak: flerbarnsdagar.',
        erBrote: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            (k.farMedmorsFellesperiodeErStørreEnn50 || k.morsFellesperiodeErStørreEnn50) &&
            !k.ønskerFlerbarnsdager,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Maks50ProsentFelles'),
    },
    {
        id: 'ToKvoterMerEnn100Prosent',
        beskrivelse:
            'Når kombinert uttak er over 100 %, kan ikkje begge foreldre ta sin eigen kvote (mødrekvote og ' +
            'fedrekvote) samtidig — berre éin av dei kan bruke kvote.',
        erBrote: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            k.kontoTypeFarMedmor === 'FEDREKVOTE' &&
            k.kontoTypeMor === 'MØDREKVOTE',
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.ToKvoterMerEnn100Prosent'),
    },
    {
        id: 'MåHa100Prosent',
        beskrivelse:
            'Når kombinert uttak er mellom 100 % og 150 %, må summen av arbeid og foreldrepengar vere 100 % ' +
            'for kvar forelder.',
        erBrote: (k) =>
            k.kombinertUttaksprosent > 100 &&
            k.kombinertUttaksprosent <= 150 &&
            (k.totalProsentMor < 100 || k.totalProsentFarMedmor < 100),
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.MåHa100Prosent'),
    },
];

export const SAMTIDIG_UTTAK_GRUPPE: Regelgruppe<SamtidigUttakKontekst> = {
    id: 'samtidigUttak',
    beskrivelse:
        'Reglar for samtidig uttak når begge foreldre tek ut foreldrepengar samtidig utanfor verneperioden ' +
        'rundt fødsel (dvs. ikkje frå 2 veker før til 6 veker etter fødsel).',
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
