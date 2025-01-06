import { FormattedMessage, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import {
    AdoptertAnnetBarn,
    AdoptertBarn,
    AdoptertStebarn,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
} from '@navikt/fp-common';
import { formatDate } from '@navikt/fp-utils';

import { getAntallBarnTekst } from './BarnFødselOppsummering';

interface Props {
    barn: AdoptertBarn | AdoptertStebarn | AdoptertAnnetBarn;
}

export const BarnAdoptertOppsummering = ({ barn }: Props) => {
    const intl = useIntl();

    const adoptertStebarn = isAdoptertStebarn(barn);

    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="omBarnet.adopsjonGjelder" />
                </FormSummary.Label>
                <FormSummary.Value>
                    {adoptertStebarn ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />}
                </FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    {adoptertStebarn ? (
                        <FormattedMessage id="omBarnet.adopsjonsdato.stebarn" />
                    ) : (
                        <FormattedMessage id="omBarnet.adopsjonsdato.annetBarn" />
                    )}
                </FormSummary.Label>
                <FormSummary.Value>{formatDate(barn.adopsjonsdato)}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="omBarnet.antallBarn.adopsjon.født" />
                </FormSummary.Label>
                <FormSummary.Value>{getAntallBarnTekst(barn.antallBarn, intl)}</FormSummary.Value>
            </FormSummary.Answer>
            {isAdoptertAnnetBarn(barn) && (
                <>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="omBarnet.adopteresFraUtlandet" />
                        </FormSummary.Label>
                        <FormSummary.Value>{barn.adoptertIUtlandet}</FormSummary.Value>
                    </FormSummary.Answer>
                    {barn.adoptertIUtlandet && barn.ankomstdato && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="omBarnet.ankomstDato" />
                            </FormSummary.Label>
                            <FormSummary.Value>{formatDate(barn.ankomstdato)}</FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </>
            )}
        </>
    );
};
