import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { AppName, Arbeidsforhold, ArbeidsforholdOgInntekt } from '@navikt/fp-types';
import { ProgressStep, Step, StepButtons } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

import { ArbeidsforholdInformasjon } from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import { BrukerKanIkkeSøke } from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import { HvemKanDriveMedEgenNæring } from './components/hvem-kan-drive-egen-næring/HvemKanDriveMedEgenNæring';
import { HvemKanVæreFrilanser } from './components/hvem-kan-være-frilanser/HvemKanVæreFrilanser';
import { InfoOmArbeidIUtlandet } from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import { InfoOmFørstegangstjeneste } from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { InfoTilFiskere } from './components/info-til-fiskere/InfoTilFiskere';

interface Props<TYPE> {
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntekt;
    aktiveArbeidsforhold: Arbeidsforhold[];
    saveOnNext: (formValues: ArbeidsforholdOgInntekt) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    stønadstype: AppName;
}

export const ArbeidsforholdOgInntektPanel = <TYPE extends string>({
    arbeidsforholdOgInntekt,
    aktiveArbeidsforhold,
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

    const formMethods = useForm<ArbeidsforholdOgInntekt>({
        defaultValues: arbeidsforholdOgInntekt,
    });

    const hattInntektSomFrilans = formMethods.watch('harJobbetSomFrilans');
    const hattInntektSomNæringsdrivende = formMethods.watch('harJobbetSomSelvstendigNæringsdrivende');

    const kanIkkeSøke =
        aktiveArbeidsforhold.length === 0 && hattInntektSomFrilans === false && hattInntektSomNæringsdrivende === false;

    const erSvp = stønadstype === 'Svangerskapspenger';

    return (
        <Step
            onCancel={cancelApplication}
            steps={stepConfig}
            onContinueLater={onContinueLater}
            onStepChange={onStepChange}
        >
            <RhfForm
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
                    <VStack gap="2">
                        <BodyShort style={{ fontWeight: 'bold' }}>
                            <FormattedMessage id="inntektsinformasjon.arbeidsforhold.label" />
                        </BodyShort>
                        <ArbeidsforholdInformasjon arbeidsforhold={aktiveArbeidsforhold} />
                        <ReadMore
                            header={
                                <FormattedMessage
                                    id="inntektsinformasjon.inntektsmelding.header"
                                    values={{ antall: aktiveArbeidsforhold.length }}
                                />
                            }
                        >
                            <FormattedMessage
                                id="inntektsinformasjon.inntektsmelding.body"
                                values={{ antall: aktiveArbeidsforhold.length }}
                            />
                        </ReadMore>
                    </VStack>
                    <VStack gap="1">
                        <RhfRadioGroup
                            name="harJobbetSomFrilans"
                            label={intl.formatMessage({ id: 'inntektsinformasjon.harDuJobbetSomFrilans' }, { erSvp })}
                            validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.frilans.påkrevd' }))]}
                            description={
                                erSvp &&
                                intl.formatMessage({
                                    id: 'inntektsinformasjon.beskrivelse',
                                })
                            }
                        >
                            <Radio value={false}>
                                <FormattedMessage id="inntektsinformasjon.nei" />
                            </Radio>
                            <Radio value={true}>
                                <FormattedMessage id="inntektsinformasjon.ja" />
                            </Radio>
                        </RhfRadioGroup>
                        <HvemKanVæreFrilanser />
                    </VStack>
                    <VStack gap="1">
                        <RhfRadioGroup
                            name="harJobbetSomSelvstendigNæringsdrivende"
                            label={intl.formatMessage(
                                {
                                    id: 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende',
                                },
                                { erSvp },
                            )}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.hattInntektSomNæringsdrivende.påkrevd' }),
                                ),
                            ]}
                            description={
                                erSvp &&
                                intl.formatMessage({
                                    id: 'inntektsinformasjon.beskrivelse',
                                })
                            }
                        >
                            <Radio value={false}>
                                <FormattedMessage id="inntektsinformasjon.nei" />
                            </Radio>
                            <Radio value={true}>
                                <FormattedMessage id="inntektsinformasjon.ja" />
                            </Radio>
                        </RhfRadioGroup>
                        <HvemKanDriveMedEgenNæring />
                    </VStack>
                    {erSvp && (
                        <VStack gap="1">
                            <RhfRadioGroup
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
                                <Radio value={false}>
                                    <FormattedMessage id="inntektsinformasjon.nei" />
                                </Radio>
                                <Radio value={true}>
                                    <FormattedMessage id="inntektsinformasjon.ja" />
                                </Radio>
                            </RhfRadioGroup>
                            <InfoOmArbeidIUtlandet />
                        </VStack>
                    )}
                    {!erSvp && (
                        <VStack gap="1">
                            <RhfRadioGroup
                                name="harHattAndreInntektskilder"
                                label={intl.formatMessage({ id: 'inntektsinformasjon.hattAndreInntektskilder' })}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'valideringsfeil.hattAndreInntektskilder.påkrevd' }),
                                    ),
                                ]}
                            >
                                <Radio value={false}>
                                    <FormattedMessage id="inntektsinformasjon.nei" />
                                </Radio>
                                <Radio value={true}>
                                    <FormattedMessage id="inntektsinformasjon.ja" />
                                </Radio>
                            </RhfRadioGroup>
                            <ReadMore
                                onOpenChange={(open) =>
                                    loggAmplitudeEvent({
                                        origin: stønadstype,
                                        eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                        eventData: {
                                            tittel: 'ArbeidsforholdOgInntektPanel.ReadMore.Header.AndreInntektskilder',
                                        },
                                    })
                                }
                                header={intl.formatMessage({
                                    id: 'ArbeidsforholdOgInntektPanel.ReadMore.Header.AndreInntektskilder',
                                })}
                            >
                                <BodyShort>
                                    <FormattedMessage id="ArbeidsforholdOgInntektPanel.ReadMore.Body.AndreInntektskilder" />
                                </BodyShort>
                            </ReadMore>
                        </VStack>
                    )}
                    <VStack gap="4">
                        {erSvp && <InfoOmFørstegangstjeneste />}
                        <InfoTilFiskere />
                    </VStack>
                    {erSvp && kanIkkeSøke && <BrukerKanIkkeSøke />}
                    <StepButtons
                        isNextButtonVisible={!erSvp || (erSvp && !kanIkkeSøke)}
                        isDisabledAndLoading={isSubmitting}
                        goToPreviousStep={goToPreviousStep}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
