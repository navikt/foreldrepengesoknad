import { getGradertUttakSpørsmålVisibility, GradertUttakSpørsmålKeys } from '../gradertUttakFormVisibility';
import { Uttaksperiode } from '../../../../types/uttaksplan/periodetyper';
import { RecursivePartial } from '../../../../types/Partial';

const periodeBase: RecursivePartial<Uttaksperiode> = {};

const getVisibility = (p: RecursivePartial<Uttaksperiode>) => {
    const updatedPeriode = {
        ...periodeBase,
        ...p
    };
    return getGradertUttakSpørsmålVisibility(updatedPeriode as Uttaksperiode, true, false);
};

describe('GradertUttakForm visibility', () => {
    let visibility;
    it('Should render stillingsprosent when gradert === true', () => {
        visibility = getVisibility({ gradert: false });
        expect(visibility.isVisible(GradertUttakSpørsmålKeys.stillingsprosent)).toBeFalsy();
        visibility = getVisibility({ gradert: undefined });
        expect(visibility.isVisible(GradertUttakSpørsmålKeys.stillingsprosent)).toBeFalsy();
        visibility = getVisibility({ gradert: true });
        expect(visibility.isVisible(GradertUttakSpørsmålKeys.stillingsprosent)).toBeTruthy();
    });

    it('Should render samtidig uttak when stillingsprosent has value', () => {
        expect(getVisibility({ gradert: false }).isVisible(GradertUttakSpørsmålKeys.samtidigGradertUttak)).toBeFalsy();
        expect(
            getVisibility({ gradert: true, stillingsprosent: undefined }).isVisible(
                GradertUttakSpørsmålKeys.samtidigGradertUttak
            )
        ).toBeFalsy();
        expect(
            getVisibility({ gradert: true, stillingsprosent: '1' }).isVisible(
                GradertUttakSpørsmålKeys.samtidigGradertUttak
            )
        ).toBeTruthy();
    });
    it('Should render arbeidsforhold when samtidig uttak is answered', () => {
        expect(
            getVisibility({ gradert: true, stillingsprosent: '1', ønskerSamtidigUttak: undefined }).isVisible(
                GradertUttakSpørsmålKeys.hvorSkalDuJobbe
            )
        ).toBeFalsy();
        expect(
            getVisibility({ gradert: true, stillingsprosent: '1', ønskerSamtidigUttak: false }).isVisible(
                GradertUttakSpørsmålKeys.hvorSkalDuJobbe
            )
        ).toBeTruthy();
        expect(
            getVisibility({ gradert: true, stillingsprosent: '1', ønskerSamtidigUttak: true }).isVisible(
                GradertUttakSpørsmålKeys.hvorSkalDuJobbe
            )
        ).toBeTruthy();
    });
});
