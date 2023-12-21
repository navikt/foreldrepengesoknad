import { FunctionComponent } from 'react';
import * as countries from 'i18n-iso-countries';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/context/types/AnnenInntekt';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { useIntl } from 'react-intl';
import { intlUtils } from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    annenInntekt: AnnenInntekt;
}

const AnnenInntektDetaljer: FunctionComponent<Props> = ({ annenInntekt }) => {
    const intl = useIntl();
    const { type } = annenInntekt;
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        const jobbIUtlandetInntekt = annenInntekt as JobbIUtlandetInntekt;
        return (
            <>
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.arbeidsgiverNavn')}>
                    <BodyShort>{jobbIUtlandetInntekt.arbeidsgiverNavn}</BodyShort>
                </OppsummeringsPunkt>
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.arbeidsgiverLand')}>
                    <BodyShort>{countries.getName(jobbIUtlandetInntekt.land, 'nb')}</BodyShort>
                </OppsummeringsPunkt>
            </>
        );
    }
    return null;
};

export default AnnenInntektDetaljer;
