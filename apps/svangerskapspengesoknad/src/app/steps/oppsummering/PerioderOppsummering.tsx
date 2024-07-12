import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { FormSummary, List } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/appData/SvpDataContext';
import { Arbeidsforholdstype, TilretteleggingPeriode, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'app/utils/dateUtils';
import { mapTilretteleggingTilPerioder } from 'app/utils/tilretteleggingUtils';

export function PerioderOppsummering({ onVilEndreSvar }: { onVilEndreSvar: () => Promise<void> }) {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="oppsummering.periode.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <VirksomhetSummary />
                <FrilansSummary />
                <SelvstendigNæringsdrivendeSummary />
            </FormSummary.Answers>
        </FormSummary>
    );
}

function VirksomhetSummary() {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingVirksomhet = tilrettelegginger.filter((t) =>
        [Arbeidsforholdstype.VIRKSOMHET, Arbeidsforholdstype.PRIVAT].includes(t.arbeidsforhold.type),
    );

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const perioder = mapTilretteleggingTilPerioder(tilretteleggingVirksomhet, sisteDagForSvangerskapspenger);

    return tilretteleggingVirksomhet.map((tilrettelegging) => (
        <FormSummary.Answer key={tilrettelegging.id}>
            <FormSummary.Label>{tilrettelegging.arbeidsforhold.navn}</FormSummary.Label>
            <FormSummary.Value>
                <FormSummary.Answers>
                    {perioder.length === 1 ? (
                        <KunEnPeriode periode={perioder[0]} />
                    ) : (
                        <FlerePerioder perioder={perioder} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    ));
}

function FrilansSummary() {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingMedFrilans = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER,
    );

    if (!tilretteleggingMedFrilans) {
        return null;
    }

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const perioder = mapTilretteleggingTilPerioder([tilretteleggingMedFrilans], sisteDagForSvangerskapspenger);

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <FormattedMessage id="steps.label.frilans" />
            </FormSummary.Label>
            <FormSummary.Value>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="skjema.risikofaktorer.frilanser" />
                        </FormSummary.Label>
                        <FormSummary.Value>{tilretteleggingMedFrilans.risikofaktorer}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="tilrettelegging.tilretteleggingstiltak.label" />
                        </FormSummary.Label>
                        <FormSummary.Value>{tilretteleggingMedFrilans.tilretteleggingstiltak}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="tilrettelegging.tilrettelagtArbeidFom.label.frilanser" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {formatDate(tilretteleggingMedFrilans.behovForTilretteleggingFom)}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {perioder.length === 1 ? (
                        <KunEnPeriode periode={perioder[0]} />
                    ) : (
                        <FlerePerioder perioder={perioder} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

function SelvstendigNæringsdrivendeSummary() {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingMedSN = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG,
    );

    if (!tilretteleggingMedSN) {
        return null;
    }

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const perioder = mapTilretteleggingTilPerioder([tilretteleggingMedSN], sisteDagForSvangerskapspenger);

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <FormattedMessage id="steps.label.næring" />
            </FormSummary.Label>
            <FormSummary.Value>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="skjema.risikofaktorer.selvstendig" />
                        </FormSummary.Label>
                        <FormSummary.Value>{tilretteleggingMedSN.risikofaktorer}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="tilrettelegging.tilretteleggingstiltak.label" />
                        </FormSummary.Label>
                        <FormSummary.Value>{tilretteleggingMedSN.tilretteleggingstiltak}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {/*TODO: intl*/}
                            <FormattedMessage
                                id="tilrettelegging.tilrettelagtArbeidFom.label.flere"
                                values={{ navnArbeidsgiver: tilretteleggingMedSN.arbeidsforhold.navn }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {formatDate(tilretteleggingMedSN.behovForTilretteleggingFom)}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {perioder.length === 1 ? (
                        <KunEnPeriode periode={perioder[0]} />
                    ) : (
                        <FlerePerioder perioder={perioder} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

function KunEnPeriode({ periode }: { periode: TilretteleggingPeriode }) {
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.label.en" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <StillingProsentTekst
                        stillingsprosent={periode.stillingsprosent}
                        tilretteleggingstype={periode.type}
                    />
                </FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    {periode.type === Tilretteleggingstype.INGEN && (
                        <FormattedMessage id="tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen" />
                    )}
                    {periode.type === Tilretteleggingstype.DELVIS && (
                        <FormattedMessage id="tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis" />
                    )}
                </FormSummary.Label>
                <FormSummary.Value>
                    <SvpDatoTekst1 periode={periode} />
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
}

function FlerePerioder({ perioder }: { perioder: TilretteleggingPeriode[] }) {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <FormattedMessage id="oppsummering.periode.tittel" />
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {perioder.map((periode) => (
                        <List.Item key={periode.fom}>
                            <SvpDatoTekst1 periode={periode} />:{' '}
                            <StillingProsentTekst
                                stillingsprosent={periode.stillingsprosent}
                                tilretteleggingstype={periode.type}
                            />
                        </List.Item>
                    ))}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

function SvpDatoTekst1({ periode }: { periode: TilretteleggingPeriode }) {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const kanHaSvpFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const varerTilSisteDagMedSvp = dayjs(periode.tom).isSame(sisteDagForSvangerskapspenger, 'd');

    if (!varerTilSisteDagMedSvp) {
        return (
            <FormattedMessage
                id="oppsummering.periode.fraTil"
                values={{
                    fraDato: formatDate(periode.fom),
                    tilDato: formatDate(periode.tom),
                }}
            />
        );
    } else if (kanHaSvpFremTilTreUkerFørTermin) {
        return (
            <FormattedMessage
                id="oppsummering.periode.fremTilTreUkerFørTermin"
                values={{
                    fraDato: formatDate(periode.fom),
                }}
            />
        );
    }
    return (
        <FormattedMessage
            id="oppsummering.periode.fremTilFødsel"
            values={{
                fraDato: formatDate(periode.fom),
            }}
        />
    );
}

function StillingProsentTekst({
    tilretteleggingstype,
    stillingsprosent,
}: {
    stillingsprosent: number;
    tilretteleggingstype: Tilretteleggingstype;
}) {
    if (tilretteleggingstype === Tilretteleggingstype.HEL) {
        return <FormattedMessage id="oppsummering.periode.tilbakeIFullJobb" />;
    }
    if (tilretteleggingstype === Tilretteleggingstype.INGEN) {
        return <FormattedMessage id="oppsummering.periode.ikkeJobbe" />;
    }

    return <FormattedMessage id="oppsummering.periode.stillingsprosent" values={{ stillingsprosent }} />;
}
