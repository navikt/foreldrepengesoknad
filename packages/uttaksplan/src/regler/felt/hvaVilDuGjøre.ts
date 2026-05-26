import { IntlShape } from 'react-intl';

import { BrukerRolleSak_fpoversikt, RettighetType_fpoversikt } from '@navikt/fp-types';

import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Feltregel, Periode, i18n } from '../types';

type HvaVilDuGjøre = 'LEGG_TIL_FERIE' | 'LEGG_TIL_UTSETTELSE' | 'LEGG_TIL_PAUSE' | 'LEGG_TIL_OPPHOLD' | 'LEGG_TIL_PERIODE';

type HvaVilDuGjøreInput = {
    nyHvaVilDuGjøre: HvaVilDuGjøre | undefined;
    fomValue: string | undefined;
    tomValue: string | undefined;
    perioder: Periode[];
    familiehendelsedato: string;
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
};

const valgtPeriode = ({ fomValue, tomValue }: HvaVilDuGjøreInput): Periode[] =>
    fomValue && tomValue ? [{ fom: fomValue, tom: tomValue }] : [];

export const HVA_VIL_DU_GJØRE_REGLER: ReadonlyArray<Feltregel<HvaVilDuGjøreInput>> = [
    {
        id: 'hvaVilDuGjøre.utsettelseMåLiggeInnenforSeksUkerEtterFødsel',
        beskrivelse:
            'Når brukeren velger «Legg til utsettelse» må den valgte perioden ligge innenfor de første seks ' +
            'ukene etter familiehendelsesdato — utsettelse av mødrekvote er bare aktuelt i denne perioden.',
        erBrutt: (input) =>
            input.nyHvaVilDuGjøre === 'LEGG_TIL_UTSETTELSE' &&
            !UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
                valgtPeriode(input),
                input.familiehendelsedato,
            ),
        feilmeldingId: i18n('uttaksplan.valgPanel.utsettelse'),
    },
    {
        id: 'hvaVilDuGjøre.pauseKanIkkeLeggesIFørsteSeksUkerEtterFødsel',
        beskrivelse:
            'Når brukeren velger «Legg til pause» kan ikke noen av periodene ligge i de første seks ukene etter ' +
            'familiehendelsesdato — pause er ikke tillatt i mors forbeholdte periode rett etter fødsel.',
        erBrutt: (input) =>
            input.nyHvaVilDuGjøre === 'LEGG_TIL_PAUSE' &&
            UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                input.perioder,
                input.familiehendelsedato,
            ),
        feilmeldingId: i18n('uttaksplan.valgPanel.pause'),
    },
    {
        id: 'hvaVilDuGjøre.ferieEllerOppholdMåLiggeFørSeksUkerEtterFødselForFarMedmorBareSøkerRett',
        beskrivelse:
            'For far/medmor med bare-søker-rett må «Legg til ferie» eller «Legg til opphold» plasseres i de ' +
            'første seks ukene etter familiehendelsesdato — utenfor denne perioden er ferie/opphold ikke ' +
            'aktuelt for denne brukergruppen.',
        erBrutt: (input) =>
            (input.nyHvaVilDuGjøre === 'LEGG_TIL_FERIE' || input.nyHvaVilDuGjøre === 'LEGG_TIL_OPPHOLD') &&
            input.søker === 'FAR_MEDMOR' &&
            input.rettighetType === 'BARE_SØKER_RETT' &&
            !!input.fomValue &&
            !!input.tomValue &&
            !UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                valgtPeriode(input),
                input.familiehendelsedato,
            ),
        feilmeldingId: i18n('uttaksplan.valgPanel.ferie'),
    },
];

type StaticKontekst = Omit<HvaVilDuGjøreInput, 'nyHvaVilDuGjøre'>;

const lagFeltvalidator =
    (intl: IntlShape, regel: Feltregel<HvaVilDuGjøreInput>, kontekst: StaticKontekst) =>
    (nyHvaVilDuGjøre?: HvaVilDuGjøre): string | null => {
        if (regel.erBrutt({ ...kontekst, nyHvaVilDuGjøre })) {
            return intl.formatMessage({ id: regel.feilmeldingId });
        }
        return null;
    };

/**
 * Lager validator-funksjoner for «Hva vil du gjøre»-feltet. Returnerer en array som kan
 * spres rett inn i React Hook Form sin `validate`-prop, slik at hver regel viser sin egen
 * feilmelding.
 */
export const lagHvaVilDuGjøreValidatorer = (intl: IntlShape, kontekst: StaticKontekst) =>
    HVA_VIL_DU_GJØRE_REGLER.map((regel) => lagFeltvalidator(intl, regel, kontekst));
