import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { Link, VStack, Radio, ExpansionCard, BodyLong, Heading, HStack } from '@navikt/ds-react';

import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import { isRequired } from 'fpcommon/validering/valideringsregler';
import { Utenlandsopphold } from 'types/Utenlandsopphold';
import StepButtons from 'fpcommon/components/StepButtons';
import useEsNavigator, { Path } from '../../../useEsNavigator';
import { EsDataType, useEsStateSaveFn, useEsStateData } from '../../../EsDataContext';
import { useCallback } from 'react';

export type FormValues = Utenlandsopphold;

const utledNesteSide = (formValues: FormValues): Path => {
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        return Path.SISTE_UTENLANDSOPPHOLD;
    }
    return formValues?.skalBoUtenforNorgeNeste12Mnd ? Path.NESTE_UTENLANDSOPPHOLD : Path.OPPSUMMERING;
};

const utledAlleUtenlandssiderSomSkalVises = (formValues: FormValues): Path[] => {
    const paths = [];
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        paths.push(Path.SISTE_UTENLANDSOPPHOLD);
    }
    if (formValues?.skalBoUtenforNorgeNeste12Mnd) {
        paths.push(Path.NESTE_UTENLANDSOPPHOLD);
    }
    return paths;
};

const UtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const navigator = useEsNavigator();
    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const lagreUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD);

    const formMethods = useForm<FormValues>({
        defaultValues: utenlandsopphold,
    });

    const lagre = useCallback((formValues: FormValues) => {
        lagreUtenlandsopphold(formValues);
        navigator.goToNextStep(utledNesteSide(formValues), utledAlleUtenlandssiderSomSkalVises(formValues));
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}
            onCancel={navigator.avbrytSøknad}
            steps={navigator.pageInfo.stepConfig}
            activeStepId={navigator.pageInfo.activeStepId}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagre)}>
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
                        <StepButtons goToPreviousStep={navigator.goToPreviousDefaultStep} />
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default UtenlandsoppholdSteg;
