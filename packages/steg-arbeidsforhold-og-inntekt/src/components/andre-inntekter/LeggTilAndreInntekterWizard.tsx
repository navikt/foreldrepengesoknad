import { ExclamationmarkTriangleIcon, InformationSquareIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

import { Button, HStack, Heading, InfoCard, Label, Radio, RadioGroup } from '@navikt/ds-react';

import { EgenNæringForm } from '@navikt/fp-steg-egen-naering';
import type { NæringDto } from '@navikt/fp-types';

import { EtterlønnEllerSluttvederlagPanel } from './EtterlønnEllerSluttvederlagPanel.tsx';
import { FørstegangstjenestePanel } from './FørstegangstjenestePanel.tsx';
import { JobbIUtlandetPanel } from './JobbIUtlandetPanel.tsx';
import { LeggTilAndreInntekterButton } from './LeggTilAndreInntekterButton.tsx';

interface Props {
    onSaveEgenNæring?: (egenNæring: NæringDto) => void;
}

interface EgenNæringWizardFormProps {
    onSubmit: (egenNæring: NæringDto) => void;
    onCancel: () => void;
}

export const LeggTilAndreInntekterWizard = ({ onSaveEgenNæring }: Props) => {
    return (
        <div className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input py-4 px-5">
            <LeggTilAndreInntekterWizardInner onSaveEgenNæring={onSaveEgenNæring} />
        </div>
    );
};

const EgenNæringWizardForm = ({ onSubmit, onCancel }: EgenNæringWizardFormProps) => {
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

const LeggTilAndreInntekterWizardInner = ({ onSaveEgenNæring }: Props) => {
    const [step, setStep] = useState(4);

    if (step === 0) {
        return <LeggTilAndreInntekterButton />;
    }
    if (step === 1) {
        return (
            <RadioGroup
                legend="Hvilken type inntekt har du hatt?"
                description="Oppgi kun aktiv inntekt de siste 10 måendene"
                onChange={(value) => {
                    if (value === 'egen_næring') {
                        setStep(4);
                    }
                }}
            >
                <Radio value="egen_næring" description="Bidratt til driften av ektefelles virksomhet og hatt inntekt">
                    Jeg har jobbet i min ektefelles næring hvor vi har fordelt inntekt
                </Radio>
                <Radio value="20" description="Hyre og/eller lott, eller egen båt">
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
    if (step === 3) {
        return <AnnenInntektForm />;
    }
    if (step === 4) {
        return (
            <EgenNæringWizardForm
                onSubmit={(egenNæring) => {
                    onSaveEgenNæring?.(egenNæring);
                    setStep(0);
                }}
                onCancel={() => setStep(1)}
            />
        );
    }

    return null;
};

const FiskerForm = () => {
    const fiskerValg = 'egen_båt';
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
            {fiskerValg === 'hyre' && <HyreInntekt />}
            {fiskerValg === 'lott' && <LottInntekt />}
            {fiskerValg === 'lott_og_hyre' && <LottOgHyreInntekt />}
            {fiskerValg === 'egen_båt' && <EgenBåtInntekt />}
        </>
    );
};

const LottInntekt = () => {
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

const LottOgHyreInntekt = () => {
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
        </>
    );
};

const EgenBåtInntekt = () => {
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
        </>
    );
};

const AnnenInntektForm = () => {
    const annenInntektValg = '3';
    return (
        <>
            <Heading level="2" size="small">
                Legg til inntektskilde
            </Heading>
            <RadioGroup
                legend="Hvilken annen type pensjonsgivende inntekt har du hatt de siste 10 månedene?"
                onChange={() => {}}
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
        </>
    );
};
