import { Heading, Radio, VStack } from '@navikt/ds-react';
import { Datepicker, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isSameOrAfterToday } from '@navikt/fp-utils';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
    notEmpty,
} from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import HvorforSpørViOmDette from 'components/expansionCard/HvorforSpørViOmDette';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';
import Foreldrepengeinfo from './Foreldrepengeinfo';

import useStepData from 'appData/useStepData';
import GreenPanel from 'components/GreenPanel';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import styles from './omBarnetSteg.module.css';

const isLessThanThreeMonthsLeft = (termindato?: string) => {
    const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');
    if (termindato === undefined) {
        return false;
    }
    return isSameOrAfterToday(termindato) && dayjs(termindato).isBefore(DATO_3_MND_FRAM);
};

const OmBarnetSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();
    const formMethods = useForm<OmBarnet>();
    const intl = useIntl();

    const erFødsel = formMethods.watch('erFødsel');
    const erFødt = formMethods.watch('erBarnetFødt');
    const termindato = formMethods.watch('termindato');

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const lagreOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const lagre = (formValues: OmBarnet) => {
        lagreOmBarnet(formValues);
        return navigator.goToNextDefaultStep();
    };

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="10">
                        <VStack gap="1">
                            <GreenPanel>
                                <RadioGroup
                                    name="erFødsel"
                                    label={
                                        isAlene(hvemPlanlegger) ? (
                                            <FormattedMessage id="barnet.hvaGjelderDeg" />
                                        ) : (
                                            <FormattedMessage id="barnet.hvaGjelder" />
                                        )
                                    }
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
                            </GreenPanel>
                        </VStack>
                    </VStack>
                    {erFødsel && (
                        <VStack gap="1">
                            <Heading size="small">
                                <FormattedMessage id="barnet.erFødt" />
                            </Heading>
                            <GreenPanel>
                                <RadioGroup
                                    name="erBarnetFødt"
                                    validate={[
                                        isRequired(
                                            intl.formatMessage({
                                                id: 'feilmelding.fødselPanel.erBarnetFødt.duMåOppgi',
                                            }),
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
                            </GreenPanel>
                        </VStack>
                    )}
                    {erFødt && (
                        <VStack gap="1">
                            <div className={styles.greenPanel}>
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
                            </div>
                        </VStack>
                    )}
                    {erFødt === false && (
                        <VStack gap="10">
                            <div className={styles.greenPanel}>
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
                                            intl.formatMessage({
                                                id: 'feilmelding.fødselPanel.termindato.duMåVæreIUke22',
                                            }),
                                        ),
                                    ]}
                                />
                            </div>
                            {isLessThanThreeMonthsLeft(termindato) && (
                                <VStack gap="10">
                                    <Foreldrepengeinfo />
                                </VStack>
                            )}
                        </VStack>
                    )}
                    <VStack gap="20">
                        <HvorforSpørViOmDette text="TODO" />
                        <VStack>
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
        </PlanleggerPage>
    );
};

export default OmBarnetSteg;
