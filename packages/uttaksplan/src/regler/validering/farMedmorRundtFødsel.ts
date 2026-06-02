import { IntlShape } from 'react-intl';

import { getFloatFromString } from '@navikt/fp-utils';

import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { ValideringInput, Valideringsområde, Valideringsregel } from './types';
import { erUtfyltForSamtidigUttak } from './utils';

export const lagFarMedmorRundtFødselOmråde = (intl: IntlShape): Valideringsområde<FarMedmorRundtFødselKontekst> => ({
    id: 'farMedmorRundtFødsel',
    område: 'Far/medmor sitt samtidige uttak rundt fødsel',
    beskrivelse:
        'Regler for samtidig uttak når minst én av periodene ligger i verneperioden rundt fødsel ' +
        '(fra 2 uker før til 6 uker etter fødsel/termin). Her er kravene strengere enn ellers. ' +
        'Gjelder ikke ved adopsjon, som ikke har en verneperiode rundt fødsel.',
    byggKontekst: byggKontekst,
    regler: lagRegler(intl),
});

type FarMedmorRundtFødselKontekst = {
    kombinertUttaksprosent: number;
    samtidigUttaksprosentMor: number;
    totalProsentMor: number;
    totalProsentFarMedmor: number;
    ønskerFlerbarnsdager: boolean;
};

const lagRegler = (intl: IntlShape): ReadonlyArray<Valideringsregel<FarMedmorRundtFødselKontekst>> => [
    {
        id: 'farMedmorRundtFødsel.kanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        beskrivelse:
            'Når foreldrene tar samtidig uttak rundt fødsel og har valgt flerbarnsdager, må summen av samtidige ' +
            'uttak være minst 100 %.',
        erBrutt: (k) => k.ønskerFlerbarnsdager && k.kombinertUttaksprosent < 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager',
        }),
    },
    {
        id: 'farMedmorRundtFødsel.flerbarnsdagerMorMåHa100ProsentSamtidig',
        beskrivelse:
            'Når kombinert uttak rundt fødsel er nøyaktig 100 % og foreldrene har valgt flerbarnsdager, må ' +
            'mor ha 100 % samtidig uttak.',
        erBrutt: (k) =>
            k.ønskerFlerbarnsdager && k.kombinertUttaksprosent === 100 && k.samtidigUttaksprosentMor !== 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.Må100ProsentUttak',
        }),
    },
    {
        id: 'farMedmorRundtFødsel.flerbarnsdagerFarMedmorMåHa100Prosent',
        beskrivelse:
            'Når foreldrene har flerbarnsdager i perioden rundt fødsel, må far/medmor kombinere arbeid og ' +
            'foreldrepenger slik at det blir 100 %, eller ha 100 % foreldrepenger.',
        erBrutt: (k) => k.ønskerFlerbarnsdager && k.totalProsentFarMedmor !== 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.FarMedmorMåHa100ProsentUttakJobb',
        }),
    },
    {
        id: 'farMedmorRundtFødsel.må100ProsentUttak',
        beskrivelse: 'I perioden rundt fødsel (2 uker før til 6 uker etter) må kombinert uttak være minst 100 %.',
        erBrutt: (k) => k.kombinertUttaksprosent < 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.Må100ProsentUttak',
        }),
    },
    {
        id: 'farMedmorRundtFødsel.farMedmorMåHa100ProsentUttakJobb',
        beskrivelse: 'Far/medmor må ha 100 % (arbeid + foreldrepenger) i perioden rundt fødsel.',
        erBrutt: (k) => k.totalProsentFarMedmor !== 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.FarMedmorMåHa100ProsentUttakJobb',
        }),
    },
    {
        id: 'farMedmorRundtFødsel.morMåHa100ProsentUttakJobb',
        beskrivelse: 'Mor må ha 100 % (arbeid + foreldrepenger) i perioden rundt fødsel — ellers mister hun dager.',
        erBrutt: (k) => k.totalProsentMor !== 100,
        feilmelding: intl.formatMessage({
            id: 'LeggTilEllerEndrePeriodeForm.Fødselpermisjonsvalidering.MorMåHa100ProsentUttakJobb',
        }),
    },
];

const byggKontekst = (input: ValideringInput): FarMedmorRundtFødselKontekst | null => {
    const { formValues, perioder, familiehendelsedato, termindato, familiesituasjon } = input;

    if (!erUtfyltForSamtidigUttak(formValues)) {
        return null;
    }

    if (familiesituasjon === 'adopsjon') {
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
};
