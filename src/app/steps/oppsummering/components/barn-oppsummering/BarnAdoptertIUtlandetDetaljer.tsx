import { formatDate, hasValue, intlUtils } from '@navikt/fp-common';
import { AdoptertAnnetBarn, AdoptertStebarn, isAdoptertStebarn } from 'app/context/types/Barn';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
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
            <OppsummeringsPunkt
                title={intlUtils(intl, 'oppsummering.barn.adoptertIUtlandet')}
                text={barn.adoptertIUtlandet ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
            />
            <OppsummeringsPunkt
                title={intlUtils(intl, 'oppsummering.barn.ankomstdato')}
                text={formatDate(barn.ankomstdato!)}
                visible={hasValue(barn.ankomstdato)}
            />
        </>
    );
};

export default BarnAdoptertIUtlandetDetaljer;
