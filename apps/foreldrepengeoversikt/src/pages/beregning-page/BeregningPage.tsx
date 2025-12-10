import { useQuery } from '@tanstack/react-query';
import { sumBy } from 'lodash';
import { useParams } from 'react-router-dom';

import { Accordion, Alert, BodyShort, ExpansionCard, HGrid, Label, Loader, VStack } from '@navikt/ds-react';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { BeregningV1_fpoversikt, BeregningsAndel_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter, formatCurrency, formatCurrencyWithKr } from '@navikt/fp-utils';

import { hentBeregningOptions } from '../../api/queries.ts';
import { BeregningHeader } from '../../components/header/Header.tsx';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes.tsx';
import { formaterDato } from '../../utils/dateUtils.ts';

export const BeregningPage = () => {
    const params = useParams();

    const beregningQuery = useQuery(hentBeregningOptions(params.saksnummer!));

    if (beregningQuery.isPending) {
        return (
            <PageRouteLayout header="">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Loader size="2xlarge" />
                    <BodyShort>Henter beregningen din…</BodyShort>
                </div>
            </PageRouteLayout>
        );
    }
    if (beregningQuery.isError) {
        return (
            <PageRouteLayout header="">
                <Alert variant="error">Noe gikk galt. Prøv igjen senere</Alert>
            </PageRouteLayout>
        );
    }
    const beregning = beregningQuery.data;
    const sumDagsats = sumBy(beregning.beregningsAndeler, (a) => (a.dagsatsBruker ?? 0) + (a.dagsatsArbeidsgiver ?? 0));
    const finnesRefusjon = beregning.beregningsAndeler.some((a) => (a.dagsatsArbeidsgiver ?? 0) > 0);
    const finnesDirekteutbetaling = beregning.beregningsAndeler.some((a) => (a.dagsatsBruker ?? 0) > 0);
    // TODO skrive om?
    const utbetalingsmetodeTekst = formatOppramsing(
        [finnesRefusjon && 'utbetales til arbeidsgiver', finnesDirekteutbetaling && 'ubetales til deg direkte'].filter(
            (a) => a !== false,
        ),
    );
    return (
        <PageRouteLayout header={<BeregningHeader />}>
            <VStack gap="2">
                <VStack>
                    <Label>Dagsats: {formatCurrencyWithKr(sumDagsats)}</Label>
                    <BodyShort>{capitalizeFirstLetter(utbetalingsmetodeTekst)}</BodyShort>
                </VStack>
                <BodyShort>
                    <Label>Dato for vurdering: </Label>
                    {formaterDato(beregning.skjæringsTidspunkt, 'D. MMMM YYYY')}
                </BodyShort>
                <ExpansionCard size="medium" aria-label="TODO">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>Beregning av foreldrepenger</ExpansionCard.Title>
                        <ExpansionCard.Description>
                            <BeregningStatuser beregning={beregning} />
                        </ExpansionCard.Description>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="4">
                            {beregning.beregningsAndeler.map((andel) => (
                                <BeregningAndel andel={andel} key={andel.aktivitetStatus} />
                            ))}
                        </VStack>
                        <Forklaringer />
                    </ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
        </PageRouteLayout>
    );
};

const Forklaringer = () => {
    // TODO hent grunnbeløp for skjæringstidspunkt på beregningen
    const grunnbeløp = DEFAULT_SATSER.grunnbeløp[0]!.verdi;
    return (
        <Accordion className="mt-4">
            <Accordion.Item>
                <Accordion.Header>Hva er dagsatsen?</Accordion.Header>
                <Accordion.Content>
                    Foreldrepengene beregnes maksimalt opp til seks ganger grunnbeløpet (6G):{' '}
                    {formatCurrency(grunnbeløp * 6)}. Hvis du har en inntekt høyere enn dette og velger 80 %, vil du få
                    80 % av 6G.
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Ytelser beregnes bare opp til 6G</Accordion.Header>
                <Accordion.Content>
                    Hvis du har en samlet inntekt over 6G og har flere arbeidsforhold, fordeler vi inntekten opptil
                    denne grensen. Hvordan vi fordeler inntekten avhenger av hvilke kombinasjon av inntekter du har og
                    om arbeidsgiver krever refusjon fra Nav.{' '}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const BeregningAndel = ({ andel }: { andel: BeregningsAndel_fpoversikt }) => {
    const harArbeidsgiver = andel.arbeidsforhold?.arbeidsgiverIdent !== undefined;
    return (
        <VStack gap="2">
            <BodyShort>
                {harArbeidsgiver && (
                    <Label>
                        {andel.arbeidsforhold?.arbeidsgiverNavn} - {andel.arbeidsforhold?.arbeidsgiverIdent}
                    </Label>
                )}
                {!harArbeidsgiver && <Label>{capitalizeFirstLetter(finnStatus(andel.aktivitetStatus))}</Label>}
            </BodyShort>
            <HGrid gap="2" columns={{ xs: '1fr max-content' }}>
                <BodyShort>Beregnet månedsinntekt {finnKildeForInntekt(andel)}</BodyShort>
                <BodyShort>{formatCurrencyWithKr(andel.fastsattPrMnd ?? 0)}</BodyShort>
                <BodyShort>Omregnet til årsinntekt</BodyShort>
                <BodyShort>{formatCurrencyWithKr((andel.fastsattPrMnd ?? 0) * 12)}</BodyShort>
            </HGrid>
        </VStack>
    );
};

const finnKildeForInntekt = (andel: BeregningsAndel_fpoversikt) => {
    switch (andel.inntektsKilde) {
        case 'INNTEKTSMELDING':
            return '(hentet fra inntektsmeldingen)';
        case 'A_INNTEKT':
            return '(hentet fra register)';
        case 'SKJØNNSFASTSATT':
            return '(skjønnsfastsatt av saksbehandler)';
        case 'PGI':
            return '(hentet fra skatteopplysninger)'; // TODO Hva skal vi fortelle her?
        case 'VEDTAK_ANNEN_YTELSE':
            return '(hentet fra tidligere vedtak)';
        default:
            return '';
    }
};

// TODO enum
const finnStatus = (status: string) => {
    switch (status) {
        case 'AT':
            return 'arbeidstaker';
        case 'FL':
            return 'frilans';
        case 'AT_FL':
            return 'kombinert arbeidstaker og frilanser';
        default:
            return '';
        // TODO mere greier
    }
};

const BeregningStatuser = ({ beregning }: { beregning: BeregningV1_fpoversikt }) => {
    const statuser = beregning.beregningAktivitetStatuser.map((status) => {
        return finnStatus(status.aktivitetStatus);
    });

    /**
     *
    const hjemler = beregning.beregningAktivitetStatuser.map((status) => {
        switch (status.hjemmel) {
            case 'F_14_7_8_40':
                return 'folketrygdloven kapittel 14 paragraf 7 og kapittel 8 paragraf 40';
            default:
                return 'regler';
            // TODO mere greier
        }
    });
    <BodyShort>Dette er hjemlet i {hjemler.join(', ')}</BodyShort>
        */

    return `Du er blitt beregnet som ${formatOppramsing(statuser)}`;
};

export function formatOppramsing(strenger: string[]) {
    const formatterer = new Intl.ListFormat('no', {
        style: 'long',
        type: 'conjunction',
    });
    return formatterer.format(strenger);
}
