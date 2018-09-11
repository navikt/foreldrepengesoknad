import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { Dekningsgrad } from 'common/types';

interface DekningsgradSpørsmålProps {
    dekningsgrad?: Dekningsgrad;
    erAleneomsorg?: boolean;
    onChange: (dekningsgrad: Dekningsgrad) => void;
}

type Props = DekningsgradSpørsmålProps & InjectedIntlProps;

const DekningsgradSpørsmål = (props: Props) => {
    const { onChange, erAleneomsorg, dekningsgrad, intl } = props;

    let checked;
    if (dekningsgrad === '100') {
        checked = '100';
    } else if (dekningsgrad === '80') {
        checked = '80';
    }

    const labelKey: string = erAleneomsorg ? 'spørsmål.dekningsgrad.label--aleneomsorg' : 'spørsmål.dekningsgrad.label';

    return (
        <RadioPanelGruppeResponsive
            twoColumns={true}
            checked={checked}
            legend={getMessage(intl, labelKey)}
            radios={[
                {
                    label: getMessage(intl, 'spørsmål.dekningsgrad.100'),
                    value: '100%'
                },
                {
                    label: getMessage(intl, 'spørsmål.dekningsgrad.80'),
                    value: '80%'
                }
            ]}
            name="dekninsgrad"
            infoboksTekst={getMessage(intl, 'spørsmål.dekningsgrad.hjelpetekst')}
            onChange={(e, v: Dekningsgrad) => onChange(v)}
        />
    );
};

export default injectIntl(DekningsgradSpørsmål);
