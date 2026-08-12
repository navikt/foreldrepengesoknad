import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { AndreInntektskilder } from 'types/AndreInntektskilder';

import { FormSummary } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

interface Props {
    onVilEndreSvar: () => void;
    andreInntektskilder?: AndreInntektskilder[];
}

export const AndreInntektskilderOppsummering = ({ andreInntektskilder, onVilEndreSvar }: Props) => {
    if (!andreInntektskilder) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="AndreInntektskilderOppsummering.AndreInntekter" />
                </FormSummary.Heading>
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
                                            {annenInntektskilde.type === 'JOBB_I_UTLANDET' && (
                                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Utlandet" />
                                            )}
                                            {annenInntektskilde.type === 'ETTERLØNN_SLUTTPAKKE' && (
                                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Etterlønn" />
                                            )}
                                            {annenInntektskilde.type === 'MILITÆR_ELLER_SIVILTJENESTE' && (
                                                <FormattedMessage id="AndreInntektskilderStep.RadioButton.Førstegangstjeneste" />
                                            )}
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                    {annenInntektskilde.type === 'JOBB_I_UTLANDET' && (
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
                                                        {annenInntektskilde.tom && formatDate(annenInntektskilde.tom)}
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                        </>
                                    )}
                                    {annenInntektskilde.type === 'ETTERLØNN_SLUTTPAKKE' && (
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
                                                    {annenInntektskilde.tom && formatDate(annenInntektskilde.tom)}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </>
                                    )}
                                    {annenInntektskilde.type === 'MILITÆR_ELLER_SIVILTJENESTE' && (
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
                                                        {annenInntektskilde.tom && formatDate(annenInntektskilde.tom)}
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
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};
