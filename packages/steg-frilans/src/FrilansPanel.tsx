import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { DATE_20_YEARS_AGO, DATE_TODAY } from '@navikt/fp-constants';
import {
    ErrorSummaryHookForm,
    RhfDatepicker,
    RhfForm,
    RhfRadioGroup,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { Frilans } from '@navikt/fp-types';
import { ProgressStep, Step } from '@navikt/fp-ui';
import { isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

interface Props<TYPE> {
    frilans?: Frilans;
    saveOnNext: (formValues: Frilans) => void;
    saveOnPrevious: (formValues: Frilans | undefined) => void;
    onAvsluttOgSlett: () => void;
    onFortsettSenere?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
}

export const FrilansPanel = <TYPE extends string>({
    frilans,
    saveOnNext,
    saveOnPrevious,
    onAvsluttOgSlett,
    onFortsettSenere,
    onStepChange,
    goToPreviousStep,
    stepConfig,
}: Props<TYPE>) => {
    const intl = useIntl();

    const formMethods = useForm<Frilans>({
        defaultValues: frilans,
    });

    return (
        <Step steps={stepConfig} onStepChange={onStepChange}>
            <RhfForm formMethods={formMethods} onSubmit={saveOnNext}>
                <VStack gap="space-40">
                    <ErrorSummaryHookForm />
                    <RhfDatepicker
                        name="oppstart"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'FrilansPanel.Oppstart' })}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'FrilansPanel.Valideringsfeil.FraOgMedDato.Påkrevd' })),
                            isValidDate(
                                intl.formatMessage({ id: 'FrilansPanel.Valideringsfeil.FraOgMedDato.GyldigDato' }),
                            ),
                            isBeforeTodayOrToday(
                                intl.formatMessage({ id: 'FrilansPanel.Valideringsfeil.FraOgMedDato.ErIFremtiden' }),
                            ),
                        ]}
                        maxDate={DATE_TODAY}
                        minDate={DATE_20_YEARS_AGO}
                        showMonthAndYearDropdowns
                    />
                    <RhfRadioGroup
                        name="jobberFremdelesSomFrilans"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'FrilansPanel.JobberFremdelesSomFrilans' })}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'FrilansPanel.Valideringsfeil.JobberFremdelesSomFrilans.Påkrevd',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="FrilansPanel.JobberFremdelesSomFrilans.Ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="FrilansPanel.JobberFremdelesSomFrilans.Nei" />
                        </Radio>
                    </RhfRadioGroup>
                    <StepButtonsHookForm<Frilans>
                        onAvsluttOgSlett={onAvsluttOgSlett}
                        onFortsettSenere={onFortsettSenere}
                        goToPreviousStep={goToPreviousStep}
                        saveDataOnPreviousClick={saveOnPrevious}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
