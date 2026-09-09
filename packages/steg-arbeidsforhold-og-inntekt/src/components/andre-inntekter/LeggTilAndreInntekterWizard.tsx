import { ExclamationmarkTriangleIcon, InformationSquareIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Heading, InfoCard, Label, Radio, RadioGroup, ReadMore, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm } from '@navikt/fp-form-hooks';
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

interface Props {
    appOrigin: AppName;
    harRegistrertNæring?: boolean;
    harEgenNæring?: boolean;
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
    onSaveAndreInntekt?: (annenInntekt: AndreInntektskilder) => void;
}

interface EgenNæringWizardFormProps {
    appOrigin: AppName;
    onSubmit: (egenNæring: NæringDto) => void;
    onAbort: () => void;
    onBack: () => void;
}

export const LeggTilAndreInntekterWizard = ({
    appOrigin,
    harRegistrertNæring = false,
    harEgenNæring = false,
    onSaveEgenNæring,
    onSaveAndreInntekt,
}: Props) => {
    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            <LeggTilAndreInntekterWizardInner
                appOrigin={appOrigin}
                harRegistrertNæring={harRegistrertNæring}
                harEgenNæring={harEgenNæring}
                onSaveEgenNæring={onSaveEgenNæring}
                onSaveAndreInntekt={onSaveAndreInntekt}
            />
        </div>
    );
};

const EgenNæringWizardForm = ({ appOrigin, onSubmit, onAbort, onBack }: EgenNæringWizardFormProps) => {
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
}: Props) => {
    const intl = useIntl();
    const [step, setStep] = useState<WizardStep>('START');
    const [inntektstype, setInntektstype] = useState<Inntektstype>();

    const avsluttWizard = () => {
        setInntektstype(undefined);
        setStep('START');
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
                onBack={() => setStep('VELG_INNTEKTSTYPE')}
                onComplete={avsluttWizard}
                onSaveEgenNæring={onSaveEgenNæring}
            />
        );
    }

    if (step === 'ANNEN_INNTEKT') {
        return (
            <AnnenInntektForm
                appOrigin={appOrigin}
                harNæring={harRegistrertNæring || harEgenNæring}
                onAbort={avsluttWizard}
                onBack={harRegistrertNæring ? undefined : () => setStep('VELG_INNTEKTSTYPE')}
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
                onBack={() => setStep('VELG_INNTEKTSTYPE')}
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
}

interface FiskerNæringProps {
    appOrigin: AppName;
    onAbort: () => void;
    onBack: () => void;
    onSubmit: (egenNæring: NæringDto) => void;
}

type FiskerValg = 'lott' | 'hyre' | 'lott_og_hyre' | 'egen_båt';

type FiskerStep = 'VELG_ORDNING' | 'VIS_INFORMASJON';

const FiskerForm = ({ appOrigin, onAbort, onBack, onComplete, onSaveEgenNæring }: FiskerFormProps) => {
    const intl = useIntl();
    const [fiskerValg, setFiskerValg] = useState<FiskerValg>();
    const [step, setStep] = useState<FiskerStep>('VELG_ORDNING');

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
        onBack: () => setStep('VELG_ORDNING'),
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

const FiskerEgenNæringForm = ({ appOrigin, onSubmit, onAbort, onBack }: FiskerNæringProps) => (
    <EgenNæringForm
        fixedNæringstype="FISKE"
        fixedRegistrertINorge
        appOrigin={appOrigin}
        onSubmit={onSubmit}
        withoutFormElement
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
                <FormattedMessage id="LeggTilAndreInntekterWizard.hyre.content" />
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
}

type AnnenInntektValg =
    'JOBB_I_UTLANDET' | 'NÆRING_I_UTLANDET' | 'ETTERLØNN_SLUTTPAKKE' | 'MILITÆR_ELLER_SIVILTJENESTE';

type AnnenInntektStep = 'VELG_INNTEKTSTYPE' | 'FYLL_UT_INNTEKT';

const AnnenInntektForm = ({
    appOrigin,
    harNæring,
    onAbort,
    onBack,
    onSubmit,
    onSubmitEgenNæring,
}: AnnenInntektFormProps) => {
    const intl = useIntl();
    const [valgtInntektstype, setValgtInntektstype] = useState<AnnenInntektValg>();
    const [step, setStep] = useState<AnnenInntektStep>('VELG_INNTEKTSTYPE');
    const formMethods = useForm<AndreInntekterFormValues>({
        defaultValues: { andreInntektskilder: [{ type: undefined }] },
        shouldUnregister: true,
    });
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
                        renderActions={(submitEgenNæring) => (
                            <WizardNavigator
                                isLastStep
                                onCancel={onAbort}
                                onBack={() => setStep('VELG_INNTEKTSTYPE')}
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
