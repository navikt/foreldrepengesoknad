import { Regel, RegelAlvorlighet } from '../types';
import { harUttaksperiodeGyldigGradering } from './harUttaksperiodeGyldigGradering';
import { harPeriodeGyldigTidsperiode } from './harPeriodeGyldigTidsperiode';
import { harUttaksperiodeStønadskonto } from './harUttaksperiodeStønadskonto';
import { erSamtidigUttakGyldig } from './erSamtidigUttakGyldig';
import { erUtsettelseEtterFamiliehendelsesdato } from './erUtsettelseEtterFamiliehendelsesdato';

export enum PeriodeValiderRegelKey {
    'uttaksperiodeHarGyldigGradering' = 'uttaksperiodeHarGyldigGradering',
    'periodeHarGyldigTidsperiode' = 'periodeHarGyldigTidsperiode',
    'uttaksperiodeHarStønadskonto' = 'uttaksperiodeHarStønadskonto',
    'erSamtidigUttakGyldig' = 'erSamtidigUttakGyldig',
    'erUtsettelseEtterFamiliehendelsesdato' = 'erUtsettelseEtterFamiliehendelsesdato'
}

/** Meldingene skal default kun vises inne i skjema */
const skjulIOppsummering: boolean = true;

const periodevalideringsregler: Regel[] = [
    {
        key: PeriodeValiderRegelKey.uttaksperiodeHarGyldigGradering,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksperiodeGyldigGradering,
        skjulIOppsummering
    },
    {
        key: PeriodeValiderRegelKey.uttaksperiodeHarGyldigGradering,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harPeriodeGyldigTidsperiode,
        skjulIOppsummering
    },
    {
        key: PeriodeValiderRegelKey.uttaksperiodeHarStønadskonto,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksperiodeStønadskonto,
        skjulIOppsummering
    },
    {
        key: PeriodeValiderRegelKey.erSamtidigUttakGyldig,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erSamtidigUttakGyldig,
        skjulIOppsummering
    },
    {
        key: PeriodeValiderRegelKey.erUtsettelseEtterFamiliehendelsesdato,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUtsettelseEtterFamiliehendelsesdato,
        skjulIOppsummering
    }
];

export default periodevalideringsregler;
