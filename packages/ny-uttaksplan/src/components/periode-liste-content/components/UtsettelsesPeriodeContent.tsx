import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

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
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-8">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">
                        <FormattedMessage id="uttaksplan.varighet.helePerioden" />
                    </BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <HStack gap="space-8">
                    {periode.morsAktivitet !== undefined && (
                        <BodyShort>{getMorsAktivitetTekst(intl, periode.morsAktivitet)}</BodyShort>
                    )}
                    {periode.utsettelseÅrsak !== UtsettelseÅrsakType.Fri && (
                        <BodyShort>{finnTekstForUtsettelseÅrsak(intl, utsettelseÅrsak)}</BodyShort>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};
