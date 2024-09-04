import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre, Uttaksperiode, getVarighetString } from '@navikt/fp-common';
import { Tidsperioden, formatDateExtended } from '@navikt/fp-utils';

import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';

interface Props {
    periode: Uttaksperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

const UttaksperiodeContent: FunctionComponent<Props> = ({
    periode,
    inneholderKunEnPeriode,
    navnPåForeldre,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();
    const stønadskontoNavn = getStønadskontoNavn(intl, periode.konto, navnPåForeldre, erFarEllerMedmor);

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
                <div style={{ marginLeft: '1rem', paddingTop: '0.25rem' }}>
                    <BodyShort>{stønadskontoNavn}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default UttaksperiodeContent;
