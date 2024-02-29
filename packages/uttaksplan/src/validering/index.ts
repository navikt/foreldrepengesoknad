import { førsteOktober2021ReglerGjelder } from '@navikt/fp-common';

import { burdeKanskjeSøkeGraderingTest } from './tester/burdeKanskjeSøkeGraderingTest';
import { erUttaksmengdeForFarMedmorForHøyTest } from './tester/erUttaksmengdeForFarMedmorForHøyTest';
import { erUttaksplanBareOppholdTest } from './tester/erUttaksplanBareOppholdTest';
import { erUttaksplanGraderingStørreEnnSamtidigUttakTest } from './tester/erUttaksplanGraderingStørreEnnSamtidigUttakTest';
import { farMedMorHarRettPåUttakRundtFødselTest } from './tester/farMedMorHarRettPåUttakRundtFødselTest';
import { farMedmorHarRettPåFlerbarnsdagerTest } from './tester/farMedmorHarRettPåFlerbarnsdagerTest';
import { farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest } from './tester/farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest';
import { farMedmorHarSøktUgyldigAntallDagerUttakRundtFødselTest } from './tester/farMedmorHarSøktUgyldigAntallDagerUttakRundtFødselTest';
import { ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindatoTest } from './tester/ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindatoTest';
import { harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest } from './tester/harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest';
import { harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUkerTest } from './tester/harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUkerTest';
import { harMorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harMorSøktUgyldigUttakFørsteSeksUkerTest';
import { harPerioderEtterFørsteStønadsdagNesteBarnDerToTette } from './tester/harPerioderEtterFørsteStønadsdagNesteBarnDerToTette';
import { harSøktOmFerieUtenArbeidsforhold } from './tester/harSøktOmFerieUtenArbeidsforholdTest';
import { harUttaksplanForMangeFlerbarnsdagerTest } from './tester/harUttaksplanForMangeFlerbarnsdagerTest';
import { inneholderBareUtsettelserTest } from './tester/inneholderBareUtsettelserTest';
import { inneholderForMyeFerie } from './tester/inneholderForMyeFerie';
import { inneholderPerioderUtenAktivitetskrav } from './tester/inneholderPerioderUtenAktivitetskrav';
import { inneholderTapteDagerTest } from './tester/inneholderTapteDagerTest';
import { inneholderUtsettelserUtenÅrsak } from './tester/inneholderUtsettelserUtenÅrsak';
import { inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest } from './tester/inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest';
import { inneholderUttaksperioderMedUbesvartGradering } from './tester/inneholderUttaksperioderMedUbesvartGradering';
import { inneholderUttaksplanDatoSomIkkeErUttaksdag } from './tester/inneholderUttaksplanDatoSomIkkeErUttaksdagTest';
import { inneholderUttaksplanPerioderTest } from './tester/inneholderUttaksplanPerioderTest';
import { kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme } from './tester/kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme';
import { overlapperPeriodeAndrePerioder } from './tester/overlapperPeriodeAndrePerioderTest';
import { overskriverEndringerAnnenPartsPerioder } from './tester/overskriverEndringerAnnenPartsPerioder';
import { overstigerMinsterettVedToTette } from './tester/overstigerMinsterettVedToTette';
import periodevalideringsregler, { PeriodeValiderRegelKey } from './tester/periodevalideringstester';
import { slutterUttaksplanMedOppholdTest } from './tester/slutterUttaksplanMedOppholdTest';
import { starterUttaksplanMedOppholdTest } from './tester/starterUttaksplanMedOppholdTest';
import { stønadskontoInneholderForMyeUttakKunSøkerTest } from './tester/stønadskontoInneholderForMyeUttakKunSøkerTest';
import { Regel, RegelAlvorlighet } from './utils/types/regelTypes';

export enum UttaksplanRegelKey {
    'planenInneholderIngenPerioder' = 'planenInneholderIngenPerioder',
    'morHarSøktUgyldigUttakFørsteSeksUker' = 'morHarSøktUgyldigUttakFørsteSeksUker',
    'farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker' = 'farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker',
    'farMedmorHarSøktUgyldigAntallDagerUttakRundtFødsel' = 'farMedmorHarSøktUgyldigAntallDagerUttakRundtFødsel',
    'harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUker' = 'harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUker',
    'farMedmorHarSøktUttakRundtFødselUtenforGyldigPeriode' = 'farMedmorHarSøktUttakRundtFødselUtenforGyldigPeriode',
    'stønadskontoInneholderForMyeUttakKunSøker' = 'stønadskontoInneholderForMyeUttakKunSøker',
    'uttaksplanErBareOpphold' = 'uttaksplanErBareOpphold',
    'uttaksplanStarterMedOpphold' = 'uttaksplanStarterMedOpphold',
    'uttaksplanSlutterMedOpphold' = 'uttaksplanSlutterMedOpphold',
    'uttaksplanGraderingStørreEnnSamtidigUttak' = 'uttaksplanGraderingStørreEnnSamtidigUttak',
    'uttaksplanHarForMangeFlerbarnsdager' = 'uttaksplanHarForMangeFlerbarnsdager',
    'uttaksplanInneholderDatoSomIkkeErUttaksdag' = 'uttaksplanInneholderDatoSomIkkeErUttaksdag',
    'inneholderTapteDager' = 'inneholderTapteDager',
    'inneholderBareUtsettelser' = 'inneholderBareUtsettelser',
    'inneholderForMyeFerie' = 'inneholderForMyeFerie',
    'endringerOverskriverAnnenPartsPerioder' = 'endringerOverskriverAnnenPartsPerioder',
    'periodeOverlapperAndrePerioder' = 'periodeOverlapperAndrePerioder',
    'harSøktOmFerieUtenArbeidsforhold' = 'harSøktOmFerieUtenArbeidsforhold',
    'kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme' = 'kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme',
    'uttaksmengdeForFarMedmorErForHøy' = 'uttaksmengdeForFarMedmorErForHøy',
    'burdeKanskjeSøkeGradering' = 'burdeKanskjeSøkeGradering',
    'ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindato' = 'ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindato',
    'inneholderPerioderUtenAktivitetskrav' = 'inneholderPerioderUtenAktivitetskrav',
    'inneholderUtsettelserUtenÅrsak' = 'inneholderUtsettelserUtenÅrsak',
    'farMedMorHarRettPåUttakRundtFødsel' = 'farMedMorHarRettPåUttakRundtFødsel',
    'farMedmorHarRettPåForeldrepengerUtenAktivitetskrav' = 'farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest',
    'farMedmorHarRettPåFlerbarnsdager' = 'farMedmorHarRettPåFlerbarnsdagerTest',
    'inneholderUttaksperioderMedUbesvartGradering' = 'inneholderUttaksperioderMedUbesvartGradering',
    'inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest' = 'inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest',
    'overstigerMinsterettVedToTette' = 'overstigerMinsterettVedToTette',
    'harPerioderEtterFørsteStønadsdagNesteBarnDerToTette' = 'harPerioderEtterFørsteStønadsdagNesteBarnDerToTette',
}

export type RegelKey = UttaksplanRegelKey | PeriodeValiderRegelKey;

const uttaksplanValideringRegler = (familiehendelsesdato: Date): Regel[] => [
    {
        key: UttaksplanRegelKey.planenInneholderIngenPerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanPerioderTest,
    },
    {
        key: UttaksplanRegelKey.stønadskontoInneholderForMyeUttakKunSøker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: stønadskontoInneholderForMyeUttakKunSøkerTest,
    },
    {
        key: UttaksplanRegelKey.morHarSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harMorSøktUgyldigUttakFørsteSeksUkerTest,
    },
    {
        key: UttaksplanRegelKey.farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest,
    },
    {
        key: UttaksplanRegelKey.farMedmorHarSøktUgyldigAntallDagerUttakRundtFødsel,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: farMedmorHarSøktUgyldigAntallDagerUttakRundtFødselTest,
    },
    {
        key: UttaksplanRegelKey.harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUkerTest,
    },
    {
        key: UttaksplanRegelKey.uttaksmengdeForFarMedmorErForHøy,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksmengdeForFarMedmorForHøyTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanErBareOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksplanBareOppholdTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanStarterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: starterUttaksplanMedOppholdTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanSlutterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: slutterUttaksplanMedOppholdTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanGraderingStørreEnnSamtidigUttak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksplanGraderingStørreEnnSamtidigUttakTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanHarForMangeFlerbarnsdager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksplanForMangeFlerbarnsdagerTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanInneholderDatoSomIkkeErUttaksdag,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanDatoSomIkkeErUttaksdag,
    },
    {
        key: UttaksplanRegelKey.farMedMorHarRettPåUttakRundtFødsel,
        alvorlighet: RegelAlvorlighet.INFO,
        test: farMedMorHarRettPåUttakRundtFødselTest,
        skjulesIPeriode: true,
    },
    {
        key: UttaksplanRegelKey.farMedmorHarRettPåForeldrepengerUtenAktivitetskrav,
        alvorlighet: RegelAlvorlighet.INFO,
        test: farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest,
        skjulesIPeriode: true,
    },
    {
        key: UttaksplanRegelKey.farMedmorHarRettPåFlerbarnsdager,
        alvorlighet: RegelAlvorlighet.INFO,
        test: farMedmorHarRettPåFlerbarnsdagerTest,
        skjulesIPeriode: true,
    },
    {
        key: UttaksplanRegelKey.inneholderTapteDager,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderTapteDagerTest,
    },
    {
        key: UttaksplanRegelKey.inneholderBareUtsettelser,
        alvorlighet: førsteOktober2021ReglerGjelder(familiehendelsesdato)
            ? RegelAlvorlighet.FEIL
            : RegelAlvorlighet.INFO,
        test: inneholderBareUtsettelserTest,
    },
    {
        key: UttaksplanRegelKey.inneholderForMyeFerie,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderForMyeFerie,
    },
    {
        key: UttaksplanRegelKey.endringerOverskriverAnnenPartsPerioder,
        alvorlighet: RegelAlvorlighet.INFO,
        test: overskriverEndringerAnnenPartsPerioder,
        slåsSammenVedOppsummering: false,
    },
    {
        key: UttaksplanRegelKey.periodeOverlapperAndrePerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: overlapperPeriodeAndrePerioder,
        slåsSammenVedOppsummering: false,
        skjulesIOppsummering: true,
    },
    {
        key: UttaksplanRegelKey.harSøktOmFerieUtenArbeidsforhold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harSøktOmFerieUtenArbeidsforhold,
    },
    {
        key: UttaksplanRegelKey.kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme,
    },
    {
        key: UttaksplanRegelKey.burdeKanskjeSøkeGradering,
        alvorlighet: RegelAlvorlighet.INFO,
        test: burdeKanskjeSøkeGraderingTest,
    },
    {
        key: UttaksplanRegelKey.ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindato,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindatoTest,
    },
    {
        key: UttaksplanRegelKey.inneholderPerioderUtenAktivitetskrav,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderPerioderUtenAktivitetskrav,
    },
    {
        key: UttaksplanRegelKey.inneholderUttaksperioderMedUbesvartGradering,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksperioderMedUbesvartGradering,
    },
    {
        key: UttaksplanRegelKey.inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksperiodeMedUbservartSpmOmFlerbarnsdagerTest,
    },
    {
        key: UttaksplanRegelKey.inneholderUtsettelserUtenÅrsak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUtsettelserUtenÅrsak,
    },
    {
        key: UttaksplanRegelKey.overstigerMinsterettVedToTette,
        alvorlighet: RegelAlvorlighet.INFO,
        test: overstigerMinsterettVedToTette,
    },
    {
        key: UttaksplanRegelKey.harPerioderEtterFørsteStønadsdagNesteBarnDerToTette,
        alvorlighet: RegelAlvorlighet.INFO,
        test: harPerioderEtterFørsteStønadsdagNesteBarnDerToTette,
    },
];

const uttaksplanRegler = (familiehendelsesDato: Date) => [
    ...uttaksplanValideringRegler(familiehendelsesDato),
    ...periodevalideringsregler,
];

export default uttaksplanRegler;
