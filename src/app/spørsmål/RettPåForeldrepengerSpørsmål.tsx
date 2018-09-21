import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum AnnenForelder {
    'HAR_RETT_PÅ_FORELDREPENGER' = 'harRettPåForeldrepenger',
    'HAR_IKKE_RETT_PÅ_FORELDREPENGER' = 'harIkkeRettPåForeldrepenger'
}

interface RettPåForeldrepengerSpørsmålProps {
    navnAnnenForelder?: string;
    harAnnenForelderRettPåForeldrepenger?: boolean;
    onChange: (harAnnenForelderRettPåForeldrepenger: boolean) => void;
}

type Props = RettPåForeldrepengerSpørsmålProps & InjectedIntlProps;
const RettPåForeldrepengerSpørsmål = (props: Props) => {
    const { onChange, harAnnenForelderRettPåForeldrepenger, navnAnnenForelder, intl } = props;

    let checked;
    if (harAnnenForelderRettPåForeldrepenger === true) {
        checked = AnnenForelder.HAR_RETT_PÅ_FORELDREPENGER;
    } else if (harAnnenForelderRettPåForeldrepenger === false) {
        checked = AnnenForelder.HAR_IKKE_RETT_PÅ_FORELDREPENGER;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'annenForelderRettPåForeldrepenger.spørsmål', { navn: navnAnnenForelder })}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: AnnenForelder.HAR_RETT_PÅ_FORELDREPENGER
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: AnnenForelder.HAR_IKKE_RETT_PÅ_FORELDREPENGER
                }
            ]}
            name="annenForelderRettPåForeldrepenger"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: AnnenForelder) =>
                onChange(v === AnnenForelder.HAR_RETT_PÅ_FORELDREPENGER)
            }
        />
    );
};

export default injectIntl(RettPåForeldrepengerSpørsmål);
