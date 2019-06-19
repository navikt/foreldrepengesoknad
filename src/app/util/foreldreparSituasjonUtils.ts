import { Søknadsinfo } from 'app/selectors/types';
import { ForeldreparSituasjon } from 'shared/types';
import { Kjønn } from 'app/types/common';

export const getForeldreparSituasjonFraSøknadsinfo = (info: Søknadsinfo): ForeldreparSituasjon => {
    const { søker, annenForelder, mor, farMedmor } = info;
    const kjønnSøker = søker.kjønn;
    const kjønnAnnenForelder = annenForelder.kjønn;
    if (info.søknaden.erDeltUttak) {
        if (kjønnSøker !== kjønnAnnenForelder) {
            return ForeldreparSituasjon.farOgMor;
        }
        return kjønnSøker === Kjønn.MANN ? ForeldreparSituasjon.farOgFar : ForeldreparSituasjon.morOgMedmor;
    } else {
        if (kjønnSøker === Kjønn.KVINNE) {
            return mor.erAleneOmOmsorg ? ForeldreparSituasjon.aleneomsorg : ForeldreparSituasjon.bareMor;
        } else {
            return farMedmor.erAleneOmOmsorg ? ForeldreparSituasjon.aleneomsorg : ForeldreparSituasjon.bareFar;
        }
    }
};
