import { skalKunneViseMorsUttaksplanForFarEllerMedmor } from '../uttakUtils';
import { Saksgrunnlag } from '../../../types/EksisterendeSak';
import Søknad from '../../../../app/types/søknad/Søknad';
import { DeepPartial } from 'redux';

describe('uttakUtils', () => {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const grunnlag: Saksgrunnlag = {
        fødselsdato: new Date(),
        dekningsgrad: '100',
        antallBarn: 1,
        søkerErFarEllerMedmor: true,
        morErAleneOmOmsorg: false,
        morErUfør: false,
        morHarRett: true,
        farMedmorErAleneOmOmsorg: false,
        farMedmorHarRett: false,
        erBarnetFødt: true
    } as Saksgrunnlag;

    // tslint:disable-next-line: no-object-literal-type-assertion
    const søknad: DeepPartial<Søknad> = {
        dekningsgrad: '100',
        barn: {
            antallBarn: 1,
            fødselsdato: [new Date()]
        },
        søker: {
            erAleneOmOmsorg: false
        },
        annenForelder: {
            harRettPåForeldrepenger: true
        }
    } as DeepPartial<Søknad>;

    it('skalKunneViseMorsUttaksplanForFarEllerMedmor returnerer true hvis grunnlag og søknadsdata matcher', () => {
        expect(skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, søknad as Søknad)).toBeTruthy();
    });

    it('skalKunneViseMorsUttaksplanForFarEllerMedmor returnerer false hvis grunnlag og søknadsdata ikke matcher', () => {
        // tslint:disable-next-line: no-object-literal-type-assertion
        expect(
            skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, { ...søknad, dekningsgrad: '80' } as Søknad)
        ).toBeFalsy();
    });
});
