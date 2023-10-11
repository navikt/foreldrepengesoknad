import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getStønadskontoFarge } from 'utils/styleUtils';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';
import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import { Forelder, NavnPåForeldre, Situasjon, StønadskontoType } from '@navikt/fp-common';

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
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    return (
        <IconBox color={getStønadskontoFarge(konto, forelder, true, harMidlertidigOmsorg)} stripes={gradert}>
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
