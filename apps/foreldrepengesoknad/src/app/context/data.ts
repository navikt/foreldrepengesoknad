import { FpMellomlagretData } from 'app/api/api';
import { FpDataMap, FpDataType, useAllStateSaveFn } from './FpDataContext';
import { Søknad } from './types/Søknad';
import { EksisterendeSak } from '@navikt/fp-common';

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
