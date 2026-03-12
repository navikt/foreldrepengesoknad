import { CalendarIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { groupBy, min, partition, sortBy, sumBy } from 'lodash';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import {
    Accordion,
    BodyShort,
    Box,
    ExpansionCard,
    HGrid,
    HStack,
    Heading,
    Label,
    Link,
    List,
    Table,
    VStack,
} from '@navikt/ds-react';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { SkyraSurvey } from '@navikt/fp-observability';
import {
    AktivitetStatus,
    BeregningsAndel_fpoversikt,
    FpSak_fpoversikt,
    TilkjentYtelsePeriode_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetter, erUttaksdag, formatCurrencyWithKr, getDecoratorLanguageCookie } from '@navikt/fp-utils';

import { API_URLS, hentDokumenterOptions } from '../../api/queries';
import { DinSakHeader } from '../../components/header/Header';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { formaterDato } from '../../utils/dateUtils';

dayjs.extend(isSameOrBefore);
dayjs.locale(getDecoratorLanguageCookie('decorator-language'));

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
            <VStack gap="space-40">
                <BeregningOppsummering sak={gjeldendeSak} />

                <ExpansionCard size="medium" aria-label={intl.formatMessage({ id: 'beregning.tittel' })}>
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="beregning.tittel" />
                        </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-16">
                            {beregning.beregningsandeler.map((andel) => (
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
                <Box background="default" padding="space-24" borderRadius="8">
                    <Feriepenger sak={gjeldendeSak} />
                </Box>
                <SkyraSurvey slug="arbeids-og-velferdsetaten-nav/beregning-i-innsyn" />
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
    const samletÅrsinntekt = sumBy(beregning.beregningsandeler, (andel) => andel.fastsattPrÅr ?? 0);
    const grunnbeløp = beregning.grunnbeløp ?? DEFAULT_SATSER.grunnbeløp[0]!.verdi;
    const seksG = grunnbeløp * 6;
    const vis6GVarsel = samletÅrsinntekt > seksG;
    const åttiProsentReduksjon = Math.round(min([samletÅrsinntekt, seksG]) * 0.8);

    const visÅttiProsentReduksjon = sak.dekningsgrad === 'ÅTTI';

    const sumDagsats = sumBy(beregning.beregningsandeler, (a) => (a.dagsatsSøker ?? 0) + (a.dagsatsArbeidsgiver ?? 0));
    const finnesRefusjon = beregning.beregningsandeler.some((a) => (a.dagsatsArbeidsgiver ?? 0) > 0);
    const finnesDirekteutbetaling = beregning.beregningsandeler.some((a) => (a.dagsatsSøker ?? 0) > 0);

    return (
        <Box background="default" padding="space-24" shadow="dialog" borderRadius="8">
            <Heading size="medium" as="h2" spacing>
                <FormattedMessage id="beregning.page.heading" />
            </Heading>
            <List>
                <List.Item>
                    <FormattedMessage
                        id="beregning.årsinntekt"
                        values={{
                            label: (chunks) => <Label>{chunks}</Label>,
                            årsinntekt: formatCurrencyWithKr(samletÅrsinntekt),
                        }}
                    />
                </List.Item>
                <List.Item>
                    <FormattedMessage
                        id="beregning.datoForVurdering"
                        values={{
                            label: (chunks) => <Label>{chunks}</Label>,
                            dato: formaterDato(beregning.skjæringsTidspunkt, 'D. MMMM YYYY'),
                        }}
                    />
                </List.Item>
                {vis6GVarsel && (
                    <List.Item>
                        <FormattedMessage
                            id="beregning.6GVarsel"
                            values={{ grunnbeløpSeksG: formatCurrencyWithKr(seksG) }}
                        />
                    </List.Item>
                )}
                {visÅttiProsentReduksjon && (
                    <List.Item>
                        <FormattedMessage
                            id="beregning.visÅttiProsentReduksjon"
                            values={{
                                label: (chunks) => <Label>{chunks}</Label>,
                                labelvalue: (chunks) => <Label>{chunks}</Label>,
                                value: formatCurrencyWithKr(åttiProsentReduksjon),
                            }}
                        />
                    </List.Item>
                )}
                {finnesRefusjon && !finnesDirekteutbetaling && (
                    <List.Item>
                        <FormattedMessage id="beregning.utbetalingsTekst.arbeidsgiver" />
                    </List.Item>
                )}
                {!finnesRefusjon && finnesDirekteutbetaling && (
                    <List.Item>
                        <FormattedMessage id="beregning.utbetalingsTekst.deg" />
                    </List.Item>
                )}
                {finnesRefusjon && finnesDirekteutbetaling && (
                    <List.Item>
                        <FormattedMessage id="beregning.utbetalingsTekst.degOgArbeidsgiver" />
                    </List.Item>
                )}
            </List>
            <ExpansionCard
                size="small"
                data-color="info"
                className="mt-8"
                aria-label={intl.formatMessage(
                    {
                        id: 'beregning.dagsats',
                    },
                    { sumDagsats: formatCurrencyWithKr(sumDagsats) },
                )}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title size="small">
                        <FormattedMessage
                            id="beregning.dagsats"
                            values={{ sumDagsats: formatCurrencyWithKr(sumDagsats) }}
                        />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="space-16">
                        {beregning.beregningsandeler.map((andel, index) => (
                            // Ikke noe som er garantert unikt, så tillater index for key, få elementer, så ok
                            <Box background="default" padding="space-16" borderRadius="8" key={index}>
                                <VStack>
                                    <Label>
                                        <ArbeidsforholdNavn andel={andel} />
                                    </Label>
                                    <hr className="text-ax-border-neutral-subtle" />
                                    <HStack justify="space-between" gap="space-4">
                                        <span>
                                            <FormattedMessage id="beregning.dagsats.tilDeg" />
                                        </span>
                                        <span>{formatCurrencyWithKr(andel.dagsatsSøker)}</span>
                                    </HStack>
                                    {andel.aktivitetStatus === 'ARBEIDSTAKER' && (
                                        <HStack justify="space-between" gap="space-4">
                                            <span>
                                                <FormattedMessage id="beregning.dagsats.tilArbeidsgiver" />
                                            </span>
                                            <span>{formatCurrencyWithKr(andel.dagsatsArbeidsgiver)}</span>
                                        </HStack>
                                    )}
                                </VStack>
                            </Box>
                        ))}
                        <Box background="default" padding="space-16" borderRadius="8">
                            <VStack>
                                <HStack justify="space-between" gap="space-4">
                                    <span>
                                        <FormattedMessage id="beregning.dagsats.totalt" />
                                    </span>
                                    <span>{formatCurrencyWithKr(sumDagsats)}</span>
                                </HStack>
                                <hr className="text-ax-border-neutral-subtle" />
                            </VStack>
                        </Box>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </Box>
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
                    <FormattedMessage id="beregning.forklaringer.hvaErDagsatsen.forklaring" />
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id="beregning.forklaringer.ytelserBareOppTil6G" />
                </Accordion.Header>
                <Accordion.Content>
                    <FormattedMessage
                        id="beregning.forklaringer.hvaErDagsatsen.innhold"
                        values={{
                            grunnbeløpSeksG: formatCurrencyWithKr(grunnbeløp * 6),
                        }}
                    />
                    <br />
                    <br />
                    <FormattedMessage
                        id="beregning.forklaringer.ytelserBareOppTil6G.dinG"
                        values={{
                            link: (chunks) => <Link href="https://www.nav.no/grunnbelopet">{chunks}</Link>,
                            grunnbeløp: formatCurrencyWithKr(grunnbeløp),
                        }}
                    />
                    <br />
                    <br />
                    <FormattedMessage
                        id="beregning.forklaringer.ytelserBareOppTil6G.innhold"
                        values={{
                            link: (chunks) => <Link href="https://www.nav.no/foreldrepenger#hvor-mye">{chunks}</Link>,
                        }}
                    />
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id="beregning.datoForVurdering.tittel" />
                </Accordion.Header>
                <Accordion.Content>
                    <FormattedMessage id="beregning.datoForVurdering.innhold" />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const ArbeidsforholdNavn = ({ andel }: { andel: BeregningsAndel_fpoversikt }) => {
    const intl = useIntl();
    if (andel.arbeidsforhold === undefined) {
        return capitalizeFirstLetter(finnStatus(andel.aktivitetStatus, intl));
    }
    return `${andel.arbeidsforhold.arbeidsgiverNavn} - ${andel.arbeidsforhold.arbeidsgiverIdent}`;
};

const BeregningAndel = ({ andel }: { andel: BeregningsAndel_fpoversikt }) => {
    const intl = useIntl();

    const skalViseVedtaksLenke =
        andel.aktivitetStatus === 'SELVSTENDIG_NÆRINGSDRIVENDE' && andel.dagsatsArbeidsgiver === 0;

    return (
        <VStack gap="space-8">
            <BodyShort>
                <Label>
                    <ArbeidsforholdNavn andel={andel} />
                </Label>
            </BodyShort>
            <HGrid gap="space-8" columns={{ xs: '1fr max-content' }}>
                <BodyShort>
                    <FormattedMessage
                        id="beregning.andel.beregnetMånedsinntekt"
                        values={{ kilde: finnKildeForInntekt(andel, intl) }}
                    />
                </BodyShort>
                <BodyShort className="text-end">{formatCurrencyWithKr((andel.fastsattPrÅr ?? 0) / 12)}</BodyShort>
                <BodyShort>
                    <FormattedMessage id="beregning.andel.omregnetTilÅrsinntekt" />
                </BodyShort>
                <BodyShort className="text-end">{formatCurrencyWithKr(andel.fastsattPrÅr ?? 0)}</BodyShort>
            </HGrid>
            {skalViseVedtaksLenke && <VedtakLenke />}
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

const fjernLeadingOgTrailingMånederUtenUtbetaling = (andelerPerDag: DagMedPeriode[]) => {
    const andelerPerDagGruppertPåMåned = groupBy(andelerPerDag, (d) => dayjs(d.dato).month());
    const andelerSortertPåMåned = sortBy(Object.values(andelerPerDagGruppertPåMåned), (dager) =>
        dayjs(dager[0]!.dato).unix(),
    );

    const beregnSumForMåned = (dager: DagMedPeriode[]) => {
        const utbetalingsdager = dager.filter((d) => erUttaksdag(d.dato));
        const tilBruker = sumBy(utbetalingsdager, (d) =>
            sumBy(d.andeler, (andel) => (andel.tilBruker ? andel.dagsats : 0)),
        );
        const tilArbeidsgiver = sumBy(utbetalingsdager, (d) =>
            sumBy(d.andeler, (andel) => (andel.tilBruker ? 0 : andel.dagsats)),
        );
        return tilBruker + tilArbeidsgiver;
    };

    const førstePåMånedMedSum = andelerSortertPåMåned.findIndex((dager) => beregnSumForMåned(dager) !== 0);
    const sistePåMånedMedSum =
        andelerSortertPåMåned.length -
        1 -
        [...andelerSortertPåMåned].reverse().findIndex((dager) => beregnSumForMåned(dager) !== 0);

    return førstePåMånedMedSum === -1 ? [] : andelerSortertPåMåned.slice(førstePåMånedMedSum, sistePåMånedMedSum + 1);
};

const UtbetalingsVisning = ({ sak }: { sak: FpSak_fpoversikt }) => {
    const tilkjentYtelse = sak.gjeldendeVedtak?.tilkjentYtelse?.utbetalingsperioder ?? [];
    const andelerPerDag = periodeTilDager(tilkjentYtelse);

    const andelerPerMåned = fjernLeadingOgTrailingMånederUtenUtbetaling(andelerPerDag);

    return (
        <VStack gap="space-4">
            <Heading size="medium" as="h2">
                <FormattedMessage id="beregning.utbetalingsvisning.tittel" />
            </Heading>
            <BodyShort>
                <FormattedMessage
                    id="beregning.utbetalingsvisning.fullBeskrivelse"
                    values={{
                        link1: (chunks) => <Link href="https://www.nav.no/utbetalingsoversikt">{chunks}</Link>,
                        link2: (chunks) => (
                            <Link href="https://www.nav.no/utbetalingsdatoer#foreldrepenger">{chunks}</Link>
                        ),
                    }}
                />
            </BodyShort>
            <VStack gap="space-16">
                {andelerPerMåned.map((dager, index) => {
                    const utbetalingsdager = dager.filter((d) => erUttaksdag(d.dato));
                    const totaltForMånedenTilDeg = sumBy(utbetalingsdager, (d) =>
                        sumBy(d.andeler, (andel) => (andel.tilBruker ? andel.dagsats : 0)),
                    );

                    const totaltForMånedenTilAG = sumBy(utbetalingsdager, (d) =>
                        sumBy(d.andeler, (andel) => (andel.tilBruker ? 0 : andel.dagsats)),
                    );

                    const antallVirkedager = sumBy(utbetalingsdager, (d) => {
                        const harDagsats = d.andeler.some((andel) => andel.dagsats > 0);
                        return harDagsats ? 1 : 0;
                    });

                    const førsteDato = dager[0]!.dato;
                    const måned = capitalizeFirstLetter(formaterDato(førsteDato, 'MMMM'));
                    const skalViseÅr = index === 0 || dayjs(førsteDato).month() === 0;
                    return (
                        <React.Fragment key={førsteDato}>
                            {skalViseÅr && <Label className="mt-4">{dayjs(førsteDato).year()}</Label>}
                            <ExpansionCard aria-label={måned} data-testid={`expansioncard-${måned}`}>
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
                                                            <FormattedMessage
                                                                id="beregning.utbetalingsvisning.direkte"
                                                                values={{
                                                                    beløp: formatCurrencyWithKr(totaltForMånedenTilDeg),
                                                                }}
                                                            />
                                                        </BodyShort>
                                                        <br />
                                                    </>
                                                )}
                                                {totaltForMånedenTilAG > 0 && (
                                                    <>
                                                        <BodyShort as="span">
                                                            <FormattedMessage
                                                                id="beregning.utbetalingsvisning.arbeidsgiver"
                                                                values={{
                                                                    beløp: formatCurrencyWithKr(totaltForMånedenTilAG),
                                                                }}
                                                            />
                                                        </BodyShort>
                                                        <br />
                                                    </>
                                                )}
                                                <FormattedMessage
                                                    id="beregning.utbetalingsvisning.antallUtbetalingsdager"
                                                    values={{ antall: antallVirkedager }}
                                                />
                                            </ExpansionCard.Description>
                                        </div>
                                    </HStack>
                                </ExpansionCard.Header>

                                <ExpansionCard.Content>
                                    <Table size="small">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell scope="col">
                                                    <FormattedMessage id="beregning.utbetalingsvisning.tabell.dato" />
                                                </Table.HeaderCell>
                                                <Table.HeaderCell align="right" scope="col">
                                                    <FormattedMessage id="beregning.utbetalingsvisning.tabell.beløp" />
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {dager.map((dag) => {
                                                const erUtbetalingsdag = erUttaksdag(dag.dato);
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
                        </React.Fragment>
                    );
                })}
            </VStack>
        </VStack>
    );
};

const Feriepenger = ({ sak }: { sak: FpSak_fpoversikt }) => {
    const feriepenger = sak.gjeldendeVedtak?.tilkjentYtelse?.feriepenger ?? [];

    if (feriepenger.length === 0) {
        return (
            <VStack>
                <Heading as="h2" size="medium" spacing>
                    <FormattedMessage id="beregning.feriepenger.tittel" />
                </Heading>
                <BodyShort>
                    <FormattedMessage
                        id="beregning.feriepenger.ikkeRett"
                        values={{
                            uker: sak.dekningsgrad === 'ÅTTI' ? 15 : 12,
                            link: (chunks) => (
                                <Link href="https://www.nav.no/feriepenger#foreldrepenger">{chunks}</Link>
                            ),
                        }}
                    />
                </BodyShort>
            </VStack>
        );
    }

    const feriepengerEtterÅr = groupBy(feriepenger, (andel) => dayjs(andel.opptjeningsår).year());

    return (
        <VStack>
            <Heading as="h2" size="medium" spacing>
                <FormattedMessage id="beregning.feriepenger.tittel" />
            </Heading>
            <BodyShort>
                <FormattedMessage
                    id="beregning.feriepenger.harRett"
                    values={{
                        uker: sak.dekningsgrad === 'ÅTTI' ? 15 : 12,
                        link: (chunks) => <Link href="https://www.nav.no/feriepenger#foreldrepenger">{chunks}</Link>,
                    }}
                />
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
                        <Label>
                            <FormattedMessage id="beregning.feriepenger.opptjentI" values={{ år: år }} />
                        </Label>
                        {totalUtbetaltTilBruker > 0 && (
                            <BodyShort>
                                <FormattedMessage
                                    id="beregning.feriepenger.utbetaltTilDeg"
                                    values={{ beløp: formatCurrencyWithKr(totalUtbetaltTilBruker) }}
                                />
                            </BodyShort>
                        )}
                        {totalUtbetaltTilAG > 0 && (
                            <BodyShort>
                                <FormattedMessage
                                    id="beregning.feriepenger.utbetaltTilAG"
                                    values={{ beløp: formatCurrencyWithKr(totalUtbetaltTilAG) }}
                                />
                            </BodyShort>
                        )}

                        {betalerBareTilbruker && (
                            <BodyShort>
                                <FormattedMessage
                                    id="beregning.feriepenger.utbetalingDato.bareTilDeg"
                                    values={{ år: Number(år) + 1 }}
                                />
                            </BodyShort>
                        )}
                        {betalerBareTilAG && (
                            <BodyShort>
                                <FormattedMessage id="beregning.feriepenger.utbetalingDato.bareAG" />
                            </BodyShort>
                        )}
                        {betalerTilBegge && (
                            <BodyShort>
                                <FormattedMessage
                                    id="beregning.feriepenger.utbetalingDato.begge"
                                    values={{ år: Number(år) + 1 }}
                                />
                            </BodyShort>
                        )}
                    </VStack>
                );
            })}
        </VStack>
    );
};

const VedtakLenke = () => {
    const params = useParams<{ saksnummer: string }>();
    const vedtak = useQuery({
        ...hentDokumenterOptions(params.saksnummer!),
        select: (dokumenter) => dokumenter.find((d) => d.tittel?.includes('Innvilgelsesbrev Foreldrepenger')),
    }).data;

    if (!vedtak) {
        return null;
    }

    return (
        <div>
            <FormattedMessage
                id="beregning.vedtakLenke"
                values={{
                    link: (chunks) => (
                        <Link
                            href={API_URLS.hentDokument(vedtak.journalpostId, vedtak.dokumentId ?? 'ukjent')}
                            target="_blank"
                        >
                            {chunks}
                        </Link>
                    ),
                }}
            />
        </div>
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
