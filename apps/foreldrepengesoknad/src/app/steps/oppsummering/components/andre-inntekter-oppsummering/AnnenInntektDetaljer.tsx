import * as countries from 'i18n-iso-countries';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { AndreInntektskilder } from 'app/types/AndreInntektskilder';

import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    annenInntekt: AndreInntektskilder;
}

const AnnenInntektDetaljer: FunctionComponent<Props> = ({ annenInntekt }) => {
    const intl = useIntl();
    const { type } = annenInntekt;
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        return (
            <>
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.arbeidsgiverNavn' })}>
                    <BodyShort>{annenInntekt.arbeidsgiverNavn}</BodyShort>
                </OppsummeringsPunkt>
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.arbeidsgiverLand' })}>
                    <BodyShort>{countries.getName(annenInntekt.land, 'nb')}</BodyShort>
                </OppsummeringsPunkt>
            </>
        );
    }
    return null;
};

export default AnnenInntektDetaljer;
