import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';

export enum BarnFødt {
    'ADOPTERT_I_UTLANDET' = 'fødtIUtlandet',
    'IKKE_ADOPTERT_i_UTLANDET' = 'ikkeFødtIUtlandet'
}

interface BarnFødtBolkProps {
    adoptertIUtlandet: boolean;
    onChange: (
        fødtIUtlandet: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const AdoptertIUtlandetSpørsmål = (props: Props) => {
    const { onChange, adoptertIUtlandet, intl, ...otherProps } = props;

    let checked;
    if (adoptertIUtlandet === true) {
        checked = BarnFødt.ADOPTERT_I_UTLANDET;
    } else if (adoptertIUtlandet === false) {
        checked = BarnFødt.IKKE_ADOPTERT_i_UTLANDET;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'Adoptert i utlandet?')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: BarnFødt.ADOPTERT_I_UTLANDET
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: BarnFødt.IKKE_ADOPTERT_i_UTLANDET
                }
            ]}
            name="barnFødt"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: BarnFødt) =>
                onChange(v === BarnFødt.ADOPTERT_I_UTLANDET, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(AdoptertIUtlandetSpørsmål);
