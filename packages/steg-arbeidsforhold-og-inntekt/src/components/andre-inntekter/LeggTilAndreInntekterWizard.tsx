import { ExclamationmarkTriangleIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

import { Button, HStack, Heading, InfoCard, Label, Radio, RadioGroup } from '@navikt/ds-react';

import { EgenNæringForm as EgenNæringFormBase } from '@navikt/fp-steg-egen-naering';
import type { NæringDto } from '@navikt/fp-types';

import { LeggTilAndreInntekterButton } from './LeggTilAndreInntekterButton.tsx';

enum WizardStep {
    START,
    VELG_INNTEKTSTYPE,
    EGEN_NÆRING = 'EGEN_NÆRING',
    FISKER = 'FISKER',
}

interface Props {
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
}

interface EgenNæringFormProps {
    onSubmit: (egenNæring: NæringDto) => void;
    onCancel: () => void;
}

export const EgenNæringForm = ({ onSubmit, onCancel }: EgenNæringFormProps) => {
    return (
        <>
            <Heading level="2" size="small">
                Legg til inntektskilde
            </Heading>
            <EgenNæringFormBase
                appOrigin="foreldrepengesoknad"
                onSubmit={onSubmit}
                withoutFormElement
                renderActions={(submitForm) => (
                    <HStack gap="space-16" justify="end">
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Tilbake
                        </Button>
                        <Button type="button" onClick={() => void submitForm()}>
                            Legg til
                        </Button>
                    </HStack>
                )}
            />
        </>
    );
};

export const LeggTilAndreInntekterWizard = ({ onSaveEgenNæring }: Props) => {
    const [step, setStep] = useState<WizardStep>(WizardStep.START);

    if (step === WizardStep.START) {
        return <LeggTilAndreInntekterButton onClick={() => setStep(WizardStep.VELG_INNTEKTSTYPE)} />;
    }

    let content;

    if (step === WizardStep.VELG_INNTEKTSTYPE) {
        content = (
            <>
                <RadioGroup
                    legend="Hvilken type inntekt har du hatt?"
                    description="Oppgi kun aktiv inntekt de siste 10 månedene"
                    onChange={(value: unknown) => {
                        if (value === WizardStep.EGEN_NÆRING || value === WizardStep.FISKER) {
                            setStep(value);
                        }
                    }}
                >
                    <Radio
                        value={WizardStep.EGEN_NÆRING}
                        description="Bidratt til driften av ektefelles virksomhet og hatt inntekt"
                    >
                        Jeg har jobbet i min ektefelles næring hvor vi har fordelt inntekt
                    </Radio>
                    <Radio value={WizardStep.FISKER} description="Gjelder fra året man blir 21">
                        Jeg er fisker eller mannskap på båt
                    </Radio>
                    <Radio
                        value="ANNEN_PENSJONSGIVENDE_INNTEKT"
                        description="Førstegangstjeneste, sluttpakke, etterlønn, eller arbeid i utlandet"
                    >
                        Annen pensjonsgivende inntekt
                    </Radio>
                </RadioGroup>
                <Button type="button" variant="tertiary" onClick={() => setStep(WizardStep.START)}>
                    Avbryt
                </Button>
            </>
        );
    } else if (step === WizardStep.EGEN_NÆRING) {
        content = (
            <EgenNæringForm
                onSubmit={(egenNæring) => {
                    onSaveEgenNæring?.(egenNæring);
                    setStep(WizardStep.START);
                }}
                onCancel={() => setStep(WizardStep.VELG_INNTEKTSTYPE)}
            />
        );
    } else if (step === WizardStep.FISKER) {
        content = <FiskerForm />;
    }

    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            {content}
        </div>
    );
};

const FiskerForm = () => {
    return (
        <>
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
            <RadioGroup legend="Hvilken ordning har du som fisker eller mannskap?" onChange={() => {}}>
                <Radio value="lott">Lott</Radio>
                <Radio value="hyre">Hyre</Radio>
                <Radio value="lott_og_hyre">Lott og hyre Description</Radio>
                <Radio value="egen_båt">Egen båt</Radio>
            </RadioGroup>
            <HyreInntekt />
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
