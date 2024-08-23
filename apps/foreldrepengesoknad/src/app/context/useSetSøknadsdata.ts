import { EksisterendeSak } from '@navikt/fp-common';

import { ContextDataType, useContextSaveAnyData } from './FpDataContext';
import { Søknad } from './types/Søknad';

export const useSetSøknadsdata = () => {
    const oppdaterData = useContextSaveAnyData();

    const oppdaterSøknadIState = (søknad: Søknad, eksisterendeSak?: EksisterendeSak) => {
        oppdaterData(ContextDataType.SØKERSITUASJON, søknad.søkersituasjon);
        oppdaterData(ContextDataType.OM_BARNET, søknad.barn);
        oppdaterData(ContextDataType.ANNEN_FORELDER, søknad.annenForelder);
        oppdaterData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT, søknad.arbeidsforholdOgInntekt);
        oppdaterData(ContextDataType.FRILANS, søknad.frilans);
        oppdaterData(ContextDataType.EGEN_NÆRING, søknad.egenNæring);
        oppdaterData(ContextDataType.ANDRE_INNTEKTSKILDER, søknad.andreInntektskilder);
        oppdaterData(
            ContextDataType.UTENLANDSOPPHOLD,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      iNorgeNeste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                      iNorgeSiste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
                  }
                : undefined,
        );
        oppdaterData(
            ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      tidligereOpphold: søknad.informasjonOmUtenlandsopphold.tidligereOpphold,
                  }
                : undefined,
        );
        oppdaterData(
            ContextDataType.UTENLANDSOPPHOLD_SENERE,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      senereOpphold: søknad.informasjonOmUtenlandsopphold.senereOpphold,
                  }
                : undefined,
        );
        oppdaterData(ContextDataType.PERIODE_MED_FORELDREPENGER, { dekningsgrad: søknad.dekningsgrad });
        oppdaterData(ContextDataType.UTTAKSPLAN, søknad.uttaksplan);
        oppdaterData(ContextDataType.UTTAKSPLAN_METADATA, {
            ønskerJustertUttakVedFødsel: søknad.ønskerJustertUttakVedFødsel,
        });

        if (eksisterendeSak) {
            oppdaterData(ContextDataType.EKSISTERENDE_SAK, eksisterendeSak);
        }
    };

    return { oppdaterSøknadIState };
};
