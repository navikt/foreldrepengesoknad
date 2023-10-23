import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { Link, VStack, Radio, ExpansionCard, BodyLong, Heading, HStack, BodyShort } from '@navikt/ds-react';
import { Form, ErrorSummaryHookForm, RadioGroupPanel, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { links } from '@navikt/fp-constants';

import { Utenlandsopphold } from 'types/Utenlandsopphold';
import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateSaveFn, useEsStateData } from 'appData/EsDataContext';
import useStepData from 'appData/useStepData';
import { useCustomIntl } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

const utledNesteSide = (formValues: Utenlandsopphold): Path => {
    if (formValues?.harBoddUtenforNorgeSiste12Mnd) {
        return Path.TIDLIGERE_UTENLANDSOPPHOLD;
    }
    return formValues?.skalBoUtenforNorgeNeste12Mnd ? Path.SENERE_UTENLANDSOPPHOLD : Path.OPPSUMMERING;
};

const UtenlandsoppholdSteg: React.FunctionComponent = () => {
    const { i18n } = useCustomIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const lagreUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD);
    const lagreTidligereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreSenereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SENERE);

    const formMethods = useForm<Utenlandsopphold>({
        defaultValues: utenlandsopphold,
    });

    const lagre = useCallback((formValues: Utenlandsopphold) => {
        lagreUtenlandsopphold(formValues);

        if (!formValues.harBoddUtenforNorgeSiste12Mnd) {
            lagreTidligereUtenlandsopphold(undefined);
        }
        if (!formValues.skalBoUtenforNorgeNeste12Mnd) {
            lagreSenereUtenlandsopphold(undefined);
        }

        navigator.goToNextStep(utledNesteSide(formValues));
    }, []);

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            pageTitle={i18n('UtenlandsoppholdSteg.Utenlandsopphold')}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <BodyLong>
                        <FormattedMessage id="UtenlandsoppholdSteg.Info" />
                    </BodyLong>
                    <RadioGroupPanel
                        name="harBoddUtenforNorgeSiste12Mnd"
                        label={<FormattedMessage id="UtenlandsoppholdSteg.Siste12Måneder.Spørsmål" />}
                        validate={[isRequired(i18n('UtenlandsoppholdSteg.Siste12Måneder.IsRequired'))]}
                    >
                        <Radio value={false}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge" />
                        </Radio>
                        <Radio value={true}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet" />
                        </Radio>
                    </RadioGroupPanel>
                    <RadioGroupPanel
                        name="skalBoUtenforNorgeNeste12Mnd"
                        label={<FormattedMessage id="UtenlandsoppholdSteg.Neste12Måneder.Spørsmål" />}
                        validate={[isRequired(i18n('UtenlandsoppholdSteg.Neste12Måneder.IsRequired'))]}
                    >
                        <Radio value={false}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge" />
                        </Radio>
                        <Radio value={true}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet" />
                        </Radio>
                    </RadioGroupPanel>
                    <ExpansionCard size="small" aria-label={i18n('UtenlandsoppholdSteg.StotteFraNav')}>
                        <ExpansionCard.Header>
                            <ExpansionCard.Title size="small">
                                <FormattedMessage id="UtenlandsoppholdSteg.StotteFraNav" />
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <VStack gap="10">
                                <VStack gap="5">
                                    <BodyLong>
                                        <FormattedMessage id="UtenlandsoppholdSteg.Info.Del1" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="UtenlandsoppholdSteg.Info.Del2" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="UtenlandsoppholdSteg.Info.Del3" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="UtenlandsoppholdSteg.Info.Del4" />
                                    </BodyLong>
                                </VStack>
                                <VStack gap="5">
                                    <Heading size="small">
                                        <FormattedMessage id="UtenlandsoppholdSteg.Info.Undertittel" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage id="UtenlandsoppholdSteg.Info.Del5" />
                                    </BodyLong>
                                    <HStack gap="1">
                                        <BodyShort>
                                            <FormattedMessage id="UtenlandsoppholdSteg.Info.Del6" />
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
