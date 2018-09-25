import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Uttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { NavnPåForeldre } from 'common/types';
import { RecursivePartial } from '../../../types/Partial';
import AktivitetskravMorPart from '../../utsettelsesperiode-form/partials/aktivitetskrav-mor-part/AktivitetskravMorPart';

interface FellesperiodeUttakFormProps {
    periode: RecursivePartial<Uttaksperiode>;
    navnPåForeldre: NavnPåForeldre;
    søkerErFarMedmor: boolean;
    annenForelderSkalHaForeldrepenger: boolean;
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
}

type Props = FellesperiodeUttakFormProps & InjectedIntlProps;

class FellesperiodeUttakForm extends React.Component<Props> {
    render() {
        const { annenForelderSkalHaForeldrepenger, søkerErFarMedmor, navnPåForeldre, periode, onChange } = this.props;

        if (annenForelderSkalHaForeldrepenger && søkerErFarMedmor) {
            return <AktivitetskravMorPart periode={periode} navnPåForeldre={navnPåForeldre} onChange={onChange} />;
        }
        return null;
    }
}

export default injectIntl(FellesperiodeUttakForm);
