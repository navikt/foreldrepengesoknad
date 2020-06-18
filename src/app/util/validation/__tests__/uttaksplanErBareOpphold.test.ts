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
import { uttaksplanErBareOpphold } from '../uttaksplan/uttaksplanErBareOpphold';

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

describe('Validering av uttaksplan - bare opphold', () => {
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
