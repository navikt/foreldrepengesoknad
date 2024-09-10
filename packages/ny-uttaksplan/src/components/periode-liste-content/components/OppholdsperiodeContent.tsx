import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { TidsperiodenString, formatDateExtended } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';

interface Props {
    periode: Planperiode;
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
                                {formatDateExtended(periode.fom)} - {formatDateExtended(periode.tom)}
                            </BodyShort>
                            <BodyShort>
                                {getVarighetString(
                                    TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                                    intl,
                                )}
                            </BodyShort>
                        </>
                    )}
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <BodyShort>{`${periode.oppholdÅrsak} for ${navnPåForelder}`}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default OppholdsperiodeContent;
