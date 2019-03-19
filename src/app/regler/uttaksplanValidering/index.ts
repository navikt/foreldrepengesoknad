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
    'inneholderUttaksplanPerioder' = 'inneholderUttaksplanPerioder',
    'harMorSøktUgyldigUttakFørsteSeksUker' = 'harMorSøktUgyldigUttakFørsteSeksUker',
    'harFarMedmorSøktUgyldigUttakFørsteSeksUker' = 'harFarMedmorSøktUgyldigUttakFørsteSeksUker',
    'inneholderStønadskontoForMyeUttak' = 'inneholderStønadskontoForMyeUttak',
    'erUttaksplanBareOpphold' = 'erUttaksplanBareOpphold',
    'starterUttaksplanMedOpphold' = 'starterUttaksplanMedOpphold',
    'slutterUttaksplanMedOpphold' = 'slutterUttaksplanMedOpphold',
    'erUttaksplanGraderingStørreEnnSamtidigUttak' = 'erUttaksplanGraderingStørreEnnSamtidigUttak',
    'erBegrunnelseForSenEndringGyldig' = 'erBegrunnelseForSenEndringGyldig',
    'harUttaksplanForMangeFlerbarnsdager' = 'harUttaksplanForMangeFlerbarnsdager'
}

const uttaksplanRegler: Regel[] = [
    {
        key: RegelKey.inneholderUttaksplanPerioder,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: inneholderUttaksplanPerioderTest
    },
    {
        key: RegelKey.inneholderStønadskontoForMyeUttak,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: inneholderStønadskontoForMyeUttakTest
    },
    {
        key: RegelKey.harMorSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: harMorSøktUgyldigUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.harFarMedmorSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.erUttaksplanBareOpphold,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: erUttaksplanBanreOppholdTest
    },
    {
        key: RegelKey.starterUttaksplanMedOpphold,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: starterUttaksplanMedOppholdTest
    },
    {
        key: RegelKey.slutterUttaksplanMedOpphold,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: slutterUttaksplanMedOppholdTest
    },
    {
        key: RegelKey.erUttaksplanGraderingStørreEnnSamtidigUttak,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: erUttaksplanGraderingStørreEnnSamtidigUttakTest
    },
    {
        key: RegelKey.erBegrunnelseForSenEndringGyldig,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: erBegrunnelseForSenEndringGyldigTest
    },
    {
        key: RegelKey.harUttaksplanForMangeFlerbarnsdager,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: harUttaksplanForMangeFlerbarnsdagerTest
    }
];

export default uttaksplanRegler;
