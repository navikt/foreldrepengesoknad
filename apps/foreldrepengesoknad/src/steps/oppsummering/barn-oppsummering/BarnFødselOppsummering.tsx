import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { FødtBarn, UfødtBarn } from '@navikt/fp-common';
import { isFødtBarn } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

interface Props {
    barn: FødtBarn | UfødtBarn;
}

export const getAntallBarnTekst = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1) {
        return intl.formatMessage({ id: 'oppsummering.barn.antallBarn.ettBarn' });
    }

    if (antallBarn === 2) {
        return intl.formatMessage({ id: 'oppsummering.barn.antallBarn.toBarn' });
    }

    return intl.formatMessage({ id: 'oppsummering.barn.antallBarn.flere' }, { antallBarn });
};

export const BarnFødselOppsummering = ({ barn }: Props) => {
    const intl = useIntl();

    const erBarnetfødt = isFødtBarn(barn);

    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="omBarnet.erBarnetFødt" />
                </FormSummary.Label>
                <FormSummary.Value>
                    {erBarnetfødt ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />}
                </FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    {erBarnetfødt ? (
                        <FormattedMessage id="omBarnet.antallBarn.født" />
                    ) : (
                        <FormattedMessage id="omBarnet.antallBarn.termin" />
                    )}
                </FormSummary.Label>
                <FormSummary.Value>{getAntallBarnTekst(barn.antallBarn, intl)}</FormSummary.Value>
            </FormSummary.Answer>
            {barn.termindato && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="omBarnet.termindato.termin" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(barn.termindato)}</FormSummary.Value>
                </FormSummary.Answer>
            )}
            {erBarnetfødt && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        {barn.antallBarn > 1 ? (
                            <FormattedMessage id="omBarnet.fødselsdato.flereBarn" />
                        ) : (
                            <FormattedMessage id="omBarnet.fødselsdato" />
                        )}
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(barn.fødselsdatoer[0])}</FormSummary.Value>
                </FormSummary.Answer>
            )}
            {erBarnetfødt === false && barn.terminbekreftelsedato && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="omBarnet.terminbekreftelseDato" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(barn.terminbekreftelsedato)}</FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    );
};
