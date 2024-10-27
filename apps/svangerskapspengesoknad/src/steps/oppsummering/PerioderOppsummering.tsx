import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { TilretteleggingPeriode, Tilretteleggingstype } from 'types/Tilrettelegging';
import { getKanHaSvpFremTilTreUkerFørTermin, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import {
    getArbeidsgiverStillingerForTilrettelegging,
    mapEnTilretteleggingPeriode,
    mapFlereTilretteleggingPerioder,
} from 'utils/tilretteleggingUtils';

import { FormSummary, List } from '@navikt/ds-react';

import { Arbeidsforhold, EGEN_NÆRING_ID, FRILANS_ID } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

export function PerioderOppsummering({
    onVilEndreSvar,
    alleArbeidsforhold,
}: {
    readonly onVilEndreSvar: () => void;
    readonly alleArbeidsforhold: Arbeidsforhold[];
}) {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);

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
                <VirksomhetSummary
                    alleArbeidsforhold={alleArbeidsforhold}
                    sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger}
                    termindato={barn.termindato}
                />
                <FrilansSummary sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger} />
                <SelvstendigNæringsdrivendeSummary sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger} />
            </FormSummary.Answers>
        </FormSummary>
    );
}

function VirksomhetSummary({
    alleArbeidsforhold,
    sisteDagForSvangerskapspenger,
    termindato,
}: {
    readonly alleArbeidsforhold: Arbeidsforhold[];
    readonly sisteDagForSvangerskapspenger: string;
    readonly termindato: string;
}) {
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);

    const tilretteleggingIder = Object.keys(tilrettelegginger).filter(
        (tilretteleggingId) => tilretteleggingId !== FRILANS_ID && tilretteleggingId !== EGEN_NÆRING_ID,
    );

    if (!tilretteleggingIder) {
        return null;
    }

    return tilretteleggingIder.map((tilretteleggingId) => {
        const tilrettelegging = tilrettelegginger[tilretteleggingId];
        const perioder = tilretteleggingerPerioder?.[tilretteleggingId];

        const arbeidsforhold = alleArbeidsforhold.find((a) => a.arbeidsgiverId === tilretteleggingId);
        const stillinger = getArbeidsgiverStillingerForTilrettelegging(
            termindato,
            tilretteleggingId,
            alleArbeidsforhold,
        );

        const mappedPerioder = perioder
            ? mapFlereTilretteleggingPerioder(perioder, sisteDagForSvangerskapspenger, stillinger)
            : mapEnTilretteleggingPeriode(tilrettelegging, sisteDagForSvangerskapspenger, stillinger);

        return (
            <FormSummary.Answer key={tilretteleggingId}>
                <FormSummary.Label>
                    {capitalizeFirstLetterInEveryWordOnly(arbeidsforhold?.arbeidsgiverNavn)}
                </FormSummary.Label>
                <FormSummary.Value>
                    <FormSummary.Answers>
                        {mappedPerioder.length === 1 ? (
                            <KunEnPeriode periode={mappedPerioder[0]} />
                        ) : (
                            <FlerePerioder perioder={mappedPerioder} />
                        )}
                    </FormSummary.Answers>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    });
}

