import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Radio, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, RadioGroup } from '@navikt/fp-form-hooks';
import { AppName, Arbeidsforhold } from '@navikt/fp-types';
import { ProgressStep, Step, StepButtons } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import BrukerKanIkkeSøke from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import HvemKanDriveMedEgenNæring from './components/hvem-kan-drive-egen-næring/HvemKanDriveMedEgenNæring';
import HvemKanVæreFrilanser from './components/hvem-kan-være-frilanser/HvemKanVæreFrilanser';
import InfoOmArbeidIUtlandet from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import InfoOmFørstegangstjeneste from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import { Inntektsinformasjon } from './types/Inntektsinformasjon';

dayjs.extend(isSameOrAfter);

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], termindato?: string): Arbeidsforhold[] => {
    if (termindato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.filter((arb) =>
        arb.tom ? dayjs(arb.tom).isSameOrAfter(dayjs(termindato).subtract(9, 'months'), 'day') : true,
    );
};

interface Props<TYPE> {
    inntektsinformasjon?: Inntektsinformasjon;
    arbeidsforhold: Arbeidsforhold[];
    termindato?: string;
    saveOnNext: (formValues: Inntektsinformasjon) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    stønadstype: AppName;
}

const ArbeidsforholdOgInntektPanel = <TYPE extends string>({
    inntektsinformasjon,
    arbeidsforhold,
    termindato,
    saveOnNext,
    cancelApplication,
    onContinueLater,
    onStepChange,
    goToPreviousStep,
    stepConfig,
    stønadstype,
}: Props<TYPE>) => {
    const intl = useIntl();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, termindato);

    const formMethods = useForm<Inntektsinformasjon>({
        defaultValues: inntektsinformasjon,
    });

    const hattInntektSomFrilans = formMethods.watch('harJobbetSomFrilans');
    const hattInntektSomNæringsdrivende = formMethods.watch('harJobbetSomSelvstendigNæringsdrivende');

    const kanIkkeSøke =
        arbeidsforhold.length === 0 && hattInntektSomFrilans === false && hattInntektSomNæringsdrivende === false;

    return (
        <Step
            onCancel={cancelApplication}
            steps={stepConfig}
            onContinueLater={onContinueLater}
            onStepChange={onStepChange}
        >
            <Form
                formMethods={formMethods}
                onSubmit={(values) => {
                    setIsSubmitting(true);
                    saveOnNext(values);
                }}
            >
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV" />
                    </BodyShort>
                    <div>
                        <BodyShort style={{ fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
                        </BodyShort>
                        <ArbeidsforholdInformasjon arbeidsforhold={aktiveArbeidsforhold} />
                    </div>
                    <div>
                        <RadioGroup
                            name="harJobbetSomFrilans"
                            label={intl.formatMessage({ id: 'inntektsinformasjon.harDuJobbetSomFrilans' })}
                            validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.frilans.påkrevd' }))]}
                            description={intl.formatMessage({
                                id: 'inntektsinformasjon.beskrivelse',
                            })}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="inntektsinformasjon.ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="inntektsinformasjon.nei" />
                            </Radio>
                        </RadioGroup>
                        <HvemKanVæreFrilanser />
                    </div>
                    <div>
                        <RadioGroup
                            name="harJobbetSomSelvstendigNæringsdrivende"
                            label={intl.formatMessage({
                                id: 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende',
                            })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.hattInntektSomNæringsdrivende.påkrevd' }),
                                ),
                            ]}
                            description={intl.formatMessage({
                                id: 'inntektsinformasjon.beskrivelse',
                            })}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="inntektsinformasjon.ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="inntektsinformasjon.nei" />
                            </Radio>
                        </RadioGroup>
                        <HvemKanDriveMedEgenNæring />
                    </div>
                    {stønadstype === 'Svangerskapspenger' && (
                        <div>
                            <RadioGroup
                                name="harHattArbeidIUtlandet"
                                label={intl.formatMessage({ id: 'inntektsinformasjon.hattArbeidIUtlandet' })}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'valideringsfeil.hattArbeidIUtlandet.påkrevd' }),
                                    ),
                                ]}
                                description={intl.formatMessage({
                                    id: 'inntektsinformasjon.beskrivelse',
                                })}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="inntektsinformasjon.ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="inntektsinformasjon.nei" />
                                </Radio>
                            </RadioGroup>
                            <InfoOmArbeidIUtlandet />
                        </div>
                    )}
                    <VStack gap="4">
                        <InfoOmFørstegangstjeneste />
                        <InfoTilFiskere />
                    </VStack>
                    {kanIkkeSøke && <BrukerKanIkkeSøke />}
                    <StepButtons
                        isNexButtonVisible={!kanIkkeSøke}
                        isDisabledAndLoading={isSubmitting}
                        goToPreviousStep={goToPreviousStep}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default ArbeidsforholdOgInntektPanel;
