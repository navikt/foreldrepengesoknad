import { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode, i18n } from '../types';
import { Alertregel, Alertområde, Visningssted } from './types';

/**
 * Kontekst for blokkerende alerts som avgjør om hele skjemaet skal
 * erstattes av en informasjonsmelding.
 */
export type BlokkerendeAlertKontekst = {
    valgtePerioder: Periode[];
    familiehendelsedato: string;
    familiesituasjon: Familiesituasjon;
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erPeriodeneTilAnnenPartLåst: boolean;
};

const SKJEMA_VISNINGSSTEDER: readonly Visningssted[] = ['legg-til-endre-skjema'];

const BLOKKERENDE_ALERTS: ReadonlyArray<Alertregel<BlokkerendeAlertKontekst>> = [
    {
        id: 'blokkerendeAlerts.perioderKrysserFamiliehendelse',
        beskrivelse:
            'Brukeren har markert dager både før og etter familiehendelsesdatoen. ' +
            'Skjemaet blokkeres fordi planen må endres i to steg — først dagene ' +
            'før, så dagene etter familiehendelsen.',
        visningssteder: SKJEMA_VISNINGSSTEDER,
        meldingIder: [
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.fødsel'),
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.termin'),
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.adopsjon'),
        ],
        getMeldingId: (ctx) => i18n(`LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.${ctx.familiesituasjon}`),
        variant: 'info',
        type: 'blokkerende',
        skalVises: (ctx) => {
            const kunFarHarRett =
                ctx.søker === 'FAR_MEDMOR' &&
                (ctx.rettighetType === 'BARE_SØKER_RETT' || ctx.rettighetType === 'ALENEOMSORG');
            return (
                !kunFarHarRett &&
                UttaksperiodeValidatorer.erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato(
                    ctx.valgtePerioder,
                    ctx.familiehendelsedato,
                )
            );
        },
    },
    {
        id: 'blokkerendeAlerts.ugyldigForelderKombinasjon',
        beskrivelse:
            'Ingen forelder har gyldige stønadskontoer for den valgte perioden. ' +
            'Skjemaet blokkeres fordi det ikke finnes noen gyldig kontotype å velge.',
        visningssteder: SKJEMA_VISNINGSSTEDER,
        meldingIder: [i18n('LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon')],
        getMeldingId: () => i18n('LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon'),
        variant: 'info',
        type: 'blokkerende',
        skalVises: (ctx) => !ctx.erMorGyldigForelder && !ctx.erFarMedmorGyldigForelder,
    },
    {
        id: 'blokkerendeAlerts.annenPartLåst',
        beskrivelse:
            'Brukeren har valgt dager som inkluderer en periode som bare annen ' +
            'part kan endre. Skjemaet blokkeres fordi brukeren ikke har lov til ' +
            'å endre disse periodene.',
        visningssteder: SKJEMA_VISNINGSSTEDER,
        meldingIder: [i18n('LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst')],
        getMeldingId: () => i18n('LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst'),
        variant: 'info',
        type: 'blokkerende',
        skalVises: (ctx) => {
            const erFarMedmorLåst = ctx.erPeriodeneTilAnnenPartLåst && ctx.søker === 'MOR';
            const erMorLåst = ctx.erPeriodeneTilAnnenPartLåst && ctx.søker === 'FAR_MEDMOR';
            return (
                (erMorLåst && !ctx.erFarMedmorGyldigForelder) ||
                (erFarMedmorLåst && !ctx.erMorGyldigForelder)
            );
        },
    },
];

/**
 * Kontekst for kontekstuelle alerts som dukker opp inne i skjemaet
 * som informasjon til brukeren.
 */
export type KontekstuellAlertKontekst = {
    valgtePerioder: Periode[];
    familiehendelsedato: string;
};

const KONTEKSTUELL_GRADERING_ALERT: Alertregel<KontekstuellAlertKontekst> = {
    id: 'kontekstuelleAlerts.graderingDagerReduseres',
    beskrivelse:
        'Brukeren har valgt gradering i tidsrommet 3 uker før termin til 6 uker ' +
        'etter fødsel. Foreldrepengene blir redusert den tiden brukeren jobber, ' +
        'uten at dagene blir spart til senere.',
    visningssteder: SKJEMA_VISNINGSSTEDER,
    meldingIder: [i18n('LeggTilEllerEndrePeriodeFellesForm.DagerReduseres')],
    getMeldingId: () => i18n('LeggTilEllerEndrePeriodeFellesForm.DagerReduseres'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgSeksUkerEtterFamDato(
            ctx.valgtePerioder,
            ctx.familiehendelsedato,
        ),
};

const KONTEKSTUELLE_ALERTS: ReadonlyArray<Alertregel<KontekstuellAlertKontekst>> = [KONTEKSTUELL_GRADERING_ALERT];

export { KONTEKSTUELL_GRADERING_ALERT };

/**
 * Finn den første blokkerende alerten som slår inn, eller undefined.
 * Bruker regelens `getMeldingId` for å finne riktig meldingsnøkkel.
 */
export const finnFørsteBlokkerendeAlert = (
    ctx: BlokkerendeAlertKontekst,
): { regel: Alertregel<BlokkerendeAlertKontekst>; meldingId: string } | undefined => {
    for (const regel of BLOKKERENDE_ALERTS) {
        if (regel.skalVises(ctx)) {
            return { regel, meldingId: regel.getMeldingId(ctx) };
        }
    }
    return undefined;
};

/**
 * Hook som henter kontekst fra UttaksplanDataContext og evaluerer
 * blokkerende alerts. Returnerer melding-id + variant slik konsumenten
 * selv kan rendre med FormattedMessage, eller undefined om ingen alert slår inn.
 */
export const useBlokkerendeAlert = (input: {
    valgtePerioder: Periode[];
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
}): { meldingId: string; variant: 'info' | 'warning' } | undefined => {
    const {
        foreldreInfo: { rettighetType, søker },
        familiehendelsedato,
        familiesituasjon,
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const treff = finnFørsteBlokkerendeAlert({
        valgtePerioder: input.valgtePerioder,
        familiehendelsedato,
        familiesituasjon,
        søker,
        rettighetType,
        erMorGyldigForelder: input.erMorGyldigForelder,
        erFarMedmorGyldigForelder: input.erFarMedmorGyldigForelder,
        erPeriodeneTilAnnenPartLåst,
    });

    if (!treff) {
        return undefined;
    }

    return {
        meldingId: treff.meldingId,
        variant: treff.regel.variant,
    };
};

export const BLOKKERENDE_ALERT_OMRÅDE: Alertområde = {
    id: 'blokkerendeAlerts',
    område: 'Blokkerende meldinger',
    beskrivelse:
        'Disse meldingene erstatter hele skjemaet (early return). De hindrer brukeren fra å ' +
        'gjøre endringer som ikke er lovlige, og forklarer hvorfor skjemaet ikke er tilgjengelig.',
    regler: BLOKKERENDE_ALERTS,
};

export const KONTEKSTUELL_ALERT_OMRÅDE: Alertområde = {
    id: 'kontekstuelleAlerts',
    område: 'Kontekstuelle meldinger',
    beskrivelse:
        'Disse meldingene dukker opp inne i skjemaet som tilleggsinformasjon — typisk når ' +
        'brukeren har gjort et valg som har konsekvenser det er viktig å vite om.',
    regler: KONTEKSTUELLE_ALERTS,
};

export { BLOKKERENDE_ALERTS, KONTEKSTUELLE_ALERTS };
