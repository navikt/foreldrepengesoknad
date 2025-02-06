import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { OppholdÅrsakType } from '@navikt/fp-types';
import { UttaksdagenString, dateToISOString, getTidsperiodeString } from '@navikt/fp-utils';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { uttaksplanErBareOpphold, uttaksplanSlutterMedOpphold, uttaksplanStarterMedOpphold } from './Periodene';

const familiehendelsesdato = dateToISOString(new Date());
const førsteUttaksdag = UttaksdagenString(familiehendelsesdato).denneEllerNeste();
const førsteUttaksdagTidsperiode = getTidsperiodeString(førsteUttaksdag, 5);

const uttakBase: Planperiode = {
    forelder: Forelder.farMedmor,
    kontoType: StønadskontoType.Fellesperiode,
    fom: førsteUttaksdagTidsperiode.tom,
    tom: førsteUttaksdagTidsperiode.fom,
    id: '1',
    readOnly: false,
};

const oppholdsBase: Planperiode = {
    id: '2',
    oppholdÅrsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
    fom: førsteUttaksdagTidsperiode.fom,
    tom: førsteUttaksdagTidsperiode.tom,
    forelder: Forelder.farMedmor,
    readOnly: false,
};

const infoBase: Planperiode = {
    fom: førsteUttaksdagTidsperiode.fom,
    tom: førsteUttaksdagTidsperiode.tom,
    readOnly: false,
    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
    id: '3',
};

const uttak = uttakBase;
const opphold = oppholdsBase;
const info = infoBase;

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
