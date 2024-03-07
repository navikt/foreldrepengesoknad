import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Loader, VStack } from '@navikt/ds-react';

import {
    ISOStringToDate,
    Step,
    Uttaksdagen,
    getAntallUkerFellesperiode,
    getNavnPåForeldre,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { Søker } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiGetData, useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer, getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { RequestStatus } from 'app/types/RequestState';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtMinsterett, getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';

import {
    getAnnenPartVedtakParam,
    shouldSuspendAnnenPartVedtakApiRequest,
} from '../periodeMedForeldrepenger/PeriodeMedForeldrepengerSteg';
import FordelingForm from './FordelingForm';
import MorsSisteDag from './components/mors-siste-dag/MorsSisteDag';

type Props = {
    søker: Søker;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const FordelingSteg: React.FunctionComponent<Props> = ({ søker, mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkerData = notEmpty(useContextGetData(ContextDataType.SØKER_DATA));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const suspendAnnenPartVedtakApiRequest = shouldSuspendAnnenPartVedtakApiRequest(annenForelder);
    const { dekningsgrad } = periodeMedForeldrepenger;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdagNesteBarnsSak = barnFraNesteSak?.startdatoFørsteStønadsperiode;
    const navnPåForeldre = getNavnPåForeldre(søker, annenForelder, erFarEllerMedmor, intl);
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const annenForeldrerHarKunRettiEØS = !!oppgittAnnenForelder?.harRettPåForeldrepengerIEØS;
    const deltUttak = getIsDeltUttak(annenForelder);

    const { data: annenPartsVedtak, requestStatus: statusAnnenPartVedtak } = useApiPostData(
        FpApiDataType.ANNEN_PART_VEDTAK,
        getAnnenPartVedtakParam(annenForelder, barn),
        suspendAnnenPartVedtakApiRequest,
    );

    const params = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        søkerData,
        barnFraNesteSak,
        annenPartsVedtak,
        eksisterendeSak,
    );

    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest
        ? false
        : statusAnnenPartVedtak !== RequestStatus.FINISHED;

    const { data: tilgjengeligeStønadskontoer80 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_80,
        params.stønadskontoParams80,
        suspendStønadskontoApiRequests,
    );
    const { data: tilgjengeligeStønadskontoer100 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_100,
        params.stønadskontoParams100,
        suspendStønadskontoApiRequests,
    );

    const eksisterendeVedtakAnnenPart = useMemo(
        () =>
            mapAnnenPartsEksisterendeSakFromDTO(
                annenPartsVedtak,
                barn,
                erFarEllerMedmor,
                familiehendelsesdato,
                førsteUttaksdagNesteBarnsSak,
            ),
        [annenPartsVedtak, barn, erFarEllerMedmor, familiehendelsesdato, førsteUttaksdagNesteBarnsSak],
    );
    const tilgjengeligeStønadskontoer =
        tilgjengeligeStønadskontoer80 && tilgjengeligeStønadskontoer100
            ? getValgtStønadskontoFor80Og100Prosent(tilgjengeligeStønadskontoer80, tilgjengeligeStønadskontoer100)
            : undefined;

    const minsterett = getValgtMinsterett(dekningsgrad, tilgjengeligeStønadskontoer100, tilgjengeligeStønadskontoer80);

    const valgtStønadskonto = tilgjengeligeStønadskontoer
        ? tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)]
        : undefined;

    //TODO GR: eksisterendeVedtakAnnenPart?.uttaksplan, er på infoperiode format og derfor vises ikke annen parts bruk av fellesperiode eller søkerens kvote.

    const fordelingScenario =
        valgtStønadskonto && minsterett
            ? getFordelingFraKontoer(
                  valgtStønadskonto,
                  minsterett,
                  søkersituasjon,
                  barn,
                  søkerData.erAleneOmOmsorg,
                  navnMor,
                  navnFarMedmor,
                  intl,
                  annenForeldrerHarKunRettiEØS,
                  eksisterendeVedtakAnnenPart?.uttaksplan,
              )
            : [];
    const dagerMedFellesperiode = valgtStønadskonto ? getAntallUkerFellesperiode(valgtStønadskonto) * 5 : 0;
    //TODO GR: Må finnes siste uttaksperiode, filtrere bort på kun de og kun invilgede:
    const sisteDagAnnenForelder =
        deltUttak && annenPartsVedtak
            ? Uttaksdagen(
                  ISOStringToDate(annenPartsVedtak.perioder[annenPartsVedtak.perioder.length - 1].tom)!,
              ).denneEllerForrige()
            : undefined;
    const førsteDagEtterAnnenForelder = sisteDagAnnenForelder ? Uttaksdagen(sisteDagAnnenForelder).neste() : undefined;
    const visMorsSisteDag = erFarEllerMedmor && sisteDagAnnenForelder;
    if (!valgtStønadskonto || (statusAnnenPartVedtak !== RequestStatus.FINISHED && !suspendAnnenPartVedtakApiRequest)) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader size="2xlarge" />
            </div>
        );
    }

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <VStack gap="5">
                <FordelingOversikt
                    kontoer={valgtStønadskonto!}
                    navnFarMedmor={navnFarMedmor}
                    navnMor={navnMor}
                    deltUttak={deltUttak}
                    fordelingScenario={fordelingScenario}
                ></FordelingOversikt>
                {visMorsSisteDag && <MorsSisteDag morsSisteDag={sisteDagAnnenForelder} navnMor={navnMor} />}
                <FordelingForm
                    deltUttak={deltUttak}
                    navnPåForeldre={navnPåForeldre}
                    dagerMedFellesperiode={dagerMedFellesperiode}
                    goToPreviousDefaultStep={navigator.goToPreviousDefaultStep}
                    goToNextDefaultStep={navigator.goToNextDefaultStep}
                    førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
                ></FordelingForm>
            </VStack>
        </Step>
    );
};

export default FordelingSteg;
