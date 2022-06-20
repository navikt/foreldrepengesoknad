import { Forelder } from 'app/types/Forelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getStønadskontoFarge } from 'uttaksplan/utils/styleUtils';
import { getStønadskontoNavn } from 'uttaksplan/utils/stønadskontoerUtils';
import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export interface Props {
    konto: StønadskontoType;
    forelder?: Forelder;
    gradert?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor?: boolean;
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
    situasjon,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    return (
        <IconBox color={getStønadskontoFarge(konto, forelder, true, harMidlertidigOmsorg)} stripes={gradert}>
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, situasjon, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
