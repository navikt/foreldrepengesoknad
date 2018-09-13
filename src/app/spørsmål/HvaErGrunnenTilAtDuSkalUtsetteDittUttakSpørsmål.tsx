import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { Utsettelsesvariant } from '../components/utsettelsesperiode-form/UtsettelsesperiodeForm';

interface HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps {
    variant?: Utsettelsesvariant;
    onChange: (variant: Utsettelsesvariant) => void;
    radios: RadioProps[];
}

type Props = HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps & InjectedIntlProps;

const HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål = (props: Props) => {
    const { onChange, variant, radios, intl } = props;

    return (
        <RadioPanelGruppeResponsive
            checked={variant}
            twoColumns={true}
            legend={getMessage(intl, 'hvaergrunnentilatduskalutsettedittuttak.spørsmål')}
            radios={radios}
            name="årsakTilUtsettelse"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: Utsettelsesvariant) => onChange(v)}
        />
    );
};

export default injectIntl(HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål);
