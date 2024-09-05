import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Loader, VStack } from '@navikt/ds-react';

import { isFødtBarn } from '@navikt/fp-common';
import { Arbeidsforhold, Søker } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import { useApiPostData } from 'app/api/context/useFpApiData';
import getStønadskontoParams, {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'app/api/getStønadskontoParams';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/FpDataContext';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { RequestStatus } from 'app/types/RequestState';
import {
    getAnnenPartVedtakParam,
    getIsDeltUttak,
    shouldSuspendAnnenPartVedtakApiRequest,
} from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getNavnPåForeldre } from 'app/utils/personUtils';
import { getAntallUkerFellesperiode } from 'app/utils/stønadskontoerUtils';

import FordelingForm from './fordeling-form/FordelingForm';
import FordelingOversikt from './fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer, getSisteUttaksdagAnnenForelder } from './fordeling-oversikt/fordelingOversiktUtils';
import MorsSisteDag from './mors-siste-dag/MorsSisteDag';

type Props = {
    søker: Søker;
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const FordelingSteg: React.FunctionComponent<Props> = ({
    søker,
    arbeidsforhold,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const oppdaterBarn = notEmpty(useContextSaveData(ContextDataType.OM_BARNET));

    const termindato = getTermindato(barn);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const suspendAnnenPartVedtakApiRequest = shouldSuspendAnnenPartVedtakApiRequest(annenForelder);
    const { dekningsgrad } = periodeMedForeldrepenger;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdagNesteBarnsSak = barnFraNesteSak?.startdatoFørsteStønadsperiode;
    const navnPåForeldre = getNavnPåForeldre(søker, annenForelder, erFarEllerMedmor, intl);
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const deltUttak = getIsDeltUttak(annenForelder);

    const { data: annenPartsVedtak, requestStatus: statusAnnenPartVedtak } = useApiPostData(
        FpApiDataType.ANNEN_PART_VEDTAK,
        getAnnenPartVedtakParam(annenForelder, barn),
        suspendAnnenPartVedtakApiRequest,
    );

    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest
        ? false
        : statusAnnenPartVedtak !== RequestStatus.FINISHED;

    const { data: tilgjengeligeStønadskontoer } = useApiPostData(
        FpApiDataType.STØNADSKONTOER,
        getStønadskontoParams(barn, annenForelder, søkersituasjon, barnFraNesteSak, annenPartsVedtak, eksisterendeSak),
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

    const minsterett = tilgjengeligeStønadskontoer ? tilgjengeligeStønadskontoer[dekningsgrad].minsteretter : undefined;

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
                  navnPåForeldre,
                  annenForelder,
                  intl,
                  eksisterendeVedtakAnnenPart?.uttaksplan,
              )
            : [];
    const ukerMedFellesperiode = valgtStønadskonto ? getAntallUkerFellesperiode(valgtStønadskonto) : 0;
    const dagerMedFellesperiode = ukerMedFellesperiode * 5;
    const sisteDagAnnenForelder = getSisteUttaksdagAnnenForelder(
        erFarEllerMedmor,
        deltUttak,
        eksisterendeVedtakAnnenPart?.uttaksplan,
    );

    const førsteDagEtterAnnenForelder = sisteDagAnnenForelder ? Uttaksdagen(sisteDagAnnenForelder).neste() : undefined;
    const visMorsSisteDag = erFarEllerMedmor && sisteDagAnnenForelder;

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );
    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        termindato,
        eksisterendeVedtakAnnenPart?.grunnlag.termindato,
    );

    useEffect(() => {
        if (erFarEllerMedmor && barn.antallBarn !== saksgrunnlagsAntallBarn) {
            oppdaterBarn({ ...barn, antallBarn: saksgrunnlagsAntallBarn });
        }
        if (
            erFarEllerMedmor &&
            isFødtBarn(barn) &&
            saksgrunnlagsTermindato &&
            barn.termindato !== saksgrunnlagsTermindato
        ) {
            oppdaterBarn({ ...barn, termindato: saksgrunnlagsTermindato });
        }
    }, [erFarEllerMedmor, saksgrunnlagsAntallBarn, barn, oppdaterBarn, saksgrunnlagsTermindato]);

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
                    kontoer={valgtStønadskonto}
                    navnFarMedmor={navnFarMedmor}
                    navnMor={navnMor}
                    deltUttak={deltUttak}
                    fordelingScenario={fordelingScenario}
                ></FordelingOversikt>
                {visMorsSisteDag && <MorsSisteDag morsSisteDag={sisteDagAnnenForelder} navnMor={navnMor} />}
                <FordelingForm
                    erDeltUttak={deltUttak}
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
