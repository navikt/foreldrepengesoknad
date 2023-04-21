import { formatDate, hasValue, intlUtils } from '@navikt/fp-common';
import { AdoptertAnnetBarn, AdoptertStebarn, isAdoptertStebarn } from 'app/context/types/Barn';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { BodyShort } from '@navikt/ds-react';

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
                <BodyShort>
                    <FormattedMessage id={barn.adoptertIUtlandet ? 'ja' : 'nei'} />
                </BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt
                title={intlUtils(intl, 'oppsummering.barn.ankomstdato')}
                visible={hasValue(barn.ankomstdato)}
            >
                <BodyShort>{formatDate(barn.ankomstdato!)}</BodyShort>
            </OppsummeringsPunkt>
        </>
    );
};

export default BarnAdoptertIUtlandetDetaljer;