function FrilansSummary({ sisteDagForSvangerskapspenger }: { readonly sisteDagForSvangerskapspenger: string }) {
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const frilans = useContextGetData(ContextDataType.FRILANS);

    const harFrilansTilrettelegging = Object.keys(tilrettelegginger).some(
        (tilretteleggingId) => tilretteleggingId === FRILANS_ID,
    );

    if (!harFrilansTilrettelegging || !frilans) {
        return null;
    }

    const frilansTilrettelegging = tilrettelegginger[FRILANS_ID];
    const perioder = tilretteleggingerPerioder?.[FRILANS_ID];

    const stillinger = [{ fom: frilans.oppstart, stillingsprosent: 100 }];
    const mappedPerioder = perioder
        ? mapFlereTilretteleggingPerioder(perioder, sisteDagForSvangerskapspenger, stillinger)
        : mapEnTilretteleggingPeriode(frilansTilrettelegging, sisteDagForSvangerskapspenger, stillinger);

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
                        <FormSummary.Value>{frilansTilrettelegging.risikofaktorer}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="tilrettelegging.tilretteleggingstiltak.label" />
                        </FormSummary.Label>
                        <FormSummary.Value>{frilansTilrettelegging.tilretteleggingstiltak}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="tilrettelegging.tilrettelagtArbeidFom.label.frilanser" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {formatDate(frilansTilrettelegging.behovForTilretteleggingFom)}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {mappedPerioder.length === 1 ? (
                        <KunEnPeriode periode={mappedPerioder[0]} />
                    ) : (
                        <FlerePerioder perioder={mappedPerioder} />
                    )}
                </FormSummary.Answers>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

function SelvstendigNæringsdrivendeSummary({
    sisteDagForSvangerskapspenger,
}: {
    readonly sisteDagForSvangerskapspenger: string;
}) {
    const intl = useIntl();

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingerPerioder = useContextGetData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);

    const harEgenNæringTilrettelegging = Object.keys(tilrettelegginger).some(
        (tilretteleggingId) => tilretteleggingId === EGEN_NÆRING_ID,
    );

    if (!harEgenNæringTilrettelegging || !egenNæring) {
        return null;
    }

    const tilretteleggingMedSN = tilrettelegginger[EGEN_NÆRING_ID];
    const perioder = tilretteleggingerPerioder?.[EGEN_NÆRING_ID];

    const stillinger = [{ fom: egenNæring.fom, tom: egenNæring.tom, stillingsprosent: 100 }];
    const mappedPerioder = perioder
        ? mapFlereTilretteleggingPerioder(perioder, sisteDagForSvangerskapspenger, stillinger)
        : mapEnTilretteleggingPeriode(tilretteleggingMedSN, sisteDagForSvangerskapspenger, stillinger);

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
                            <FormattedMessage
                                id="tilrettelegging.tilrettelagtArbeidFom.label.flere"
                                values={{
                                    navnArbeidsgiver: capitalizeFirstLetterInEveryWordOnly(
                                        egenNæring.navnPåNæringen ??
                                            intl.formatMessage({ id: 'egenNæring' }).toLowerCase(),
                                    ),
                                }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {formatDate(tilretteleggingMedSN.behovForTilretteleggingFom)}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    {mappedPerioder.length === 1 ? (
                        <KunEnPeriode periode={mappedPerioder[0]} />
                    ) : (
                        <FlerePerioder perioder={mappedPerioder} />
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
                    <SvpPeriodeDatoTekst periode={periode} />
                </FormSummary.Value>
            </FormSummary.Answer>
        </>
    );
}

function FlerePerioder({ perioder }: { perioder: TilretteleggingPeriode[] }) {
    console.log(perioder);
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <FormattedMessage id="oppsummering.periode.tittel" />
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {perioder.map((periode) => (
                        <List.Item key={periode.fom}>
                            <SvpPeriodeDatoTekst periode={periode} />:{' '}
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

function SvpPeriodeDatoTekst({ periode }: { periode: TilretteleggingPeriode }) {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const kanHaSvpFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);
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
    stillingsprosent?: number;
    tilretteleggingstype: Tilretteleggingstype;
}) {
    if (tilretteleggingstype === Tilretteleggingstype.HEL) {
        return <FormattedMessage id="oppsummering.periode.tilbakeIFullJobb" />;
    }
    if (tilretteleggingstype === Tilretteleggingstype.INGEN) {
        return <FormattedMessage id="oppsummering.periode.ikkeJobbe" />;
    }

    if (tilretteleggingstype === Tilretteleggingstype.DELVIS && stillingsprosent === undefined) {
        throw new Error('Stillingsprosent ikke satt for delvis tilrettelegging');
    }

    return <FormattedMessage id="oppsummering.periode.stillingsprosent" values={{ stillingsprosent }} />;
}
