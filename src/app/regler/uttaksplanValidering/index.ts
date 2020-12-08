import { inneholderUttaksplanPerioderTest } from './tester/inneholderUttaksplanPerioderTest';
import { harMorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harMorSøktUgyldigUttakFørsteSeksUkerTest';
import { stønadskontoInneholderForMyeUttakKunSøkerTest } from './tester/stønadskontoInneholderForMyeUttakKunSøkerTest';
import { harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest } from './tester/harFarMedmorSøktUgyldigUttakEllerUtsettelseFørsteSeksUkerTest';
import { erUttaksplanBareOppholdTest } from './tester/erUttaksplanBareOppholdTest';
import { slutterUttaksplanMedOppholdTest } from './tester/slutterUttaksplanMedOppholdTest';
import { starterUttaksplanMedOppholdTest } from './tester/starterUttaksplanMedOppholdTest';
import { erUttaksplanGraderingStørreEnnSamtidigUttakTest } from './tester/erUttaksplanGraderingStørreEnnSamtidigUttakTest';
import { erTilleggsopplysningerGyldigTest } from './tester/erTilleggsopplysningerGyldigTest';
import { harUttaksplanForMangeFlerbarnsdagerTest } from './tester/harUttaksplanForMangeFlerbarnsdagerTest';
import { inneholderUttaksplanDatoSomIkkeErUttaksdag } from './tester/inneholderUttaksplanDatoSomIkkeErUttaksdagTest';
import { harPerioderManglendeVedleggTest } from './tester/harPerioderManglendeVedleggTest';
import { inneholderSenUtsettelsePgaFerieTest } from './tester/inneholderSenUtsettelsePgaFerieTest';
import { inneholderTapteDagerTest } from './tester/inneholderTapteDagerTest';
import { inneholderBareUtsettelserTest } from './tester/inneholderBareUtsettelserTest';
// import { innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode } from './tester/innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode';
import { inneholderSenUtsettelsePgaArbeidTest } from './tester/inneholderSenUtsettelsePgaArbeidTest';
import { inneholderSeneGraderteUttakTest } from './tester/inneholderSeneGraderteUttakTest';
import { overskriverEndringerAnnenPartsPerioder } from './tester/overskriverEndringerAnnenPartsPerioder';
import { overlapperPeriodeAndrePerioder } from './tester/overlapperPeriodeAndrePerioderTest';
import periodevalideringsregler, { PeriodeValiderRegelKey } from './periodevalideringstester';
import { harSøktOmFerieUtenArbeidsforhold } from './tester/harSøktOmFerieUtenArbeidsforholdTest';
import { Regel, RegelAlvorlighet } from 'shared/regler/regelTypes';
import { inneholderForMyeFerie } from './tester/inneholderForMyeFerie';
import { kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme } from './tester/kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme';
import { erUttaksmengdeForFarMedmorForHøyTest } from './tester/erUttaksmengdeForFarMedmorForHøyTest';
import { burdeKanskjeSøkeGraderingTest } from './tester/burdeKanskjeSøkeGraderingTest';
// import { inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold } from './tester/inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold';
import { ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindatoTest } from './tester/ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindatoTest';

export enum UttaksplanRegelKey {
    'planenInneholderIngenPerioder' = 'planenInneholderIngenPerioder',
    'morHarSøktUgyldigUttakFørsteSeksUker' = 'morHarSøktUgyldigUttakFørsteSeksUker',
    'farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker' = 'farMedmorHarSøktUgyldigUttakEllerUtsettelseFørsteSeksUker',
    'stønadskontoInneholderForMyeUttakKunSøker' = 'stønadskontoInneholderForMyeUttakKunSøker',
    'uttaksplanErBareOpphold' = 'uttaksplanErBareOpphold',
    'uttaksplanStarterMedOpphold' = 'uttaksplanStarterMedOpphold',
    'uttaksplanSlutterMedOpphold' = 'uttaksplanSlutterMedOpphold',
    'uttaksplanGraderingStørreEnnSamtidigUttak' = 'uttaksplanGraderingStørreEnnSamtidigUttak',
    'begrunnelseVedForSenEndringErUgyldig' = 'begrunnelseVedForSenEndringErUgyldig',
    'uttaksplanHarForMangeFlerbarnsdager' = 'uttaksplanHarForMangeFlerbarnsdager',
    'uttaksplanInneholderDatoSomIkkeErUttaksdag' = 'uttaksplanInneholderDatoSomIkkeErUttaksdag',
    'perioderManglerVedlegg' = 'manglendeVedlegg',
    'inneholderSenUtsettelsePgaFerie' = 'inneholderSenUtsettelsePgaFerieTest',
    'inneholderSenUtsettelsePgaArbeid' = 'inneholderSenUtsettelsePgaArbeidTest',
    'inneholderSeneGraderteUttak' = 'inneholderSeneGraderteUttakTest',
    'inneholderTapteDager' = 'inneholderTapteDager',
    'inneholderBareUtsettelser' = 'inneholderBareUtsettelser',
    'inneholderForMyeFerie' = 'inneholderForMyeFerie',
    // 'innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode' = 'innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode',
    'endringerOverskriverAnnenPartsPerioder' = 'endringerOverskriverAnnenPartsPerioder',
    'periodeOverlapperAndrePerioder' = 'periodeOverlapperAndrePerioder',
    'harSøktOmFerieUtenArbeidsforhold' = 'harSøktOmFerieUtenArbeidsforhold',
    'kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme' = 'kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme',
    'uttaksmengdeForFarMedmorErForHøy' = 'uttaksmengdeForFarMedmorErForHøy',
    'burdeKanskjeSøkeGradering' = 'burdeKanskjeSøkeGradering',
    'inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold' = 'inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold',
    'ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindato' = 'ferieEllerArbeidInnenforDeFørsteÅtteUkeneEtterTermindato',
}

export type RegelKey = UttaksplanRegelKey | PeriodeValiderRegelKey;

const uttaksplanValideringRegler: Regel[] = [
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
        key: UttaksplanRegelKey.begrunnelseVedForSenEndringErUgyldig,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erTilleggsopplysningerGyldigTest,
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
        key: UttaksplanRegelKey.perioderManglerVedlegg,
        alvorlighet: RegelAlvorlighet.ADVARSEL,
        test: harPerioderManglendeVedleggTest,
        slåsSammenVedOppsummering: true,
    },
    {
        key: UttaksplanRegelKey.inneholderSenUtsettelsePgaFerie,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderSenUtsettelsePgaFerieTest,
        slåsSammenVedOppsummering: true,
    },
    {
        key: UttaksplanRegelKey.inneholderSenUtsettelsePgaArbeid,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderSenUtsettelsePgaArbeidTest,
        slåsSammenVedOppsummering: true,
    },
    {
        key: UttaksplanRegelKey.inneholderSeneGraderteUttak,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderSeneGraderteUttakTest,
        skjulesIPeriode: true,
    },
    {
        key: UttaksplanRegelKey.inneholderTapteDager,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderTapteDagerTest,
    },
    {
        key: UttaksplanRegelKey.inneholderBareUtsettelser,
        alvorlighet: RegelAlvorlighet.INFO,
        test: inneholderBareUtsettelserTest,
    },
    {
        key: UttaksplanRegelKey.inneholderForMyeFerie,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderForMyeFerie,
    },
    // {
    //     key: UttaksplanRegelKey.innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode,
    //     alvorlighet: RegelAlvorlighet.FEIL,
    //     test: innholderAktivitetskravFrieDagerEtterOrdinærForeldrepengerPeriode
    // },
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
        //slåsSammenVedOppsummering: true,
    },
    // {
    //     key: UttaksplanRegelKey.inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold,
    //     alvorlighet: RegelAlvorlighet.INFO,
    //     test: inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold,
    //     skjulesIOppsummering: true
    // }
];

const uttaksplanRegler = [...uttaksplanValideringRegler, ...periodevalideringsregler];

export default uttaksplanRegler;
