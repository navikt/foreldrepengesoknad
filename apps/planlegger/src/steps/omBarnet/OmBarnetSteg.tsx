import { FormattedMessage, useIntl } from 'react-intl';
import { ContentWrapper } from '@navikt/fp-ui';
import { Heading, Radio, VStack } from '@navikt/ds-react';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { useForm } from 'react-hook-form';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { Datepicker, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import dayjs from 'dayjs';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
    notEmpty,
} from '@navikt/fp-validation';
import { PlanleggerRoutes } from 'appData/routes';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import { isAlene } from 'types/HvemPlanlegger';
import { OmBarnet } from 'types/Barnet';

const OmBarnetSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const formMethods = useForm({ defaultValues: omBarnet });
    const intl = useIntl();

    const erFødsel = formMethods.watch('erFødsel');
    const erFødt = formMethods.watch('erBarnetFødt');

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const lagreOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const lagre = (formValues: any) => {
        lagreOmBarnet(formValues);
        navigator.goToNextStep(PlanleggerRoutes.BARNEHAGEPLASS);
    };

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="10">
                        <Heading size="large">
                            <FormattedMessage id="barnet.tittel" />
                        </Heading>
                        <VStack gap="1">
                            {isAlene(hvemPlanlegger) && (
                                <Heading size="small">
                                    <FormattedMessage id="barnet.hvaGjelderDeg" />
                                </Heading>
                            )}
                            {!isAlene(hvemPlanlegger) && (
                                <Heading size="small">
                                    <FormattedMessage id="barnet.hvaGjelder" />
                                </Heading>
                            )}
                            <RadioGroup
                                name="erFødsel"
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.fødselEllerAdopsjon.duMåOppgi',
                                        }),
                                    ),
                                ]}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="barnet.fødsel" />
                                </Radio>
                                <Radio value={false} disabled>
                                    <FormattedMessage id="barnet.adopsjon" />
                                </Radio>
                            </RadioGroup>
                        </VStack>
                    </VStack>
                    {erFødsel && (
                        <VStack gap="1">
                            <Heading size="small">
                                <FormattedMessage id="barnet.erFødt" />
                            </Heading>
                            <RadioGroup
                                name="erBarnetFødt"
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.erBarnetFødt.duMåOppgi' }),
                                    ),
                                ]}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="nei" />
                                </Radio>
                            </RadioGroup>
                        </VStack>
                    )}
                    {erFødt && (
                        <VStack gap="1">
                            <Heading size="small">
                                <FormattedMessage id="barnet.fødselsdato" />
                            </Heading>
                            <Datepicker
                                name="fødselsdato"
                                minDate={dayjs().subtract(6, 'month').toDate()}
                                maxDate={dayjs().toDate()}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.fødselsdato.duMåOppgi' }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.fødselsdato.gyldig' }),
                                    ),
                                    isBeforeTodayOrToday(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.fødselsdato.måVæreIdagEllerTidligere',
                                        }),
                                    ),
                                    isAfterOrSameAsSixMonthsAgo(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.fødselsdato.ikkeMerEnn6MånederTilbake',
                                        }),
                                    ),
                                ]}
                            />
                        </VStack>
                    )}
                    {erFødt === false && (
                        <VStack gap="1">
                            <Heading size="small">
                                <FormattedMessage id="barnet.termin" />
                            </Heading>
                            <Datepicker
                                name="termindato"
                                minDate={dayjs().subtract(3, 'week').toDate()}
                                maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.duMåOppgi' }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.gyldig' }),
                                    ),
                                    isLessThanThreeWeeksAgo(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.termindato.termindatoKanIkkeVære3UkerFraIdag',
                                        }),
                                    ),
                                    erI22SvangerskapsukeEllerSenere(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.duMåVæreIUke22' }),
                                    ),
                                ]}
                            />
                        </VStack>
                    )}
                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack className="button-wrapper content-wrapper">
                            <StepButtonsHookForm<OmBarnet>
                                saveDataOnPreviousClick={lagreOmBarnet}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                nextButtonText="Neste"
                                previousButtonText="Tilbake"
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </ContentWrapper>
    );
};

export default OmBarnetSteg;
