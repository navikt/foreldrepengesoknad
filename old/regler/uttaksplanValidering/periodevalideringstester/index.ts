import { harUttaksperiodeGyldigGradering } from './harUttaksperiodeGyldigGradering';
import { harPeriodeGyldigTidsperiode } from './harPeriodeGyldigTidsperiode';
import { harUttaksperiodeStønadskonto } from './harUttaksperiodeStønadskonto';
import { erSamtidigUttakGyldig } from './erSamtidigUttakGyldig';
import { erUtsettelseEtterFamiliehendelsesdato } from './erUtsettelseEtterFamiliehendelsesdato';
import { erAllePeriodeSkjemaspørsmålBesvart } from './erAllePeriodeSkjemaspørsmålBesvart';
import { Regel, RegelAlvorlighet } from 'shared/regler/regelTypes';
import { harUtsettelsePgaArbeidMedDeltidUtenAvtale } from './harUtsettelsePgaArbeidMedDeltidUtenAvtale';

export enum PeriodeValiderRegelKey {
    'uttaksperiodeHarGyldigGradering' = 'uttaksperiodeHarGyldigGradering',
    'periodeHarGyldigTidsperiode' = 'periodeHarGyldigTidsperiode',
    'uttaksperiodeHarStønadskonto' = 'uttaksperiodeHarStønadskonto',
    'erSamtidigUttakGyldig' = 'erSamtidigUttakGyldig',
    'erUtsettelseEtterFamiliehendelsesdato' = 'erUtsettelseEtterFamiliehendelsesdato',
    'erAllePeriodeSkjemaspørsmålBesvart' = 'erAllePeriodeSkjemaspørsmålBesvart',
    'harUtsettelsePgaArbeidMedDeltidUtenAvtale' = 'harUtsettelsePgaArbeidMedDeltidUtenAvtale',
}

/** Meldingene skal default kun vises inne i skjema */

const skjulIOppsummering = true;

const periodevalideringsregler: Regel[] = [
    {
        key: PeriodeValiderRegelKey.uttaksperiodeHarGyldigGradering,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksperiodeGyldigGradering,
        skjulesIOppsummering: skjulIOppsummering,
        avvikType: 'skjema',
    },
    {
        key: PeriodeValiderRegelKey.periodeHarGyldigTidsperiode,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harPeriodeGyldigTidsperiode,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.uttaksperiodeHarStønadskonto,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksperiodeStønadskonto,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.erSamtidigUttakGyldig,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erSamtidigUttakGyldig,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.erUtsettelseEtterFamiliehendelsesdato,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUtsettelseEtterFamiliehendelsesdato,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.erAllePeriodeSkjemaspørsmålBesvart,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erAllePeriodeSkjemaspørsmålBesvart,
        skjulesIOppsummering: skjulIOppsummering,
        avvikType: 'skjema',
    },
    {
        key: PeriodeValiderRegelKey.harUtsettelsePgaArbeidMedDeltidUtenAvtale,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUtsettelsePgaArbeidMedDeltidUtenAvtale,
        skjulesIOppsummering: false,
    },
];

export default periodevalideringsregler;
