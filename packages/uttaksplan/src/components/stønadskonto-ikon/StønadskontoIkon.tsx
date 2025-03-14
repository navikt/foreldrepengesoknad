import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Forelder, NavnPåForeldre, Situasjon, StønadskontoType } from '@navikt/fp-common';
import { StønadskontoType as StønadskontoTypeType } from '@navikt/fp-constants';
import { getUttaksperiodeFarge } from '@navikt/fp-utils';

import { getStønadskontoNavn } from '../../utils/stønadskontoerUtils';
import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export interface Props {
    konto: StønadskontoType;
    forelder?: Forelder;
    gradert?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    situasjon?: Situasjon;
    erAleneOmOmsorg?: boolean;
    harMidlertidigOmsorg?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const StønadskontoIkon: FunctionComponent<Props> = ({
    konto,
    forelder,
    gradert,
    navnPåForeldre,
    harMidlertidigOmsorg,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();
    return (
        <IconBox
            color={getUttaksperiodeFarge(
                konto as StønadskontoTypeType,
                forelder,
                erFarEllerMedmor,
                harMidlertidigOmsorg,
            )}
            stripes={gradert}
        >
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};
// eslint-disable-next-line import/no-default-export
export default StønadskontoIkon;
