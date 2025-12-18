import { sumBy } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

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
        [
            finnesRefusjon && intl.formatMessage({ id: 'beregning.utbetalingsTekst.arbeidsgiver' }),
            finnesDirekteutbetaling && intl.formatMessage({ id: 'beregning.utbetalingsTekst.deg' }),
        ].filter((a) => a !== false),
        intl,
    );
    return (
        <PageRouteLayout header={<BeregningHeader />}>
            <VStack gap="2">
                <VStack>
                    <Label>
                        <FormattedMessage
                            id="beregning.dagsats"
                            values={{ sumDagsats: formatCurrencyWithKr(sumDagsats) }}
                        />
                    </Label>
                    <BodyShort>{capitalizeFirstLetter(utbetalingsmetodeTekst)}</BodyShort>
                </VStack>
                <BodyShort>
                    <Label>
                        <FormattedMessage id="beregning.datoForVurdering" />
                    </Label>
                    {formaterDato(beregning.skjæringsTidspunkt, 'D. MMMM YYYY')}
                </BodyShort>
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
    const harArbeidsgiver = andel.arbeidsforhold?.arbeidsgiverIdent !== undefined;
    return (
        <VStack gap="2">
            <BodyShort>
                {harArbeidsgiver && (
                    <Label>
                        <FormattedMessage
                            id="beregning.andel.arbeidsgiver"
                            values={{ arbeidsgiverIdent: andel.arbeidsforhold?.arbeidsgiverIdent }}
                        />
                    </Label>
                )}
                {!harArbeidsgiver && <Label>{capitalizeFirstLetter(finnStatus(andel.aktivitetStatus, intl))}</Label>}
            </BodyShort>
            <HGrid gap="2" columns={{ xs: '1fr max-content' }}>
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
        case 'TTLSTØTENDE_YTELSE':
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
