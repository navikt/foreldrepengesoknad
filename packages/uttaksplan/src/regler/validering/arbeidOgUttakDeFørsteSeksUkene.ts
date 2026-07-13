import { IntlShape } from 'react-intl';

import { LeggTilEllerEndrePeriodeFormFormValues } from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode, ValideringInput, Valideringsområde, Valideringsregel } from './types';

export const lagArbeidOgUttakFørsteSeksUkerOmråde = (intl: IntlShape): Valideringsområde<ArbeidOgUttakKontekst> => ({
    id: 'arbeidOgUttakDeFørsteSeksUkene',
    område: 'Arbeid og uttak de første seks ukene etter fødsel',
    beskrivelse:
        'Regler som hindrer at man kombinerer arbeid med uttak av visse kontotyper i de første seks ukene ' +
        'etter fødsel. Gjelder ikke ved adopsjon.',
    byggKontekst: (input: ValideringInput): ArbeidOgUttakKontekst | null => {
        if (input.familiesituasjon === 'adopsjon') {
            return null;
        }
        return {
            formValues: input.formValues,
            perioder: input.perioder,
            familiehendelsedato: input.familiehendelsedato,
        };
    },
    regler: lagRegler(intl),
});

type ArbeidOgUttakKontekst = {
    formValues: LeggTilEllerEndrePeriodeFormFormValues;
    perioder: Periode[];
    familiehendelsedato: string;
};

const periodeOverlapperFørsteSeksUker = (k: ArbeidOgUttakKontekst): boolean =>
    UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
        k.perioder,
        k.familiehendelsedato,
    );

const lagRegler = (intl: IntlShape): ReadonlyArray<Valideringsregel<ArbeidOgUttakKontekst>> => [
    {
        id: 'arbeidOgUttakDeFørsteSeksUkene.morKanIkkeKombinereArbeidOgUttakFørsteSeksUker',
        beskrivelse:
            'Mor kan ikke kombinere arbeid med uttak av mødrekvote, fellesperiode eller foreldrepenger i ' +
            'de første seks ukene etter fødsel.',
        erBrutt: (k) =>
            k.formValues.skalDuKombinereArbeidOgUttakMor === true &&
            (k.formValues.kontoTypeMor === 'MØDREKVOTE' ||
                k.formValues.kontoTypeMor === 'FELLESPERIODE' ||
                k.formValues.kontoTypeMor === 'FORELDREPENGER') &&
            periodeOverlapperFørsteSeksUker(k),
        feilmelding: intl.formatMessage({ id: 'endreTidsPeriodeModal.kanIkkeKombinere' }),
    },
    {
        id: 'arbeidOgUttakDeFørsteSeksUkene.farMedmorKanIkkeKombinereArbeidOgOverførtMødrekvoteFørsteSeksUker',
        beskrivelse:
            'Far/medmor kan ikke kombinere arbeid med overført mødrekvote i de første seks ukene etter fødsel.',
        erBrutt: (k) =>
            k.formValues.skalDuKombinereArbeidOgUttakFarMedmor === true &&
            k.formValues.kontoTypeFarMedmor === 'MØDREKVOTE' &&
            periodeOverlapperFørsteSeksUker(k),
        feilmelding: intl.formatMessage({ id: 'endreTidsPeriodeModal.kanIkkeKombinere' }),
    },
];
