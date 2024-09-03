import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { AdoptertAnnetBarn, AdoptertStebarn, hasValue, isAdoptertStebarn } from '@navikt/fp-common';
import { formatDate } from '@navikt/fp-utils';

import { førsteOktober2021ReglerGjelder } from 'app/utils/dateUtils';

import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    barn: AdoptertAnnetBarn | AdoptertStebarn;
    familiehendelsesdato: Date;
}

const BarnAdoptertIUtlandetDetaljer: FunctionComponent<Props> = ({ barn, familiehendelsesdato }) => {
    const intl = useIntl();

    if (isAdoptertStebarn(barn) || førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return null;
    }

    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.barn.adoptertIUtlandet' })}>
                <BodyShort>
                    <FormattedMessage id={barn.adoptertIUtlandet ? 'ja' : 'nei'} />
                </BodyShort>
            </OppsummeringsPunkt>
            {hasValue(barn.ankomstdato) && (
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.barn.ankomstdato' })}>
                    <BodyShort>{formatDate(barn.ankomstdato!)}</BodyShort>
                </OppsummeringsPunkt>
            )}
        </>
    );
};

export default BarnAdoptertIUtlandetDetaljer;
