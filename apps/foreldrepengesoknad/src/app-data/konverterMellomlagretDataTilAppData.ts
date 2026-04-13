import { ContextDataMap, ContextDataType } from './FpDataContext';
import { FpMellomlagretData } from './useMellomlagreSøknad';

// TODO (TOR) Reduser mappingbehov. Målbilde: Form-verdiar === mellomlagra data === lagra søknad
export const konverterMellomlagretDataTilAppData = (mellomlagretState: FpMellomlagretData): ContextDataMap => {
    const søknad = mellomlagretState.søknad;

    return {
        [ContextDataType.APP_ROUTE]: mellomlagretState.currentRoute,
        [ContextDataType.SØKERSITUASJON]: søknad?.søkersituasjon,
        [ContextDataType.OM_BARNET]: søknad?.barn,
        [ContextDataType.ANNEN_FORELDER]: søknad?.annenForelder,
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: søknad?.arbeidsforholdOgInntekt,
        [ContextDataType.EGEN_NÆRING]: søknad?.egenNæring,
        [ContextDataType.FRILANS]: søknad?.frilans,
        [ContextDataType.ANDRE_INNTEKTSKILDER]: søknad?.andreInntektskilder,
        [ContextDataType.UTENLANDSOPPHOLD]: søknad?.utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: søknad?.utenlandsoppholdNeste12Mnd,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: søknad?.utenlandsoppholdSiste12Mnd,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: søknad?.dekningsgrad,
        [ContextDataType.FORDELING]: mellomlagretState.fordeling,
        [ContextDataType.VEDLEGG]: søknad?.vedlegg,
        [ContextDataType.UTTAKSPLAN]: mellomlagretState.uttaksplanNy,
        [ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL]: søknad?.ønskerJustertUttakVedFødsel,
        [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: mellomlagretState.valgtEksisterendeSaksnr,
    };
};
