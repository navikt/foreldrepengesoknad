import { getPermisjonsregler } from '../../data/permisjonsregler';
import { getStonadsperioder } from '../../selectors/periodeSelector';
import { Tidsperiode, Forelder, StonadskontoType } from '../../types';
import { getAntallUttaksdagerITidsperiode } from '../../utils/uttaksdagerUtils';
import { getAntallStonadsdagerForForelder } from '../../utils/permisjonUtils';
import { UttaksplanFormState } from '../../redux/types';

const forstePermisjonsdag = new Date(2018, 0, 8);
const termindato = new Date(2018, 0, 27);
const permisjonsregler = getPermisjonsregler(termindato);

const form80: UttaksplanFormState = {
    permisjonsregler,
    termindato,
    dekningsgrad: '80%',
    navnForelder1: 'Kari',
    navnForelder2: 'Ola',
    ukerFellesperiode: 36,
    fellesperiodeukerForelder1: 18,
    fellesperiodeukerForelder2: 18
};

describe('periodeselector', () => {
    it('har gyldige grunndata', () => {
        const totaltAntallUker =
            form80.permisjonsregler.antallUkerForelder1FørFødsel +
            permisjonsregler.antallUkerMødrekvote +
            form80.fellesperiodeukerForelder1 +
            form80.fellesperiodeukerForelder2 +
            permisjonsregler.antallUkerFedrekvote;

        expect(totaltAntallUker).toBe(permisjonsregler.antallUkerTotalt80);
    });

    const perioder80 = getStonadsperioder.resultFunc(form80);
    const uttaksdager80 = permisjonsregler.antallUkerTotalt80 * 5;
    const forelder1: Forelder = 'forelder1';
    const forelder2: Forelder = 'forelder2';
    const antallDagerForelder1 = 155;
    const antallDagerForelder2 = 140;

    describe('ved 80% dekningsgrad', () => {
        const dagerModrekvoteForFodsel =
            permisjonsregler.antallUkerForelder1FørFødsel * 5;
        const dagerPakrevdModrekvoteEtterFodsel =
            permisjonsregler.antallUkerForelder1EtterFødsel * 5;
        const dagerModrekvoteEtterFodsel =
            (permisjonsregler.antallUkerMødrekvote -
                permisjonsregler.antallUkerForelder1EtterFødsel) *
            5;
        const dagerForelder1Fellesperiode =
            form80.fellesperiodeukerForelder1 * 5;
        const dagerForelder2Fellesperiode =
            form80.fellesperiodeukerForelder2 * 5;
        const dagerFedrekvote = permisjonsregler.antallUkerFedrekvote * 5;

        it('oppretter 6 ulike perioder ut fra termindato sortert i riktig rekkefølge', () => {
            expect(perioder80.length).toBe(6);
        });

        let periodenr = 0;
        it('oppretter perioden før termin riktig', () => {
            const periode = perioder80[periodenr++];
            expect(periode.forelder).toEqual(forelder1);
            expect(periode.konto).toEqual(
                StonadskontoType.ForeldrepengerForFodsel
            );
            expect(periode.tidsperiode.startdato).toEqual(forstePermisjonsdag);
            expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
                dagerModrekvoteForFodsel
            );
        });
        it('oppretter påkrevd mødrekvoteperiode etter termin riktig', () => {
            const periode = perioder80[periodenr++];
            expect(periode.forelder).toEqual(forelder1);
            expect(periode.konto).toEqual(StonadskontoType.ModrekvotePakrevd);
            expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
                dagerPakrevdModrekvoteEtterFodsel
            );
        });
        it('oppretter valgfri mødrekvoteperiode etter termin riktig', () => {
            const periode = perioder80[periodenr++];
            expect(periode.forelder).toEqual(forelder1);
            expect(periode.konto).toEqual(StonadskontoType.Modrekvote);
            expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
                dagerModrekvoteEtterFodsel
            );
        });
        it('oppretter mors uttak av fellesperioden riktig', () => {
            const periode = perioder80[periodenr++];
            expect(periode.forelder).toEqual(forelder1);
            expect(periode.konto).toEqual(StonadskontoType.Fellesperiode);
            expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
                dagerForelder1Fellesperiode
            );
        });

        it('oppretter fars uttak av fellesperioden riktig', () => {
            const periode = perioder80[periodenr++];
            expect(periode.forelder).toEqual(forelder2);
            expect(periode.konto).toEqual(StonadskontoType.Fellesperiode);
            expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
                dagerForelder2Fellesperiode
            );
        });

        it('oppretter fedrekvoteperioden riktig', () => {
            const periode = perioder80[periodenr++];
            expect(periode.forelder).toEqual(forelder2);
            expect(periode.konto).toEqual(StonadskontoType.Fedrekvote);
            expect(getAntallUttaksdagerITidsperiode(periode.tidsperiode)).toBe(
                dagerFedrekvote
            );
        });

        it(`totalt antall ${uttaksdager80} uttaksdager er riktig`, () => {
            const tidsperiode: Tidsperiode = {
                startdato: perioder80[0].tidsperiode.startdato,
                sluttdato: perioder80[5].tidsperiode.sluttdato
            };
            expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(
                uttaksdager80
            );
        });

        it(`oppretter riktig antall uttaksdager for forelder1`, () => {
            expect(
                getAntallStonadsdagerForForelder('forelder1', perioder80)
            ).toBe(antallDagerForelder1);
        });

        it(`oppretter riktig antall uttaksdager for forelder2`, () => {
            expect(
                getAntallStonadsdagerForForelder('forelder2', perioder80)
            ).toBe(antallDagerForelder2);
        });
    });
});
