import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum AndreForelderen {
    'ER_INFORMERT' = 'erInformert',
    'IKKE_INFORMERT' = 'ikkeInformert'
}

interface ErDenAndreForelderenInformertSpørsmål {
    navn?: string;
    erDenAndreForelderenInformert?: boolean;
    onChange: (erDenAndreForelderenInformert: boolean) => void;
}

type Props = ErDenAndreForelderenInformertSpørsmål & InjectedIntlProps;

const ErDenAndreForelderenInformertSpørsmål = (props: Props) => {
    const { onChange, intl, erDenAndreForelderenInformert, navn, ...otherProps } = props;

    let checked;
    if (erDenAndreForelderenInformert === true) {
        checked = AndreForelderen.ER_INFORMERT;
    } else if (erDenAndreForelderenInformert === false) {
        checked = AndreForelderen.IKKE_INFORMERT;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erDenAndreForelderenInformert.spørsmål', {
                navn
            })}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: AndreForelderen.ER_INFORMERT
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: AndreForelderen.IKKE_INFORMERT
                }
            ]}
            name="erDenAndreForelderenInformert"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: AndreForelderen) =>
                onChange(v === AndreForelderen.ER_INFORMERT)
            }
            {...otherProps}
        />
    );
};
export default injectIntl(ErDenAndreForelderenInformertSpørsmål);
