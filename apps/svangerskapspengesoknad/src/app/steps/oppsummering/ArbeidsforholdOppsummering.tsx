import { FormattedMessage, useIntl } from 'react-intl';

import { FormSummary, Radio } from '@navikt/ds-react';

import { Arbeidsforhold } from '@navikt/fp-types';
import { formatDate, getCountryName } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/appData/SvpDataContext';
import { Næringstype } from 'app/types/EgenNæring';

export function ArbeidsforholdOppsummering({
    arbeidsforhold,
    onVilEndreSvar,
}: {
    arbeidsforhold: Arbeidsforhold[];
    onVilEndreSvar: () => void;
}) {
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="steps.label.arbeid" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="oppsummering.omArbeidsforhold" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormSummary.Answers>
                            {arbeidsforhold.map((etArbeidsforhold) => (
                                <ArbeidsforholdFormSummaryValue
                                    key={etArbeidsforhold.arbeidsgiverId}
                                    arbeidsforhold={etArbeidsforhold}
                                />
                            ))}
                        </FormSummary.Answers>
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilans" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={inntektsinformasjon.harJobbetSomFrilans} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="inntektsinformasjon.hattArbeidIUtlandet" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={inntektsinformasjon.harHattArbeidIUtlandet} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
}

function JaNeiTekst({ ja }: { ja: boolean }) {
    return ja ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />;
}

function ArbeidsforholdFormSummaryValue({ arbeidsforhold }: { arbeidsforhold: Arbeidsforhold }) {
    const intl = useIntl();
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                {arbeidsforhold.arbeidsgiverNavn}, {arbeidsforhold.stillingsprosent}%
            </FormSummary.Label>
            <FormSummary.Value>
                Org nr: {arbeidsforhold.arbeidsgiverId},{' '}
                <FormattedMessage
                    id="inntektsinformasjon.arbeidsforhold.periode"
                    values={{
                        fom: formatDate(arbeidsforhold.fom),
                        tom: arbeidsforhold.tom
                            ? formatDate(arbeidsforhold.tom)
                            : intl.formatMessage({ id: 'pågående' }),
                    }}
                />
            </FormSummary.Value>
        </FormSummary.Answer>
    );
}

export function SelvstendigNæringsdrivendeSummary({ onVilEndreSvar }: { onVilEndreSvar: () => void }) {
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);

    if (!egenNæring) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="steps.label.næring" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="egenNæring.næringstype" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {(() => {
                            switch (egenNæring?.næringstype) {
                                case Næringstype.FISKER:
                                    return <FormattedMessage id="egenNæring.næringstype.fiske" />;
                                case Næringstype.DAGMAMMA:
                                    return <FormattedMessage id="egenNæring.næringstype.dagmamma" />;
                                case Næringstype.JORDBRUK:
                                    return <FormattedMessage id="egenNæring.næringstype.jordbrukSkogbruk" />;
                                case Næringstype.ANNET:
                                    return <FormattedMessage id="egenNæring.næringstype.annen" />;
                                default:
                                    return null;
                            }
                        })()}
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.navnPåNæringen && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="egenNæring.navnPåNæring" />
                        </FormSummary.Label>
                        <FormSummary.Value>{egenNæring.navnPåNæringen}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="egenNæring.erNæringenRegistrertINorge" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={egenNæring.registrertINorge} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.organisasjonsnummer && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="egenNæring.orgnr" />
                        </FormSummary.Label>
                        <FormSummary.Value>{egenNæring.organisasjonsnummer}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="egenNæring.næring.fom" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(egenNæring.fomDato)}</FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="egenNæring.næring.pågående" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={egenNæring.pågående} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {!egenNæring.pågående && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="egenNæring.næring.tom" />
                        </FormSummary.Label>
                        <FormSummary.Value>{formatDate(egenNæring.tomDato)}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="egenNæring.næringsinntekt" />
                    </FormSummary.Label>
                    <FormSummary.Value>{egenNæring.næringsinntekt}</FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="egenNæring.blittYrkesaktivSiste3År" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={!!egenNæring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.oppstartsdato && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="egenNæring.yrkesaktivDato" />
                        </FormSummary.Label>
                        <FormSummary.Value>{formatDate(egenNæring.oppstartsdato)}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
}

export function FrilansSummary({ onVilEndreSvar }: { onVilEndreSvar: () => void }) {
    const frilans = useContextGetData(ContextDataType.FRILANS);

    if (!frilans) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="steps.label.frilans" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="frilans.oppstart" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(frilans.oppstart)}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="frilans.jobberFremdelesSomFrilans" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={frilans.jobberFremdelesSomFrilans} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
}

export function JobbetIUtlandetSummary({ onVilEndreSvar }: { onVilEndreSvar: () => void }) {
    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const intl = useIntl();
    if (!arbeidIUtlandet) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="steps.label.arbeidIUtlandet" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage
                            id="oppsummering.arbeidIUtlandet.tittel"
                            values={{ antall: arbeidIUtlandet.arbeidIUtlandet.length }}
                        />{' '}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <FormSummary.Answers>
                            {arbeidIUtlandet.arbeidIUtlandet.map((arbeid) => (
                                <FormSummary.Answer key={`${arbeid.arbeidsgiverNavn}-${arbeid.land}`}>
                                    <FormSummary.Label>
                                        {arbeid.arbeidsgiverNavn} i {getCountryName(arbeid.land, intl.locale)}
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage
                                            id="inntektsinformasjon.arbeidsforhold.periode"
                                            values={{
                                                fom: formatDate(arbeid.fom),
                                                tom: arbeid.tom
                                                    ? formatDate(arbeid.tom)
                                                    : intl.formatMessage({ id: 'pågående' }),
                                            }}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            ))}
                        </FormSummary.Answers>
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
}
