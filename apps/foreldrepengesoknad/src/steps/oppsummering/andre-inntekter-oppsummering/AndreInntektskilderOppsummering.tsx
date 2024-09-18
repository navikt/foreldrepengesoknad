import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import { FormSummary } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

interface Props {
    onVilEndreSvar: () => void;
    andreInntektskilder?: AndreInntektskilder[];
}

export const AndreInntektskilderOppsummering: React.FC<Props> = ({ andreInntektskilder, onVilEndreSvar }) => {
    if (!andreInntektskilder) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="AndreInntektskilderOppsummering.AndreInntekter" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            {andreInntektskilder.map((annenInntektskilde, index) => (
                <FormSummary.Answers key={`${annenInntektskilde.type}-${annenInntektskilde.fom}`}>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="AndreInntektskilderOppsummering.AnnenInntekt"
                                values={{ number: index + 1 }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <FormSummary.Answers>
                                <Fragment>
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <FormattedMessage id="AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder" />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            {annenInntektskilde.type === AnnenInntektType.JOBB_I_UTLANDET && (
                                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Utlandet" />
                                            )}
                                            {annenInntektskilde.type === AnnenInntektType.SLUTTPAKKE && (
                                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Etterlønn" />
                                            )}
                                            {annenInntektskilde.type === AnnenInntektType.MILITÆRTJENESTE && (
                                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Førstegangstjeneste" />
                                            )}
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                    {annenInntektskilde.type === AnnenInntektType.JOBB_I_UTLANDET && (
                                        <>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <FormattedMessage id="JobbIUtlandetPanel.LandDuHarJobbet" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>{annenInntektskilde.land}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <FormattedMessage id="JobbIUtlandetPanel.NavnPåArbeidsgiver" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>
                                                    {annenInntektskilde.arbeidsgiverNavn}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                            {!annenInntektskilde.tom && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <FormattedMessage id="JobbIUtlandetPanel.JobberDuDerNå" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        <FormattedMessage id="pågående" />
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <FormattedMessage id="JobbIUtlandetPanel.Fom" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>
                                                    {formatDate(annenInntektskilde.fom)}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                            {annenInntektskilde.tom && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <FormattedMessage id="JobbIUtlandetPanel.Tom" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        {formatDate(annenInntektskilde.tom)}
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                        </>
                                    )}
                                    {annenInntektskilde.type === AnnenInntektType.SLUTTPAKKE && (
                                        <>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Fom" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>
                                                    {formatDate(annenInntektskilde.fom)}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <FormattedMessage id="EtterlønnEllerSluttvederlagPanel.Tom" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>
                                                    {formatDate(annenInntektskilde.tom)}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </>
                                    )}
                                    {annenInntektskilde.type === AnnenInntektType.MILITÆRTJENESTE && (
                                        <>
                                            {annenInntektskilde.pågående && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <FormattedMessage id="FørstegangstjenestePanel.IFørstegangstjenesteNå" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        <FormattedMessage id="FørstegangstjenestePanel.RadioButton.Ja" />
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <FormattedMessage id="FørstegangstjenestePanel.Fom" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>
                                                    {formatDate(annenInntektskilde.fom)}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                            {annenInntektskilde.tom && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <FormattedMessage id="JobbIUtlandetPanel.Tom" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        {formatDate(annenInntektskilde.tom)}
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                        </>
                                    )}
                                </Fragment>
                            </FormSummary.Answers>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            ))}
        </FormSummary>
    );
};
