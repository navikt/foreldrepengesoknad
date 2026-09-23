import { ExclamationmarkTriangleIcon, InformationSquareIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { type ComponentProps, type Ref, useImperativeHandle, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Heading, InfoCard, Label, Radio, RadioGroup, ReadMore, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, useFormMedUtkast } from '@navikt/fp-form-hooks';
import { EgenNæringForm } from '@navikt/fp-steg-egen-naering';
import type { AppName, NæringDto } from '@navikt/fp-types';

import { AndreInntekterFormValues, AndreInntektskilder, erFerdigUtfylt } from '../../types/AndreInntektskilder.ts';
import { EtterlønnEllerSluttvederlagPanel } from './EtterlønnEllerSluttvederlagPanel.tsx';
import { FørstegangstjenestePanel } from './FørstegangstjenestePanel.tsx';
import { JobbIUtlandetPanel } from './JobbIUtlandetPanel.tsx';
import { LeggTilAndreInntekterButton } from './LeggTilAndreInntekterButton.tsx';
import { WizardNavigator } from './WizardNavigator.tsx';

type WizardStep = 'START' | 'VELG_INNTEKTSTYPE' | 'EGEN_NÆRING' | 'FISKER' | 'ANNEN_INNTEKT';

type Inntektstype = 'EGEN_NÆRING' | 'FISKER' | 'ANNEN_INNTEKT';

type Næringsutkast = ComponentProps<typeof EgenNæringForm>['utkast'];
type NæringsutkastRef = ComponentProps<typeof EgenNæringForm>['utkastRef'];
type NæringsutkastHandlinger = {
    hentVerdier: () => NonNullable<Næringsutkast>;
    valider: () => Promise<boolean>;
};
type GrenRef<T> = { hentUtkast: () => T; valider: () => Promise<boolean> };

type InntektswizardUtkast = {
    step: WizardStep;
    inntektstype?: Inntektstype;
    næring?: Næringsutkast;
    fisker?: FiskerUtkast;
    annenInntekt?: AnnenInntektUtkast;
};

export type InntektswizardHandlinger = {
    lagreUtkast: () => void;
    oppdaterUtkast: () => void;
    erÅpen: boolean;
    valider: () => Promise<boolean>;
};

interface Props {
    appOrigin: AppName;
    harRegistrertNæring?: boolean;
    harEgenNæring?: boolean;
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
    onSaveAndreInntekt?: (annenInntekt: AndreInntektskilder) => void;
    utkastRef?: Ref<InntektswizardHandlinger>;
}

interface EgenNæringWizardFormProps {
    appOrigin: AppName;
    onSubmit: (egenNæring: NæringDto) => void;
    onAbort: () => void;
    onBack: () => void;
    utkast?: Næringsutkast;
    utkastRef?: NæringsutkastRef;
}

export const LeggTilAndreInntekterWizard = ({
    appOrigin,
    harRegistrertNæring = false,
    harEgenNæring = false,
    onSaveEgenNæring,
    onSaveAndreInntekt,
    utkastRef,
}: Props) => {
    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            <LeggTilAndreInntekterWizardInner
                appOrigin={appOrigin}
                harRegistrertNæring={harRegistrertNæring}
                harEgenNæring={harEgenNæring}
                onSaveEgenNæring={onSaveEgenNæring}
                onSaveAndreInntekt={onSaveAndreInntekt}
                utkastRef={utkastRef}
            />
        </div>
    );
};

const EgenNæringWizardForm = ({
    appOrigin,
    onSubmit,
    onAbort,
    onBack,
    utkast,
    utkastRef,
}: EgenNæringWizardFormProps) => {
    return (
        <>
            <Heading level="2" size="small">
                <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
            </Heading>
            <EgenNæringForm
                appOrigin={appOrigin}
                fixedRegistrertINorge
                onSubmit={onSubmit}
                withoutFormElement
                utkast={utkast}
                utkastRef={utkastRef}
                renderActions={(submitForm) => (
                    <WizardNavigator isLastStep onCancel={onAbort} onBack={onBack} onNext={() => submitForm()} />
                )}
            />
        </>
    );
};

