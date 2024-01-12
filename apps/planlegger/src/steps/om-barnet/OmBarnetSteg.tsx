import { FormattedMessage, useIntl } from 'react-intl';
import { Block } from '@navikt/fp-common';
import { ContentWrapper } from '@navikt/fp-ui';
import { Heading, Radio, VStack } from '@navikt/ds-react';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { useForm } from 'react-hook-form';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { Barnet, BarnetEnum } from '../../types/Barnet';
import { Datepicker, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import dayjs from 'dayjs';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';
import { PlanleggerRoutes } from 'appData/routes';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';

const OmBarnetSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const formMethods = useForm({ defaultValues: omBarnet });
    const intl = useIntl();

    const barnet = formMethods.watch('barnet');
    const erFødt = formMethods.watch('erFødt');

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
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="barnet.hvaGjelder" />
                            </Heading>
                            <RadioGroup name="barnet">
                                <Radio value={BarnetEnum.FØDSEL}>
                                    <FormattedMessage id="barnet.fødsel" />
                                </Radio>
                                <Radio value={BarnetEnum.ADOPSJON}>
                                    <FormattedMessage id="barnet.adopsjon" />
                                </Radio>
                            </RadioGroup>
                        </VStack>
                    </VStack>
                    {barnet === BarnetEnum.FØDSEL && (
                        <VStack gap="10">
                            <Heading size="small">
                                <FormattedMessage id="barnet.erFødt" />
                            </Heading>
                            <RadioGroup name="erFødt">
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
                        <VStack gap="10">
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
                                    isValidDate(intl.formatMessage({ id: 'TODO.FødselPanel.Fødselsdato.Gyldig' })),
                                    isBeforeTodayOrToday(
                                        intl.formatMessage({
                                            id: 'TODO.FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere',
                                        }),
                                    ),
                                    isAfterOrSameAsSixMonthsAgo(
                                        intl.formatMessage({
                                            id: 'TODO.FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake',
                                        }),
                                    ),
                                ]}
                            />
                        </VStack>
                    )}
                    {erFødt === false && (
                        <VStack gap="10">
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
                                    isValidDate(intl.formatMessage({ id: 'TODO.FødselPanel.Termindato.Gyldig' })),
                                    isLessThanThreeWeeksAgo(
                                        intl.formatMessage({
                                            id: 'TODO.FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag',
                                        }),
                                    ),
                                    erI22SvangerskapsukeEllerSenere(
                                        intl.formatMessage({ id: 'TODO.FødselPanel.Termindato.DuMåVæreIUke22' }),
                                    ),
                                ]}
                            />
                        </VStack>
                    )}
                    <HvorforSpørViOmDette />

                    <Block margin="xxl" className="button-wrapper content-wrapper">
                        <StepButtonsHookForm<Barnet>
                            saveDataOnPreviousClick={lagreOmBarnet}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonText="Neste"
                            previousButtonText="Tilbake"
                        />
                    </Block>
                </VStack>
            </Form>
        </ContentWrapper>
    );
};

export default OmBarnetSteg;
