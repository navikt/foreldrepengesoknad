import { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';
import { useIntl } from 'react-intl';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode, i18n } from '../types';
import { Alertregel, Alertområde, Visningsstad } from './types';

/**
 * Kontekst for blokkerande alerts som avgjør om hele skjemaet skal
 * erstattes av en informasjonsmelding.
 */
export type BlokkerandeAlertKontekst = {
    valgtePerioder: Periode[];
    familiehendelsedato: string;
    familiesituasjon: Familiesituasjon;
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erPeriodeneTilAnnenPartLåst: boolean;
};

const SKJEMA_VISNINGSSTADER: readonly Visningsstad[] = ['legg-til-endre-skjema'];

const BLOKKERANDE_ALERTS: ReadonlyArray<Alertregel<BlokkerandeAlertKontekst>> = [
    {
        id: 'perioder-krysser-familiehendelse',
        beskrivelse:
            'Brukeren har markert dager både før og etter familiehendelsesdatoen. ' +
            'Skjemaet blokkeres fordi planen må endres i to steg — først dagene ' +
            'før, så dagene etter familiehendelsen.',
        visningsstader: SKJEMA_VISNINGSSTADER,
        meldingIder: [
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.fødsel'),
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.termin'),
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.adopsjon'),
        ],
        getMeldingId: (ctx) => i18n(`LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.${ctx.familiesituasjon}`),
        variant: 'info',
        type: 'blokkerande',
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
        id: 'ugyldig-forelder-kombinasjon',
        beskrivelse:
            'Ingen forelder har gyldige stønadskontoer for den valgte perioden. ' +
            'Skjemaet blokkeres fordi det ikke finnes noen gyldig kontotype å velge.',
        visningsstader: SKJEMA_VISNINGSSTADER,
        meldingIder: [i18n('LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon')],
        getMeldingId: () => i18n('LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon'),
        variant: 'info',
        type: 'blokkerande',
        skalVises: (ctx) => !ctx.erMorGyldigForelder && !ctx.erFarMedmorGyldigForelder,
    },
    {
        id: 'annen-part-låst',
        beskrivelse:
            'Brukeren har valgt dager som inkluderer en periode som bare annen ' +
            'part kan endre. Skjemaet blokkeres fordi brukeren ikke har lov til ' +
            'å endre disse periodene.',
        visningsstader: SKJEMA_VISNINGSSTADER,
        meldingIder: [i18n('LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst')],
        getMeldingId: () => i18n('LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst'),
        variant: 'info',
        type: 'blokkerande',
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
    id: 'gradering-dager-reduseres',
    beskrivelse:
        'Brukeren har valgt gradering i tidsrommet 3 uker før termin til 6 uker ' +
        'etter fødsel. Foreldrepengene blir redusert den tiden brukeren jobber, ' +
        'uten at dagene blir spart til senere.',
    visningsstader: SKJEMA_VISNINGSSTADER,
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

/**
 * Finn den første blokkerande alerten som slår inn, eller undefined.
 * Bruker regelens `getMeldingId` for å finne riktig meldingsnøkkel.
 */
export const finnFørsteBlokkerandeAlert = (
    ctx: BlokkerandeAlertKontekst,
): { regel: Alertregel<BlokkerandeAlertKontekst>; meldingId: string } | undefined => {
    for (const regel of BLOKKERANDE_ALERTS) {
        if (regel.skalVises(ctx)) {
            return { regel, meldingId: regel.getMeldingId(ctx) };
        }
    }
    return undefined;
};

/**
 * Hook som henter kontekst fra UttaksplanDataContext og evaluerer
 * blokkerande alerts. Returnerer ferdigformatert melding + variant,
 * eller undefined om ingen alert slår inn.
 */
export const useBlokkerandeAlert = (
    valgtePerioder: Periode[],
    erMorGyldigForelder: boolean,
    erFarMedmorGyldigForelder: boolean,
): { melding: string; variant: 'info' | 'warning' } | undefined => {
    const intl = useIntl();
    const {
        foreldreInfo: { rettighetType, søker },
        familiehendelsedato,
        familiesituasjon,
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const treff = finnFørsteBlokkerandeAlert({
        valgtePerioder,
        familiehendelsedato,
        familiesituasjon,
        søker,
        rettighetType,
        erMorGyldigForelder,
        erFarMedmorGyldigForelder,
        erPeriodeneTilAnnenPartLåst,
    });

    if (!treff) {
        return undefined;
    }

    return {
        melding: intl.formatMessage({ id: treff.meldingId }),
        variant: treff.regel.variant,
    };
};

/** Sjekk om graderingsalerten skal vises. */
export const skalViseGraderingAlert = (ctx: KontekstuellAlertKontekst): boolean =>
    KONTEKSTUELL_GRADERING_ALERT.skalVises(ctx);

const tilAlertområde = (
    id: string,
    område: string,
    beskrivelse: string,
    regler: ReadonlyArray<Alertregel<unknown>>,
): Alertområde => ({
    id,
    område,
    beskrivelse,
    regler: regler.map((regel) => ({
        id: regel.id,
        beskrivelse: regel.beskrivelse,
        visningsstader: regel.visningsstader,
        meldingIder: regel.meldingIder,
        variant: regel.variant,
        type: regel.type,
    })),
});

export const BLOKKERANDE_ALERT_OMRÅDE: Alertområde = tilAlertområde(
    'blokkerande-alerts',
    'Blokkerende meldinger',
    'Disse meldingene erstatter hele skjemaet (early return). De hindrer brukeren fra å ' +
        'gjøre endringer som ikke er lovlige, og forklarer hvorfor skjemaet ikke er tilgjengelig.',
    BLOKKERANDE_ALERTS as ReadonlyArray<Alertregel<unknown>>,
);

export const KONTEKSTUELL_ALERT_OMRÅDE: Alertområde = tilAlertområde(
    'kontekstuelle-alerts',
    'Kontekstuelle meldinger',
    'Disse meldingene dukker opp inne i skjemaet som tilleggsinformasjon — typisk når ' +
        'brukeren har gjort et valg som har konsekvenser det er viktig å vite om.',
    KONTEKSTUELLE_ALERTS as ReadonlyArray<Alertregel<unknown>>,
);

export { BLOKKERANDE_ALERTS, KONTEKSTUELLE_ALERTS };
