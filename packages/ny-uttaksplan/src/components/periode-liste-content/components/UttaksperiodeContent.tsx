import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Uttaksperiode, getVarighetString } from '@navikt/fp-common';
import { Tidsperioden, formatDateExtended } from '@navikt/fp-utils';

interface Props {
    periode: Uttaksperiode;
    inneholderKunEnPeriode: boolean;
}

const UttaksperiodeContent: FunctionComponent<Props> = ({ periode, inneholderKunEnPeriode }) => {
    const intl = useIntl();

    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    {inneholderKunEnPeriode ? (
                        <BodyShort weight="semibold">Hele perioden</BodyShort>
                    ) : (
                        <>
                            <BodyShort weight="semibold">
                                {formatDateExtended(periode.tidsperiode.fom)} -{' '}
                                {formatDateExtended(periode.tidsperiode.tom)}
                            </BodyShort>
                            <BodyShort>
                                {getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl)}
                            </BodyShort>
                        </>
                    )}
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <BodyShort>{periode.konto}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default UttaksperiodeContent;
