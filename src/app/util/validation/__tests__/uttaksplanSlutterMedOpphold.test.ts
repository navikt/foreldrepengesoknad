import {
    Periodetype,
    Oppholdsperiode,
    OppholdÅrsakType,
    Uttaksperiode,
    StønadskontoType,
} from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../../uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { Forelder } from 'common/types';
import { uttaksplanSlutterMedOpphold } from '../uttaksplan/uttaksplanSlutterMedOpphold';

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

describe('Validering av uttaksplan - slutter med opphold', () => {
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
