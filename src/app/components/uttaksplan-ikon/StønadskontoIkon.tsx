import * as React from 'react';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import UttaksplanIkon, { UttaksplanIkonKeys } from './UttaksplanIkon';
import { Forelder, NavnPåForeldre } from 'common/types';
import { getStønadskontoFarge } from '../../util/uttaksplan/styleUtils';
import IconBox from '../icon-box/IconBox';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getStønadskontoNavn } from '../../util/uttaksplan';

export interface Props {
    konto: StønadskontoType;
    forelder?: Forelder;
    gradert?: boolean;
    navnPåForeldre: NavnPåForeldre;
    outline?: boolean;
}

const StønadskontoIkon: React.StatelessComponent<Props & InjectedIntlProps> = ({
    konto,
    forelder,
    gradert,
    outline,
    intl,
    navnPåForeldre
}) => (
    <IconBox color={getStønadskontoFarge(konto, forelder, true)} stripes={gradert} outline={outline}>
        <UttaksplanIkon ikon={UttaksplanIkonKeys.uttak} title={getStønadskontoNavn(intl, konto, navnPåForeldre)} />
    </IconBox>
);

export default injectIntl(StønadskontoIkon);
