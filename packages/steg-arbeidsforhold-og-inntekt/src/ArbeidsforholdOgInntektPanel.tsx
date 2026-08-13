import { BankNoteIcon, BoatIcon, PersonEnvelopeIcon, TasklistIcon } from '@navikt/aksel-icons';
import { type ReactNode, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, ExpansionCard, InlineMessage, Label, Link, Radio, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { loggUmamiEvent } from '@navikt/fp-observability';
import { AppName, ArbeidsforholdOgInntekt, EksternArbeidsforholdDto_fpoversikt, NæringDto } from '@navikt/fp-types';
import { ProgressStep, Step, StepButtons } from '@navikt/fp-ui';
import { isRequired } from '@navikt/fp-validation';

import { LeggTilAndreInntekterWizard } from './components/andre-inntekter/LeggTilAndreInntekterWizard.tsx';
import { ArbeidsforholdInformasjon } from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import { BrukerKanIkkeSøke } from './components/bruker-kan-ikke-søke/BrukerKanIkkeSøke';
import { InfoOmArbeidIUtlandet } from './components/info-om-arbeid-i-utlandet/InfoOmArbeidIUtlandet';
import { InfoOmFørstegangstjeneste } from './components/info-om-førstegangstjeneste/InfoOmFørstegangstjeneste';
import { InfoTilFiskere } from './components/info-til-fiskere/InfoTilFiskere';
import { AndreInntektskilder, AndreInntektskilderUtkast, erFerdigUtfylt } from './types/AndreInntektskilder';

interface Props<TYPE> {
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntekt;
    aktiveArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
    selvstendigNæring: EksternArbeidsforholdDto_fpoversikt[];
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

const Definisjon = ({ icon, tittel, children }: { icon: ReactNode; tittel: ReactNode; children: ReactNode }) => (
    <div className="flex gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--ax-info-200)">{icon}</div>
        <VStack gap="space-2" className="min-w-0 flex-1">
            <Label as="p" size="small">
                {tittel}
            </Label>
            {children}
        </VStack>
    </div>
);

const ArbeidsforholdDefinisjoner = ({ appOrigin }: { appOrigin: AppName }) => {
    const tittelId = useId();

    return (
        <ExpansionCard
            size="small"
            defaultOpen
            aria-labelledby={tittelId}
            onToggle={(open) =>
                loggUmamiEvent({
                    origin: appOrigin,
                    eventName: open ? 'readmore åpnet' : 'readmore lukket',
                    eventData: {
                        tittel: 'ArbeidsforholdOgInntektPanel.Definisjoner.Tittel',
                    },
                })
            }
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title id={tittelId} size="small" as="h3">
                    <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-20" className="p-2.5">
                    <Definisjon
                        icon={<PersonEnvelopeIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Selvstendig.Tittel" />}
                    >
                        <BodyShort size="small">
                            <FormattedMessage
                                id="ArbeidsforholdOgInntektPanel.Definisjoner.Selvstendig.Beskrivelse"
                                values={{
                                    a: (tekst) => (
                                        <Link href={links.næringsdrivendeInfoBoks} target="_blank" rel="noreferrer">
                                            {tekst}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyShort>
                    </Definisjon>
                    <Definisjon
                        icon={<TasklistIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Frilans.Tittel" />}
                    >
                        <BodyShort size="small">
                            <FormattedMessage
                                id="ArbeidsforholdOgInntektPanel.Definisjoner.Frilans.Beskrivelse"
                                values={{
                                    a: (tekst) => (
                                        <Link href={links.frilanserInfoBoks} target="_blank" rel="noreferrer">
                                            {tekst}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyShort>
                    </Definisjon>
                    <Definisjon
                        icon={<BoatIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Fisker.Tittel" />}
                    >
                        <VStack gap="space-20">
                            <BodyShort size="small">
                                <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Fisker.Beskrivelse1" />
                            </BodyShort>
                            <BodyShort size="small">
                                <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Fisker.Beskrivelse2" />
                            </BodyShort>
                        </VStack>
                    </Definisjon>
                    <Definisjon
                        icon={<BankNoteIcon aria-hidden fontSize="1.5rem" />}
                        tittel={<FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Annen.Tittel" />}
                    >
                        <BodyShort size="small">
                            <FormattedMessage id="ArbeidsforholdOgInntektPanel.Definisjoner.Annen.Beskrivelse" />
                        </BodyShort>
                    </Definisjon>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export const ArbeidsforholdOgInntektPanel = <TYPE extends string>({
    arbeidsforholdOgInntekt,
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
    const intl = useIntl();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formMethods = useForm<ArbeidsforholdOgInntekt>({
        defaultValues: {
            ...arbeidsforholdOgInntekt,
            ...(frilansoppdrag.length > 0 && { harJobbetSomFrilans: true }),
            ...(selvstendigNæring.length > 0 && { harJobbetSomSelvstendigNæringsdrivende: true }),
        },
    });

    const ferdigeAndreInntektskilder = andreInntektskilder.filter(erFerdigUtfylt);

    const hattInntektSomFrilans = formMethods.watch('harJobbetSomFrilans');
    const hattInntektSomNæringsdrivende = formMethods.watch('harJobbetSomSelvstendigNæringsdrivende');
    const kanIkkeSøke = aktiveArbeidsforhold.length === 0 && !hattInntektSomFrilans && !hattInntektSomNæringsdrivende;

    const erSvp = appOrigin === 'svangerskapspengesoknad';

    return (
        <Step steps={stepConfig} onStepChange={onStepChange}>
            <RhfForm
                formMethods={formMethods}
                onSubmit={(values) => {
                    setIsSubmitting(true);
                    saveOnNext(values);
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
                    {erSvp && (
                        <VStack gap="space-4">
                            <RhfRadioGroup
                                name="harHattArbeidIUtlandet"
                                control={formMethods.control}
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
                        <VStack gap="space-4">
                            <ArbeidsforholdDefinisjoner appOrigin={appOrigin} />
                            <LeggTilAndreInntekterWizard
                                harRegistrertNæring={selvstendigNæring.length > 0}
                                onSaveEgenNæring={saveEgenNæring}
                                onSaveAndreInntekt={(annenInntekt) =>
                                    saveAndreInntektskilder([...ferdigeAndreInntektskilder, annenInntekt])
                                }
                            />
                        </VStack>
                    )}
                    <VStack gap="space-16">
                        {erSvp && <InfoOmFørstegangstjeneste />}
                        {erSvp && <InfoTilFiskere erSvp />}
                    </VStack>
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
