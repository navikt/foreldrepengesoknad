import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, BodyShort, ExpansionCard, HStack, Heading, Link, Radio, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Utenlandsopphold } from '@navikt/fp-types';
import { ProgressStep, Step } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

export interface Props<TYPE> {
    utenlandsopphold?: Utenlandsopphold;
    saveOnNext: (formValues: Utenlandsopphold) => void;
    saveOnPrevious: (formValues: Utenlandsopphold | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    stønadstype: 'Engangsstønad' | 'Foreldrepenger' | 'Svangerskapspenger';
}

const UtenlandsoppholdPanel = <TYPE extends string>({
    utenlandsopphold,
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    onStepChange,
    goToPreviousStep,
    stepConfig,
    stønadstype,
}: Props<TYPE>) => {
    const intl = useIntl();

    const formMethods = useForm<Utenlandsopphold>({
        defaultValues: utenlandsopphold,
    });

    return (
        <Step
            steps={stepConfig}
            onCancel={cancelApplication}
            onContinueLater={onContinueLater}
            onStepChange={onStepChange}
        >
            <RhfForm formMethods={formMethods} onSubmit={saveOnNext}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RhfRadioGroup
                        name="harBoddUtenforNorgeSiste12Mnd"
                        label={<FormattedMessage id="UtenlandsoppholdSteg.Siste12Måneder.Spørsmål" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'UtenlandsoppholdSteg.Siste12Måneder.IsRequired' })),
                        ]}
                    >
                        <Radio value={false}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge" />
                        </Radio>
                        <Radio value={true}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet" />
                        </Radio>
                    </RhfRadioGroup>
                    <RhfRadioGroup
                        name="skalBoUtenforNorgeNeste12Mnd"
                        label={<FormattedMessage id="UtenlandsoppholdSteg.Neste12Måneder.Spørsmål" />}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'UtenlandsoppholdSteg.Neste12Måneder.IsRequired' })),
                        ]}
                    >
                        <Radio value={false}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge" />
                        </Radio>
                        <Radio value={true}>
                            <FormattedMessage id="UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet" />
                        </Radio>
                    </RhfRadioGroup>
                    <ExpansionCard
                        size="small"
                        aria-label={intl.formatMessage({ id: 'UtenlandsoppholdSteg.StotteFraNav' })}
                    >
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
                                    <Heading size="small" level="4">
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
                                            {stønadstype === 'Engangsstønad' && (
                                                <Link href={links.engangsstonadHvem} target="_blank">
                                                    <FormattedMessage id="UtenlandsoppholdSteg.Info.Del7.es" />
                                                </Link>
                                            )}
                                            {stønadstype === 'Foreldrepenger' && (
                                                <Link href={links.foreldrepengerUtland} target="_blank">
                                                    <FormattedMessage id="UtenlandsoppholdSteg.Info.Del7.fp" />
                                                </Link>
                                            )}
                                            {stønadstype === 'Svangerskapspenger' && (
                                                <Link href={links.svangerskapspengerUtland} target="_blank">
                                                    <FormattedMessage id="UtenlandsoppholdSteg.Info.Del7.svp" />
                                                </Link>
                                            )}
                                        </BodyShort>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </ExpansionCard.Content>
                    </ExpansionCard>
                    <StepButtonsHookForm<Utenlandsopphold>
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={saveOnPrevious}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};

export default UtenlandsoppholdPanel;
