import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Uttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { NavnPåForeldre } from 'common/types';
import { RecursivePartial } from '../../../types/Partial';
import AktivitetskravMorBolk from '../../../bolker/AktivitetskravMorBolk';
import { Attachment } from 'common/storage/attachment/types/Attachment';

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
            return (
                <AktivitetskravMorBolk
                    vedlegg={periode.vedlegg as Attachment[]}
                    navnPåForeldre={navnPåForeldre}
                    onChange={onChange}
                />
            );
        }
        return null;
    }
}

export default injectIntl(FellesperiodeUttakForm);
