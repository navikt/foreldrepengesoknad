import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, FormSummary } from '@navikt/ds-react';

import {
    ArbeidsforholdOgInntekt,
    EksternArbeidsforholdDto_fpoversikt,
    Frilans,
    NæringDto,
    isArbeidsforholdOgInntektFp,
} from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { JaNeiTekst } from '../OppsummeringPanel';

interface ArbeidsforholdOppsummeringProps {
    readonly arbeidsforholdOgInntekt?: ArbeidsforholdOgInntekt;
    readonly arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    readonly onVilEndreSvar: () => void;
}

export const ArbeidsforholdOppsummering = ({
    arbeidsforholdOgInntekt,
    arbeidsforhold,
    onVilEndreSvar,
}: ArbeidsforholdOppsummeringProps) => {
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
                    {arbeidsforhold.length > 0 && (
                        <Alert variant="info" style={{ marginTop: 'var(--ax-space-8)' }}>
                            <FormattedMessage
                                id="ArbeidsforholdOppsummering.inntektsmelding"
                                values={{ antall: arbeidsforhold.length }}
                            />
                        </Alert>
                    )}
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
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="ArbeidsforholdOppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};

const ArbeidsforholdFormSummaryValue = ({
    arbeidsforhold,
}: {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt;
}) => {
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
                        fom: formatDate(arbeidsforhold.from),
                        tom: arbeidsforhold.to ? formatDate(arbeidsforhold.to) : intl.formatMessage({ id: 'pågående' }),
                    }}
                />
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

type SelvstendigNæringsdrivendeOppsummeringProps = {
    onVilEndreSvar: () => void;
    egenNæring?: NæringDto;
};

export const SelvstendigNæringsdrivendeOppsummering = ({
    onVilEndreSvar,
    egenNæring,
}: SelvstendigNæringsdrivendeOppsummeringProps) => {
    if (!egenNæring) {
        return null;
    }

    // Pågående ligger i formet, men vi utleder det heller fra tom.
    // Dette fordi type NæringFormValues ligger i en annen pakke, og vi ønsker ikke at pakker avhenger av andre pakker.
    const pågående = !egenNæring.tom;

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="ArbeidsforholdOppsummering.Næring" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.næringstype" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {(() => {
                            switch (egenNæring?.næringstype) {
                                case 'FISKE':
                                    return <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.fiske" />;
                                case 'DAGMAMMA':
                                    return <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.dagmamma" />;
                                case 'JORDBRUK_SKOGBRUK':
                                    return (
                                        <FormattedMessage id="ArbeidsforholdOppsummering.næringstype.jordbrukSkogbruk" />
                                    );
                                case 'ANNEN':
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
                        <JaNeiTekst ja={pågående} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {!pågående && egenNæring.tom && (
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
                    <FormSummary.Value>{egenNæring.næringsinntekt || '-'}</FormSummary.Value>
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

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="ArbeidsforholdOppsummering.egenNæringHattVarigEndringDeSiste4Årene" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {<JaNeiTekst ja={egenNæring.hattVarigEndringAvNæringsinntektSiste4Kalenderår || false} />}
                    </FormSummary.Value>
                </FormSummary.Answer>

                {egenNæring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && egenNæring.varigEndringDato && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="ArbeidsforholdOppsummering.egenNæringVarigEndringDato" />
                            </FormSummary.Label>
                            <FormSummary.Value>{formatDate(egenNæring.varigEndringDato)}</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="ArbeidsforholdOppsummering.egenNæringVarigEndringInntektEtterEndring" />
                            </FormSummary.Label>
                            <FormSummary.Value>{egenNæring.varigEndringInntektEtterEndring}</FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="ArbeidsforholdOppsummering.varigEndringBeskrivelse.label" />
                            </FormSummary.Label>
                            <FormSummary.Value>{egenNæring.varigEndringBeskrivelse}</FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="ArbeidsforholdOppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};

interface FrilansOppsummeringProps {
    readonly onVilEndreSvar: () => void;
    readonly frilans?: Frilans;
}

export const FrilansOppsummering = ({ onVilEndreSvar, frilans }: FrilansOppsummeringProps) => {
    if (!frilans) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="ArbeidsforholdOppsummering.Frilans" />
                </FormSummary.Heading>
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
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="ArbeidsforholdOppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};
