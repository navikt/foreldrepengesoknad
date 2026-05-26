import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode } from '../types';
import { Alertregel, Visningssted, lagAlertregel } from './types';

/**
 * Hook som henter kontekst fra UttaksplanDataContext og evaluerer
 * blokkerende alerts. Returnerer melding + variant slik konsumenten
 * kan rendre den direkte, eller undefined om ingen alert slår inn.
 */
export const useBlokkerendeAlert = (input: {
    valgtePerioder: Periode[];
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
}): { melding: ReactNode; variant: 'info' | 'warning' } | undefined => {
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
        melding: treff.melding,
        variant: treff.regel.variant,
    };
};

/**
 * Aktive kontekstuelle alerts i legg-til-/endre-skjemaet, ferdig pakket
 * med variant og melding. Konsumentene rendrer kun.
 */
export const useSkjemaKontekstuelleAlerts = (valgtePerioder: Periode[]): SkjemaKontekstuelleAlerts => {
    const { familiehendelsedato } = useUttaksplanData();
    const ctx: KontekstuellAlertKontekst = { valgtePerioder, familiehendelsedato };
    return {
        graderingDagerReduseres: KONTEKSTUELL_GRADERING_ALERT.skalVises(ctx)
            ? {
                  melding: KONTEKSTUELL_GRADERING_ALERT.getMelding(ctx),
                  variant: KONTEKSTUELL_GRADERING_ALERT.variant,
              }
            : undefined,
    };
};

export { BLOKKERENDE_ALERTS, KONTEKSTUELLE_ALERTS };

/**
 * Kontekst for blokkerende alerts som avgjør om hele skjemaet skal
 * erstattes av en informasjonsmelding.
 */
type BlokkerendeAlertKontekst = {
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

const KRYSSET_FAMILIEHENDELSE_MELDINGER: Record<Familiesituasjon, ReactNode> = {
    fødsel: (
        <FormattedMessage
            key="LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.fødsel"
            id="LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.fødsel"
        />
    ),
    termin: (
        <FormattedMessage
            key="LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.termin"
            id="LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.termin"
        />
    ),
    adopsjon: (
        <FormattedMessage
            key="LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.adopsjon"
            id="LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.adopsjon"
        />
    ),
};

const BLOKKERENDE_ALERTS: ReadonlyArray<Alertregel<BlokkerendeAlertKontekst>> = [
    lagAlertregel<BlokkerendeAlertKontekst>({
        id: 'blokkerendeAlerts.perioderKrysserFamiliehendelse',
        beskrivelse:
            'Brukeren har markert dager både før og etter familiehendelsesdatoen. ' +
            'Skjemaet blokkeres fordi planen må endres i to steg — først dagene ' +
            'før, så dagene etter familiehendelsen.',
        visningssteder: SKJEMA_VISNINGSSTEDER,
        meldinger: Object.values(KRYSSET_FAMILIEHENDELSE_MELDINGER),
        getMelding: (ctx) => KRYSSET_FAMILIEHENDELSE_MELDINGER[ctx.familiesituasjon],
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
    }),
    lagAlertregel<BlokkerendeAlertKontekst>({
        id: 'blokkerendeAlerts.ugyldigForelderKombinasjon',
        beskrivelse:
            'Ingen forelder har gyldige stønadskontoer for den valgte perioden. ' +
            'Skjemaet blokkeres fordi det ikke finnes noen gyldig kontotype å velge.',
        visningssteder: SKJEMA_VISNINGSSTEDER,
        meldinger: [
            <FormattedMessage
                key="LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon"
                id="LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon"
            />,
        ],
        variant: 'info',
        type: 'blokkerende',
        skalVises: (ctx) => !ctx.erMorGyldigForelder && !ctx.erFarMedmorGyldigForelder,
    }),
    lagAlertregel<BlokkerendeAlertKontekst>({
        id: 'blokkerendeAlerts.annenPartLåst',
        beskrivelse:
            'Brukeren har valgt dager som inkluderer en periode som bare annen ' +
            'part kan endre. Skjemaet blokkeres fordi brukeren ikke har lov til ' +
            'å endre disse periodene.',
        visningssteder: SKJEMA_VISNINGSSTEDER,
        meldinger: [
            <FormattedMessage
                key="LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst"
                id="LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst"
            />,
        ],
        variant: 'info',
        type: 'blokkerende',
        skalVises: (ctx) => {
            const erFarMedmorLåst = ctx.erPeriodeneTilAnnenPartLåst && ctx.søker === 'MOR';
            const erMorLåst = ctx.erPeriodeneTilAnnenPartLåst && ctx.søker === 'FAR_MEDMOR';
            return (erMorLåst && !ctx.erFarMedmorGyldigForelder) || (erFarMedmorLåst && !ctx.erMorGyldigForelder);
        },
    }),
];

/**
 * Kontekst for kontekstuelle alerts som dukker opp inne i skjemaet
 * som informasjon til brukeren.
 */
type KontekstuellAlertKontekst = {
    valgtePerioder: Periode[];
    familiehendelsedato: string;
};

const KONTEKSTUELL_GRADERING_ALERT = lagAlertregel<KontekstuellAlertKontekst>({
    id: 'kontekstuelleAlerts.graderingDagerReduseres',
    beskrivelse:
        'Brukeren har valgt gradering i tidsrommet 3 uker før termin til 6 uker ' +
        'etter fødsel. Foreldrepengene blir redusert den tiden brukeren jobber, ' +
        'uten at dagene blir spart til senere.',
    visningssteder: SKJEMA_VISNINGSSTEDER,
    meldinger: [
        <FormattedMessage
            key="LeggTilEllerEndrePeriodeFellesForm.DagerReduseres"
            id="LeggTilEllerEndrePeriodeFellesForm.DagerReduseres"
        />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgSeksUkerEtterFamDato(
            ctx.valgtePerioder,
            ctx.familiehendelsedato,
        ),
});

const KONTEKSTUELLE_ALERTS: ReadonlyArray<Alertregel<KontekstuellAlertKontekst>> = [KONTEKSTUELL_GRADERING_ALERT];

type SkjemaKontekstuelleAlerts = {
    graderingDagerReduseres?: { melding: ReactNode; variant: 'info' | 'warning' };
};

/**
 * Finn den første blokkerende alerten som slår inn, eller undefined.
 * Bruker regelens `getMelding` for å finne riktig melding-node.
 */
const finnFørsteBlokkerendeAlert = (
    ctx: BlokkerendeAlertKontekst,
): { regel: Alertregel<BlokkerendeAlertKontekst>; melding: ReactNode } | undefined => {
    for (const regel of BLOKKERENDE_ALERTS) {
        if (regel.skalVises(ctx)) {
            return { regel, melding: regel.getMelding(ctx) };
        }
    }
    return undefined;
};
