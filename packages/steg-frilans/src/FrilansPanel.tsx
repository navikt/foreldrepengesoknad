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

type FrilansFormValues = {
    oppstart: string;
    jobberFremdelesSomFrilans?: boolean;
    tom?: string;
};

interface Props<TYPE> {
    frilans?: Frilans;
    saveOnNext: (formValues: Frilans) => void;
    onAvsluttOgSlett: () => void;
    onFortsettSenere?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
}

export const FrilansPanel = <TYPE extends string>({
    frilans,
    saveOnNext,
    onAvsluttOgSlett,
    onFortsettSenere,
    onStepChange,
    goToPreviousStep,
    stepConfig,
}: Props<TYPE>) => {
    const intl = useIntl();

    const formMethods = useForm<FrilansFormValues>({
        defaultValues: {
            oppstart: frilans?.oppstart,
            jobberFremdelesSomFrilans: frilans ? !frilans.tom : undefined,
            tom: frilans?.tom,
        },
    });

    const jobberFremdeles = formMethods.watch('jobberFremdelesSomFrilans');

    const onSubmit = (values: FrilansFormValues) => {
        saveOnNext({
            oppstart: values.oppstart,
            tom: values.jobberFremdelesSomFrilans ? undefined : values.tom,
        });
    };

    return (
        <Step steps={stepConfig} onStepChange={onStepChange}>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
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
                    {jobberFremdeles === false && (
                        <RhfDatepicker
                            name="tom"
                            control={formMethods.control}
                            label={intl.formatMessage({ id: 'FrilansPanel.SluttetDato' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'FrilansPanel.Valideringsfeil.TilOgMedDato.Påkrevd' }),
                                ),
                                isValidDate(
                                    intl.formatMessage({ id: 'FrilansPanel.Valideringsfeil.TilOgMedDato.GyldigDato' }),
                                ),
                                isBeforeTodayOrToday(
                                    intl.formatMessage({
                                        id: 'FrilansPanel.Valideringsfeil.TilOgMedDato.ErIFremtiden',
                                    }),
                                ),
                            ]}
                            maxDate={DATE_TODAY}
                            minDate={DATE_20_YEARS_AGO}
                            showMonthAndYearDropdowns
                        />
                    )}
                    <StepButtonsHookForm<FrilansFormValues>
                        onAvsluttOgSlett={onAvsluttOgSlett}
                        onFortsettSenere={onFortsettSenere}
                        goToPreviousStep={goToPreviousStep}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
