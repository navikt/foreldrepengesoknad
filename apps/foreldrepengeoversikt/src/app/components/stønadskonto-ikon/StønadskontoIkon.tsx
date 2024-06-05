import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { StønadskontoType } from '@navikt/fp-constants';
import { getUttaksperiodeFarge } from '@navikt/fp-utils';

import { Forelder } from 'app/types/Forelder';
import { MorsAktivitet } from 'app/types/MorsAktivitet';
import { PeriodeResultat } from 'app/types/PeriodeResultat';
import { getStønadskontoForelderNavn } from 'app/utils/periodeUtils';
import { NavnPåForeldre } from 'app/utils/personUtils';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export interface Props {
    erFarEllerMedmor: boolean;
    konto: StønadskontoType;
    morsAktivitet: MorsAktivitet | undefined;
    navnPåForeldre: NavnPåForeldre;
    periodeResultat: PeriodeResultat | undefined;
    forelder: Forelder | undefined;
    erAleneOmOmsorg?: boolean;
    gradert?: boolean;
}

const StønadskontoIkon: FunctionComponent<Props> = ({
    konto,
    gradert,
    navnPåForeldre,
    periodeResultat,
    morsAktivitet,
    erFarEllerMedmor,
    forelder,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    return (
        <IconBox color={getUttaksperiodeFarge(konto, forelder, erFarEllerMedmor, undefined)} stripes={gradert}>
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoForelderNavn(
                    intl,
                    konto,
                    navnPåForeldre,
                    periodeResultat,
                    morsAktivitet,
                    erFarEllerMedmor,
                    erAleneOmOmsorg,
                )}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
