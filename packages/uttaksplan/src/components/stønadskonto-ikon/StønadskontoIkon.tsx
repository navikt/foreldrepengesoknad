import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Forelder, NavnPåForeldre, Situasjon, StønadskontoType, getStønadskontoNavn } from '@navikt/fp-common';

import { getUttaksperiodeFarge } from '../../utils/styleUtils';
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
            color={getUttaksperiodeFarge(konto, forelder, erFarEllerMedmor, undefined, harMidlertidigOmsorg)}
            stripes={gradert}
        >
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
