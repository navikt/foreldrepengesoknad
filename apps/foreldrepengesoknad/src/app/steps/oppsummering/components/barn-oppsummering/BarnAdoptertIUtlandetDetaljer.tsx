import { formatDate, hasValue, intlUtils } from '@navikt/fp-common';
import { AdoptertAnnetBarn, AdoptertStebarn, isAdoptertStebarn } from 'app/context/types/Barn';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    barn: AdoptertAnnetBarn | AdoptertStebarn;
}

const BarnAdoptertIUtlandetDetaljer: FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();

    if (isAdoptertStebarn(barn)) {
        return null;
    }

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.barn.adoptertIUtlandet')}>
                <Normaltekst>
                    <FormattedMessage id={barn.adoptertIUtlandet ? 'ja' : 'nei'} />
                </Normaltekst>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt
                title={intlUtils(intl, 'oppsummering.barn.ankomstdato')}
                visible={hasValue(barn.ankomstdato)}
            >
                <Normaltekst>{formatDate(barn.ankomstdato!)}</Normaltekst>
            </OppsummeringsPunkt>
        </>
    );
};

export default BarnAdoptertIUtlandetDetaljer;
