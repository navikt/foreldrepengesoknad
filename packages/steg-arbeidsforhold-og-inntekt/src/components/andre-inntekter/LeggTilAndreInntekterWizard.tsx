import { ExclamationmarkTriangleIcon, InformationSquareIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Heading, InfoCard, Label, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm } from '@navikt/fp-form-hooks';
import { EgenNæringForm } from '@navikt/fp-steg-egen-naering';
import type { NæringDto } from '@navikt/fp-types';

import {
    AndreInntekterFormValues,
    AndreInntektskilder,
    AnnenInntektType,
    erFerdigUtfylt,
} from '../../types/AndreInntektskilder.ts';
import { EtterlønnEllerSluttvederlagPanel } from './EtterlønnEllerSluttvederlagPanel.tsx';
import { FørstegangstjenestePanel } from './FørstegangstjenestePanel.tsx';
import { JobbIUtlandetPanel } from './JobbIUtlandetPanel.tsx';
import { LeggTilAndreInntekterButton } from './LeggTilAndreInntekterButton.tsx';
import { WizardNavigator } from './WizardNavigator.tsx';

const WizardStep = {
    START: 'START',
    VELG_INNTEKTSTYPE: 'VELG_INNTEKTSTYPE',
    EGEN_NÆRING: 'EGEN_NÆRING',
    FISKER: 'FISKER',
    ANNEN_INNTEKT: 'ANNEN_INNTEKT',
} as const;

type WizardStep = (typeof WizardStep)[keyof typeof WizardStep];

const Inntektstype = {
    EGEN_NÆRING: 'EGEN_NÆRING',
    FISKER: 'FISKER',
    ANNEN_INNTEKT: 'ANNEN_INNTEKT',
} as const;

type Inntektstype = (typeof Inntektstype)[keyof typeof Inntektstype];

interface Props {
    harRegistrertNæring?: boolean;
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
    onSaveAndreInntekt?: (annenInntekt: AndreInntektskilder) => void;
}

interface EgenNæringWizardFormProps {
    onSubmit: (egenNæring: NæringDto) => void;
    onAbort: () => void;
    onBack: () => void;
}

export const LeggTilAndreInntekterWizard = ({
    harRegistrertNæring = false,
    onSaveEgenNæring,
    onSaveAndreInntekt,
}: Props) => {
    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            <LeggTilAndreInntekterWizardInner
                harRegistrertNæring={harRegistrertNæring}
                onSaveEgenNæring={onSaveEgenNæring}
                onSaveAndreInntekt={onSaveAndreInntekt}
            />
        </div>
    );
};

