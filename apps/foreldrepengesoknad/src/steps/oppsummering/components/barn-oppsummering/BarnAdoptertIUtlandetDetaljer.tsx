import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { førsteOktober2021ReglerGjelder } from 'utils/dateUtils';
import { hasValue } from 'utils/validationUtil';

import { FormSummary } from '@navikt/ds-react';

import { AdoptertAnnetBarn, AdoptertStebarn, isAdoptertStebarn } from '@navikt/fp-common';
import { formatDate } from '@navikt/fp-utils';

interface Props {
    barn: AdoptertAnnetBarn | AdoptertStebarn;
    familiehendelsesdato: Date;
}

const BarnAdoptertIUtlandetDetaljer: FunctionComponent<Props> = ({ barn, familiehendelsesdato }) => {
    if (isAdoptertStebarn(barn) || førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return null;
    }

    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="oppsummering.barn.adoptertIUtlandet" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <FormattedMessage id={barn.adoptertIUtlandet ? 'ja' : 'nei'} />
                </FormSummary.Value>
            </FormSummary.Answer>
            {hasValue(barn.ankomstdato) && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="oppsummering.barn.ankomstdato" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatDate(barn.ankomstdato!)}</FormSummary.Value>
                </FormSummary.Answer>
            )}
        </>
    );
};

export default BarnAdoptertIUtlandetDetaljer;
