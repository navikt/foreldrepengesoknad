import { BriefcaseIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { Uttaksplanperiode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { isUttaksperiode } from '../../../../utils/periodeUtils';
import {
    erUttaksplanperiodeSamtidigUttak,
    erUttaksplanperiodeTapteDager,
    erUttaksplanperiodeUtenUttak,
    erUttaksplanperiodeUtsettelse,
    erUttaksplanperiodeUtsettelseOpphold,
    harUttaksplanperiodePrematuruker,
} from '../../../utils/uttaksplanperiodeUtils';

interface Props {
    uttaksplanperioder: Uttaksplanperiode[];
}

export const SkalJobbeContent = ({ uttaksplanperioder }: Props) => {
    const erUtsettelse = erUttaksplanperiodeUtsettelse(uttaksplanperioder);
    const erPeriodeUtenUttak = erUttaksplanperiodeUtenUttak(uttaksplanperioder);
    const samtidigUttak = erUttaksplanperiodeSamtidigUttak(uttaksplanperioder);
    const erOpphold = erUttaksplanperiodeUtsettelseOpphold(uttaksplanperioder);
    const erHull = erUttaksplanperiodeTapteDager(uttaksplanperioder);
    const erPrematuruker = harUttaksplanperiodePrematuruker(uttaksplanperioder);
    const skalJobbeIPermisjonsperioden = uttaksplanperioder.some(
        (p) => isUttaksperiode(p) && erVanligUttakPeriode(p) && p.gradering !== undefined,
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
