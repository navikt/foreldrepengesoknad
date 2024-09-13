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
        [ContextDataType.UTENLANDSOPPHOLD]: søknad?.utenlandsOpphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: søknad?.utenlandsoppholdNeste12Mnd,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: søknad?.utenlandsoppholdSiste12Mnd,
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