const LeggTilAndreInntekterWizardInner = ({
    appOrigin,
    harRegistrertNæring = false,
    harEgenNæring = false,
    onSaveEgenNæring,
    onSaveAndreInntekt,
    utkastRef,
}: Props) => {
    const intl = useIntl();
    const form = useFormMedUtkast<InntektswizardUtkast>('LeggTilAndreInntekterWizard', {
        defaultValues: { step: 'START' },
    });
    const [step, setStep] = useState(form.getValues('step'));
    const [inntektstype, setInntektstype] = useState(form.getValues('inntektstype'));
    const næringRef = useRef<NæringsutkastHandlinger>(null);
    const fiskerRef = useRef<GrenRef<FiskerUtkast>>(null);
    const annenInntektRef = useRef<GrenRef<AnnenInntektUtkast>>(null);

    const hentUtkast = () => {
        form.setValue('step', step);
        form.setValue('inntektstype', inntektstype);
        form.setValue('næring', næringRef.current?.hentVerdier());
        form.setValue('fisker', fiskerRef.current?.hentUtkast());
        form.setValue('annenInntekt', annenInntektRef.current?.hentUtkast());
    };

    useImperativeHandle(utkastRef, () => ({
        lagreUtkast: () => {
            if (step === 'START') {
                form.slettUtkast();
                return;
            }
            hentUtkast();
            form.lagreUtkast?.();
        },
        oppdaterUtkast: () => {
            hentUtkast();
            form.oppdaterUtkast?.();
        },
        erÅpen: step !== 'START',
        valider: () =>
            næringRef.current?.valider() ??
            fiskerRef.current?.valider() ??
            annenInntektRef.current?.valider() ??
            Promise.resolve(false),
    }));

    const avsluttWizard = () => {
        form.reset({ step: 'START' });
        setInntektstype(undefined);
        setStep('START');
    };

    const tilbakeTilInntektstype = () => {
        form.reset({ step: 'VELG_INNTEKTSTYPE', inntektstype });
        setStep('VELG_INNTEKTSTYPE');
    };

    if (step === 'START') {
        return (
            <LeggTilAndreInntekterButton
                onClick={() => setStep(harRegistrertNæring ? 'ANNEN_INNTEKT' : 'VELG_INNTEKTSTYPE')}
            />
        );
    }

    if (step === 'VELG_INNTEKTSTYPE') {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
                </Heading>
                <RadioGroup
                    legend={intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.velgInntektstype.legend' })}
                    description={intl.formatMessage({
                        id: 'LeggTilAndreInntekterWizard.velgInntektstype.description',
                    })}
                    value={inntektstype ?? ''}
                    onChange={setInntektstype}
                >
                    {!harEgenNæring && (
                        <>
                            <Radio
                                value="EGEN_NÆRING"
                                description={intl.formatMessage({
                                    id: 'LeggTilAndreInntekterWizard.egenNæring.description',
                                })}
                            >
                                <FormattedMessage id="LeggTilAndreInntekterWizard.egenNæring.label" />
                            </Radio>
                            <Radio
                                value="FISKER"
                                description={intl.formatMessage({
                                    id: 'LeggTilAndreInntekterWizard.fisker.description',
                                })}
                            >
                                <FormattedMessage id="LeggTilAndreInntekterWizard.fisker.label" />
                            </Radio>
                        </>
                    )}
                    <Radio
                        value="ANNEN_INNTEKT"
                        description={
                            appOrigin === 'svangerskapspengesoknad'
                                ? intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.annenInntekt.descriptionSvp' })
                                : intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.annenInntekt.descriptionFp' })
                        }
                    >
                        <FormattedMessage id="LeggTilAndreInntekterWizard.annenInntekt.label" />
                    </Radio>
                </RadioGroup>
                <VStack gap="space-12">
                    <ReadMore
                        variant="moderate"
                        header={intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.aktivInntekt.header' })}
                    >
                        <BodyShort>
                            <FormattedMessage id="LeggTilAndreInntekterWizard.aktivInntekt.content" />
                        </BodyShort>
                    </ReadMore>
                    <ReadMore
                        variant="moderate"
                        header={intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.savnerInntekt.header' })}
                    >
                        <BodyShort>
                            <FormattedMessage id="LeggTilAndreInntekterWizard.savnerInntekt.content" />
                        </BodyShort>
                    </ReadMore>
                </VStack>
                <WizardNavigator
                    isLastStep={false}
                    isNextDisabled={!inntektstype}
                    onCancel={avsluttWizard}
                    onNext={() => {
                        if (inntektstype === 'EGEN_NÆRING') {
                            setStep('EGEN_NÆRING');
                        } else if (inntektstype === 'FISKER') {
                            setStep('FISKER');
                        } else if (inntektstype === 'ANNEN_INNTEKT') {
                            setStep('ANNEN_INNTEKT');
                        }
                    }}
                />
            </VStack>
        );
    }

    if (step === 'FISKER') {
        return (
            <FiskerForm
                appOrigin={appOrigin}
                onAbort={avsluttWizard}
                onBack={tilbakeTilInntektstype}
                onComplete={avsluttWizard}
                onSaveEgenNæring={onSaveEgenNæring}
                utkast={form.getValues('fisker')}
                utkastRef={fiskerRef}
            />
        );
    }

    if (step === 'ANNEN_INNTEKT') {
        return (
            <AnnenInntektForm
                appOrigin={appOrigin}
                harNæring={harRegistrertNæring || harEgenNæring}
                onAbort={avsluttWizard}
                onBack={harRegistrertNæring ? undefined : tilbakeTilInntektstype}
                utkast={form.getValues('annenInntekt')}
                utkastRef={annenInntektRef}
                onSubmit={(annenInntekt) => {
                    onSaveAndreInntekt?.(annenInntekt);
                    avsluttWizard();
                }}
                onSubmitEgenNæring={(egenNæring) => {
                    onSaveEgenNæring?.(egenNæring);
                    avsluttWizard();
                }}
            />
        );
    }

    if (step === 'EGEN_NÆRING') {
        return (
            <EgenNæringWizardForm
                appOrigin={appOrigin}
                onSubmit={(egenNæring) => {
                    onSaveEgenNæring?.(egenNæring);
                    avsluttWizard();
                }}
                onAbort={avsluttWizard}
                onBack={tilbakeTilInntektstype}
                utkast={form.getValues('næring')}
                utkastRef={næringRef}
            />
        );
    }

    return null;
};

interface WizardBranchFormProps {
    onAbort: () => void;
    onBack: () => void;
    onComplete: () => void;
}

interface FiskerFormProps extends WizardBranchFormProps {
    appOrigin: AppName;
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
    utkast?: FiskerUtkast;
    utkastRef?: Ref<GrenRef<FiskerUtkast>>;
}

interface FiskerNæringProps {
    appOrigin: AppName;
    onAbort: () => void;
    onBack: () => void;
    onSubmit: (egenNæring: NæringDto) => void;
    utkast?: Næringsutkast;
    utkastRef?: NæringsutkastRef;
}

type FiskerValg = 'lott' | 'hyre' | 'lott_og_hyre' | 'egen_båt';

type FiskerStep = 'VELG_ORDNING' | 'VIS_INFORMASJON';

type FiskerUtkast = { valg?: FiskerValg; step: FiskerStep; næring?: Næringsutkast };

const FiskerForm = ({
    appOrigin,
    onAbort,
    onBack,
    onComplete,
    onSaveEgenNæring,
    utkast,
    utkastRef,
}: FiskerFormProps) => {
    const intl = useIntl();
    const [fiskerValg, setFiskerValg] = useState(utkast?.valg);
    const [step, setStep] = useState<FiskerStep>(utkast?.step ?? 'VELG_ORDNING');
    const [næringsutkast, setNæringsutkast] = useState(utkast?.næring);
    const næringRef = useRef<NæringsutkastHandlinger>(null);
    useImperativeHandle(utkastRef, () => ({
        hentUtkast: () => ({ valg: fiskerValg, step, næring: næringRef.current?.hentVerdier() }),
        valider: () => næringRef.current?.valider() ?? Promise.resolve(false),
    }));

    if (step === 'VELG_ORDNING') {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
                </Heading>
                <Label>
                    <FormattedMessage id="LeggTilAndreInntekterWizard.fiskerForm.label" />
                </Label>
                <InfoCard data-color="meta-lime">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        <FormattedMessage id="LeggTilAndreInntekterWizard.fiskerForm.infoMessage" />
                    </InfoCard.Message>
                </InfoCard>
                <RadioGroup
                    legend={intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.fiskerForm.legend' })}
                    value={fiskerValg ?? ''}
                    onChange={setFiskerValg}
                >
                    <Radio value="lott">
                        <FormattedMessage id="LeggTilAndreInntekterWizard.fiskerForm.lott" />
                    </Radio>
                    <Radio value="hyre">
                        <FormattedMessage id="LeggTilAndreInntekterWizard.fiskerForm.hyre" />
                    </Radio>
                    <Radio value="lott_og_hyre">
                        <FormattedMessage id="LeggTilAndreInntekterWizard.fiskerForm.lottOgHyre" />
                    </Radio>
                    <Radio value="egen_båt">
                        <FormattedMessage id="LeggTilAndreInntekterWizard.fiskerForm.egenBåt" />
                    </Radio>
                </RadioGroup>
                <WizardNavigator
                    isLastStep={false}
                    isNextDisabled={!fiskerValg}
                    onCancel={onAbort}
                    onBack={onBack}
                    onNext={() => setStep('VIS_INFORMASJON')}
                />
            </VStack>
        );
    }

    if (fiskerValg === 'hyre') {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
                </Heading>
                <HyreInntekt />
                <WizardNavigator
                    isLastStep
                    isNextDisabled
                    onCancel={onAbort}
                    onBack={() => setStep('VELG_ORDNING')}
                    onNext={onComplete}
                />
            </VStack>
        );
    }

    const fiskerNæringProps: FiskerNæringProps = {
        appOrigin,
        onAbort,
        onBack: () => {
            setNæringsutkast(undefined);
            setStep('VELG_ORDNING');
        },
        utkast: næringsutkast,
        utkastRef: næringRef,
        onSubmit: (egenNæring) => {
            onSaveEgenNæring?.(egenNæring);
            onComplete();
        },
    };

    return (
        <VStack gap="space-40">
            <Heading level="2" size="small">
                <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
            </Heading>
            {fiskerValg === 'lott' && <LottInntekt {...fiskerNæringProps} />}
            {fiskerValg === 'lott_og_hyre' && <LottOgHyreInntekt {...fiskerNæringProps} />}
            {fiskerValg === 'egen_båt' && <EgenBåtInntekt {...fiskerNæringProps} />}
        </VStack>
    );
};

const FiskerEgenNæringForm = ({ appOrigin, onSubmit, onAbort, onBack, utkast, utkastRef }: FiskerNæringProps) => (
    <EgenNæringForm
        fixedNæringstype="FISKE"
        fixedRegistrertINorge
        appOrigin={appOrigin}
        onSubmit={onSubmit}
        withoutFormElement
        utkast={utkast}
        utkastRef={utkastRef}
        renderActions={(submitForm) => (
            <WizardNavigator isLastStep onCancel={onAbort} onBack={onBack} onNext={() => submitForm()} />
        )}
    />
);

const LottInntekt = (props: FiskerNæringProps) => {
    return (
        <>
            <Label>
                <FormattedMessage id="LeggTilAndreInntekterWizard.lott.label" />
            </Label>
            <InfoCard data-color="info">
                <InfoCard.Header icon={<PersonEnvelopeIcon aria-hidden />}>
                    <InfoCard.Title>
                        <FormattedMessage id="LeggTilAndreInntekterWizard.duErSelvstendigNæringsdrivende.title" />
                    </InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    <FormattedMessage id="LeggTilAndreInntekterWizard.lott.content" />
                </InfoCard.Content>
            </InfoCard>
            <FiskerEgenNæringForm {...props} />
        </>
    );
};

const HyreInntekt = () => {
    return (
        <InfoCard data-color="warning">
            <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                <InfoCard.Title>
                    <FormattedMessage id="LeggTilAndreInntekterWizard.hyre.title" />
                </InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                <VStack gap="space-16">
                    <BodyShort>
                        <FormattedMessage id="LeggTilAndreInntekterWizard.hyre.content1" />
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage id="LeggTilAndreInntekterWizard.hyre.content2" />
                    </BodyShort>
                </VStack>
            </InfoCard.Content>
        </InfoCard>
    );
};

const LottOgHyreInntekt = (props: FiskerNæringProps) => {
    return (
        <>
            <Label>
                <FormattedMessage id="LeggTilAndreInntekterWizard.lottOgHyre.label" />
            </Label>
            <InfoCard data-color="info">
                <InfoCard.Header icon={<PersonEnvelopeIcon aria-hidden />}>
                    <InfoCard.Title>
                        <FormattedMessage id="LeggTilAndreInntekterWizard.lottOgHyre.title" />
                    </InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    <FormattedMessage id="LeggTilAndreInntekterWizard.lottOgHyre.content" />
                </InfoCard.Content>
            </InfoCard>
            <FiskerEgenNæringForm {...props} />
        </>
    );
};

const EgenBåtInntekt = (props: FiskerNæringProps) => {
    return (
        <>
            <Label>
                <FormattedMessage id="LeggTilAndreInntekterWizard.egenBåt.label" />
            </Label>
            <InfoCard data-color="info">
                <InfoCard.Header icon={<PersonEnvelopeIcon aria-hidden />}>
                    <InfoCard.Title>
                        <FormattedMessage id="LeggTilAndreInntekterWizard.duErSelvstendigNæringsdrivende.title" />
                    </InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    <FormattedMessage id="LeggTilAndreInntekterWizard.egenBåt.content" />
                </InfoCard.Content>
            </InfoCard>
            <FiskerEgenNæringForm {...props} />
        </>
    );
};

interface AnnenInntektFormProps {
    appOrigin: AppName;
    harNæring: boolean;
    onAbort: () => void;
    onBack?: () => void;
    onSubmit: (annenInntekt: AndreInntektskilder) => void;
    onSubmitEgenNæring: (egenNæring: NæringDto) => void;
    utkast?: AnnenInntektUtkast;
    utkastRef?: Ref<GrenRef<AnnenInntektUtkast>>;
}

type AnnenInntektValg =
    'JOBB_I_UTLANDET' | 'NÆRING_I_UTLANDET' | 'ETTERLØNN_SLUTTPAKKE' | 'MILITÆR_ELLER_SIVILTJENESTE';

type AnnenInntektStep = 'VELG_INNTEKTSTYPE' | 'FYLL_UT_INNTEKT';

type AnnenInntektUtkast = {
    valg?: AnnenInntektValg;
    step: AnnenInntektStep;
    verdier: AndreInntekterFormValues;
    næring?: Næringsutkast;
};

const AnnenInntektForm = ({
    appOrigin,
    harNæring,
    onAbort,
    onBack,
    onSubmit,
    onSubmitEgenNæring,
    utkast,
    utkastRef,
}: AnnenInntektFormProps) => {
    const intl = useIntl();
    const [valgtInntektstype, setValgtInntektstype] = useState(utkast?.valg);
    const [step, setStep] = useState<AnnenInntektStep>(utkast?.step ?? 'VELG_INNTEKTSTYPE');
    const [næringsutkast, setNæringsutkast] = useState(utkast?.næring);
    const næringRef = useRef<NæringsutkastHandlinger>(null);
    const formMethods = useForm<AndreInntekterFormValues>({
        defaultValues: utkast?.verdier ?? { andreInntektskilder: [{ type: undefined }] },
        shouldUnregister: true,
    });
    useImperativeHandle(utkastRef, () => ({
        hentUtkast: () => ({
            valg: valgtInntektstype,
            step,
            verdier: formMethods.getValues(),
            næring: næringRef.current?.hentVerdier(),
        }),
        valider: () => næringRef.current?.valider() ?? formMethods.trigger(),
    }));
    const inntektskilde = formMethods.watch('andreInntektskilder.0') ?? { type: undefined };

    const velgInntektstype = (type: AnnenInntektValg) => {
        setValgtInntektstype(type);
        formMethods.setValue('andreInntektskilder.0', type === 'NÆRING_I_UTLANDET' ? { type: undefined } : { type });
    };

    const submitForm = formMethods.handleSubmit((values) => {
        const ferdigInntektskilde = values.andreInntektskilder.find(erFerdigUtfylt);
        if (ferdigInntektskilde) {
            onSubmit(ferdigInntektskilde);
        }
    });

    if (step === 'VELG_INNTEKTSTYPE') {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
                </Heading>
                <RadioGroup
                    legend={intl.formatMessage({ id: 'LeggTilAndreInntekterWizard.annenInntektForm.legend' })}
                    value={valgtInntektstype ?? ''}
                    onChange={velgInntektstype}
                >
                    <Radio value="JOBB_I_UTLANDET">
                        <FormattedMessage id="LeggTilAndreInntekterWizard.jobbIUtlandet.label" />
                    </Radio>
                    {!harNæring && (
                        <Radio value="NÆRING_I_UTLANDET">
                            <FormattedMessage id="LeggTilAndreInntekterWizard.næringIUtlandet.label" />
                        </Radio>
                    )}
                    {appOrigin !== 'svangerskapspengesoknad' && (
                        <>
                            <Radio value="ETTERLØNN_SLUTTPAKKE">
                                <FormattedMessage id="LeggTilAndreInntekterWizard.etterlønn.label" />
                            </Radio>
                            <Radio value="MILITÆR_ELLER_SIVILTJENESTE">
                                <FormattedMessage id="LeggTilAndreInntekterWizard.førstegangstjeneste.label" />
                            </Radio>
                        </>
                    )}
                </RadioGroup>
                <WizardNavigator
                    isLastStep={false}
                    isNextDisabled={!valgtInntektstype}
                    onCancel={onAbort}
                    onBack={onBack}
                    onNext={() => setStep('FYLL_UT_INNTEKT')}
                />
            </VStack>
        );
    }

    return (
        <FormProvider {...formMethods}>
            {valgtInntektstype !== 'NÆRING_I_UTLANDET' && (
                <input type="hidden" {...formMethods.register('andreInntektskilder.0.type')} />
            )}
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    <FormattedMessage id="LeggTilAndreInntekterWizard.tittel" />
                </Heading>
                <ErrorSummaryHookForm />
                {valgtInntektstype === 'NÆRING_I_UTLANDET' && (
                    <EgenNæringForm
                        appOrigin={appOrigin}
                        fixedRegistrertINorge={false}
                        onSubmit={onSubmitEgenNæring}
                        withoutFormElement
                        utkast={næringsutkast}
                        utkastRef={næringRef}
                        renderActions={(submitEgenNæring) => (
                            <WizardNavigator
                                isLastStep
                                onCancel={onAbort}
                                onBack={() => {
                                    setNæringsutkast(undefined);
                                    setStep('VELG_INNTEKTSTYPE');
                                }}
                                onNext={() => submitEgenNæring()}
                            />
                        )}
                    />
                )}
                {inntektskilde.type === 'JOBB_I_UTLANDET' && (
                    <JobbIUtlandetPanel index={0} inntektskilde={inntektskilde} />
                )}
                {inntektskilde.type === 'ETTERLØNN_SLUTTPAKKE' && (
                    <EtterlønnEllerSluttvederlagPanel index={0} inntektskilde={inntektskilde} />
                )}
                {inntektskilde.type === 'MILITÆR_ELLER_SIVILTJENESTE' && (
                    <FørstegangstjenestePanel index={0} inntektskilde={inntektskilde} />
                )}
                {valgtInntektstype !== 'NÆRING_I_UTLANDET' && (
                    <WizardNavigator
                        isLastStep
                        isNextDisabled={!inntektskilde.type}
                        onCancel={onAbort}
                        onBack={() => setStep('VELG_INNTEKTSTYPE')}
                        onNext={submitForm}
                    />
                )}
            </VStack>
        </FormProvider>
    );
};
