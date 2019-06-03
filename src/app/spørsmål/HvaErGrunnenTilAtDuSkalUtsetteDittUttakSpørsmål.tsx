import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { Utsettelsesvariant } from '../components/utsettelse-form/UtsettelseForm';
import ValiderbarRadioPanelGruppeResponsive from 'common/lib/validation/elements/ValiderbarRadioPanelGruppeResponsive';
import { Validator } from 'common/lib/validation/types';

interface HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps {
    variant?: Utsettelsesvariant;
    validatorer?: Validator[];
    onChange: (variant: Utsettelsesvariant) => void;
    radios: RadioProps[];
    infotekst?: string;
}

type Props = HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps & InjectedIntlProps;

const HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål = (props: Props) => {
    const { onChange, variant, radios, validatorer, infotekst, intl } = props;

    return (
        <ValiderbarRadioPanelGruppeResponsive
            infoboksTekst={infotekst}
            checked={variant}
            twoColumns={true}
            legend={getMessage(intl, 'hvaergrunnentilatduskalutsettedittuttak.spørsmål')}
            radios={radios}
            name="årsakTilUtsettelse"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: Utsettelsesvariant) => onChange(v)}
            validators={validatorer}
        />
    );
};

export default injectIntl(HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål);
