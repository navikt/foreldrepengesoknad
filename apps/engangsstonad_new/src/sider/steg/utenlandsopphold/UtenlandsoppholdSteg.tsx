import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { Link, VStack, Radio, ExpansionCard, BodyLong, Heading, HStack } from '@navikt/ds-react';

import Form from 'fpcommon/form/Form';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import { isRequired } from 'fpcommon/validering/valideringsregler';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import { Utenlandsopphold } from 'types/Utenlandsopphold';
import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateSaveFn, useEsStateData } from 'appData/EsDataContext';
import useStepData from 'appData/useStepData';

const utledNesteSide = (formValues: Utenlandsopphold): Path => {
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        return Path.SISTE_UTENLANDSOPPHOLD;
    }
    return formValues?.skalBoUtenforNorgeNeste12Mnd ? Path.NESTE_UTENLANDSOPPHOLD : Path.OPPSUMMERING;
};

const UtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();
    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const lagreUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD);
    const lagreSisteUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SISTE);
    const lagreNesteUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_NESTE);

    const formMethods = useForm<Utenlandsopphold>({
        defaultValues: utenlandsopphold,
    });

    const lagre = useCallback((formValues: Utenlandsopphold) => {
        lagreUtenlandsopphold(formValues);

        if (!formValues.harBoddUtenforNorgeSiste12Mnd) {
            lagreSisteUtenlandsopphold(undefined);
        }
        if (!formValues.skalBoUtenforNorgeNeste12Mnd) {
            lagreNesteUtenlandsopphold(undefined);
        }
        navigator.goToNextStep(utledNesteSide(formValues));
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RadioGroupPanel
                        name="harBoddUtenforNorgeSiste12Mnd"
                        label={<FormattedMessage id="utenlandsopphold.siste12Måneder.spørsmål" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'utenlandsopphold.siste12Måneder.isRequired' })),
                        ]}
                    >
                        <Radio value={false}>
                            <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge" />
                        </Radio>
                        <Radio value={true}>
                            <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet" />
                        </Radio>
                    </RadioGroupPanel>
                    <RadioGroupPanel
                        name="skalBoUtenforNorgeNeste12Mnd"
                        label={<FormattedMessage id="utenlandsopphold.neste12Måneder.spørsmål" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'utenlandsopphold.neste12Måneder.isRequired' })),
                        ]}
                    >
                        <Radio value={false}>
                            <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge" />
                        </Radio>
                        <Radio value={true}>
                            <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet" />
                        </Radio>
                    </RadioGroupPanel>
                    <ExpansionCard
                        size="small"
                        aria-label={intl.formatMessage({ id: 'utenlandsopphold.stotteFraNav' })}
                    >
                        <ExpansionCard.Header>
                            <ExpansionCard.Title>
                                <FormattedMessage id="utenlandsopphold.stotteFraNav" />
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <VStack gap="10">
                                <VStack gap="5">
                                    <BodyLong>
                                        <FormattedMessage id="utenlandsopphold.info.del1" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="utenlandsopphold.info.del2" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="utenlandsopphold.info.del3" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="utenlandsopphold.info.del4" />
                                    </BodyLong>
                                </VStack>
                                <VStack gap="5">
                                    <Heading size="small">
                                        <FormattedMessage id="utenlandsopphold.info.undertittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="utenlandsopphold.info.del5" />
                                    </BodyLong>
                                    <BodyLong>
                                        <HStack gap="1">
                                            <FormattedMessage id="utenlandsopphold.info.del6" />
                                            <Link href="https://www.nav.no/foreldrepenger#utland">
                                                nav.no/foreldrepenger#utland
                                            </Link>
                                        </HStack>
                                    </BodyLong>
                                </VStack>
                            </VStack>
                        </ExpansionCard.Content>
                    </ExpansionCard>
                    <StepButtonsHookForm<Utenlandsopphold>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreUtenlandsopphold}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default UtenlandsoppholdSteg;
