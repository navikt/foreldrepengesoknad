import { CalendarIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { groupBy, partition, sortBy, sumBy } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    Accordion,
    BodyShort,
    ExpansionCard,
    HGrid,
    HStack,
    Heading,
    Label,
    Link,
    Table,
    VStack,
} from '@navikt/ds-react';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import {
    AktivitetStatus,
    BeregningsAndel_fpoversikt,
    Beregningsgrunnlag_fpoversikt,
    FpSak_fpoversikt,
    TilkjentYtelsePeriode_fpoversikt,
} from '@navikt/fp-types';
import {
    capitalizeFirstLetter,
    erUttaksdag,
    formatCurrency,
    formatCurrencyWithKr,
    formatOppramsing,
} from '@navikt/fp-utils';

import { DinSakHeader } from '../../components/header/Header.tsx';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor.ts';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute.ts';
import { useGetSelectedSak } from '../../hooks/useSelectedSak.ts';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes.tsx';
import { OversiktRoutes } from '../../routes/routes.ts';
import { formaterDato } from '../../utils/dateUtils.ts';

dayjs.extend(isSameOrBefore);

export const BeregningPage = () => {
    const gjeldendeSak = useGetSelectedSak();
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.BEREGNING);
    const intl = useIntl();
    if (gjeldendeSak?.ytelse !== 'FORELDREPENGER') {
        return undefined;
    }
    const beregning = gjeldendeSak?.gjeldendeVedtak?.beregningsgrunnlag;

    if (beregning === undefined) {
        return undefined;
    }

    return (
        <PageRouteLayout header={<DinSakHeader sak={gjeldendeSak} />}>
            <Heading size="large" as="h2" spacing>
                Beregning av din ytelse
            </Heading>
            <VStack gap="space-40">
                <BeregningOppsummering sak={gjeldendeSak} />

                <ExpansionCard size="medium" aria-label={intl.formatMessage({ id: 'beregning.tittel' })}>
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>
                            <FormattedMessage id="beregning.tittel" />
                        </ExpansionCard.Title>
                        <ExpansionCard.Description>
                            <BeregningStatuser beregning={beregning} />
                        </ExpansionCard.Description>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-16">
                            {beregning.beregningsAndeler.map((andel) => (
                                <BeregningAndel
                                    andel={andel}
                                    key={`${andel.aktivitetStatus}-${andel.arbeidsforhold?.arbeidsgiverIdent}`}
                                />
                            ))}
                        </VStack>
                        <Forklaringer grunnbeløpPåBeregning={beregning.grunnbeløp} />
                    </ExpansionCard.Content>
                </ExpansionCard>

                <UtbetalingsVisning sak={gjeldendeSak} />
                <Feriepenger sak={gjeldendeSak} />
            </VStack>
        </PageRouteLayout>
    );
};

const BeregningOppsummering = ({ sak }: { sak: FpSak_fpoversikt }) => {
    const intl = useIntl();

    const beregning = sak.gjeldendeVedtak?.beregningsgrunnlag;
    if (!beregning) {
        return null;
    }
    const samletÅrsinntekt = sumBy(beregning.beregningsAndeler, (andel) => andel.fastsattPrÅr ?? 0);
    const grunnbeløp = beregning.grunnbeløp ?? DEFAULT_SATSER.grunnbeløp[0]!.verdi;
    const seksG = grunnbeløp * 6;
    const vis6GVarsel = samletÅrsinntekt > seksG;
    const åttiProsentReduksjon = samletÅrsinntekt * 0.8;
    const visÅttiProsentReduksjon = sak.dekningsgrad === 'ÅTTI';

    const sumDagsats = sumBy(beregning.beregningsAndeler, (a) => (a.dagsatsSøker ?? 0) + (a.dagsatsArbeidsgiver ?? 0));
    const finnesRefusjon = beregning.beregningsAndeler.some((a) => (a.dagsatsArbeidsgiver ?? 0) > 0);
    const finnesDirekteutbetaling = beregning.beregningsAndeler.some((a) => (a.dagsatsSøker ?? 0) > 0);
    const utbetalingsmetodeTekst = formatOppramsing(
        [
            finnesRefusjon && intl.formatMessage({ id: 'beregning.utbetalingsTekst.arbeidsgiver' }),
            finnesDirekteutbetaling && intl.formatMessage({ id: 'beregning.utbetalingsTekst.deg' }),
        ].filter((a) => a !== false),
        intl,
    );

    return (
        <VStack>
            <Label>
                <FormattedMessage
                    id="beregning.årsinntekt"
                    values={{ årsinntekt: formatCurrencyWithKr(samletÅrsinntekt) }}
                />
            </Label>
            <Label>
                <FormattedMessage
                    id="beregning.datoForVurdering"
                    values={{ dato: formaterDato(beregning.skjæringsTidspunkt, 'D. MMMM YYYY') }}
                />
            </Label>

            {vis6GVarsel && (
                <BodyShort>
                    <FormattedMessage
                        id="beregning.6GVarsel"
                        values={{ grunnbeløpSeksG: formatCurrencyWithKr(seksG) }}
                    />
                </BodyShort>
            )}
            {visÅttiProsentReduksjon && (
                <BodyShort>
                    <FormattedMessage
                        id="beregning.visÅttiProsentReduksjon"
                        values={{ value: formatCurrencyWithKr(åttiProsentReduksjon) }}
                    />
                </BodyShort>
            )}

            <BodyShort spacing>{capitalizeFirstLetter(utbetalingsmetodeTekst)}</BodyShort>

            <Label>
                <FormattedMessage id="beregning.dagsats" values={{ sumDagsats: formatCurrencyWithKr(sumDagsats) }} />
            </Label>
        </VStack>
    );
};

