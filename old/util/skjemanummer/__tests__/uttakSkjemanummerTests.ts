import { MorsAktivitet, Periodetype, StønadskontoType, Uttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import DateValues from '../../validation/values';
import { getUttakperiodeSkjemanummer } from '../uttakSkjemanummer';
import { getMorsAktivitetSkjemanummer } from '../morsAktivitetSkjemanummer';
import { Skjemanummer } from '../../../types/søknad/Søknad';

const periodeMock: Uttaksperiode = {
    type: Periodetype.Uttak,
    konto: StønadskontoType.ForeldrepengerFørFødsel,
    skalIkkeHaUttakFørTermin: true,
    forelder: Forelder.mor,
    id: 'asdf',
    tidsperiode: {
        fom: DateValues.today.toDate(),
        tom: DateValues.today.toDate(),
    },
};

describe('getUttakperiodeSkjemanummer', () => {
    it('should get Skjemanummer from getMorsAktivitetSkjemanummer if morsAktivitetIPerioden is defined', () => {
        const aktivitet = MorsAktivitet.Utdanning;
        const periodeMedMorsAktivitet = { ...periodeMock, morsAktivitetIPerioden: aktivitet };
        expect(getUttakperiodeSkjemanummer(periodeMedMorsAktivitet)).toBe(getMorsAktivitetSkjemanummer(aktivitet));
    });

    it('should require Skjemanummer.ANNET if morsAktivitetIPerioden is not defined, and not gradert && erArbeidstaker', () => {
        expect(getUttakperiodeSkjemanummer(periodeMock)).toBe(Skjemanummer.ANNET);
    });
});
