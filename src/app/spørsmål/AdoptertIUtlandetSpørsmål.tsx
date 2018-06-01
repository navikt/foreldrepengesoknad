import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum BarnAdoptert {
    'ADOPTERT_I_UTLANDET' = 'adoptertIUtlandet',
    'IKKE_ADOPTERT_I_UTLANDET' = 'ikkeAdoptertIUtlandet'
}

interface BarnFødtBolkProps {
    adoptertIUtlandet?: boolean;
    onChange: (
        fødtIUtlandet: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const AdoptertIUtlandetSpørsmål = (props: Props) => {
    const { onChange, adoptertIUtlandet, intl } = props;

    let checked;
    if (adoptertIUtlandet === true) {
        checked = BarnAdoptert.ADOPTERT_I_UTLANDET;
    } else if (adoptertIUtlandet === false) {
        checked = BarnAdoptert.IKKE_ADOPTERT_I_UTLANDET;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'adoptertIUtlandet.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: BarnAdoptert.ADOPTERT_I_UTLANDET
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: BarnAdoptert.IKKE_ADOPTERT_I_UTLANDET
                }
            ]}
            name="adoptertIUtlandet"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: BarnAdoptert
            ) => onChange(v === BarnAdoptert.ADOPTERT_I_UTLANDET, e)}
        />
    );
};

export default injectIntl(AdoptertIUtlandetSpørsmål);