const Forklaringer = ({ grunnbeløpPåBeregning }: { grunnbeløpPåBeregning?: number }) => {
    const grunnbeløp = grunnbeløpPåBeregning ?? DEFAULT_SATSER.grunnbeløp[0]!.verdi;

    return (
        <Accordion className="mt-4">
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id="beregning.forklaringer.hvaErDagsatsen" />
                </Accordion.Header>
                <Accordion.Content>
                    <FormattedMessage
                        id="beregning.forklaringer.hvaErDagsatsen.innhold"
                        values={{
                            grunnbeløpSeksG: formatCurrency(grunnbeløp * 6),
                        }}
                    />
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id="beregning.forklaringer.ytelserBareOppTil6G" />
                </Accordion.Header>
                <Accordion.Content>
                    <FormattedMessage id="beregning.forklaringer.ytelserBareOppTil6G.innhold" />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const BeregningAndel = ({ andel }: { andel: BeregningsAndel_fpoversikt }) => {
    const intl = useIntl();
    return (
        <VStack gap="space-8">
            <BodyShort>
                {andel.arbeidsforhold === undefined ? (
                    <Label>{capitalizeFirstLetter(finnStatus(andel.aktivitetStatus, intl))}</Label>
                ) : (
                    <Label>
                        {andel.arbeidsforhold.arbeidsgiverNavn} - {andel.arbeidsforhold.arbeidsgiverIdent}
                    </Label>
                )}
            </BodyShort>
            <HGrid gap="space-8" columns={{ xs: '1fr max-content' }}>
                <BodyShort>
                    <FormattedMessage
                        id="beregning.andel.beregnetMånedsinntekt"
                        values={{ kilde: finnKildeForInntekt(andel, intl) }}
                    />
                </BodyShort>
                <BodyShort>{formatCurrencyWithKr((andel.fastsattPrÅr ?? 0) / 12)}</BodyShort>
                <BodyShort>
                    <FormattedMessage id="beregning.andel.omregnetTilÅrsinntekt" />
                </BodyShort>
                <BodyShort>{formatCurrencyWithKr(andel.fastsattPrÅr ?? 0)}</BodyShort>
            </HGrid>
        </VStack>
    );
};

type DagMedPeriode = {
    dato: string;
    andeler: TilkjentYtelsePeriode_fpoversikt['andeler'];
};

const periodeTilDager = (perioder: TilkjentYtelsePeriode_fpoversikt[]): DagMedPeriode[] => {
    const dager: DagMedPeriode[] = [];

    for (const periode of perioder) {
        let current = dayjs(periode.fom);
        const end = dayjs(periode.tom);

        while (current.isSameOrBefore(end, 'day')) {
            dager.push({
                dato: current.format('YYYY-MM-DD'),
                andeler: periode.andeler,
            });
            current = current.add(1, 'day');
        }
    }

    return dager;
};

const UtbetalingsVisning = ({ sak }: { sak: FpSak_fpoversikt }) => {
    const tilkjentYtelse = sak.gjeldendeVedtak?.tilkjentYtelse?.utbetalingsPerioder ?? [];
    const andelerPerDag = periodeTilDager(tilkjentYtelse);

    const andelerPerDagGruppertPåMåned = groupBy(andelerPerDag, (d) => dayjs(d.dato).month());

    return (
        <VStack gap="space-4">
            <Heading size="medium" as="h2">
                Utbetalingsplan
            </Heading>
            <BodyShort spacing>
                Utbetalingene som vises her er beregnet ut fra det siste vedtaket. Hvis du gjør endringer i
                foreldrepengene dine, vil dette kunne endre utbetalingene. Beregningene er før skatt og eventuelle
                trekk. Hvis vi betaler foreldrepenger til deg, vil du se hva vi trekker deg i skatt i
                <Link href="https://www.nav.no/utbetalingsoversikt">utbetalingsoversikten din.</Link> På{' '}
                <Link href="https://www.nav.no/utbetalinger">nav.no/utbetalinger</Link> finner du våre
                utbetalingsdatoer.
            </BodyShort>
            <VStack gap="space-16">
                {sortBy(Object.values(andelerPerDagGruppertPåMåned), (dager) => dayjs(dager[0]!.dato).unix()).map(
                    (dager, index) => {
                        const utbetalingsdager = dager.filter((d) => erUttaksdag(new Date(d.dato)));
                        const totaltForMånedenTilDeg = sumBy(utbetalingsdager, (d) =>
                            sumBy(d.andeler, (andel) => (andel.tilBruker ? andel.dagsats : 0)),
                        );

                        const totaltForMånedenTilAG = sumBy(utbetalingsdager, (d) =>
                            sumBy(d.andeler, (andel) => (andel.tilBruker ? 0 : andel.dagsats)),
                        );

                        const måned = capitalizeFirstLetter(formaterDato(dager[0]!.dato, 'MMMM'));

                        return (
                            <ExpansionCard key={index} aria-label={måned}>
                                <ExpansionCard.Header>
                                    <HStack wrap={false} gap="space-16" align="center">
                                        <div>
                                            <CalendarIcon
                                                className="text-ax-border-accent"
                                                aria-hidden
                                                fontSize="2rem"
                                            />
                                        </div>
                                        <div>
                                            <ExpansionCard.Title size="medium">{måned}</ExpansionCard.Title>
                                            <ExpansionCard.Description>
                                                {totaltForMånedenTilDeg > 0 && (
                                                    <>
                                                        <BodyShort as="span">
                                                            Utbetales direkte til deg:{' '}
                                                            {formatCurrencyWithKr(totaltForMånedenTilDeg)}
                                                        </BodyShort>
                                                        <br />
                                                    </>
                                                )}
                                                {totaltForMånedenTilAG > 0 && (
                                                    <BodyShort as="span">
                                                        Utbetales til arbeidsgiver:{' '}
                                                        {formatCurrencyWithKr(totaltForMånedenTilAG)}
                                                    </BodyShort>
                                                )}
                                            </ExpansionCard.Description>
                                        </div>
                                    </HStack>
                                </ExpansionCard.Header>

                                <ExpansionCard.Content>
                                    <Table size="small">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
                                                <Table.HeaderCell align="right" scope="col">
                                                    Beløp
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {dager.map((dag) => {
                                                const erUtbetalingsdag = erUttaksdag(new Date(dag.dato));
                                                const beløp = sumBy(dag.andeler, (andel) => andel.dagsats);
                                                const beløpTekst = erUtbetalingsdag ? formatCurrencyWithKr(beløp) : '-';

                                                return (
                                                    <Table.Row key={dag.dato}>
                                                        <Table.HeaderCell scope="row">
                                                            {formaterDato(dag.dato, 'DD. MMM')}
                                                        </Table.HeaderCell>
                                                        <Table.DataCell align="right">{beløpTekst}</Table.DataCell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                    </Table>
                                </ExpansionCard.Content>
                            </ExpansionCard>
                        );
                    },
                )}
            </VStack>
        </VStack>
    );
};

const Feriepenger = ({ sak }: { sak: FpSak_fpoversikt }) => {
    const feriepenger = sak.gjeldendeVedtak?.tilkjentYtelse.feriepenger ?? [];

    if (feriepenger.length === 0) {
        return (
            <VStack>
                <Heading as="h2" size="medium" spacing>
                    Feriepenger
                </Heading>
                <BodyShort>
                    Du har ikke rett på feriepenger av foreldrepengene dine. Her kan du lese mer om hvem som har rett på
                    feriepenger.
                </BodyShort>
                <Link href="https://www.nav.no/feriepenger#foreldrepenger">
                    Her kan du lese mer om feriepenger av foreldrepenger.
                </Link>
            </VStack>
        );
    }

    const feriepengerEtterÅr = groupBy(feriepenger, (andel) => dayjs(andel.opptjeningsår).year());

    return (
        <VStack>
            <Heading as="h2" size="medium" spacing>
                Feriepenger
            </Heading>
            <BodyShort>
                Du har rett på feriepenger av foreldrepengene dine. Feriepengene er 10,2&nbsp;% av det som er utbetalt
                de første 12 eller 15 ukene av den totale perioden med foreldrepenger.
                <Link href="https://www.nav.no/feriepenger#foreldrepenger">
                    Her kan du lese mer om feriepenger av foreldrepenger.
                </Link>
            </BodyShort>
            {Object.entries(feriepengerEtterÅr).map(([år, andeler]) => {
                const [feriepengerTilBruker, feriepengerTilAG] = partition(andeler, (andel) => andel.tilBruker);
                const totalUtbetaltTilBruker = sumBy(feriepengerTilBruker, (d) => d.årsbeløp);
                const totalUtbetaltTilAG = sumBy(feriepengerTilAG, (d) => d.årsbeløp);

                const betalerBareTilbruker = totalUtbetaltTilBruker > 0 && totalUtbetaltTilAG === 0;
                const betalerBareTilAG = totalUtbetaltTilAG > 0 && totalUtbetaltTilBruker === 0;
                const betalerTilBegge = totalUtbetaltTilAG > 0 && totalUtbetaltTilBruker > 0;

                return (
                    <VStack key={år} className="mt-4">
                        <Label>Opptjent i {år}</Label>
                        {totalUtbetaltTilBruker > 0 && (
                            <BodyShort>{formatCurrencyWithKr(totalUtbetaltTilBruker)} som vi betaler til deg</BodyShort>
                        )}
                        {totalUtbetaltTilAG > 0 && (
                            <BodyShort>
                                {formatCurrencyWithKr(totalUtbetaltTilAG)} som vi betaler til arbeidsgiveren din
                            </BodyShort>
                        )}

                        {betalerBareTilbruker && (
                            <BodyShort>Vi utbetaler direkte til deg innen utgangen av mai {Number(år) + 1}.</BodyShort>
                        )}
                        {betalerBareTilAG && <BodyShort>Vi utbetaler til din arbeidsgiver.</BodyShort>}
                        {betalerTilBegge && (
                            <BodyShort>
                                Vi utbetaler direkte til deg innen utgangen av mai {Number(år) + 1} og litt senere til
                                arbeidsgiveren din
                            </BodyShort>
                        )}
                    </VStack>
                );
            })}
        </VStack>
    );
};

const finnKildeForInntekt = (andel: BeregningsAndel_fpoversikt, intl: ReturnType<typeof useIntl>) => {
    switch (andel.inntektsKilde) {
        case 'INNTEKTSMELDING':
            return intl.formatMessage({ id: 'beregning.inntektsKilde.inntektsmelding' });
        case 'A_INNTEKT':
            return intl.formatMessage({ id: 'beregning.inntektsKilde.register' });
        case 'SKJØNNSFASTSATT':
            return intl.formatMessage({ id: 'beregning.inntektsKilde.skjønnsfastsatt' });
        case 'PGI':
            return intl.formatMessage({ id: 'beregning.inntektsKilde.skatteopplysninger' });
        case 'VEDTAK_ANNEN_YTELSE':
            return intl.formatMessage({ id: 'beregning.inntektsKilde.tidligere_vedtak' });
        case undefined:
            return '';
    }
};

const finnStatus = (status: AktivitetStatus, intl: ReturnType<typeof useIntl>) => {
    switch (status) {
        case 'ARBEIDSTAKER':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.arbeidstaker' });
        case 'FRILANSER':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.frilanser' });
        case 'KOMBINERT_AT_FL':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.kombinertAtFl' });
        case 'ARBEIDSAVKLARINGSPENGER':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.arbeidsavklaringspenger' });
        case 'VENTELØNN_VARTPENGER':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.ventelonnVartpenger' });
        case 'DAGPENGER':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.dagpenger' });
        case 'BRUKERS_ANDEL':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.ytelse' });
        case 'KOMBINERT_AT_FL_SN':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.kombinertAtFlSn' });
        case 'KOMBINERT_AT_SN':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.kombinertAtSn' });
        case 'KOMBINERT_FL_SN':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.kombinertFlSn' });
        case 'KUN_YTELSE':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.ytelse' });
        case 'MILITÆR_ELLER_SIVIL':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.militaerEllerSivil' });
        case 'SELVSTENDIG_NÆRINGSDRIVENDE':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.selvstendigNaeringsdrivende' });
        case 'TILSTØTENDE_YTELSE':
            return intl.formatMessage({ id: 'beregning.aktivitetStatus.ytelse' });
    }
};

const BeregningStatuser = ({ beregning }: { beregning: Beregningsgrunnlag_fpoversikt }) => {
    const intl = useIntl();
    const statuser = beregning.beregningAktivitetStatuser.map((status) => {
        return finnStatus(status.aktivitetStatus, intl);
    });
    return (
        <FormattedMessage id="beregning.beregningStatuser" values={{ statuser: formatOppramsing(statuser, intl) }} />
    );
};
