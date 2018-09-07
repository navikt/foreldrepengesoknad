import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { OppholdÅrsakType, UtsettelseÅrsakType } from '../types/uttaksplan/periodetyper';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';

interface HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps {
    årsak?: UtsettelseÅrsakType | OppholdÅrsakType;
    onChange: (grunn: UtsettelseÅrsakType) => void;
    radios: RadioProps[];
}

type Props = HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps & InjectedIntlProps;

const HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål = (props: Props) => {
    const { onChange, årsak, radios, intl } = props;

    return (
        <RadioPanelGruppeResponsive
            checked={årsak}
            legend={getMessage(intl, 'hvaergrunnentilatduskalutsettedittuttak.spørsmål')}
            radios={radios}
            name="årsakTilUtsettelse"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: UtsettelseÅrsakType) => onChange(v)}
        />
    );
};

export default injectIntl(HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål);
