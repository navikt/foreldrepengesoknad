import { getFloatFromString } from '@navikt/fp-utils';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../felles/LeggTilEllerEndrePeriodeFellesForm';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';
import { Regel, Regelgruppe, ValideringInput, i18n } from './types';

type FarMedmorRundtFødselKontekst = {
    kombinertUttaksprosent: number;
    samtidigUttaksprosentMor: number;
    totalProsentMor: number;
    totalProsentFarMedmor: number;
    ønskerFlerbarnsdager: boolean;
};

const erUtfyltForVurdering = (values: LeggTilEllerEndrePeriodeFormFormValues): boolean =>
    values.forelder === 'BEGGE' &&
    values.samtidigUttaksprosentMor !== undefined &&
    values.samtidigUttaksprosentFarMedmor !== undefined &&
    values.skalDuKombinereArbeidOgUttakMor !== undefined &&
    values.skalDuKombinereArbeidOgUttakFarMedmor !== undefined &&
    values.kontoTypeFarMedmor !== undefined &&
    values.kontoTypeMor !== undefined &&
    (!values.skalDuKombinereArbeidOgUttakMor || values.stillingsprosentMor !== undefined) &&
    (!values.skalDuKombinereArbeidOgUttakFarMedmor || values.stillingsprosentFarMedmor !== undefined);

const REGLER: ReadonlyArray<Regel<FarMedmorRundtFødselKontekst>> = [
    {
        id: 'KanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        beskrivelse:
            'Når foreldra tek samtidig uttak rundt fødsel og har valt flerbarnsdagar, må summen av samtidige ' +
            'uttak vere minst 100 %.',
        erBrote: (k) => k.ønskerFlerbarnsdager && k.kombinertUttaksprosent < 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager'),
    },
    {
        id: 'Flerbarnsdager.MorMåHa100ProsentSamtidig',
        beskrivelse:
            'Når kombinert uttak rundt fødsel er nøyaktig 100 % og foreldra har valt flerbarnsdagar, må ' +
            'mor ha 100 % samtidig uttak.',
        erBrote: (k) =>
            k.ønskerFlerbarnsdager && k.kombinertUttaksprosent === 100 && k.samtidigUttaksprosentMor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.Må100ProsentUttak'),
    },
    {
        id: 'Flerbarnsdager.FarMedmorMåHa100Prosent',
        beskrivelse:
            'Når foreldra har flerbarnsdagar i perioden rundt fødsel, må far/medmor kombinere arbeid og ' +
            'foreldrepengar slik at det blir 100 %, eller ha 100 % foreldrepengar.',
        erBrote: (k) => k.ønskerFlerbarnsdager && k.totalProsentFarMedmor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.FarMedmorMåHa100ProsentUttakJobb'),
    },
    {
        id: 'Må100ProsentUttak',
        beskrivelse: 'I perioden rundt fødsel (2 veker før til 6 veker etter) må kombinert uttak vere minst 100 %.',
        erBrote: (k) => k.kombinertUttaksprosent < 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.Må100ProsentUttak'),
    },
    {
        id: 'FarMedmorMåHa100ProsentUttakJobb',
        beskrivelse:
            'Far/medmor må ha 100 % (arbeid + foreldrepengar) i perioden rundt fødsel.',
        erBrote: (k) => k.totalProsentFarMedmor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.FarMedmorMåHa100ProsentUttakJobb'),
    },
    {
        id: 'MorMåHa100ProsentUttakJobb',
        beskrivelse:
            'Mor må ha 100 % (arbeid + foreldrepengar) i perioden rundt fødsel — elles mister ho dagar.',
        erBrote: (k) => k.totalProsentMor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.MorMåHa100ProsentUttakJobb'),
    },
];

export const FAR_MEDMOR_RUNDT_FØDSEL_GRUPPE: Regelgruppe<FarMedmorRundtFødselKontekst> = {
    id: 'farMedmorRundtFødsel',
    beskrivelse:
        'Reglar for samtidig uttak når minst éin av periodene ligg i verneperioden rundt fødsel ' +
        '(frå 2 veker før til 6 veker etter fødsel/termin). Her er krava strengare enn elles.',
    byggKontekst: (input: ValideringInput): FarMedmorRundtFødselKontekst | null => {
        const { formValues, perioder, familiehendelsedato, termindato } = input;

        if (!erUtfyltForVurdering(formValues)) {
            return null;
        }

        const inneholderPerioderRundtFødsel =
            UttaksperiodeValidatorer.erNoenPerioderIMellomToUkerFørFamiliehendelsesdatoEllerEtterSeksUkerFamiliehendelsedato(
                perioder,
                familiehendelsedato,
                termindato,
            );

        if (!inneholderPerioderRundtFødsel) {
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
            ønskerFlerbarnsdager: formValues.ønskerFlerbarnsdager === true,
        };
    },
    regler: REGLER,
};
