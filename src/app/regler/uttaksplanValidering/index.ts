import { Regel, RegelAlvorlighet } from './types';
import { inneholderUttaksplanPerioderTest } from './tester/inneholderUttaksplanPerioderTest';
import { harMorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harMorSøktUgyldigUttakFørsteSeksUkerTest';
import { inneholderStønadskontoForMyeUttakTest } from './tester/inneholderStønadskontoForMyeUttakTest';
import { harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest';
import { erUttaksplanBanreOppholdTest } from './tester/erUttaksplanBareOppholdTest';
import { slutterUttaksplanMedOppholdTest } from './tester/slutterUttaksplanMedOppholdTest';
import { starterUttaksplanMedOppholdTest } from './tester/starterUttaksplanMedOppholdTest';
import { erUttaksplanGraderingStørreEnnSamtidigUttakTest } from './tester/erUttaksplanGraderingSt\u00F8rreEnnSamtidigUttakTest';
import { erBegrunnelseForSenEndringGyldigTest } from './tester/erBegrunnelseForSenEndringGyldigTest';
import { harUttaksplanForMangeFlerbarnsdagerTest } from './tester/harUttaksplanForMangeFlerbarnsdagerTest';

export enum RegelKey {
    'planenInneholderIngenPerioder' = 'planenInneholderIngenPerioder',
    'morHarSøktUgyldigUttakFørsteSeksUker' = 'morHarSøktUgyldigUttakFørsteSeksUker',
    'farMedmorHarSøktUgyldigUttakFørsteSeksUker' = 'farMedmorHarSøktUgyldigUttakFørsteSeksUker',
    'stønadskontoInneholderForMyeUttak' = 'stønadskontoInneholderForMyeUttak',
    'uttaksplanErBareOpphold' = 'uttaksplanErBareOpphold',
    'uttaksplanStarterMedOpphold' = 'uttaksplanStarterMedOpphold',
    'uttaksplanSluttetMedOpphold' = 'uttaksplanSluttetMedOpphold',
    'uttaksplangraderingStørreEnnSamtidigUttak' = 'uttaksplangraderingStørreEnnSamtidigUttak',
    'begrunnelseVedForSenEndringErUgyldig' = 'begrunnelseVedForSenEndringErUgyldig',
    'uttaksplanHarForMangeFlerbarnsdager' = 'uttaksplanHarForMangeFlerbarnsdager'
}

const uttaksplanRegler: Regel[] = [
    {
        key: RegelKey.planenInneholderIngenPerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanPerioderTest
    },
    {
        key: RegelKey.stønadskontoInneholderForMyeUttak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderStønadskontoForMyeUttakTest
    },
    {
        key: RegelKey.morHarSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harMorSøktUgyldigUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.farMedmorHarSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.uttaksplanErBareOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksplanBanreOppholdTest
    },
    {
        key: RegelKey.uttaksplanStarterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: starterUttaksplanMedOppholdTest
    },
    {
        key: RegelKey.uttaksplanSluttetMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: slutterUttaksplanMedOppholdTest
    },
    {
        key: RegelKey.uttaksplangraderingStørreEnnSamtidigUttak,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erUttaksplanGraderingStørreEnnSamtidigUttakTest
    },
    {
        key: RegelKey.begrunnelseVedForSenEndringErUgyldig,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: erBegrunnelseForSenEndringGyldigTest
    },
    {
        key: RegelKey.uttaksplanHarForMangeFlerbarnsdager,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: harUttaksplanForMangeFlerbarnsdagerTest
    }
];

export default uttaksplanRegler;
