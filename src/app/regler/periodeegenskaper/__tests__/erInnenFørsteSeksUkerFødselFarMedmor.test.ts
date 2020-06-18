import moment from 'moment';
import { erInnenFørsteSeksUkerFødselFarMedmor } from '../erInnenFørsteSeksUkerFødselFarMedmor';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { getUttaksdatoer } from '../../../util/uttaksplan/uttaksdatoer';
import { Tidsperiode } from 'common/types';

const tidsperiode: Tidsperiode = {
    fom: new Date(2018, 11, 1),
    tom: new Date(2018, 11, 2),
};
const uttaksdatoer = getUttaksdatoer(tidsperiode.fom);

const validProps = {
    tidsperiode,
    situasjon: Søkersituasjon.FØDSEL,
    søkerErFarEllerMedmor: true,
    førsteUttaksdagEtterSeksUker: uttaksdatoer.etterFødsel.førsteUttaksdagEtterSeksUker,
};

describe('erInnenFørsteSeksUkerFødselFarMedmor', () => {
    it('returns true for valid scenario', () => {
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                validProps.tidsperiode,
                Søkersituasjon.FØDSEL,
                validProps.søkerErFarEllerMedmor,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeTruthy();
    });
    it('returns false if situasjon is other than fødsel', () => {
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                validProps.tidsperiode,
                Søkersituasjon.ADOPSJON,
                validProps.søkerErFarEllerMedmor,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                validProps.tidsperiode,
                Søkersituasjon.FORELDREANSVAR,
                validProps.søkerErFarEllerMedmor,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
    });
    it('returns false if søker is not farEllerMedmor', () => {
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                validProps.tidsperiode,
                Søkersituasjon.FØDSEL,
                false,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
    });
    it('returns false if tidsperiode is not valid', () => {
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                { fom: tidsperiode.fom },
                Søkersituasjon.FØDSEL,
                false,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                { tom: tidsperiode.tom },
                Søkersituasjon.FØDSEL,
                false,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
    });
    it('returns false if tidsperiode starts on or after førsteUttaksdagEtterSeksUker', () => {
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                { ...tidsperiode, fom: validProps.førsteUttaksdagEtterSeksUker },
                Søkersituasjon.FØDSEL,
                false,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
        expect(
            erInnenFørsteSeksUkerFødselFarMedmor(
                {
                    ...tidsperiode,
                    fom: moment(validProps.førsteUttaksdagEtterSeksUker).add(1, 'day').toDate(),
                },
                Søkersituasjon.FØDSEL,
                false,
                validProps.førsteUttaksdagEtterSeksUker
            )
        ).toBeFalsy();
    });
});
