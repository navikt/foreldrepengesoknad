import { ExclamationmarkTriangleIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

import { Detail, Heading, InfoCard, Label, Radio, RadioGroup } from '@navikt/ds-react';

import { LeggTilAndreInntekterButton } from './LeggTilAndreInntekterButton.tsx';

export const LeggTilAndreInntekterWizard = () => {
    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            <LeggTilAndreInntekterWizardInner />
        </div>
    );
};

const LeggTilAndreInntekterWizardInner = () => {
    const [step, setStep] = useState(2);

    if (step === 0) {
        return <LeggTilAndreInntekterButton />;
    }
    if (step === 1) {
        return (
            <RadioGroup
                legend="Hvilken type inntekt har du hatt?
Oppgi kun aktiv inntekt de siste 10 måendene"
                description="Oppgi kun aktiv inntekt de siste 10 måendene"
                onChange={() => {}}
            >
                <Radio value="10" description="Bidratt til driften av ektefelles virksomhet og hatt inntekt">
                    Jeg har jobbet i min ektefelles næring hvor vi har fordelt inntekt Bidratt til driften av ektefelles
                    virksomhet og hatt inntekt
                </Radio>
                <Radio value="20" description="Gjelder fra året man blir 21">
                    Jeg er fisker eller mannskap på båt Hyre og/eller lott, eller egen båt
                </Radio>
                <Radio value="40" description="Førstegangstjeneste, sluttpakke, etterlønn, eller arbeid i utlandet">
                    Annen pensjonsgivende inntekt
                </Radio>
            </RadioGroup>
        );
    }
    if (step === 2) {
        return <FiskerForm />;
    }

    return null;
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

const LottInntekt = () => {};

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

const LottOgHyreInntekt = () => {};

const EgenBåtInntekt = () => {};
