import { LeggTilEllerEndrePeriodeFormFormValues } from '../../felles/LeggTilEllerEndrePeriodeFellesForm';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode, Valideringsregel, Valideringsområde, i18n, ValideringInput } from './types';

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

const REGLER: ReadonlyArray<Valideringsregel<ArbeidOgUttakKontekst>> = [
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
        feilmeldingId: i18n('endreTidsPeriodeModal.kanIkkeKombinere'),
    },
    {
        id: 'arbeidOgUttakDeFørsteSeksUkene.farMedmorKanIkkeKombinereArbeidOgOverførtMødrekvoteFørsteSeksUker',
        beskrivelse:
            'Far/medmor kan ikke kombinere arbeid med overført mødrekvote i de første seks ukene etter fødsel.',
        erBrutt: (k) =>
            k.formValues.skalDuKombinereArbeidOgUttakFarMedmor === true &&
            k.formValues.kontoTypeFarMedmor === 'MØDREKVOTE' &&
            periodeOverlapperFørsteSeksUker(k),
        feilmeldingId: i18n('endreTidsPeriodeModal.kanIkkeKombinere'),
    },
];

export const ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_OMRÅDE: Valideringsområde<ArbeidOgUttakKontekst> = {
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
    regler: REGLER,
};