const EgenNæringWizardForm = ({ onSubmit, onAbort, onBack }: EgenNæringWizardFormProps) => {
    return (
        <>
            <Heading level="2" size="small">
                Legg til inntektskilde
            </Heading>
            <EgenNæringForm
                appOrigin="foreldrepengesoknad"
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
    harRegistrertNæring = false,
    onSaveEgenNæring,
    onSaveAndreInntekt,
}: Props) => {
    const [step, setStep] = useState<WizardStep>(WizardStep.START);
    const [inntektstype, setInntektstype] = useState<Inntektstype>();

    const avsluttWizard = () => {
        setInntektstype(undefined);
        setStep(WizardStep.START);
    };

    if (step === WizardStep.START) {
        return (
            <LeggTilAndreInntekterButton
                onClick={() => setStep(harRegistrertNæring ? WizardStep.ANNEN_INNTEKT : WizardStep.VELG_INNTEKTSTYPE)}
            />
        );
    }

    if (step === WizardStep.VELG_INNTEKTSTYPE) {
        return (
            <VStack gap="space-40">
                <RadioGroup
                    legend="Hvilken type inntekt har du hatt?"
                    description="Oppgi kun aktiv inntekt de siste 10 månedene"
                    value={inntektstype ?? ''}
                    onChange={setInntektstype}
                >
                    <Radio
                        value={Inntektstype.EGEN_NÆRING}
                        description="Bidratt til driften av ektefelles virksomhet og hatt inntekt"
                    >
                        Jeg har jobbet i min ektefelles næring hvor vi har fordelt inntekt
                    </Radio>
                    <Radio value={Inntektstype.FISKER} description="Hyre og/eller lott, eller egen båt">
                        Jeg er fisker eller mannskap på båt Hyre og/eller lott, eller egen båt
                    </Radio>
                    <Radio
                        value={Inntektstype.ANNEN_INNTEKT}
                        description="Førstegangstjeneste, sluttpakke, etterlønn, eller arbeid i utlandet"
                    >
                        Annen pensjonsgivende inntekt
                    </Radio>
                </RadioGroup>
                <WizardNavigator
                    isLastStep={false}
                    isNextDisabled={!inntektstype}
                    onCancel={avsluttWizard}
                    onNext={() => {
                        if (inntektstype === Inntektstype.EGEN_NÆRING) {
                            setStep(WizardStep.EGEN_NÆRING);
                        } else if (inntektstype === Inntektstype.FISKER) {
                            setStep(WizardStep.FISKER);
                        } else if (inntektstype === Inntektstype.ANNEN_INNTEKT) {
                            setStep(WizardStep.ANNEN_INNTEKT);
                        }
                    }}
                />
            </VStack>
        );
    }

    if (step === WizardStep.FISKER) {
        return (
            <FiskerForm
                onAbort={avsluttWizard}
                onBack={() => setStep(WizardStep.VELG_INNTEKTSTYPE)}
                onComplete={avsluttWizard}
                onSaveEgenNæring={onSaveEgenNæring}
            />
        );
    }

    if (step === WizardStep.ANNEN_INNTEKT) {
        return (
            <AnnenInntektForm
                onAbort={avsluttWizard}
                onBack={harRegistrertNæring ? undefined : () => setStep(WizardStep.VELG_INNTEKTSTYPE)}
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

    if (step === WizardStep.EGEN_NÆRING) {
        return (
            <EgenNæringWizardForm
                onSubmit={(egenNæring) => {
                    onSaveEgenNæring?.(egenNæring);
                    avsluttWizard();
                }}
                onAbort={avsluttWizard}
                onBack={() => setStep(WizardStep.VELG_INNTEKTSTYPE)}
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
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
}

interface FiskerNæringProps {
    onAbort: () => void;
    onBack: () => void;
    onSubmit: (egenNæring: NæringDto) => void;
}

type FiskerValg = 'lott' | 'hyre' | 'lott_og_hyre' | 'egen_båt';

const FiskerStep = {
    VELG_ORDNING: 'VELG_ORDNING',
    VIS_INFORMASJON: 'VIS_INFORMASJON',
} as const;

type FiskerStep = (typeof FiskerStep)[keyof typeof FiskerStep];

const FiskerForm = ({ onAbort, onBack, onComplete, onSaveEgenNæring }: FiskerFormProps) => {
    const [fiskerValg, setFiskerValg] = useState<FiskerValg>();
    const [step, setStep] = useState<FiskerStep>(FiskerStep.VELG_ORDNING);

    if (step === FiskerStep.VELG_ORDNING) {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    Legg til inntektskilde
                </Heading>
                <Label>Inntekt som fisker eller mannskap</Label>
                <InfoCard data-color="meta-lime">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Vi trenger riktig informasjon om arbeidssituasjonen din for å beregne foreldrepengene dine.
                        Opplysningene dine vil også sendes til Skatteetaten.
                    </InfoCard.Message>
                </InfoCard>
                <RadioGroup
                    legend="Hvilken ordning har du som fisker eller mannskap?"
                    value={fiskerValg ?? ''}
                    onChange={setFiskerValg}
                >
                    <Radio value="lott">Lott</Radio>
                    <Radio value="hyre">Hyre</Radio>
                    <Radio value="lott_og_hyre">Lott og hyre Description</Radio>
                    <Radio value="egen_båt">Egen båt</Radio>
                </RadioGroup>
                <WizardNavigator
                    isLastStep={false}
                    isNextDisabled={!fiskerValg}
                    onCancel={onAbort}
                    onBack={onBack}
                    onNext={() => setStep(FiskerStep.VIS_INFORMASJON)}
                />
            </VStack>
        );
    }

    if (fiskerValg === 'hyre') {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    Legg til inntektskilde
                </Heading>
                <HyreInntekt />
                <WizardNavigator
                    isLastStep
                    isNextDisabled
                    onCancel={onAbort}
                    onBack={() => setStep(FiskerStep.VELG_ORDNING)}
                    onNext={onComplete}
                />
            </VStack>
        );
    }

    const fiskerNæringProps: FiskerNæringProps = {
        onAbort,
        onBack: () => setStep(FiskerStep.VELG_ORDNING),
        onSubmit: (egenNæring) => {
            onSaveEgenNæring?.(egenNæring);
            onComplete();
        },
    };

    return (
        <VStack gap="space-40">
            <Heading level="2" size="small">
                Legg til inntektskilde
            </Heading>
            {fiskerValg === 'lott' && <LottInntekt {...fiskerNæringProps} />}
            {fiskerValg === 'lott_og_hyre' && <LottOgHyreInntekt {...fiskerNæringProps} />}
            {fiskerValg === 'egen_båt' && <EgenBåtInntekt {...fiskerNæringProps} />}
        </VStack>
    );
};

const FiskerEgenNæringForm = ({ onSubmit, onAbort, onBack }: FiskerNæringProps) => (
    <EgenNæringForm
        fixedNæringstype="FISKE"
        appOrigin="foreldrepengesoknad"
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
            <Label>Inntekt fra lott</Label>
            <InfoCard data-color="info">
                <InfoCard.Header icon={<PersonEnvelopeIcon aria-hidden />}>
                    <InfoCard.Title>Du er selvstendig næringsdrivende</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    Lott regnes som næringsinntekt, fordi du får en andel av fangstverdien, og ikke fast lønn. Derfor
                    behandles inntekten som selvstendig næringsdrivende, og vi trenger opplysninger om virksomheten din.
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
                <InfoCard.Title>Du må be arbeidsgiver må registrere deg som arbeidstaker</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                Du regnes som arbeidstaker når du som fisker eller mannskap får hyre (lønn). Hvis arbeidsforholdet ditt
                ikke vises i oversikten, betyr det at arbeidsgiver ikke har meldt det inn i Arbeidsgiver- og
                arbeidstakerregisteret. Det er ikke lovpålagt, men det må gjøres for at du skal kunne få foreldrepenger.
                Arbeidsgiver må også sende inntektsmelding før du kan få utbetalt foreldrepenger.
            </InfoCard.Content>
        </InfoCard>
    );
};

const LottOgHyreInntekt = (props: FiskerNæringProps) => {
    return (
        <>
            <Label>Inntekt fra lott og hyre</Label>
            <InfoCard data-color="info">
                <InfoCard.Header icon={<PersonEnvelopeIcon aria-hidden />}>
                    <InfoCard.Title>Du er både selvstendig næringsdrivende og arbeidstaker</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    Lott regnes som næringsinntekt, fordi du får en andel av fangstverdien, og ikke fast lønn. Derfor
                    regnes du som selvstendig næringsdrivende, og vi trenger opplysninger om virksomheten din. Du regnes
                    som arbeidstaker når du som fisker eller mannskap får hyre (lønn). Hvis arbeidsforholdet ditt ikke
                    vises i oversikten, betyr det at arbeidsgiver ikke har meldt det inn i Arbeidsgiver- og
                    arbeidstakerregisteret. Det er ikke lovpålagt, men det må gjøres for at du skal kunne få
                    foreldrepenger.
                </InfoCard.Content>
            </InfoCard>
            <FiskerEgenNæringForm {...props} />
        </>
    );
};

const EgenBåtInntekt = (props: FiskerNæringProps) => {
    return (
        <>
            <Label>Fiske med egen båt</Label>
            <InfoCard data-color="info">
                <InfoCard.Header icon={<PersonEnvelopeIcon aria-hidden />}>
                    <InfoCard.Title>Du er selvstendig næringsdrivende</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    Hvis du er fisker med egen båt, er du selvstendig næringsdrivende. Spørsmålene du får i søknaden er
                    tilpasset din situasjon og du får veiledning og informasjon underveis.
                </InfoCard.Content>
            </InfoCard>
            <FiskerEgenNæringForm {...props} />
        </>
    );
};

interface AnnenInntektFormProps {
    onAbort: () => void;
    onBack?: () => void;
    onSubmit: (annenInntekt: AndreInntektskilder) => void;
    onSubmitEgenNæring: (egenNæring: NæringDto) => void;
}

const AnnenInntektValg = {
    ...AnnenInntektType,
    NÆRING_I_UTLANDET: 'NÆRING_I_UTLANDET',
} as const;

type AnnenInntektValg = (typeof AnnenInntektValg)[keyof typeof AnnenInntektValg];

const AnnenInntektStep = {
    VELG_INNTEKTSTYPE: 'VELG_INNTEKTSTYPE',
    FYLL_UT_INNTEKT: 'FYLL_UT_INNTEKT',
} as const;

type AnnenInntektStep = (typeof AnnenInntektStep)[keyof typeof AnnenInntektStep];

const AnnenInntektForm = ({ onAbort, onBack, onSubmit, onSubmitEgenNæring }: AnnenInntektFormProps) => {
    const [valgtInntektstype, setValgtInntektstype] = useState<AnnenInntektValg>();
    const [step, setStep] = useState<AnnenInntektStep>(AnnenInntektStep.VELG_INNTEKTSTYPE);
    const formMethods = useForm<AndreInntekterFormValues>({
        defaultValues: { andreInntektskilder: [{ type: undefined }] },
        shouldUnregister: true,
    });
    const inntektskilde = formMethods.watch('andreInntektskilder.0') ?? { type: undefined };

    const velgInntektstype = (type: AnnenInntektValg) => {
        setValgtInntektstype(type);
        formMethods.setValue(
            'andreInntektskilder.0',
            type === AnnenInntektValg.NÆRING_I_UTLANDET ? { type: undefined } : { type },
        );
    };

    const submitForm = formMethods.handleSubmit((values) => {
        const ferdigInntektskilde = values.andreInntektskilder.find(erFerdigUtfylt);
        if (ferdigInntektskilde) {
            onSubmit(ferdigInntektskilde);
        }
    });

    if (step === AnnenInntektStep.VELG_INNTEKTSTYPE) {
        return (
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    Legg til inntektskilde
                </Heading>
                <RadioGroup
                    legend="Hvilken annen type pensjonsgivende inntekt har du hatt de siste 10 månedene?"
                    value={valgtInntektstype ?? ''}
                    onChange={velgInntektstype}
                >
                    <Radio value={AnnenInntektType.JOBB_I_UTLANDET}>Jobb i utlandet</Radio>
                    <Radio value={AnnenInntektValg.NÆRING_I_UTLANDET}>Næring i utlandet</Radio>
                    <Radio value={AnnenInntektType.SLUTTPAKKE}>Etterlønn eller sluttvederlag</Radio>
                    <Radio value={AnnenInntektType.MILITÆRTJENESTE}>Førstegangstjeneste</Radio>
                </RadioGroup>
                <WizardNavigator
                    isLastStep={false}
                    isNextDisabled={!valgtInntektstype}
                    onCancel={onAbort}
                    onBack={onBack}
                    onNext={() => setStep(AnnenInntektStep.FYLL_UT_INNTEKT)}
                />
            </VStack>
        );
    }

    return (
        <FormProvider {...formMethods}>
            <VStack gap="space-40">
                <Heading level="2" size="small">
                    Legg til inntektskilde
                </Heading>
                <ErrorSummaryHookForm />
                {valgtInntektstype === AnnenInntektValg.NÆRING_I_UTLANDET && (
                    <EgenNæringForm
                        fixedRegistrertINorge={false}
                        appOrigin="foreldrepengesoknad"
                        onSubmit={onSubmitEgenNæring}
                        withoutFormElement
                        renderActions={(submitEgenNæring) => (
                            <WizardNavigator
                                isLastStep
                                onCancel={onAbort}
                                onBack={() => setStep(AnnenInntektStep.VELG_INNTEKTSTYPE)}
                                onNext={() => submitEgenNæring()}
                            />
                        )}
                    />
                )}
                {inntektskilde.type === AnnenInntektType.JOBB_I_UTLANDET && (
                    <JobbIUtlandetPanel index={0} inntektskilde={inntektskilde} />
                )}
                {inntektskilde.type === AnnenInntektType.SLUTTPAKKE && (
                    <EtterlønnEllerSluttvederlagPanel index={0} inntektskilde={inntektskilde} />
                )}
                {inntektskilde.type === AnnenInntektType.MILITÆRTJENESTE && (
                    <FørstegangstjenestePanel index={0} inntektskilde={inntektskilde} />
                )}
                {valgtInntektstype !== AnnenInntektValg.NÆRING_I_UTLANDET && (
                    <WizardNavigator
                        isLastStep
                        isNextDisabled={!inntektskilde.type}
                        onCancel={onAbort}
                        onBack={() => setStep(AnnenInntektStep.VELG_INNTEKTSTYPE)}
                        onNext={submitForm}
                    />
                )}
            </VStack>
        </FormProvider>
    );
};
