import { BriefcaseIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { Permisjonsperiode } from '../../../types/Permisjonsperiode';
import { isHull, isOppholdsperiode, isPrematuruker, isUttaksperiode } from '../../../utils/periodeUtils';

interface Props {
    permisjonsperiode: Permisjonsperiode;
}

export const SkalJobbeContent = ({ permisjonsperiode }: Props) => {
    const erUtsettelse = !!permisjonsperiode.erUtsettelse;
    const erPeriodeUtenUttak = !!permisjonsperiode.erPeriodeUtenUttak;
    const samtidigUttak = !!permisjonsperiode.samtidigUttak;
    const erOpphold = permisjonsperiode.perioder.some(isOppholdsperiode);
    const erHull = permisjonsperiode.perioder.some(isHull);
    const erPrematuruker = permisjonsperiode.perioder.some(isPrematuruker);
    const skalJobbeIPermisjonsperioden = permisjonsperiode.perioder.some(
        (p) => isUttaksperiode(p) && p.gradering !== undefined,
    );

    if (
        erUtsettelse ||
        erPrematuruker ||
        skalJobbeIPermisjonsperioden ||
        erOpphold ||
        erPeriodeUtenUttak ||
        samtidigUttak ||
        erHull
    ) {
        return null;
    }

    return (
        <HStack gap="space-8">
            <div>
                <BriefcaseIcon width={24} height={24} />
            </div>
            <BodyShort>
                <FormattedMessage id="uttaksplan.periodeListeContent.skalIkkeJobbe" />
            </BodyShort>
        </HStack>
    );
};
