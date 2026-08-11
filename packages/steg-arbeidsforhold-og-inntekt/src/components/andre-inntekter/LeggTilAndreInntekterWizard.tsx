import { ExclamationmarkTriangleIcon, InformationSquareIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

import { Heading, InfoCard, Label, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { EgenNæringForm } from '@navikt/fp-steg-egen-naering';
import type { NæringDto } from '@navikt/fp-types';

import { EtterlønnEllerSluttvederlagPanel } from './EtterlønnEllerSluttvederlagPanel.tsx';
import { FørstegangstjenestePanel } from './FørstegangstjenestePanel.tsx';
import { JobbIUtlandetPanel } from './JobbIUtlandetPanel.tsx';
import { LeggTilAndreInntekterButton } from './LeggTilAndreInntekterButton.tsx';
import { WizardNavigator } from './WizardNavigator.tsx';

enum WizardStep {
    START,
    VELG_INNTEKTSTYPE,
    EGEN_NÆRING,
    FISKER,
    ANNEN_INNTEKT,
}

enum Inntektstype {
    EGEN_NÆRING = 'EGEN_NÆRING',
    FISKER = 'FISKER',
    ANNEN_INNTEKT = 'ANNEN_INNTEKT',
}

interface Props {
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
}

interface EgenNæringWizardFormProps {
    onSubmit: (egenNæring: NæringDto) => void;
    onAbort: () => void;
    onBack: () => void;
}

export const LeggTilAndreInntekterWizard = ({ onSaveEgenNæring }: Props) => {
    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            <LeggTilAndreInntekterWizardInner onSaveEgenNæring={onSaveEgenNæring} />
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

const LeggTilAndreInntekterWizardInner = ({ onSaveEgenNæring }: Props) => {
    const [step, setStep] = useState(WizardStep.START);
    const [inntektstype, setInntektstype] = useState<Inntektstype>();

    const avsluttWizard = () => {
        setInntektstype(undefined);
        setStep(WizardStep.START);
    };

    if (step === WizardStep.START) {
        return <LeggTilAndreInntekterButton onClick={() => setStep(WizardStep.VELG_INNTEKTSTYPE)} />;
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
                onBack={() => setStep(WizardStep.VELG_INNTEKTSTYPE)}
                onComplete={avsluttWizard}
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

enum FiskerStep {
    VELG_ORDNING,
    VIS_INFORMASJON,
}

const FiskerForm = ({ onAbort, onBack, onComplete, onSaveEgenNæring }: FiskerFormProps) => {
    const [fiskerValg, setFiskerValg] = useState<FiskerValg>();
    const [step, setStep] = useState(FiskerStep.VELG_ORDNING);

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

type AnnenInntektValg = '1' | '2' | '3';

const AnnenInntektForm = ({ onAbort, onBack, onComplete }: WizardBranchFormProps) => {
    const [annenInntektValg, setAnnenInntektValg] = useState<AnnenInntektValg>();

    return (
        <VStack gap="space-40">
            <Heading level="2" size="small">
                Legg til inntektskilde
            </Heading>
            <RadioGroup
                legend="Hvilken annen type pensjonsgivende inntekt har du hatt de siste 10 månedene?"
                value={annenInntektValg ?? ''}
                onChange={setAnnenInntektValg}
            >
                <Radio value="1">Jobb i utlandet </Radio>
                <Radio value="2">Etterlønn eller sluttvederlag </Radio>
                <Radio value="3">Førstegangstjeneste </Radio>
            </RadioGroup>
            {annenInntektValg === '1' && <JobbIUtlandetPanel index={0} inntektskilde={{ type: 'JOBB_I_UTLANDET' }} />}
            {annenInntektValg === '2' && (
                <EtterlønnEllerSluttvederlagPanel index={0} inntektskilde={{ type: 'ETTERLONN_ELLER_SLUTTVEDERLAG' }} />
            )}
            {annenInntektValg === '3' && (
                <FørstegangstjenestePanel index={0} inntektskilde={{ type: 'MILITÆR_ELLER_SIVILTJENESTE' }} />
            )}
            <WizardNavigator
                isLastStep
                isNextDisabled={!annenInntektValg}
                onCancel={onAbort}
                onBack={onBack}
                onNext={onComplete}
            />
        </VStack>
    );
};
