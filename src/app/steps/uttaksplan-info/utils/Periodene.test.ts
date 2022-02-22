import { getTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import { InfoPeriode, Oppholdsperiode, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
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

const infoBase: Partial<InfoPeriode> = {
    type: Periodetype.Info,
    tidsperiode: getTidsperiode(førsteUttaksdag, 5),
};

const uttak = uttakBase as Uttaksperiode;
const opphold = oppholdsBase as Oppholdsperiode;
const info = infoBase as InfoPeriode;

describe('Periodene - uttaksplan er bare opphold', () => {
    it('skal ikke godta en plan med bare opphold', () => {
        const result = uttaksplanErBareOpphold([{ ...opphold }]);
        expect(result).toBe(true);
    });

    it('skal godta en plan som ikke er bare opphold', () => {
        const mixedUttaksplanResult = uttaksplanErBareOpphold([{ ...opphold }, { ...uttak }]);
        expect(mixedUttaksplanResult).toBe(false);

        const ingenOppholdUttaksplan = uttaksplanErBareOpphold([{ ...uttak }]);
        expect(ingenOppholdUttaksplan).toBe(false);
    });

    it('denne regelen skal ikke bry seg om en tom uttaksplan', () => {
        const result = uttaksplanErBareOpphold([]);
        expect(result).toBe(false);
    });
});

describe('Periodene -  uttaksplan slutter med opphold', () => {
    it('skal ikke godta en plan med bare opphold', () => {
        const result = uttaksplanSlutterMedOpphold([{ ...opphold }]);
        expect(result).toBe(true);
    });

    it('skal godta en plan som ikke er bare opphold', () => {
        const result = uttaksplanSlutterMedOpphold([{ ...uttak }, { ...opphold }, { ...uttak }]);
        expect(result).toBe(false);
    });

    it('skal ikke godta en plan som slutter med opphold', () => {
        const result = uttaksplanSlutterMedOpphold([{ ...uttak }, { ...opphold }]);
        expect(result).toBe(true);
    });

    it('denne regelen skal ikke bry seg om en tom uttaksplan', () => {
        const result = uttaksplanSlutterMedOpphold([]);
        expect(result).toBe(false);
    });
});

describe('Periodene -  uttaksplan starter med opphold', () => {
    it('skal ikke godta en plan med bare opphold', () => {
        const result = uttaksplanStarterMedOpphold([{ ...opphold }]);
        expect(result).toBe(true);
    });

    it('skal godta en plan som ikke er bare opphold', () => {
        const result = uttaksplanStarterMedOpphold([{ ...uttak }, { ...opphold }, { ...uttak }]);
        expect(result).toBe(false);
    });

    it('skal ikke godta en plan som starter med opphold', () => {
        const result = uttaksplanStarterMedOpphold([{ ...opphold }, { ...uttak }]);
        expect(result).toBe(true);
    });

    it('denne regelen skal ikke bry seg om en tom uttaksplan', () => {
        const result = uttaksplanStarterMedOpphold([]);
        expect(result).toBe(false);
    });
});

describe('Periodene -  uttaksplan er bare infoperioder', () => {
    it('skal godta en plan med bare infoperioder', () => {
        const result = uttaksplanStarterMedOpphold([{ ...info }]);
        expect(result).toBe(false);
    });
});
