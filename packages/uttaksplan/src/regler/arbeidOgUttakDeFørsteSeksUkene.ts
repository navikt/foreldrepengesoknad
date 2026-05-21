import { LeggTilEllerEndrePeriodeFormFormValues } from '../felles/LeggTilEllerEndrePeriodeFellesForm';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';
import { Periode, Regel, Regelgruppe, i18n, ValideringInput } from './types';

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

const REGLER: ReadonlyArray<Regel<ArbeidOgUttakKontekst>> = [
    {
        id: 'MorKanIkkeKombinereArbeidOgUttakFørsteSeksUker',
        beskrivelse:
            'Mor kan ikkje kombinere arbeid med uttak av mødrekvote, fellesperiode eller foreldrepengar i ' +
            'dei første seks vekene etter fødsel.',
        erBrote: (k) =>
            k.formValues.skalDuKombinereArbeidOgUttakMor === true &&
            (k.formValues.kontoTypeMor === 'MØDREKVOTE' ||
                k.formValues.kontoTypeMor === 'FELLESPERIODE' ||
                k.formValues.kontoTypeMor === 'FORELDREPENGER') &&
            periodeOverlapperFørsteSeksUker(k),
        feilmeldingId: i18n('endreTidsPeriodeModal.kanIkkeKombinere'),
    },
    {
        id: 'FarMedmorKanIkkeKombinereArbeidOgOverførtMødrekvoteFørsteSeksUker',
        beskrivelse:
            'Far/medmor kan ikkje kombinere arbeid med overført mødrekvote i dei første seks vekene etter fødsel.',
        erBrote: (k) =>
            k.formValues.skalDuKombinereArbeidOgUttakFarMedmor === true &&
            k.formValues.kontoTypeFarMedmor === 'MØDREKVOTE' &&
            periodeOverlapperFørsteSeksUker(k),
        feilmeldingId: i18n('endreTidsPeriodeModal.kanIkkeKombinere'),
    },
];

export const ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_GRUPPE: Regelgruppe<ArbeidOgUttakKontekst> = {
    id: 'arbeidOgUttakDeFørsteSeksUkene',
    beskrivelse:
        'Reglar som hindrar at ein kombinerer arbeid med uttak av visse kontotypar i dei første seks vekene ' +
        'etter fødsel. Gjeld ikkje ved adopsjon.',
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
