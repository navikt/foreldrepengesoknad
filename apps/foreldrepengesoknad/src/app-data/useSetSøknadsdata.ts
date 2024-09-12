import { EksisterendeSak } from '@navikt/fp-common';

import { Søknad } from '../types/Søknad';
import { ContextDataType, useContextSaveAnyData } from './FpDataContext';

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
                      skalBoUtenforNorgeNeste12Mnd: !søknad.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                      harBoddUtenforNorgeSiste12Mnd: !søknad.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
                  }
                : undefined,
        );
        oppdaterData(
            ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      utenlandsoppholdSiste12Mnd: søknad.informasjonOmUtenlandsopphold.tidligereOpphold.map((p) => ({
                          landkode: p.land,
                          ...p.tidsperiode,
                      })),
                  }
                : undefined,
        );
        oppdaterData(
            ContextDataType.UTENLANDSOPPHOLD_SENERE,
            søknad.informasjonOmUtenlandsopphold
                ? {
                      utenlandsoppholdNeste12Mnd: søknad.informasjonOmUtenlandsopphold.tidligereOpphold.map((p) => ({
                          landkode: p.land,
                          ...p.tidsperiode,
                      })),
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
