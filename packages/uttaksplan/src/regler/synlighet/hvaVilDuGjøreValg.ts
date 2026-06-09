import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode } from '../types';
import { Synlighetsregel } from './types';

/**
 * Hook som avgjør hvilke alternativ som vises i «Hva vil du gjøre»-radiogruppen i
 * listevisningens «Legg til / endre periode»-panel. Datoene velges først, og
 * reglene under filtrerer bort de alternativene som ikke er gyldige for det
 * valgte tidsrommet — slik at brukeren slipper å velge et alternativ for så å få
 * en feilmelding i etterkant.
 *
 * Logikken speiler kalendervisningen sin
 * {@link import('./knapperIRedigeringspanel').useKnapperIRedigeringspanelSynlighet}.
 * Henter søker, rettighet og familiesituasjon selv fra UttaksplanData; kalleren
 * gir bare det valgte tidsrommet.
 */
export const useHvaVilDuGjøreValgSynlighet = (valgtePerioder: Periode[]): HvaVilDuGjøreValgSynlighet => {
    const {
        foreldreInfo: { søker, rettighetType },
        familiesituasjon,
        familiehendelsedato,
    } = useUttaksplanData();

    const kontekst: HvaVilDuGjøreValgKontekst = {
        søker,
        rettighetType,
        familiesituasjon,
        familiehendelsedato,
        valgtePerioder,
    };

    return {
        visLeggTilFerie: VIS_LEGG_TIL_FERIE_VALG.skalVises(kontekst),
        visLeggTilUtsettelse: VIS_LEGG_TIL_UTSETTELSE_VALG.skalVises(kontekst),
        visLeggTilPause: VIS_LEGG_TIL_PAUSE_VALG.skalVises(kontekst),
        visLeggTilOpphold: VIS_LEGG_TIL_OPPHOLD_VALG.skalVises(kontekst),
        visLeggTilPeriode: VIS_LEGG_TIL_PERIODE_VALG.skalVises(kontekst),
    };
};

export const VIS_LEGG_TIL_FERIE_VALG: Synlighetsregel<HvaVilDuGjøreValgKontekst> = {
    id: 'hvaVilDuGjøreValg.visLeggTilFerie',
    beskrivelse:
        '«Legge til ferie» vises for alle søkere, med ett unntak: for far/medmor med BARE_SØKER_RETT skjules ' +
        'alternativet når hele det valgte tidsrommet ligger på eller etter seks uker etter familiehendelsesdato ' +
        '— ferie er da ikke aktuelt, og pause er det riktige valget i stedet.',
    skalVises: (k) => !erFerieEllerOppholdSkjultForFarMedmorBareRett(k),
};

export const VIS_LEGG_TIL_UTSETTELSE_VALG: Synlighetsregel<HvaVilDuGjøreValgKontekst> = {
    id: 'hvaVilDuGjøreValg.visLeggTilUtsettelse',
    beskrivelse:
        '«Utsettelse» vises kun for mor (ikke ved adopsjon), og bare når det valgte tidsrommet ligger innenfor ' +
        'intervallet fra familiehendelsesdato til og med seks uker etter — det er der utsettelse av mødrekvoten ' +
        'er aktuelt.',
    skalVises: (k) =>
        k.søker === 'MOR' &&
        k.familiesituasjon !== 'adopsjon' &&
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
            k.valgtePerioder,
            k.familiehendelsedato,
        ),
};

export const VIS_LEGG_TIL_PAUSE_VALG: Synlighetsregel<HvaVilDuGjøreValgKontekst> = {
    id: 'hvaVilDuGjøreValg.visLeggTilPause',
    beskrivelse:
        '«Pause» vises kun når far/medmor er alene om rettigheter (BARE_SØKER_RETT), og når ingen del av det ' +
        'valgte tidsrommet ligger før seks uker etter familiehendelsesdato — pause er ikke gyldig i de første ' +
        'seks ukene etter fødsel/termin.',
    skalVises: (k) =>
        harBareFarRett(k) &&
        !UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
            k.valgtePerioder,
            k.familiehendelsedato,
        ),
};

export const VIS_LEGG_TIL_OPPHOLD_VALG: Synlighetsregel<HvaVilDuGjøreValgKontekst> = {
    id: 'hvaVilDuGjøreValg.visLeggTilOpphold',
    beskrivelse:
        '«Legge til periode uten foreldrepenger» vises for alle søkere, med samme unntak som ferie: for ' +
        'far/medmor med BARE_SØKER_RETT skjules alternativet når hele det valgte tidsrommet ligger på eller ' +
        'etter seks uker etter familiehendelsesdato.',
    skalVises: (k) => !erFerieEllerOppholdSkjultForFarMedmorBareRett(k),
};

export const VIS_LEGG_TIL_PERIODE_VALG: Synlighetsregel<HvaVilDuGjøreValgKontekst> = {
    id: 'hvaVilDuGjøreValg.visLeggTilPeriode',
    beskrivelse:
        '«Legge til periode med foreldrepenger» vises alltid når et gyldig tidsrom er valgt — det er ingen ' +
        'tidsrom-begrensning på dette alternativet.',
    skalVises: () => true,
};

/**
 * Konteksten reglene trenger for å avgjøre hvilke alternativ som vises i
 * «Hva vil du gjøre»-radiogruppen i listevisningen.
 */
type HvaVilDuGjøreValgKontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    valgtePerioder: Periode[];
};

export type HvaVilDuGjøreValgSynlighet = {
    visLeggTilFerie: boolean;
    visLeggTilUtsettelse: boolean;
    visLeggTilPause: boolean;
    visLeggTilOpphold: boolean;
    visLeggTilPeriode: boolean;
};

const harBareFarRett = (k: HvaVilDuGjøreValgKontekst) =>
    k.søker === 'FAR_MEDMOR' && k.rettighetType === 'BARE_SØKER_RETT';

const erFerieEllerOppholdSkjultForFarMedmorBareRett = (k: HvaVilDuGjøreValgKontekst): boolean =>
    harBareFarRett(k) &&
    !UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );
