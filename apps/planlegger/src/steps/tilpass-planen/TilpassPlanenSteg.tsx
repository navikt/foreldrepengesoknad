import {
    ContextDataType,
    useContextComplete,
    useContextGetData,
    useContextSaveData,
} from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { erAlenesøker, erMedmorDelAvSøknaden, getErFarEllerMedmor, getNavnPåForeldre } from 'utils/HvemPlanleggerUtils';
import { mapOmBarnetTilBarn } from 'utils/barnetUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { useLagUttaksplanForslag } from 'utils/useLagUttaksplanForslag';

import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';

import { KontoBeregningResultatDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { encodeToBase64 } from '@navikt/fp-utils';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import {
    FjernAltIUttaksplanModal,
    KvoteOppsummering,
    UttaksplanDataProvider,
    UttaksplanKalender,
    UttaksplanNy,
    UttaksplanRedigeringProvider,
} from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { PlanleggerStepPage } from '../../components/page/PlanleggerStepPage';
import { PlanvisningToggle, Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import { HvaErMulig } from './hva-er-mulig/HvaErMulig';

interface Props {
    stønadskontoer: KontoBeregningResultatDto;
}

export const TilpassPlanenSteg = ({ stønadskontoer }: Props) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const [visningsmodus, setVisningsmodus] = useState<Visningsmodus>('liste');

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);
    const completeAppContext = useContextComplete();

    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const stønadskonto100 = stønadskontoer['100'];
    const stønadskonto80 = stønadskontoer['80'];
    const valgtStønadskonto = hvorLangPeriode.dekningsgrad === '100' ? stønadskonto100 : stønadskonto80;
    const barnehagestartdato = barnehagestartDato(omBarnet);

    const isMedmorDelAvSøknaden = erMedmorDelAvSøknaden(hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const erAleneOmOmsorg = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);
    const erDeltUttak = fordeling !== undefined;

    const navnPåForeldre = getNavnPåForeldre(hvemPlanlegger, intl);

    const lagreUttaksplanOgOppdaterUrl = (oppdatertUttaksplan: UttakPeriode_fpoversikt[] | undefined) => {
        lagreUttaksplan(oppdatertUttaksplan);

        const contextData = {
            ...completeAppContext,
            [ContextDataType.UTTAKSPLAN]: oppdatertUttaksplan,
        };

        const encodedData = encodeToBase64(JSON.stringify(contextData));
        const currentPath = globalThis.location.pathname;
        const newUrl = `${currentPath}?data=${encodedData}`;

        globalThis.history.replaceState(null, '', newUrl);
    };

    const planforslag = useLagUttaksplanForslag(valgtStønadskonto);

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
            <UttaksplanDataProvider
                barn={mapOmBarnetTilBarn(omBarnet)}
                erFarEllerMedmor={erFarEllerMedmor}
                navnPåForeldre={navnPåForeldre}
                modus="planlegger"
                valgtStønadskonto={valgtStønadskonto}
                aleneOmOmsorg={erAleneOmOmsorg}
                erMedmorDelAvSøknaden={isMedmorDelAvSøknaden}
                bareFarMedmorHarRett={bareFarMedmorHarRett}
                harAktivitetskravIPeriodeUtenUttak={false}
                erDeltUttak={erDeltUttak}
                saksperioder={uttaksplan ?? [...planforslag.søker1, ...planforslag.søker2]}
            >
                <VStack gap="space-24">
                    <Alert variant="info">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="TilpassPlanenSteg.SavnerDuNoe.Tittel" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="TilpassPlanenSteg.SavnerDuNoe.Tekst" />
                        </BodyLong>
                    </Alert>

                    <Heading size="medium" spacing level="2">
                        <FormattedMessage
                            id="TilpassPlanenSteg.Tittel"
                            values={{ erAleneforsørger: erAleneOmOmsorg }}
                        />
                    </Heading>

                    <HvaErMulig hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} barnet={omBarnet} />

                    <PlanvisningToggle setVisningsmodus={setVisningsmodus} />

                    <UttaksplanRedigeringProvider
                        oppdaterUttaksplan={lagreUttaksplanOgOppdaterUrl}
                        harEndretPlan={uttaksplan !== undefined}
                    >
                        <FjernAltIUttaksplanModal />
                        {visningsmodus === 'liste' && <UttaksplanNy />}

                        {visningsmodus === 'kalender' && (
                            <UttaksplanKalender
                                readOnly={!erUttaksplanKalenderRedigerbar()}
                                barnehagestartdato={barnehagestartdato}
                            />
                        )}
                    </UttaksplanRedigeringProvider>

                    <KvoteOppsummering visStatusIkoner />

                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </UttaksplanDataProvider>
        </PlanleggerStepPage>
    );
};

const erUttaksplanKalenderRedigerbar = () => {
    const hostname = globalThis.location.hostname;
    return hostname === 'localhost' || hostname === 'www.intern.dev.nav.no';
};
