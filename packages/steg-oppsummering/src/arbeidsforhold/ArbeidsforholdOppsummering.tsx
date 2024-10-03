import { FormattedMessage, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import {
    Arbeidsforhold,
    ArbeidsforholdOgInntekt,
    EgenNæring,
    Frilans,
    Næringstype,
    isArbeidsforholdOgInntektFp,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { JaNeiTekst } from '../OppsummeringPanel';

interface ArbeidsforholdOppsummeringProps {
    readonly arbeidsforholdOgInntekt?: ArbeidsforholdOgInntekt;
    readonly arbeidsforhold: Arbeidsforhold[];
    readonly onVilEndreSvar: () => void;
}

export const ArbeidsforholdOppsummering: React.FC<ArbeidsforholdOppsummeringProps> = ({
    arbeidsforholdOgInntekt,
    arbeidsforhold,
    onVilEndreSvar,
}) => {
    if (!arbeidsforholdOgInntekt) {
        return null;
    }

    const erForeldrepenger = isArbeidsforholdOgInntektFp(arbeidsforholdOgInntekt);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="ArbeidsforholdOppsummering.Arbeid" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="ArbeidsforholdOppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.OmArbeidsforhold" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {arbeidsforhold.length === 0 && (
                            <FormattedMessage id="ArbeidsforholdOppsummering.IngenRegistrerteArbeidsforhold" />
                        )}
                        {arbeidsforhold.length > 0 && (
                            <FormSummary.Answers>
                                {arbeidsforhold.map((etArbeidsforhold) => (
                                    <ArbeidsforholdFormSummaryValue
                                        key={etArbeidsforhold.arbeidsgiverId}
                                        arbeidsforhold={etArbeidsforhold}
                                    />
                                ))}
                            </FormSummary.Answers>
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        {erForeldrepenger && (
                            <FormattedMessage id="ArbeidsforholdOppsummering.HarDuJobbetSomFrilansFp" />
                        )}
                        {!erForeldrepenger && (
                            <FormattedMessage id="ArbeidsforholdOppsummering.HarDuJobbetSomFrilans" />
                        )}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={arbeidsforholdOgInntekt.harJobbetSomFrilans} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        {erForeldrepenger && (
                            <FormattedMessage id="ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivendeFp" />
                        )}
                        {!erForeldrepenger && (
                            <FormattedMessage id="ArbeidsforholdOppsummering.HarJobbetSomSelvstendigNæringsdrivende" />
                        )}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {!erForeldrepenger && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ArbeidsforholdOppsummering.HarHattArbeidIUtlandet" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiTekst ja={arbeidsforholdOgInntekt.harHattArbeidIUtlandet} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {erForeldrepenger && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ArbeidsforholdOppsummering.HarHattAndreInntektskilder" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiTekst ja={arbeidsforholdOgInntekt.harHattAndreInntektskilder} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

const ArbeidsforholdFormSummaryValue = ({ arbeidsforhold }: { readonly arbeidsforhold: Arbeidsforhold }) => {
    const intl = useIntl();

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                {capitalizeFirstLetterInEveryWordOnly(arbeidsforhold.arbeidsgiverNavn)},{' '}
                {arbeidsforhold.stillingsprosent}%
            </FormSummary.Label>
            <FormSummary.Value>
                Org nr: {arbeidsforhold.arbeidsgiverId},{' '}
                <FormattedMessage
                    id="ArbeidsforholdFormSummaryValue.arbeidsforhold.periode"
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
};

interface SelvstendigNæringsdrivendeOppsummeringProps {
    readonly onVilEndreSvar: () => void;
    readonly egenNæring?: EgenNæring;
}

export const SelvstendigNæringsdrivendeOppsummering: React.FC<SelvstendigNæringsdrivendeOppsummeringProps> = ({
    onVilEndreSvar,
    egenNæring,
}) => {
    if (!egenNæring) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="ArbeidsforholdOppsummering.Næring" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="ArbeidsforholdOppsummering.EndreSvar" />
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
                    <FormSummary.Value>{formatDate(egenNæring.fom)}</FormSummary.Value>
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
                        <FormSummary.Value>{formatDate(egenNæring.tom)}</FormSummary.Value>
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
};

interface FrilansOppsummeringProps {
    readonly onVilEndreSvar: () => void;
    readonly frilans?: Frilans;
}

export const FrilansOppsummering: React.FC<FrilansOppsummeringProps> = ({ onVilEndreSvar, frilans }) => {
    if (!frilans) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="ArbeidsforholdOppsummering.Frilans" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="ArbeidsforholdOppsummering.EndreSvar" />
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
};
