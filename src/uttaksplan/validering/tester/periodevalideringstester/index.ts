import { harUttaksperiodeGyldigGradering } from './harUttaksperiodeGyldigGradering';
import { harPeriodeGyldigTidsperiode } from './harPeriodeGyldigTidsperiode';
import { harUttaksperiodeStønadskonto } from './harUttaksperiodeStønadskonto';
import { erSamtidigUttakGyldig } from './erSamtidigUttakGyldig';
import { erUtsettelseEtterFamiliehendelsesdato } from './erUtsettelseEtterFamiliehendelsesdato';
// import { erAllePeriodeSkjemaspørsmålBesvart } from './erAllePeriodeSkjemaspørsmålBesvart';
import { Regel, RegelAlvorlighet } from '../../utils/types/regelTypes';
import { harUtsettelsePgaArbeidMedDeltidUtenAvtale } from './harUtsettelsePgaArbeidMedDeltidUtenAvtale';
import { starterUttaksperiodeRundtFødselEtter2UkerFørFødsel } from './starterUttaksperiodeRundtFødselEtter2UkerFørFødsel';
import { slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel } from './slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel';
import { periodeDeFørsteSeksUkeneHarUlovligUttakBFHR } from './periodeDeFørsteSeksUkeneHarUlovligUttakBFHR';

export enum PeriodeValiderRegelKey {
    'uttaksperiodeHarGyldigGradering' = 'uttaksperiodeHarGyldigGradering',
    'periodeHarGyldigTidsperiode' = 'periodeHarGyldigTidsperiode',
    'uttaksperiodeHarStønadskonto' = 'uttaksperiodeHarStønadskonto',
    'erSamtidigUttakGyldig' = 'erSamtidigUttakGyldig',
    'erUtsettelseEtterFamiliehendelsesdato' = 'erUtsettelseEtterFamiliehendelsesdato',
    // 'erAllePeriodeSkjemaspørsmålBesvart' = 'erAllePeriodeSkjemaspørsmålBesvart',
    'harUtsettelsePgaArbeidMedDeltidUtenAvtale' = 'harUtsettelsePgaArbeidMedDeltidUtenAvtale',
    'starterUttaksperiodeRundtFødselEtter2UkerFørFødsel' = 'starterUttaksperiodeRundtFødselEtter2UkerFørFødsel',
    'slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel' = 'slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel',
    'periodeDeFørsteSeksUkeneHarUlovligUttakBFHR' = 'periodeDeFørsteSeksUkeneHarUlovligUttakBFHR',
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
        key: PeriodeValiderRegelKey.starterUttaksperiodeRundtFødselEtter2UkerFørFødsel,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: starterUttaksperiodeRundtFødselEtter2UkerFørFødsel,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: slutterUttaksperiodeRundtFødselInnen6UkerEtterFødsel,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.uttaksperiodeHarStønadskonto,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksperiodeStønadskonto,
        skjulesIOppsummering: skjulIOppsummering,
    },
    {
        key: PeriodeValiderRegelKey.periodeDeFørsteSeksUkeneHarUlovligUttakBFHR,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: periodeDeFørsteSeksUkeneHarUlovligUttakBFHR,
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
    //TODO: visibility.areAllQuestionsAnswered() burde sendes oppover fra periodeUttakFormQuestionsConfig/Legg til periode formen.
    // {
    //     key: PeriodeValiderRegelKey.erAllePeriodeSkjemaspørsmålBesvart,
    //     alvorlighet: RegelAlvorlighet.FEIL,
    //     test: erAllePeriodeSkjemaspørsmålBesvart,
    //     skjulesIOppsummering: skjulIOppsummering,
    //     avvikType: 'skjema',
    // },
    {
        key: PeriodeValiderRegelKey.harUtsettelsePgaArbeidMedDeltidUtenAvtale,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUtsettelsePgaArbeidMedDeltidUtenAvtale,
        skjulesIOppsummering: false,
    },
];

export default periodevalideringsregler;
