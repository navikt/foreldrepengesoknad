import { FpMellomlagretData } from 'app/api/api';
import { FpDataMap, FpDataType } from './FpDataContext';

// TODO (TOR) Reduser mappingbehov. Målbilde: Form-verdiar === mellomlagra data === lagra søknad
export const konverterMellomlagretDataTilAppData = (mellomlagretState: FpMellomlagretData): FpDataMap => {
    const søknad = mellomlagretState.søknad;

    return {
        [FpDataType.APP_ROUTE]: mellomlagretState.currentRoute,
        [FpDataType.EKSISTERENDE_SAK]: mellomlagretState.eksisterendeSak,
        [FpDataType.BARN_FRA_NESTE_SAK]: mellomlagretState.barnFraNesteSak,
        [FpDataType.SØKERSITUASJON]: søknad?.søkersituasjon,
        [FpDataType.OM_BARNET]: søknad?.barn,
        [FpDataType.ANNEN_FORELDER]: søknad?.annenForelder,
        [FpDataType.SØKER]: søknad?.søker,
        [FpDataType.UTENLANDSOPPHOLD]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  iNorgeNeste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                  iNorgeSiste12Mnd: søknad.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
              }
            : undefined,
        [FpDataType.UTENLANDSOPPHOLD_SENERE]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  senereOpphold: søknad.informasjonOmUtenlandsopphold.senereOpphold,
              }
            : undefined,
        [FpDataType.UTENLANDSOPPHOLD_TIDLIGERE]: søknad?.informasjonOmUtenlandsopphold
            ? {
                  tidligereOpphold: søknad.informasjonOmUtenlandsopphold.tidligereOpphold,
              }
            : undefined,
        [FpDataType.UTTAKSPLAN_INFO]: mellomlagretState.uttaksplanInfo,
        [FpDataType.UTTAKSPLAN]: søknad?.uttaksplan,
        [FpDataType.UTTAKSPLAN_METADATA]: {
            dekningsgrad: søknad?.dekningsgrad,
            tilleggsopplysninger: søknad?.tilleggsopplysninger,
            ønskerJustertUttakVedFødsel: søknad?.ønskerJustertUttakVedFødsel,
            perioderSomSkalSendesInn: mellomlagretState.perioderSomSkalSendesInn,
            antallUkerIUttaksplan: mellomlagretState.antallUkerIUttaksplan,
            harUttaksplanBlittSlettet: mellomlagretState.harUttaksplanBlittSlettet,
            annenPartsUttakErLagtTilIPlan: mellomlagretState.annenPartsUttakErLagtTilIPlan,
            endringstidspunkt: mellomlagretState.endringstidspunkt,
        },
    };
};
