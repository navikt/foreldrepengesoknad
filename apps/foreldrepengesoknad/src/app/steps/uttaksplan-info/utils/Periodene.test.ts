import { getTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Forelder } from 'app/types/Forelder';
import { InfoPeriode, Oppholdsperiode, Periode, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import {
    uttaksplanErBareOpphold,
    uttaksplanSlutterMedOpphold,
    uttaksplanStarterMedOpphold,
    getSumUttaksdagerÅTrekkeIPeriodene,
} from './Periodene';

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

describe('Periodene - getSumUttaksdagerÅTrekkeIPeriodene', () => {
    const periode2dagerOverHelg = {
        type: Periodetype.Uttak,
        tidsperiode: { fom: new Date('2022-05-27T00:00:00.000Z'), tom: new Date('2022-05-30T00:00:00.000Z') },
    } as Periode;
    const periode1dag = {
        type: Periodetype.Uttak,
        tidsperiode: { fom: new Date('2022-05-18T00:00:00.000Z'), tom: new Date('2022-05-18T00:00:00.000Z') },
    } as Periode;
    const periodeMedGradering = {
        type: Periodetype.Uttak,
        gradert: true,
        stillingsprosent: '75',
        tidsperiode: { fom: new Date('2022-05-01T00:00:00.000Z'), tom: new Date('2022-05-05T00:00:00.000Z') },
    } as Periode;
    const periodeMedSamtidigUttak = {
        type: Periodetype.Uttak,
        ønskerSamtidigUttak: true,
        samtidigUttakProsent: '50',
        tidsperiode: { fom: new Date('2022-05-02T00:00:00.000Z'), tom: new Date('2022-05-05T00:00:00.000Z') },
    } as Periode;
    const periodeMedSamtidigUttakOgGradering = {
        type: Periodetype.Uttak,
        ønskerSamtidigUttak: true,
        samtidigUttakProsent: '50',
        gradert: true,
        stillingsprosent: '20',
        tidsperiode: { fom: new Date('2022-05-02T00:00:00.000Z'), tom: new Date('2022-05-06T00:00:00.000Z') },
    } as Periode;
    const periodeMedToDagerOg60prosentGradering = {
        type: Periodetype.Uttak,
        ønskerSamtidigUttak: false,
        gradert: true,
        stillingsprosent: '40',
        tidsperiode: { fom: new Date('2022-06-07T00:00:00.000Z'), tom: new Date('2022-06-08T00:00:00.000Z') },
    } as Periode;
    const periodeMedEnDagOg50prosentGradering = {
        type: Periodetype.Uttak,
        ønskerSamtidigUttak: false,
        gradert: true,
        stillingsprosent: '50',
        tidsperiode: { fom: new Date('2022-06-07T00:00:00.000Z'), tom: new Date('2022-06-07T00:00:00.000Z') },
    } as Periode;
    it('skal returnere 0 for ingen perioder', () => {
        const perioder = [] as Periode[];
        const result = getSumUttaksdagerÅTrekkeIPeriodene(perioder);
        expect(result).toEqual(0);
    });

    it('skal returnere 2 for Uttaksperiode med 2 uttaksdager som går over en helg', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periode2dagerOverHelg]);
        expect(result).toEqual(2);
    });
    it('skal returnere 3 for to Uttaksperioder med 3 uttaksdager tilsammen', () => {
        const periode2dagerOverHelg = {
            type: Periodetype.Uttak,
            tidsperiode: { fom: new Date('2022-05-27T00:00:00.000Z'), tom: new Date('2022-05-30T00:00:00.000Z') },
        } as Periode;
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periode1dag, periode2dagerOverHelg]);
        expect(result).toEqual(3);
    });
    it('skal returnere 1 for Uttaksperiode med 4 uttaksdager med 75% gradering', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periodeMedGradering]);
        expect(result).toEqual(1);
    });
    it('skal returnere 2 for Uttaksperiode med 4 uttaksdager med 50% samtidig uttak', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periodeMedSamtidigUttak]);
        expect(result).toEqual(2);
    });
    it('skal returnere 4 for Uttaksperiode med 5 uttaksdager med 20% gradering og  50% samtidig uttak', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periodeMedSamtidigUttakOgGradering]);
        expect(result).toEqual(4);
    });
    it('skal returnere 4 for Uttaksperiode med 5 uttaksdager med 20% gradering og  50% samtidig uttak', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periodeMedSamtidigUttakOgGradering]);
        expect(result).toEqual(4);
    });
    it('skal returnere 1 for Uttaksperiode med 2 uttaksdager med 40% gradering, fordi man avrunder ned til nærmeste heltall ', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periodeMedToDagerOg60prosentGradering]);
        expect(result).toEqual(1);
    });
    it('skal returnere 0 for Uttaksperiode med 1 uttaksdager med 50% gradering, fordi man avrunder ned til nærmeste heltall ', () => {
        const result = getSumUttaksdagerÅTrekkeIPeriodene([periodeMedEnDagOg50prosentGradering]);
        expect(result).toEqual(0);
    });
});
