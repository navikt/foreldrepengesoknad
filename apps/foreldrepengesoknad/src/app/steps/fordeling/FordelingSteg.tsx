import { Loader, VStack } from '@navikt/ds-react';
import { Step, getNavnPåForeldre, isAnnenForelderOppgitt, isFarEllerMedmor } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiGetData, useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer, getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { getValgtMinsterett, getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import {
    getAnnenPartVedtakParam,
    shouldSuspendAnnenPartVedtakApiRequest,
} from '../periodeMedForeldrepenger/PeriodeMedForeldrepengerSteg';
import { RequestStatus } from 'app/types/RequestState';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { Søker } from '@navikt/fp-types';

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

    //TODO GR: Kan vi gjenbruke valgt stønadskonto fra forrige steg?
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

    //TODO GR: Kan vi gjenbruke dette fra forrige steg?
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

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            {!valgtStønadskonto && (
                <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                    <Loader size="2xlarge" />
                </div>
            )}
            <VStack gap="5">
                <FordelingOversikt
                    kontoer={valgtStønadskonto!}
                    navnFarMedmor={navnFarMedmor}
                    navnMor={navnMor}
                    deltUttak={deltUttak}
                    fordelingScenario={fordelingScenario}
                ></FordelingOversikt>
            </VStack>
        </Step>
    );
};

export default FordelingSteg;
