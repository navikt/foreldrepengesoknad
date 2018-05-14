import { normaliserDato } from '../../utils';
import {
    opprettStønadsperioder,
    getAntallUkerFellesperiode
} from '../../utils/permisjonUtils';
import {
    Dekningsgrad,
    Utsettelsesperiode,
    UtsettelseArsakType,
    Periodetype,
    Periode
} from '../../types';
import { getPermisjonsregler } from '../../data/permisjonsregler';
import {
    getAntallUttaksdagerITidsperiode,
    getAntallUttaksdagerIPerioder
} from '../../utils/uttaksdagerUtils';
import { leggUtsettelserTilPerioder } from '../../utils/periodeUtils';

const termindato = normaliserDato(new Date(2018, 1, 26));
const permisjonsregler = getPermisjonsregler(termindato);
const ferie: Utsettelsesperiode = {
    type: Periodetype.Utsettelse,
    forelder: 'forelder1',
    arsak: UtsettelseArsakType.Ferie,
    tidsperiode: {
        startdato: normaliserDato(new Date(2018, 1, 16)),
        sluttdato: normaliserDato(new Date(2018, 1, 27))
    }
};

describe('permisjonsperioder for 80%', () => {
    const dekningsgrad: Dekningsgrad = '80%';
    const ukerFellesperiode = getAntallUkerFellesperiode(
        permisjonsregler,
        dekningsgrad
    );
    const ukerFellesperiodePerForelder = ukerFellesperiode / 2;
    const stønadsperioder = opprettStønadsperioder(
        termindato,
        dekningsgrad,
        ukerFellesperiodePerForelder,
        ukerFellesperiodePerForelder,
        permisjonsregler
    );

    it('setter opp riktige stønadsperioder for 80%', () => {
        expect(stønadsperioder.length === 5);
    });

    it('har riktig periode for forelder 1 før termin', () => {
        const periode = stønadsperioder[0];
        expect(periode.tidsperiode.startdato).toEqual(
            normaliserDato(new Date(2018, 1, 5))
        );
        expect(periode.tidsperiode.sluttdato).toEqual(
            normaliserDato(new Date(2018, 1, 23))
        );
        expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(15);
    });

    it('har riktig påkrevd periode for forelder 1 etter termin', () => {
        const periode = stønadsperioder[1];
        expect(periode.tidsperiode.startdato).toEqual(
            normaliserDato(new Date(2018, 1, 26))
        );
        expect(periode.tidsperiode.sluttdato).toEqual(
            normaliserDato(new Date(2018, 3, 6))
        );
        expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(30);
    });

    it('har riktig valgfri periode for forelder 1 etter termin', () => {
        const periode = stønadsperioder[2];
        expect(periode.tidsperiode.startdato).toEqual(
            normaliserDato(new Date(2018, 3, 9))
        );
        expect(periode.tidsperiode.sluttdato).toEqual(
            normaliserDato(new Date(2018, 4, 4))
        );
        expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(20);
    });

    it('har riktig periode for forelder 1s fellersperiode', () => {
        const periode = stønadsperioder[3];
        expect(periode.tidsperiode.startdato).toEqual(
            normaliserDato(new Date(2018, 4, 7))
        );
        expect(periode.tidsperiode.sluttdato).toEqual(
            normaliserDato(new Date(2018, 8, 7))
        );
        expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
            ukerFellesperiodePerForelder * 5
        );
    });

    it('har riktig periode for forelder 2s fellersperiode', () => {
        const periode = stønadsperioder[4];
        expect(periode.tidsperiode.startdato).toEqual(
            normaliserDato(new Date(2018, 8, 10))
        );
        expect(periode.tidsperiode.sluttdato).toEqual(
            normaliserDato(new Date(2019, 0, 11))
        );
        expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
            ukerFellesperiodePerForelder * 5
        );
    });
    it('har riktig fedrekvote', () => {
        const periode = stønadsperioder[5];
        expect(periode.tidsperiode.startdato).toEqual(
            normaliserDato(new Date(2019, 0, 14))
        );
        expect(periode.tidsperiode.sluttdato).toEqual(
            normaliserDato(new Date(2019, 2, 22))
        );
        expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(50);
    });

    it('har riktig antall uttaksdager', () => {
        expect(getAntallUttaksdagerIPerioder(stønadsperioder)).toEqual(295);
    });

    describe('permisjonsplan med utsettelse', () => {
        const perioderMedUtsettelse: Periode[] = leggUtsettelserTilPerioder(
            stønadsperioder,
            [ferie]
        );

        it('har riktig antall uttaksdager', () => {
            expect(
                getAntallUttaksdagerIPerioder(perioderMedUtsettelse)
            ).toEqual(295);
        });

        it('har forskjøvet siste permisjonsdag riktig', () => {
            expect(perioderMedUtsettelse[7].tidsperiode.sluttdato).toEqual(
                normaliserDato(new Date(2019, 3, 3))
            );
        });
    });
});
