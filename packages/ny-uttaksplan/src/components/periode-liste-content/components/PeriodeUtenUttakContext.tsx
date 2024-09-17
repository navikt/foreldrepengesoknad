import { CalendarIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { TidsperiodenString } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';

interface Props {
    periode: Planperiode;
}

export const PeriodeUtenUttakContent = ({ periode }: Props) => {
    const intl = useIntl();

    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort weight="semibold">Hele perioden</BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </div>
                <div style={{ marginLeft: '1rem', paddingTop: '0.25rem' }}>
                    <BodyShort>Du skal ikke ha foreldrepenger</BodyShort>
                </div>
            </div>
        </div>
    );
};

export default PeriodeUtenUttakContent;
