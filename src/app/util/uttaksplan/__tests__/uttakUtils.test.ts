import { skalKunneViseMorsUttaksplanForFarEllerMedmor } from '../uttakUtils';
import { Saksgrunnlag, FamiliehendelsesType } from '../../../types/EksisterendeSak';
import Søknad from '../../../../app/types/søknad/Søknad';
import { DeepPartial } from 'redux';
import { Søknadsinfo } from 'app/selectors/types';
import { Dekningsgrad } from 'common/types';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

describe('uttakUtils', () => {
    const grunnlag: Saksgrunnlag = {
        familieHendelseDato: dateToISOString(new Date()),
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        antallBarn: 1,
        søkerErFarEllerMedmor: true,
        morErAleneOmOmsorg: false,
        morErUfør: false,
        morHarRett: true,
        farMedmorErAleneOmOmsorg: false,
        farMedmorHarRett: false,
        erBarnetFødt: true,
        familieHendelseType: FamiliehendelsesType.FØDSEL,
    } as Saksgrunnlag;

    const søknadsinfo: DeepPartial<Søknadsinfo> = {
        søknaden: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            erAleneOmOmsorg: false,
            familieHendelseDato: new Date(),
            antallBarn: 1,
        },
        annenForelder: {
            harRett: true,
            harMorUføretrygd : false,
        },
    } as DeepPartial<Søknad>;

    it('skalKunneViseMorsUttaksplanForFarEllerMedmor returnerer true hvis grunnlag og søknadsdata matcher', () => {
        expect(skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, søknadsinfo as Søknadsinfo)).toBeTruthy();
    });

    it('skalKunneViseMorsUttaksplanForFarEllerMedmor returnerer false hvis grunnlag og søknadsdata ikke matcher', () => {
        expect(
            skalKunneViseMorsUttaksplanForFarEllerMedmor(grunnlag, {
                ...søknadsinfo,
                søknaden: { ...søknadsinfo.søknaden, dekningsgrad: Dekningsgrad.ÅTTI_PROSENT },
            } as Søknadsinfo)
        ).toBeFalsy();
    });
});
