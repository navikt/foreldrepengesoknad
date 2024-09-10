import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { TidsperiodenString, formatDateExtended } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';

interface Props {
    periode: Planperiode;
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
    const stønadskontoNavn = getStønadskontoNavn(intl, periode.kontoType!, navnPåForeldre, erFarEllerMedmor);

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
                <div style={{ marginLeft: '1rem', paddingTop: '0.25rem' }}>
                    <BodyShort>{stønadskontoNavn}</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default UttaksperiodeContent;
