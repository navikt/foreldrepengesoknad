import { sumBy } from 'lodash';
import { useIntl } from 'react-intl';

import { Accordion, BodyShort, ExpansionCard, HGrid, Label, VStack } from '@navikt/ds-react';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { AktivitetStatus, BeregningsAndel_fpoversikt, Beregningsgrunnlag_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter, formatCurrency, formatCurrencyWithKr, formatOppramsing } from '@navikt/fp-utils';

import { BeregningHeader } from '../../components/header/Header.tsx';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor.ts';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute.ts';
import { useGetSelectedSak } from '../../hooks/useSelectedSak.ts';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes.tsx';
import { OversiktRoutes } from '../../routes/routes.ts';
import { formaterDato } from '../../utils/dateUtils.ts';

export const BeregningPage = () => {
    const gjeldendeSak = useGetSelectedSak();
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.BEREGNING);
    const intl = useIntl();
    if (gjeldendeSak?.ytelse !== 'FORELDREPENGER') {
        return undefined;
    }
    const beregning = gjeldendeSak?.gjeldendeVedtak?.beregningsgrunnlag;

    if (beregning === undefined) {
        return undefined;
    }

    const sumDagsats = sumBy(beregning.beregningsAndeler, (a) => (a.dagsatsSøker ?? 0) + (a.dagsatsArbeidsgiver ?? 0));
    const finnesRefusjon = beregning.beregningsAndeler.some((a) => (a.dagsatsArbeidsgiver ?? 0) > 0);
    const finnesDirekteutbetaling = beregning.beregningsAndeler.some((a) => (a.dagsatsSøker ?? 0) > 0);
    const utbetalingsmetodeTekst = formatOppramsing(
        [finnesRefusjon && 'utbetales til arbeidsgiver', finnesDirekteutbetaling && 'ubetales til deg direkte'].filter(
            (a) => a !== false,
        ),
        intl,
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
                <ExpansionCard size="medium" aria-label="Beregning av foreldrepenger">
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
    // TODO Legg på grunnbeløp felt i dto siden dette allerede er satt i backend
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
                {harArbeidsgiver && <Label>TODO Navn på bedrift - {andel.arbeidsforhold?.arbeidsgiverIdent}</Label>}
                {!harArbeidsgiver && <Label>{capitalizeFirstLetter(finnStatus(andel.aktivitetStatus))}</Label>}
            </BodyShort>
            <HGrid gap="2" columns={{ xs: '1fr max-content' }}>
                <BodyShort>Beregnet månedsinntekt {finnKildeForInntekt(andel)}</BodyShort>
                <BodyShort>{formatCurrencyWithKr((andel.fastsattPrÅr ?? 0) / 12)}</BodyShort>
                <BodyShort>Omregnet til årsinntekt</BodyShort>
                <BodyShort>{formatCurrencyWithKr(andel.fastsattPrÅr ?? 0)}</BodyShort>
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
            return '(hentet fra skatteopplysninger)';
        case 'VEDTAK_ANNEN_YTELSE':
            return '(hentet fra tidligere vedtak)';
        case undefined:
            return '';
    }
};

const finnStatus = (status: AktivitetStatus) => {
    switch (status) {
        case 'ARBEIDSTAKER':
            return 'arbeidstaker';
        case 'FRILANSER':
            return 'frilans';
        case 'KOMBINERT_AT_FL':
            return 'kombinert arbeidstaker og frilanser';
        case 'ARBEIDSAVKLARINGSPENGER':
            return 'arbeidsavklaringspenger';
        case 'VENTELØNN_VARTPENGER':
            return 'ventelønn og vartpenger';
        case 'DAGPENGER':
            return 'dagpenger';
        case 'BRUKERS_ANDEL':
            return 'ytelse';
        case 'KOMBINERT_AT_FL_SN':
            return 'kombinert arbeidstaker, frilanser og selvstendig næringsdrivende';
        case 'KOMBINERT_AT_SN':
            return 'kombinert arbeidstaker og selvstendig næringsdrivende';
        case 'KOMBINERT_FL_SN':
            return 'kombinert frilanser og selvstendig næringsdrivende';
        case 'KUN_YTELSE':
            return 'ytelse';
        case 'MILITÆR_ELLER_SIVIL':
            return 'siviltjeneste eller førstegangstjeneste';
        case 'SELVSTENDIG_NÆRINGSDRIVENDE':
            return 'næringsdrivende';
        case 'TTLSTØTENDE_YTELSE':
            return 'ytelse';
    }
};

const BeregningStatuser = ({ beregning }: { beregning: Beregningsgrunnlag_fpoversikt }) => {
    const intl = useIntl();
    const statuser = beregning.beregningAktivitetStatuser.map((status) => {
        return finnStatus(status.aktivitetStatus);
    });
    return `Du er blitt beregnet som ${formatOppramsing(statuser, intl)}`;
};
