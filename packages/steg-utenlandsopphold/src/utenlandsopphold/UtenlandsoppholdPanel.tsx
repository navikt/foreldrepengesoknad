import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Utenlandsopphold } from '@navikt/fp-types';
import { ProgressStep, Step } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

import { HjelpeTekstES } from './HjelpeTekstES';
import { HjelpeTekstFelles } from './HjelpeTekstFelles';

interface Props<TYPE> {
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

export const UtenlandsoppholdPanel = <TYPE extends string>({
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
                        control={formMethods.control}
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
                        control={formMethods.control}
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
                    {stønadstype === 'Engangsstønad' ? (
                        <HjelpeTekstES />
                    ) : (
                        <HjelpeTekstFelles stonadstype={stønadstype} />
                    )}
                    <StepButtonsHookForm<Utenlandsopphold>
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={saveOnPrevious}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
