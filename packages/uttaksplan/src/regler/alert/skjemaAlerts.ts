import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { i18n } from '../types';
import { Alertområde, Alertregel } from './types';

type Periode = { fom: string; tom: string };

/**
 * Kontekst for blokkerande alerts som avgjør om hele skjemaet skal
 * erstattes av ein informasjonsmelding.
 */
export type BlokkerandeAlertKontekst = {
    valgtePerioder: Periode[];
    familiehendelsedato: string;
    familiesituasjon: 'fødsel' | 'termin' | 'adopsjon';
    søker: 'MOR' | 'FAR_MEDMOR';
    rettighetType: string;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erPeriodeneTilAnnenPartLåst: boolean;
};

const BLOKKERANDE_ALERTS: ReadonlyArray<Alertregel<BlokkerandeAlertKontekst>> = [
    {
        id: 'perioder-krysser-familiehendelse',
        beskrivelse:
            'Brukeren har markert dager både før og etter familiehendelsesdatoen. ' +
            'Skjemaet blokkeres fordi planen må endres i to steg — først dagene ' +
            'før, så dagene etter familiehendelsen.',
        meldingIder: [
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.fødsel'),
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.termin'),
            i18n('LeggTilEllerEndrePeriodeForm.KryssetFamiliehendelse.adopsjon'),
        ],
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
        meldingIder: [i18n('LeggTilEllerEndrePeriodeForm.Forelder.UgyldigKombinasjon')],
        variant: 'info',
        type: 'blokkerande',
        skalVises: (ctx) => !ctx.erMorGyldigForelder && !ctx.erFarMedmorGyldigForelder,
    },
    {
        id: 'annen-part-låst',
        beskrivelse:
            'Brukeren har valgt dager som inkluderer ein periode som berre annen ' +
            'part kan endre. Skjemaet blokkeres fordi brukeren ikkje har lov til ' +
            'å endre desse periodene.',
        meldingIder: [i18n('LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst')],
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
 * Kontekst for kontekstuelle alerts som dukkar opp inne i skjemaet
 * som informasjon til brukaren.
 */
export type KontekstuellAlertKontekst = {
    valgtePerioder: Periode[];
    familiehendelsedato: string;
};

const KONTEKSTUELLE_ALERTS: ReadonlyArray<Alertregel<KontekstuellAlertKontekst>> = [
    {
        id: 'gradering-dager-reduseres',
        beskrivelse:
            'Brukeren har valt gradering i tidsrommet 3 veker før termin til 6 veker ' +
            'etter fødsel. Foreldrepengane blir reduserte den tida brukaren jobbar, ' +
            'utan at dagane blir sparte til seinare.',
        meldingIder: [i18n('LeggTilEllerEndrePeriodeFellesForm.DagerReduseres')],
        variant: 'info',
        type: 'kontekstuell',
        skalVises: (ctx) =>
            UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgSeksUkerEtterFamDato(
                ctx.valgtePerioder,
                ctx.familiehendelsedato,
            ),
    },
];

export const BLOKKERANDE_ALERT_OMRÅDE: Alertområde = {
    id: 'blokkerande-alerts',
    område: 'Blokkerande meldingar',
    beskrivelse:
        'Desse meldingane erstattar heile skjemaet (early return). Dei hindrar brukaren frå å ' +
        'gjere endringar som ikkje er lovlege, og forklarar kvifor skjemaet ikkje er tilgjengeleg.',
    regler: BLOKKERANDE_ALERTS.map(({ id, beskrivelse, meldingIder, variant, type }) => ({
        id,
        beskrivelse,
        meldingIder,
        variant,
        type,
    })),
};

export const KONTEKSTUELL_ALERT_OMRÅDE: Alertområde = {
    id: 'kontekstuelle-alerts',
    område: 'Kontekstuelle meldingar',
    beskrivelse:
        'Desse meldingane dukkar opp inne i skjemaet som tilleggsinformasjon — typisk når ' +
        'brukaren har gjort eit val som har konsekvensar det er viktig å vite om.',
    regler: KONTEKSTUELLE_ALERTS.map(({ id, beskrivelse, meldingIder, variant, type }) => ({
        id,
        beskrivelse,
        meldingIder,
        variant,
        type,
    })),
};

export {
    BLOKKERANDE_ALERTS,
    KONTEKSTUELLE_ALERTS,
};
