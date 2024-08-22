import { FormattedMessage, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { Næringstype } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold } from '@navikt/fp-types';
import { formatDate, getCountryName } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/appData/SvpDataContext';

export function ArbeidsforholdOppsummering({
    arbeidsforhold,
    onVilEndreSvar,
}: {
    readonly arbeidsforhold: Arbeidsforhold[];
    readonly onVilEndreSvar: () => void;
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
                        <FormattedMessage id="ArbeidsforholdOppsummering.harDuJobbetSomFrilans" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={inntektsinformasjon.harJobbetSomFrilans} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.harJobbetSomSelvstendigNæringsdrivende" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.hattArbeidIUtlandet" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={inntektsinformasjon.harHattArbeidIUtlandet} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
}

export function JaNeiTekst({ ja }: { readonly ja: boolean }) {
    return ja ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />;
}

function ArbeidsforholdFormSummaryValue({ arbeidsforhold }: { readonly arbeidsforhold: Arbeidsforhold }) {
    const intl = useIntl();
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                {arbeidsforhold.arbeidsgiverNavn}, {arbeidsforhold.stillingsprosent}%
            </FormSummary.Label>
            <FormSummary.Value>
                Org nr: {arbeidsforhold.arbeidsgiverId},{' '}
                <FormattedMessage
                    id="ArbeidsforholdOppsummering.arbeidsforhold.periode"
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

export function SelvstendigNæringsdrivendeSummary({ onVilEndreSvar }: { readonly onVilEndreSvar: () => void }) {
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
                        <FormattedMessage id="ArbeidsforholdOppsummering.næringstype" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {(() => {
                            switch (egenNæring?.næringstype) {
                                case Næringstype.FISKER:
                                    return <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.fiske" />;
                                case Næringstype.DAGMAMMA:
                                    return <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.dagmamma" />;
                                case Næringstype.JORDBRUK:
                                    return (
                                        <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.jordbrukSkogbruk" />
                                    );
                                case Næringstype.ANNET:
                                    return <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.annen" />;
                                default:
                                    return null;
                            }
                        })()}
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.navnPåNæringen && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ArbeidsforholdOppsummering.navnPåNæring" />
                        </FormSummary.Label>
                        <FormSummary.Value>{egenNæring.navnPåNæringen}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.erNæringenRegistrertINorge" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={egenNæring.registrertINorge} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.organisasjonsnummer && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ArbeidsforholdOppsummering.orgnr" />
                        </FormSummary.Label>
                        <FormSummary.Value>{egenNæring.organisasjonsnummer}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.næring.fom" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(egenNæring.fomDato)}</FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.næring.pågående" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={egenNæring.pågående} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {!egenNæring.pågående && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ArbeidsforholdOppsummering.næring.tom" />
                        </FormSummary.Label>
                        <FormSummary.Value>{formatDate(egenNæring.tomDato)}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.næringsinntekt" />
                    </FormSummary.Label>
                    <FormSummary.Value>{egenNæring.næringsinntekt}</FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.blittYrkesaktivSiste3År" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={!!egenNæring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.oppstartsdato && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ArbeidsforholdOppsummering.yrkesaktivDato" />
                        </FormSummary.Label>
                        <FormSummary.Value>{formatDate(egenNæring.oppstartsdato)}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
}

export function FrilansSummary({ onVilEndreSvar }: { readonly onVilEndreSvar: () => void }) {
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
                        <FormattedMessage id="ArbeidsforholdOppsummering.Oppstart" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(frilans.oppstart)}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.JobberFremdelesSomFrilans" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={frilans.jobberFremdelesSomFrilans} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
}

export function JobbetIUtlandetSummary({ onVilEndreSvar }: { readonly onVilEndreSvar: () => void }) {
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
                        />
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
                                            id="ArbeidsforholdOppsummering.arbeidsforhold.periode"
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
