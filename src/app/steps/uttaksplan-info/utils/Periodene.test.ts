import { getTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import { Oppholdsperiode, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { uttaksplanErBareOpphold, uttaksplanSlutterMedOpphold, uttaksplanStarterMedOpphold } from './Periodene';

const familiehendelsesdato = new Date();
const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

const uttakBase: Partial<Uttaksperiode> = {
    type: Periodetype.Uttak,
    konto: StønadskontoType.Fellesperiode,
    gradert: false,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.farMedmor,
};

const oppholdsBase: Partial<Oppholdsperiode> = {
    type: Periodetype.Opphold,
    årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
    forelder: Forelder.farMedmor,
};

const uttak = uttakBase as Uttaksperiode;
const opphold = oppholdsBase as Oppholdsperiode;
describe('Periodene - uttaksplan er bare opphold', () => {
    it('skal ikke godta en plan med bare opphold', () => {
        const result = uttaksplanErBareOpphold([{ ...opphold }]);
        expect(result).toBeTruthy();
    });

    it('skal godta en plan som ikke er bare opphold', () => {
        const mixedUttaksplanResult = uttaksplanErBareOpphold([{ ...opphold }, { ...uttak }]);
        expect(mixedUttaksplanResult).toBeFalsy();

        const ingenOppholdUttaksplan = uttaksplanErBareOpphold([{ ...uttak }]);
        expect(ingenOppholdUttaksplan).toBeFalsy();
    });

    it('denne regelen skal ikke bry seg om en tom uttaksplan', () => {
        const result = uttaksplanErBareOpphold([]);
        expect(result).toBeFalsy();
    });
});

describe('Periodene -  uttaksplan slutter med opphold', () => {
    it('skal ikke godta en plan med bare opphold', () => {
        const result = uttaksplanSlutterMedOpphold([{ ...opphold }]);
        expect(result).toBeTruthy();
    });

    it('skal godta en plan som ikke er bare opphold', () => {
        const result = uttaksplanSlutterMedOpphold([{ ...uttak }, { ...opphold }, { ...uttak }]);
        expect(result).toBeFalsy();
    });

    it('skal ikke godta en plan som slutter med opphold', () => {
        const result = uttaksplanSlutterMedOpphold([{ ...uttak }, { ...opphold }]);
        expect(result).toBeTruthy();
    });

    it('denne regelen skal ikke bry seg om en tom uttaksplan', () => {
        const result = uttaksplanSlutterMedOpphold([]);
        expect(result).toBeFalsy();
    });
});

describe('Periodene -  uttaksplan starter med opphold', () => {
    it('skal ikke godta en plan med bare opphold', () => {
        const result = uttaksplanStarterMedOpphold([{ ...opphold }]);
        expect(result).toBeTruthy();
    });

    it('skal godta en plan som ikke er bare opphold', () => {
        const result = uttaksplanStarterMedOpphold([{ ...uttak }, { ...opphold }, { ...uttak }]);
        expect(result).toBeFalsy();
    });

    it('skal ikke godta en plan som starter med opphold', () => {
        const result = uttaksplanStarterMedOpphold([{ ...opphold }, { ...uttak }]);
        expect(result).toBeTruthy();
    });

    it('denne regelen skal ikke bry seg om en tom uttaksplan', () => {
        const result = uttaksplanStarterMedOpphold([]);
        expect(result).toBeFalsy();
    });
});
