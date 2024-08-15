import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre, Oppholdsperiode, getVarighetString } from '@navikt/fp-common';
import { Tidsperioden, formatDateExtended } from '@navikt/fp-utils';

interface Props {
    periode: Oppholdsperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    inneholderKunEnPeriode: boolean;
}

const OppholdsperiodeContent: FunctionComponent<Props> = ({
    periode,
    inneholderKunEnPeriode,
    erFarEllerMedmor,
    navnPåForeldre,
}) => {
    const intl = useIntl();

    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

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
                    <BodyShort>{`${periode.årsak} for ${navnPåForelder}`}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default OppholdsperiodeContent;
