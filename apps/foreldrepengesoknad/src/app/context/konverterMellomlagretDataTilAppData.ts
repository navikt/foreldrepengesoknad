import { FpMellomlagretData } from 'app/api/api';

import { ContextDataMap, ContextDataType } from './FpDataContext';

// TODO (TOR) Reduser mappingbehov. Målbilde: Form-verdiar === mellomlagra data === lagra søknad
export const konverterMellomlagretDataTilAppData = (mellomlagretState: FpMellomlagretData): ContextDataMap => {
    const søknad = mellomlagretState.søknad;

    return {
        [ContextDataType.APP_ROUTE]: mellomlagretState.currentRoute,
        [ContextDataType.EKSISTERENDE_SAK]: mellomlagretState.eksisterendeSak,
        [ContextDataType.BARN_FRA_NESTE_SAK]: mellomlagretState.barnFraNesteSak,
        [ContextDataType.SØKERSITUASJON]: søknad?.søkersituasjon,
        [ContextDataType.OM_BARNET]: søknad?.barn,
        [ContextDataType.ANNEN_FORELDER]: søknad?.annenForelder,
        [ContextDataType.SØKER_DATA]: søknad?.søker,
        [ContextDataType.UTENLANDSOPPHOLD]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  iNorgeNeste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                  iNorgeSiste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
              }
            : undefined,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]:
            søknad?.informasjonOmUtenlandsopphold &&
            søknad.informasjonOmUtenlandsopphold.senereOpphold &&
            søknad.informasjonOmUtenlandsopphold.senereOpphold.length > 0
                ? {
                      senereOpphold: søknad.informasjonOmUtenlandsopphold.senereOpphold,
                  }
                : undefined,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]:
            søknad?.informasjonOmUtenlandsopphold &&
            søknad.informasjonOmUtenlandsopphold.tidligereOpphold &&
            søknad.informasjonOmUtenlandsopphold.tidligereOpphold.length > 0
                ? {
                      tidligereOpphold: søknad.informasjonOmUtenlandsopphold.tidligereOpphold,
                  }
                : undefined,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: søknad?.dekningsgrad
            ? { dekningsgrad: søknad.dekningsgrad }
            : undefined,
        [ContextDataType.UTTAKSPLAN_INFO]: mellomlagretState.uttaksplanInfo,
        [ContextDataType.UTTAKSPLAN]: søknad?.uttaksplan,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
            ønskerJustertUttakVedFødsel: søknad?.ønskerJustertUttakVedFødsel,
            perioderSomSkalSendesInn: mellomlagretState.perioderSomSkalSendesInn,
            antallUkerIUttaksplan: mellomlagretState.antallUkerIUttaksplan,
            harUttaksplanBlittSlettet: mellomlagretState.harUttaksplanBlittSlettet,
            annenPartsUttakErLagtTilIPlan: mellomlagretState.annenPartsUttakErLagtTilIPlan,
            endringstidspunkt: mellomlagretState.endringstidspunkt,
        },
        [ContextDataType.MANGLER_DOKUMENTASJON]: søknad?.manglerDokumentasjon,
        [ContextDataType.VEDLEGG]: søknad?.vedlegg,
    };
};
