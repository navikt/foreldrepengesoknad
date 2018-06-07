import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum AndreForelderen {
    'ER_INFORMERT' = 'erInformert',
    'IKKE_INFORMERT' = 'ikkeInformert'
}

interface ErDenAndreForelderenInformertSpørsmål {
    navn?: string;
    erInformertOmSøknaden?: boolean;
    onChange: (
        erFrilanser: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = ErDenAndreForelderenInformertSpørsmål & InjectedIntlProps;

const ErDenAndreForelderenInformertSpørsmål = (props: Props) => {
    const {
        onChange,
        intl,
        erInformertOmSøknaden,
        navn,
        ...otherProps
    } = props;

    let checked;
    if (erInformertOmSøknaden === true) {
        checked = AndreForelderen.ER_INFORMERT;
    } else if (erInformertOmSøknaden === false) {
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
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: AndreForelderen
            ) => onChange(v === AndreForelderen.ER_INFORMERT, e)}
            {...otherProps}
        />
    );
};
export default injectIntl(ErDenAndreForelderenInformertSpørsmål);
