import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { PlanleggerRoutes } from 'appData/routes';
import { isAlene } from 'types/HvemPlanlegger';
import Aleneforsørger from './situasjon/Aleneforsørger';
import FlereForsørgere from './situasjon/FlereForsørgere';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import Hjerte from 'components/ikoner/Hjerte';
import RosaSirkel from 'components/ikoner/RosaSirkel';
import { PeriodeEnum } from 'types/Periode';
import { erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import Kalender from './Kalender';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
dayjs.locale('nb');

const barnehagestartDato = () => {
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    if (erFødt || erIkkeFødt) {
        const dato = erIkkeFødt ? barnet.termindato : barnet.fødselsdato;

        if (dayjs(dato).month() < 8) return dayjs(dato).format('MMMM');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM');
    }
    return undefined;
};
const OversiktSteg = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const valgtPeriode = notEmpty(useContextGetData(ContextDataType.PERIODE));

    return (
        <ContentWrapper>
            <VStack gap="10">
                {!isAlene(hvemPlanlegger) && <FlereForsørgere />}
                {isAlene(hvemPlanlegger) && <Aleneforsørger />}
                <VStack gap="2">
                    <HStack gap="32">
                        <HStack gap="5" align="center">
                            <BlåSirkel />
                            <BodyShort>
                                {valgtPeriode.periode === PeriodeEnum.HUNDRE && (
                                    <FormattedMessage id="ukerForeldrepenger.100" />
                                )}
                                {valgtPeriode.periode === PeriodeEnum.ÅTTI && (
                                    <FormattedMessage id="ukerForeldrepenger.80" />
                                )}
                            </BodyShort>
                        </HStack>

                        <HStack gap="5" align="center">
                            <Hjerte />
                            <BodyShort>
                                <FormattedMessage id="termindatoIkontekst" />
                            </BodyShort>
                        </HStack>
                    </HStack>

                    <HStack gap="4">
                        <HStack gap="5" align="center">
                            <RosaSirkel />
                            <BodyShort>
                                <FormattedMessage id="barnehagestartIkontekst" values={{ mnd: barnehagestartDato() }} />
                            </BodyShort>
                        </HStack>
                    </HStack>
                </VStack>
                <VStack gap="10">
                    <VStack gap="2">
                        <Kalender />
                    </VStack>
                </VStack>

                <VStack gap="10" className="button-wrapper content-wrapper">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OPPSUMMERING)}
                        nextButtonText="Tilpass plan"
                        previousButtonText="Tilbake"
                    />
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};

export default OversiktSteg;
