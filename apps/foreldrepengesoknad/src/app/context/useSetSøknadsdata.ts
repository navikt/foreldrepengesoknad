import { EksisterendeSak } from '@navikt/fp-common';
import { FpDataType, useAllStateSaveFn } from './FpDataContext';
import { Søknad } from './types/Søknad';

export const useSetSøknadsdata = () => {
    const lagreData = useAllStateSaveFn();

    const oppdaterSøknadIState = (søknad: Søknad, eksisterendeSak?: EksisterendeSak) => {
        lagreData(FpDataType.SØKERSITUASJON, søknad.søkersituasjon);
        lagreData(FpDataType.OM_BARNET, søknad.barn);
        lagreData(FpDataType.ANNEN_FORELDER, søknad.annenForelder);
        lagreData(FpDataType.SØKER, søknad.søker);
        lagreData(
            FpDataType.UTENLANDSOPPHOLD,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      iNorgeNeste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                      iNorgeSiste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
                  }
                : undefined,
        );
        lagreData(
            FpDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      tidligereOpphold: søknad.informasjonOmUtenlandsopphold.tidligereOpphold,
                  }
                : undefined,
        );
        lagreData(
            FpDataType.UTENLANDSOPPHOLD_SENERE,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      senereOpphold: søknad.informasjonOmUtenlandsopphold.senereOpphold,
                  }
                : undefined,
        );
        lagreData(FpDataType.UTTAKSPLAN, søknad.uttaksplan);
        lagreData(FpDataType.UTTAKSPLAN_METADATA, {
            dekningsgrad: søknad.dekningsgrad,
            tilleggsopplysninger: søknad.tilleggsopplysninger,
            ønskerJustertUttakVedFødsel: søknad.ønskerJustertUttakVedFødsel,
        });

        if (eksisterendeSak) {
            lagreData(FpDataType.EKSISTERENDE_SAK, eksisterendeSak);
        }
    };

    return { oppdaterSøknadIState };
};
