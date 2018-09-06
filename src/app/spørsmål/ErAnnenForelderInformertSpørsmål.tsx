import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum AnnenForelder {
    'ER_INFORMERT' = 'erInformert',
    'IKKE_INFORMERT' = 'ikkeInformert'
}

interface ErAnnenForelderInformertSpørsmålProps {
    navn?: string;
    erAnnenForelderInformert?: boolean;
    onChange: (erAnnenForelderInformert: boolean) => void;
}

type Props = ErAnnenForelderInformertSpørsmålProps & InjectedIntlProps;

const ErAnnenForelderInformertSpørsmål = (props: Props) => {
    const { onChange, intl, erAnnenForelderInformert, navn, ...otherProps } = props;

    let checked;
    if (erAnnenForelderInformert === true) {
        checked = AnnenForelder.ER_INFORMERT;
    } else if (erAnnenForelderInformert === false) {
        checked = AnnenForelder.IKKE_INFORMERT;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erAnnenForelderInformert.spørsmål', {
                navn
            })}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: AnnenForelder.ER_INFORMERT
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: AnnenForelder.IKKE_INFORMERT
                }
            ]}
            name="erAnnenForelderInformert"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: AnnenForelder) =>
                onChange(v === AnnenForelder.ER_INFORMERT)
            }
            {...otherProps}
        />
    );
};
export default injectIntl(ErAnnenForelderInformertSpørsmål);
