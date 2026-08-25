import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { InlineMessage, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm } from '@navikt/fp-form-hooks';
import {
    AppName,
    ArbeidsforholdOgInntekt,
    EksternArbeidsforholdDto_fpoversikt,
    NæringDto,
    SelvstendigNæringDto_fpoversikt,
} from '@navikt/fp-types';
import { ProgressStep, Step, StepButtons } from '@navikt/fp-ui';

import { LeggTilAndreInntekterWizard } from './components/andre-inntekter/LeggTilAndreInntekterWizard.tsx';
import { ArbeidsforholdInformasjon } from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import { BrukerKanIkkeSøke } from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import { InfoOmArbeidIUtlandet } from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import { InfoOmFørstegangstjeneste } from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { AndreInntektskilder, AndreInntektskilderUtkast, erFerdigUtfylt } from './types/AndreInntektskilder';

interface Props<TYPE> {
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntekt;
    aktiveArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
    selvstendigNæring: SelvstendigNæringDto_fpoversikt[];
    egenNæring?: NæringDto;
    andreInntektskilder: AndreInntektskilderUtkast[];
    saveOnNext: (formValues: ArbeidsforholdOgInntekt) => void;
    saveAndreInntektskilder: (values: AndreInntektskilder[]) => void;
    saveEgenNæring?: (value?: NæringDto) => void;
    onAvsluttOgSlett: () => void;
    onFortsettSenere?: () => void;
    onStepChange?: (id: TYPE) => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    appOrigin: AppName;
}

export const ArbeidsforholdOgInntektPanel = <TYPE extends string>({
    aktiveArbeidsforhold,
    frilansoppdrag,
    selvstendigNæring,
    egenNæring,
    andreInntektskilder,
    saveOnNext,
    saveAndreInntektskilder,
    saveEgenNæring,
    onAvsluttOgSlett,
    onFortsettSenere,
    onStepChange,
    goToPreviousStep,
    stepConfig,
    appOrigin,
}: Props<TYPE>) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formMethods = useForm();

    const ferdigeAndreInntektskilder = andreInntektskilder.filter(erFerdigUtfylt);

    const hattInntektSomFrilans = frilansoppdrag.length > 0;
    const hattInntektSomNæringsdrivende = selvstendigNæring.length > 0 || egenNæring !== undefined;
    const harAnnenInntekt = ferdigeAndreInntektskilder.length > 0;
    const kanIkkeSøke =
        aktiveArbeidsforhold.length === 0 &&
        !hattInntektSomFrilans &&
        !hattInntektSomNæringsdrivende &&
        !harAnnenInntekt;

    const erSvp = appOrigin === 'svangerskapspengesoknad';

    return (
        <Step steps={stepConfig} onStepChange={onStepChange}>
            <RhfForm
                formMethods={formMethods}
                onSubmit={() => {
                    setIsSubmitting(true);
                    const registrerteArbeidsforhold = {
                        harJobbetSomFrilans: hattInntektSomFrilans,
                        harJobbetSomSelvstendigNæringsdrivende: hattInntektSomNæringsdrivende,
                    };
                    saveOnNext(
                        erSvp
                            ? {
                                  ...registrerteArbeidsforhold,
                                  harHattArbeidIUtlandet: ferdigeAndreInntektskilder.some(
                                      (inntekt) => inntekt.type === 'JOBB_I_UTLANDET',
                                  ),
                              }
                            : registrerteArbeidsforhold,
                    );
                }}
            >
                <VStack gap="space-40">
                    <ErrorSummaryHookForm />
                    <InlineMessage status="info">
                        <FormattedMessage id="inntektsinformasjon.arbeidsforhold.utbetalingerFraNAV" />
                    </InlineMessage>
                    <VStack gap="space-8">
                        <ArbeidsforholdInformasjon
                            appOrigin={appOrigin}
                            arbeidsforhold={aktiveArbeidsforhold}
                            frilansoppdrag={frilansoppdrag}
                            selvstendigNæring={selvstendigNæring}
                            egenNæring={selvstendigNæring.length === 0 ? egenNæring : undefined}
                            andreInntektskilder={ferdigeAndreInntektskilder}
                            onRemoveAndreInntekt={(index) =>
                                saveAndreInntektskilder(
                                    ferdigeAndreInntektskilder.filter((_, currentIndex) => currentIndex !== index),
                                )
                            }
                            onRemoveEgenNæring={() => saveEgenNæring?.(undefined)}
                        />
                    </VStack>
                    <VStack gap="space-4">
                        <LeggTilAndreInntekterWizard
                            appOrigin={appOrigin}
                            harRegistrertNæring={selvstendigNæring.length > 0}
                            onSaveEgenNæring={saveEgenNæring}
                            onSaveAndreInntekt={(annenInntekt) =>
                                saveAndreInntektskilder([...ferdigeAndreInntektskilder, annenInntekt])
                            }
                        />
                        {erSvp && <InfoOmArbeidIUtlandet />}
                    </VStack>
                    <VStack gap="space-16">{erSvp && <InfoOmFørstegangstjeneste />}</VStack>
                    {erSvp && kanIkkeSøke && <BrukerKanIkkeSøke />}
                    <StepButtons
                        onFortsettSenere={onFortsettSenere}
                        onAvsluttOgSlett={onAvsluttOgSlett}
                        isNextButtonVisible={!erSvp || (erSvp && !kanIkkeSøke)}
                        isDisabledAndLoading={isSubmitting}
                        goToPreviousStep={goToPreviousStep}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
