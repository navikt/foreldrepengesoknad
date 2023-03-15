import { MorsAktivitet } from 'app/types/MorsAktivitet';
import { PeriodeResultat } from 'app/types/PeriodeResultat';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { getStønadskontoForelderNavn } from 'app/utils/periodeUtils';
import { NavnPåForeldre } from 'app/utils/personUtils';
import { getStønadskontoFarge } from 'app/utils/styleUtils';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export interface Props {
    erAleneOmOmsorg?: boolean;
    erFarEllerMedmor?: boolean;
    gradert?: boolean;
    konto: StønadskontoType;
    morsAktivitet: MorsAktivitet | undefined;
    navnPåForeldre: NavnPåForeldre;
    periodeResultat: PeriodeResultat | undefined;
}

const StønadskontoIkon: FunctionComponent<Props> = ({
    konto,
    gradert,
    navnPåForeldre,
    periodeResultat,
    morsAktivitet,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    return (
        <IconBox color={getStønadskontoFarge(konto)} stripes={gradert}>
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoForelderNavn(
                    intl,
                    konto,
                    navnPåForeldre,
                    periodeResultat,
                    morsAktivitet,
                    erFarEllerMedmor,
                    erAleneOmOmsorg
                )}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
