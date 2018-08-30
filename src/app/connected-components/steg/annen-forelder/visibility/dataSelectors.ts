import { AppState } from '../../../../redux/reducers';
import { createSelector } from 'reselect';
import Søknad from '../../../../types/søknad/Søknad';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import { Barn, Adopsjonsbarn } from '../../../../types/søknad/Barn';
import { Søker } from '../../../../types/søknad/Søker';
import Person, { RegistrertAnnenForelder } from '../../../../types/Person';
import { Søkerinfo } from '../../../../types/søkerinfo';
import { erFarEllerMedmor } from '../../../../util/domain/personUtil';

const søknadSelector = (state: AppState) => state.søknad;
const søkerinfoSelector = (state: AppState) => state.api.søkerinfo;

const getAnnenForelder = createSelector([søknadSelector], (søknad: Søknad): Partial<AnnenForelder> => {
    return søknad.annenForelder;
});
const getBarn = createSelector([søknadSelector], (søknad: Søknad): Partial<Barn> => {
    return søknad.barn;
});
const getSøker = createSelector([søknadSelector], (søknad: Søknad): Partial<Søker> => {
    return søknad.søker;
});
const getPerson = createSelector([søkerinfoSelector], (søkerinfo: Søkerinfo): Person => {
    return søkerinfo.person;
});
const getRegistrertAnnenForelder = createSelector([søknadSelector], (søknad: Søknad):
    | RegistrertAnnenForelder
    | undefined => {
    return søknad.temp.registrertAnnenForelder;
});
const getHarDenAndreForelderenOpplystOmSinPågåendeSak = createSelector(
    [getRegistrertAnnenForelder],
    (registrertAnnenForelder: RegistrertAnnenForelder) => {
        return registrertAnnenForelder !== undefined && registrertAnnenForelder.harOpplystOmSinPågåendeSak;
    }
);
const getGjelderAdopsjonAvEktefellesBarn = createSelector([getBarn], (barn: Barn): boolean => {
    return (barn as Adopsjonsbarn).adopsjonAvEktefellesBarn === true;
});

const getErFarEllerMedmor = createSelector([getSøker, getPerson], (søker: Søker, person: Person): boolean => {
    return erFarEllerMedmor(person.kjønn, søker.rolle);
});

export const AnnenForelderDataSelectors = {
    getAnnenForelder,
    getBarn,
    getSøker,
    getPerson,
    getRegistrertAnnenForelder,
    getHarDenAndreForelderenOpplystOmSinPågåendeSak,
    getGjelderAdopsjonAvEktefellesBarn,
    getErFarEllerMedmor
};
