import { FpMellomlagretData } from 'api/api';

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
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: søknad?.arbeidsforholdOgInntekt,
        [ContextDataType.EGEN_NÆRING]: søknad?.egenNæring,
        [ContextDataType.FRILANS]: søknad?.frilans,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: søknad?.andreInntektskilder,
        [ContextDataType.UTENLANDSOPPHOLD]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  skalBoUtenforNorgeNeste12Mnd: !søknad.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                  harBoddUtenforNorgeSiste12Mnd: !søknad.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
              }
            : undefined,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  utenlandsoppholdNeste12Mnd: søknad.informasjonOmUtenlandsopphold.senereOpphold.map((p) => ({
                      landkode: p.land,
                      ...p.tidsperiode,
                  })),
              }
            : undefined,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  utenlandsoppholdSiste12Mnd: søknad.informasjonOmUtenlandsopphold.tidligereOpphold.map((p) => ({
                      landkode: p.land,
                      ...p.tidsperiode,
                  })),
              }
            : undefined,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: søknad?.dekningsgrad
            ? { dekningsgrad: søknad.dekningsgrad }
            : undefined,
        [ContextDataType.FORDELING]: mellomlagretState.fordeling,
        [ContextDataType.UTTAKSPLAN]: søknad?.uttaksplan,
        [ContextDataType.UTTAKSPLAN_METADATA]: {
            ønskerJustertUttakVedFødsel: søknad?.ønskerJustertUttakVedFødsel,
            perioderSomSkalSendesInn: mellomlagretState.perioderSomSkalSendesInn,
            antallUkerIUttaksplan: mellomlagretState.antallUkerIUttaksplan,
            harUttaksplanBlittSlettet: mellomlagretState.harUttaksplanBlittSlettet,
            annenPartsUttakErLagtTilIPlan: mellomlagretState.annenPartsUttakErLagtTilIPlan,
            endringstidspunkt: mellomlagretState.endringstidspunkt,
        },
        [ContextDataType.VEDLEGG]: søknad?.vedlegg,
    };
};
