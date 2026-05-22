import { getFloatFromString } from '@navikt/fp-utils';

import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Valideringsregel, Valideringsområde, ValideringInput, i18n } from './types';
import { erUtfyltForSamtidigUttak } from './utils';

type FarMedmorRundtFødselKontekst = {
    kombinertUttaksprosent: number;
    samtidigUttaksprosentMor: number;
    totalProsentMor: number;
    totalProsentFarMedmor: number;
    ønskerFlerbarnsdager: boolean;
};

const REGLER: ReadonlyArray<Valideringsregel<FarMedmorRundtFødselKontekst>> = [
    {
        id: 'KanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        beskrivelse:
            'Når foreldrene tar samtidig uttak rundt fødsel og har valgt flerbarnsdager, må summen av samtidige ' +
            'uttak være minst 100 %.',
        erBrutt: (k) => k.ønskerFlerbarnsdager && k.kombinertUttaksprosent < 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager'),
    },
    {
        id: 'Flerbarnsdager.MorMåHa100ProsentSamtidig',
        beskrivelse:
            'Når kombinert uttak rundt fødsel er nøyaktig 100 % og foreldrene har valgt flerbarnsdager, må ' +
            'mor ha 100 % samtidig uttak.',
        erBrutt: (k) =>
            k.ønskerFlerbarnsdager && k.kombinertUttaksprosent === 100 && k.samtidigUttaksprosentMor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.Må100ProsentUttak'),
    },
    {
        id: 'Flerbarnsdager.FarMedmorMåHa100Prosent',
        beskrivelse:
            'Når foreldrene har flerbarnsdager i perioden rundt fødsel, må far/medmor kombinere arbeid og ' +
            'foreldrepenger slik at det blir 100 %, eller ha 100 % foreldrepenger.',
        erBrutt: (k) => k.ønskerFlerbarnsdager && k.totalProsentFarMedmor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.FarMedmorMåHa100ProsentUttakJobb'),
    },
    {
        id: 'Må100ProsentUttak',
        beskrivelse: 'I perioden rundt fødsel (2 uker før til 6 uker etter) må kombinert uttak være minst 100 %.',
        erBrutt: (k) => k.kombinertUttaksprosent < 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.Må100ProsentUttak'),
    },
    {
        id: 'FarMedmorMåHa100ProsentUttakJobb',
        beskrivelse: 'Far/medmor må ha 100 % (arbeid + foreldrepenger) i perioden rundt fødsel.',
        erBrutt: (k) => k.totalProsentFarMedmor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.FarMedmorMåHa100ProsentUttakJobb'),
    },
    {
        id: 'MorMåHa100ProsentUttakJobb',
        beskrivelse:
            'Mor må ha 100 % (arbeid + foreldrepenger) i perioden rundt fødsel — ellers mister hun dager.',
        erBrutt: (k) => k.totalProsentMor !== 100,
        feilmeldingId: i18n('LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.MorMåHa100ProsentUttakJobb'),
    },
];

export const FAR_MEDMOR_RUNDT_FØDSEL_OMRÅDE: Valideringsområde<FarMedmorRundtFødselKontekst> = {
    id: 'farMedmorRundtFødsel',
    område: 'Far/medmor sitt samtidige uttak rundt fødsel',
    beskrivelse:
        'Regler for samtidig uttak når minst én av periodene ligger i verneperioden rundt fødsel ' +
        '(fra 2 uker før til 6 uker etter fødsel/termin). Her er kravene strengere enn ellers.',
    byggKontekst: (input: ValideringInput): FarMedmorRundtFødselKontekst | null => {
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
