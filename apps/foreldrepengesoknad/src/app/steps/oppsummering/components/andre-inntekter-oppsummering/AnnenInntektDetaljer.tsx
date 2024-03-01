import * as countries from 'i18n-iso-countries';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/context/types/AnnenInntekt';

import OppsummeringsPunkt from '../OppsummeringsPunkt';

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
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.arbeidsgiverNavn' })}>
                    <BodyShort>{jobbIUtlandetInntekt.arbeidsgiverNavn}</BodyShort>
                </OppsummeringsPunkt>
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.arbeidsgiverLand' })}>
                    <BodyShort>{countries.getName(jobbIUtlandetInntekt.land, 'nb')}</BodyShort>
                </OppsummeringsPunkt>
            </>
        );
    }
    return null;
};

export default AnnenInntektDetaljer;
