import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';

export enum Forelder1ForSyk {
    'FOR_SYK' = 'erSyk',
    'IKKE_FOR_SYK' = 'ikkeForSyk'
}

interface BarnFødtBolkProps {
    erForelder1ForSyk: boolean;
    onChange: (
        erBarnetFødt: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const Forelder1ForSykSpørsmål = (props: Props) => {
    const { onChange, erForelder1ForSyk, intl, ...otherProps } = props;

    let checked;
    if (erForelder1ForSyk === true) {
        checked = Forelder1ForSyk.FOR_SYK;
    } else if (erForelder1ForSyk === false) {
        checked = Forelder1ForSyk.IKKE_FOR_SYK;
    }

    return (
        <RadioPanelGruppeResponsive
            name="forelder1ForSykSpørsmål"
            checked={checked}
            legend={getMessage(intl, 'erForelder1ForSyk.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: Forelder1ForSyk.FOR_SYK
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: Forelder1ForSyk.IKKE_FOR_SYK
                }
            ]}
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: Forelder1ForSyk
            ) => onChange(v === Forelder1ForSyk.FOR_SYK, e)}
            {...otherProps}
        />
    );
};

export default injectIntl(Forelder1ForSykSpørsmål);
