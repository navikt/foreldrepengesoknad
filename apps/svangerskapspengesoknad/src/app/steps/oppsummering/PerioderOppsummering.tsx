import { FormattedMessage } from 'react-intl';

import { FormSummary, List } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/appData/SvpDataContext';
import { Arbeidsforholdstype, PeriodeMedVariasjon, Tilrettelegging } from 'app/types/Tilrettelegging';

export function PerioderOppsummering({ onVilEndreSvar }: { onVilEndreSvar: () => Promise<void> }) {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="oppsummering.periodeMedSvangerskapspenger" />
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
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingVirksomhet = tilrettelegginger.filter((t) =>
        [Arbeidsforholdstype.VIRKSOMHET, Arbeidsforholdstype.PRIVAT].includes(t.arbeidsforhold.type),
    );

    return tilretteleggingVirksomhet.map((tilrettelegging) => (
        <FormSummary.Answer key={tilrettelegging.id}>
            <FormSummary.Label>{tilrettelegging.arbeidsforhold.navn}</FormSummary.Label>
            <FormSummary.Value>
                <FormSummary.Answers>
                    {(tilrettelegging.varierendePerioder ?? []).length === 0 ? (
                        <KunEnPeriode tilrettelegging={tilrettelegging} />
                    ) : (
                        <FlerePerioder perioderMedVariasjon={tilrettelegging.varierendePerioder ?? []} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    ));
}

function FrilansSummary() {
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    console.log('alle', tilrettelegginger);
    const tilretteleggingMedFrilans = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER,
    );

    if (!tilretteleggingMedFrilans) {
        return null;
    }

    console.log(tilretteleggingMedFrilans);
    return (
        <FormSummary.Answer>
            <FormSummary.Label>asdsa</FormSummary.Label>
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
                    {(tilretteleggingMedFrilans.varierendePerioder ?? []).length === 0 ? (
                        <KunEnPeriode tilrettelegging={tilretteleggingMedFrilans} />
                    ) : (
                        <FlerePerioder perioderMedVariasjon={tilretteleggingMedFrilans.varierendePerioder ?? []} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

function SelvstendigNæringsdrivendeSummary() {
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingMedSN = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG,
    );
    console.log(tilretteleggingMedSN);

    if (!tilretteleggingMedSN) {
        return null;
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>SELVSTENIGYO</FormSummary.Label>
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
                    {(tilretteleggingMedSN.varierendePerioder ?? []).length === 0 ? (
                        <KunEnPeriode tilrettelegging={tilretteleggingMedSN} />
                    ) : (
                        <FlerePerioder perioderMedVariasjon={tilretteleggingMedSN.varierendePerioder ?? []} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

function KunEnPeriode({ tilrettelegging }: { tilrettelegging: Tilrettelegging }) {
    // TODO: genrelle tekster
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="tilrettelegging.tilrettelagtArbeidType.label.frilanser" />
                </FormSummary.Label>
                <FormSummary.Value>{tilrettelegging.type}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen" />
                </FormSummary.Label>
                <FormSummary.Value>{formatDate(tilrettelegging.enPeriodeMedTilretteleggingFom)}</FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
}

function FlerePerioder({ perioderMedVariasjon }: { perioderMedVariasjon: PeriodeMedVariasjon[] }) {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>PERIODER MED SVSDAÅP</FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {perioderMedVariasjon.map((periode) => (
                        <List.Item key={periode.fom}>
                            {formatDate(periode.fom)} til {formatDate(periode.tom)}: DU SKAL {periode.stillingsprosent}
                        </List.Item>
                    ))}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}
