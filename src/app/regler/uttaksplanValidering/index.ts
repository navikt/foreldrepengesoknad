import { Regel, RegelAlvorlighet } from './types';
import { inneholderUttaksplanPerioderTest } from './tester/inneholderUttaksplanPerioderTest';
import { harMorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harMorSøktUgyldigUttakFørsteSeksUkerTest';
import { inneholderStønadskontoForMyeUttakTest } from './tester/inneholderStønadskontoForMyeUttakTest';
import { harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest } from './tester/harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest';
import { erUttaksplanBareOppholdTest } from './tester/erUttaksplanBareOppholdTest';
import { slutterUttaksplanMedOppholdTest } from './tester/slutterUttaksplanMedOppholdTest';
import { starterUttaksplanMedOppholdTest } from './tester/starterUttaksplanMedOppholdTest';
import { erUttaksplanGraderingStørreEnnSamtidigUttakTest } from './tester/erUttaksplanGraderingStørreEnnSamtidigUttakTest';
import { erBegrunnelseForSenEndringGyldigTest } from './tester/erBegrunnelseForSenEndringGyldigTest';
import { harUttaksplanForMangeFlerbarnsdagerTest } from './tester/harUttaksplanForMangeFlerbarnsdagerTest';
import { erUttaksmengdeForFarMedmorForHøyTest } from './tester/erUttaksmengdeForFarMedmorForHøyTest';
import { inneholderUttaksplanDatoSomIkkeErUttaksdag } from './tester/inneholderUttaksplanDatoSomIkkeErUttaksdagTest';
import { harPerioderManglendeVedleggTest } from './tester/harPerioderManglendeVedleggTest';
import { inneholderSenUtsettelsePgaFerieTest } from './tester/inneholderSenUtsettelsePgaFerieTest';
import { inneholderTapteDagerTest } from './tester/inneholderTapteDagerTest';
import { inneholderBareUtsettelserTest } from './tester/inneholderBareUtsettelserTest';
import { innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode } from './tester/innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode';
import { inneholderSenUtsettelsePgaArbeidTest } from './tester/inneholderSenUtsettelsePgaArbeidTest';
import { inneholderSeneGraderteUttakTest } from './tester/inneholderSeneGraderteUttakTest';
import { overskriverEndringerAnnenPartsPerioder } from './tester/overskriverEndringerAnnenPartsPerioder';
import { overlapperPeriodeAndrePerioder } from './tester/overlapperPeriodeAndrePerioderTest';
import periodevalideringsregler, { PeriodeValiderRegelKey } from './periodevalideringstester';
import { harSøktOmFerieUtenArbeidsforhold } from './tester/harSøktOmFerieUtenArbeidsforholdTest';

export enum UttaksplanRegelKey {
    'planenInneholderIngenPerioder' = 'planenInneholderIngenPerioder',
    'morHarSøktUgyldigUttakFørsteSeksUker' = 'morHarSøktUgyldigUttakFørsteSeksUker',
    'farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker' = 'farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker',
    'stønadskontoInneholderForMyeUttak' = 'stønadskontoInneholderForMyeUttak',
    'uttaksplanErBareOpphold' = 'uttaksplanErBareOpphold',
    'uttaksplanStarterMedOpphold' = 'uttaksplanStarterMedOpphold',
    'uttaksplanSlutterMedOpphold' = 'uttaksplanSlutterMedOpphold',
    'uttaksplanGraderingStørreEnnSamtidigUttak' = 'uttaksplanGraderingStørreEnnSamtidigUttak',
    'begrunnelseVedForSenEndringErUgyldig' = 'begrunnelseVedForSenEndringErUgyldig',
    'uttaksplanHarForMangeFlerbarnsdager' = 'uttaksplanHarForMangeFlerbarnsdager',
    'uttaksmengdeForFarMedmorErForHøy' = 'uttaksmengdeForFarMedmorErForHøy',
    'uttaksplanInneholderDatoSomIkkeErUttaksdag' = 'uttaksplanInneholderDatoSomIkkeErUttaksdag',
    'perioderManglerVedlegg' = 'manglendeVedlegg',
    'inneholderSenUtsettelsePgaFerie' = 'inneholderSenUtsettelsePgaFerieTest',
    'inneholderSenUtsettelsePgaArbeid' = 'inneholderSenUtsettelsePgaArbeidTest',
    'inneholderSeneGraderteUttak' = 'inneholderSeneGraderteUttakTest',
    'inneholderTapteDager' = 'inneholderTapteDager',
    'inneholderBareUtsettelser' = 'inneholderBareUtsettelser',
    'innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode' = 'innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode',
    'endringerOverskriverAnnenPartsPerioder' = 'endringerOverskriverAnnenPartsPerioder',
    'periodeOverlapperAndrePerioder' = 'periodeOverlapperAndrePerioder',
    'harSøktOmFerieUtenArbeidsforhold' = 'harSøktOmFerieUtenArbeidsforhold'
}

export type RegelKey = UttaksplanRegelKey | PeriodeValiderRegelKey;

const uttaksplanRegler: Regel[] = [
    {
        key: UttaksplanRegelKey.planenInneholderIngenPerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanPerioderTest
    },
    {
        key: UttaksplanRegelKey.stønadskontoInneholderForMyeUttak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderStønadskontoForMyeUttakTest
    },
    {
        key: UttaksplanRegelKey.morHarSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harMorSøktUgyldigUttakFørsteSeksUkerTest
    },
    {
        key: UttaksplanRegelKey.farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest
    },
    {
        key: UttaksplanRegelKey.uttaksplanErBareOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksplanBareOppholdTest
    },
    {
        key: UttaksplanRegelKey.uttaksplanStarterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: starterUttaksplanMedOppholdTest
    },
    {
        key: UttaksplanRegelKey.uttaksplanSlutterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: slutterUttaksplanMedOppholdTest
    },
    {
        key: UttaksplanRegelKey.uttaksplanGraderingStørreEnnSamtidigUttak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksplanGraderingStørreEnnSamtidigUttakTest
    },
    {
        key: UttaksplanRegelKey.begrunnelseVedForSenEndringErUgyldig,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erBegrunnelseForSenEndringGyldigTest
    },
    {
        key: UttaksplanRegelKey.uttaksplanHarForMangeFlerbarnsdager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksplanForMangeFlerbarnsdagerTest
    },
    {
        key: UttaksplanRegelKey.uttaksmengdeForFarMedmorErForHøy,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksmengdeForFarMedmorForHøyTest
    },
    {
        key: UttaksplanRegelKey.uttaksplanInneholderDatoSomIkkeErUttaksdag,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanDatoSomIkkeErUttaksdag
    },
    {
        key: UttaksplanRegelKey.perioderManglerVedlegg,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: harPerioderManglendeVedleggTest,
        slåsSammenVedOppsummering: true
    },
    {
        key: UttaksplanRegelKey.inneholderSenUtsettelsePgaFerie,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderSenUtsettelsePgaFerieTest,
        slåsSammenVedOppsummering: true
    },
    {
        key: UttaksplanRegelKey.inneholderSenUtsettelsePgaArbeid,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderSenUtsettelsePgaArbeidTest,
        slåsSammenVedOppsummering: true
    },
    {
        key: UttaksplanRegelKey.inneholderSeneGraderteUttak,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderSeneGraderteUttakTest,
        skjulesIPeriode: true
    },
    {
        key: UttaksplanRegelKey.inneholderTapteDager,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderTapteDagerTest
    },
    {
        key: UttaksplanRegelKey.inneholderBareUtsettelser,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderBareUtsettelserTest
    },
    {
        key: UttaksplanRegelKey.innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode
    },
    {
        key: UttaksplanRegelKey.endringerOverskriverAnnenPartsPerioder,
        alvorlighet: RegelAlvorlighet.INFO,
        test: overskriverEndringerAnnenPartsPerioder,
        slåsSammenVedOppsummering: false
    },
    {
        key: UttaksplanRegelKey.periodeOverlapperAndrePerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: overlapperPeriodeAndrePerioder,
        slåsSammenVedOppsummering: false,
        skjulesIOppsummering: true
    },
    {
        key: UttaksplanRegelKey.harSøktOmFerieUtenArbeidsforhold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harSøktOmFerieUtenArbeidsforhold
    }
];

export default [...uttaksplanRegler, ...periodevalideringsregler];
