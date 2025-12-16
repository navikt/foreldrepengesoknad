import { UttaksdagenString, dateToISOString, getTidsperiodeString } from '@navikt/fp-utils';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { uttaksplanErBareOpphold, uttaksplanStarterMedOpphold } from './Periodene';

const familiehendelsesdato = dateToISOString(new Date());
const førsteUttaksdag = UttaksdagenString(familiehendelsesdato).denneEllerNeste();
const førsteUttaksdagTidsperiode = getTidsperiodeString(førsteUttaksdag, 5);

const uttakBase: Planperiode = {
    erAnnenPartEøs: false,
    forelder: 'FAR_MEDMOR',
    kontoType: 'FELLESPERIODE',
    fom: førsteUttaksdagTidsperiode.tom,
    tom: førsteUttaksdagTidsperiode.fom,
};

const oppholdsBase: Planperiode = {
    erAnnenPartEøs: false,
    oppholdÅrsak: 'MØDREKVOTE_ANNEN_FORELDER',
    fom: førsteUttaksdagTidsperiode.fom,
    tom: førsteUttaksdagTidsperiode.tom,
    forelder: 'FAR_MEDMOR',
};

const infoBase: Planperiode = {
    erAnnenPartEøs: false,
    fom: førsteUttaksdagTidsperiode.fom,
    tom: førsteUttaksdagTidsperiode.tom,
    periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
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
