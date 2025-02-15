import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { TidsperiodenString } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';
import { finnTekstForUtsettelseÅrsak } from '../../../utils/periodeUtils';
import { getMorsAktivitetTekst } from './UttaksperiodeContent';

interface Props {
    periode: Planperiode;
}

export const UtsettelsesPeriodeContent = ({ periode }: Props) => {
    const intl = useIntl();
    const { utsettelseÅrsak } = periode;

    if (!utsettelseÅrsak) {
        return null;
    }

    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort weight="semibold">
                        <FormattedMessage id="uttaksplan.varighet.helePerioden" />
                    </BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </div>
                <div style={{ marginLeft: '1rem', paddingTop: '0.25rem' }}>
                    {periode.morsAktivitet !== undefined && (
                        <BodyShort>{getMorsAktivitetTekst(intl, periode.morsAktivitet)}</BodyShort>
                    )}
                    {periode.utsettelseÅrsak !== UtsettelseÅrsakType.Fri && (
                        <BodyShort>{finnTekstForUtsettelseÅrsak(intl, utsettelseÅrsak)}</BodyShort>
                    )}
                </div>
            </div>
        </div>
    );
};
