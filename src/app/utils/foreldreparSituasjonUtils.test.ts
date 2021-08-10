import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import {
    getAntallForeldreISituasjon,
    getForeldreparSituasjon,
    getSituasjonForelderSvg,
} from './foreldreparSituasjonUtils';

describe('foreldreparSituasjonUtils', () => {
    it('skal finne situasjon der det er delt uttak og søker og annen forelder er av forskjellig kjønn', () => {
        const søkerKjønn = 'K';
        const annenForelderKjønn = 'M';
        const erDeltUttak = true;
        const morErAleneOmOmsorg = false;
        const farMedmorErAleneOmOmsorg = false;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.farOgMor);
    });

    it('skal finne situasjon der det er delt uttak og søker og annen forelder er begge kvinner', () => {
        const søkerKjønn = 'K';
        const annenForelderKjønn = 'K';
        const erDeltUttak = true;
        const morErAleneOmOmsorg = true;
        const farMedmorErAleneOmOmsorg = false;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.morOgMedmor);
    });

    it('skal finne situasjon der det er delt uttak og søker og annen forelder er begge menn', () => {
        const søkerKjønn = 'M';
        const annenForelderKjønn = 'M';
        const erDeltUttak = true;
        const morErAleneOmOmsorg = true;
        const farMedmorErAleneOmOmsorg = false;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.farOgFar);
    });

    it('skal finne situasjon der det ikke er delt uttak og søker er kvinne som har aleneomsorg', () => {
        const søkerKjønn = 'K';
        const annenForelderKjønn = undefined;
        const erDeltUttak = false;
        const morErAleneOmOmsorg = true;
        const farMedmorErAleneOmOmsorg = false;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.aleneomsorg);
    });

    it('skal finne situasjon der det ikke er delt uttak og søker er kvinne som ikke har aleneomsorg', () => {
        const søkerKjønn = 'K';
        const annenForelderKjønn = undefined;
        const erDeltUttak = false;
        const morErAleneOmOmsorg = false;
        const farMedmorErAleneOmOmsorg = false;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.bareMor);
    });

    it('skal finne situasjon der det ikke er delt uttak og søker er mann som har aleneomsorg', () => {
        const søkerKjønn = 'M';
        const annenForelderKjønn = undefined;
        const erDeltUttak = false;
        const morErAleneOmOmsorg = false;
        const farMedmorErAleneOmOmsorg = true;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.aleneomsorg);
    });

    it('skal finne situasjon der det ikke er delt uttak og søker er mann som ikke har aleneomsorg', () => {
        const søkerKjønn = 'M';
        const annenForelderKjønn = undefined;
        const erDeltUttak = false;
        const morErAleneOmOmsorg = false;
        const farMedmorErAleneOmOmsorg = false;

        const situasjon = getForeldreparSituasjon(
            søkerKjønn,
            annenForelderKjønn,
            erDeltUttak,
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg
        );

        expect(situasjon).toBe(ForeldreparSituasjon.bareFar);
    });

    it('skal ha 1 foreldre for aleneomsorg, bareFar og bareMor', () => {
        expect(getAntallForeldreISituasjon(ForeldreparSituasjon.aleneomsorg)).toBe(1);
        expect(getAntallForeldreISituasjon(ForeldreparSituasjon.bareFar)).toBe(1);
        expect(getAntallForeldreISituasjon(ForeldreparSituasjon.bareMor)).toBe(1);
        expect(getAntallForeldreISituasjon(ForeldreparSituasjon.farOgFar)).toBe(2);
        expect(getAntallForeldreISituasjon(ForeldreparSituasjon.farOgMor)).toBe(2);
        expect(getAntallForeldreISituasjon(ForeldreparSituasjon.morOgMedmor)).toBe(2);
    });

    it('skal sette opp foreldresituasjon for bruk i SVG', () => {
        expect(getSituasjonForelderSvg(ForeldreparSituasjon.farOgMor)).toEqual({
            mor: 'mor1',
            farMedmor: 'far1',
        });
        expect(getSituasjonForelderSvg(ForeldreparSituasjon.bareFar)).toEqual({
            mor: 'mor1',
            farMedmor: 'far1',
            variant: 'førsteForelderHalvtSynlig',
        });
        expect(getSituasjonForelderSvg(ForeldreparSituasjon.bareMor)).toEqual({
            mor: 'mor1',
            farMedmor: 'far1',
            variant: 'andreForelderHalvtSynlig',
        });
        expect(getSituasjonForelderSvg(ForeldreparSituasjon.aleneomsorg)).toEqual({
            mor: 'mor2',
            farMedmor: 'far2',
            variant: 'foreldreSeparert',
        });
        expect(getSituasjonForelderSvg(ForeldreparSituasjon.morOgMedmor)).toEqual({
            mor: 'medmor2',
            farMedmor: 'medmor1',
        });
        expect(getSituasjonForelderSvg(ForeldreparSituasjon.farOgFar)).toEqual({
            mor: 'far3',
            farMedmor: 'far4',
        });
    });
});
