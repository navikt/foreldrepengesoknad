import { OmAnnenForelder } from 'app/selectors/types';

const aktivitetskravMorUtil = {
    skalBesvaresVedUtsettelse(søkerErFarEllerMedmor: boolean, annenForelder: OmAnnenForelder): boolean {
        return !søkerErFarEllerMedmor || (annenForelder.harRett === false && annenForelder.erUfør === true)
            ? false
            : annenForelder.harRett === false;
    },
};

export default aktivitetskravMorUtil;
