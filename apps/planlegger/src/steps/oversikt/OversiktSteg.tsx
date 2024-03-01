import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import Hjerte from 'components/ikoner/Hjerte';
import GrønnSirkel from 'components/ikoner/RosaSirkel';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FormattedMessage } from 'react-intl';
import { finnHvemPlanlegger } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';

import { BodyShort, HStack, Spacer, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Kalender from './kalender/Kalender';
import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';

dayjs.locale('nb');

const termindatoEllerFødselsdato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erAdoptert) {
        const dato = barnet.fødselsdato;
        return dayjs(dato).format('DD. MMM');
    }
    if (erIkkeFødt) {
        const dato = barnet.termindato;
        return dayjs(dato).format('DD. MMM');
    }
    return undefined;
};

const OversiktSteg = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const treUkerFørTerminDato = dayjs(termindato).subtract(3, 'weeks').startOf('day');
    const sluttdatoMor = dayjs(treUkerFørTerminDato).add(31, 'weeks');
    const sluttdato49 = dayjs(sluttdatoMor).add(15, 'weeks');

    const morsPeriode = dayjs(sluttdatoMor).diff(treUkerFørTerminDato, 'weeks');
    const farsPeriode = dayjs(sluttdato49).diff(sluttdatoMor, 'weeks');
    return (
        <PlanleggerPage steps={stepConfig}>
            <VStack gap="10">
                {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                <VStack gap="2">
                    <VStack gap="2">
                        <HStack gap="1" wrap={false}>
                            <div className="bluePanel">
                                <HStack gap="2" align="center">
                                    <BlåSirkel />
                                    <BodyShort>
                                        <FormattedMessage
                                            id="ukerForeldrepenger"
                                            values={{
                                                hvem: finnHvemPlanlegger(hvemPlanlegger)
                                                    .slice(0, -1)
                                                    .map(capitalizeFirstLetter),
                                                uker: morsPeriode,
                                                dato: dayjs(treUkerFørTerminDato).add(1, 'day').format('dddd D MMM'),
                                            }}
                                        />
                                    </BodyShort>
                                </HStack>
                            </div>
                            <Spacer />
                            {!isAlene(hvemPlanlegger) && (
                                <HStack gap="3">
                                    <div className="greenPanel">
                                        <HStack gap="2" align="center">
                                            <GrønnSirkel />
                                            <BodyShort>
                                                <FormattedMessage
                                                    id="ukerForeldrepenger"
                                                    values={{
                                                        hvem: finnHvemPlanlegger(hvemPlanlegger)
                                                            .slice(0, 3)
                                                            .slice(-1)
                                                            .map(capitalizeFirstLetter),
                                                        uker: farsPeriode,
                                                        dato: dayjs(sluttdatoMor).add(1, 'day').format('dddd D MMM'),
                                                    }}
                                                />
                                            </BodyShort>
                                        </HStack>
                                    </div>
                                </HStack>
                            )}
                        </HStack>
                    </VStack>
                    <VStack gap="10">
                        <div className="pinkPanel">
                            <HStack gap="2" align="center">
                                <Hjerte />
                                <BodyShort>
                                    {erFødt ||
                                        (erAdoptert && (
                                            <FormattedMessage
                                                id="fødselsdatoIkontekst"
                                                values={{
                                                    mnd: barnehagestartDato(barnet),
                                                    dato: termindatoEllerFødselsdato(barnet),
                                                }}
                                            />
                                        ))}
                                    {erIkkeFødt && (
                                        <FormattedMessage
                                            id="termindatoIkontekst"
                                            values={{
                                                mnd: barnehagestartDato(barnet),
                                                dato: termindatoEllerFødselsdato(barnet),
                                            }}
                                        />
                                    )}
                                </BodyShort>
                            </HStack>
                        </div>
                    </VStack>
                </VStack>

                <VStack gap="10">
                    <VStack gap="2">
                        <Kalender />
                    </VStack>
                </VStack>

                <VStack gap="10">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </VStack>
        </PlanleggerPage>
    );
};

export default OversiktSteg;
