import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { Link, VStack, Radio, ExpansionCard, BodyLong, Heading, HStack, BodyShort } from '@navikt/ds-react';
import { Form, ErrorSummaryHookForm, RadioGroupPanel, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { useFormValidators } from '@navikt/fp-validation';
import { links } from '@navikt/fp-constants';

import { Utenlandsopphold } from 'types/Utenlandsopphold';
import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateSaveFn, useEsStateData } from 'appData/EsDataContext';
import useStepData from 'appData/useStepData';

const UtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();
    const { isRequired } = useFormValidators();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const lagreUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD);
    const lagreUtenlandsoppholdPerioder = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_PERIODER);

    const formMethods = useForm<Utenlandsopphold>({
        defaultValues: utenlandsopphold,
    });

    const lagre = useCallback((formValues: Utenlandsopphold) => {
        lagreUtenlandsopphold(formValues);

        if (formValues.harKunBoddINorge) {
            lagreUtenlandsoppholdPerioder(undefined);
        }

        navigator.goToNextStep(formValues.harKunBoddINorge ? Path.OPPSUMMERING : Path.UTENLANDSOPPHOLD_PERIODER);
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <BodyLong>
                        <FormattedMessage id="utenlandsopphold.info" />
                    </BodyLong>
                    <RadioGroupPanel
                        name="harKunBoddINorge"
                        label={<FormattedMessage id="UtenlandsoppholdSteg.Periode.Spørsmål" />}
                        validate={[isRequired('UtenlandsoppholdSteg.Siste12Måneder.IsRequired')]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="UtenlandsoppholdSteg.BoddIUtlandet" />
                        </Radio>
                    </RadioGroupPanel>
                    <ExpansionCard
                        size="small"
                        aria-label={intl.formatMessage({ id: 'utenlandsopphold.stotteFraNav' })}
                    >
                        <ExpansionCard.Header>
                            <ExpansionCard.Title size="small">
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
                                    <HStack gap="1">
                                        <BodyShort>
                                            <FormattedMessage id="utenlandsopphold.info.del6" />
                                        </BodyShort>
                                        <BodyShort>
                                            <Link href={links.foreldrepengerUtland}>nav.no/foreldrepenger#utland</Link>
                                        </BodyShort>
                                    </HStack>
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
