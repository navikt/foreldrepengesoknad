import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';

export enum MorForSyk {
    'FOR_SYK' = 'forSyk',
    'IKKE_FOR_SYK' = 'ikkeForSyk'
}

interface MorForSykSpørsmålProps {
    erMorForSyk?: boolean;
    onChange: (
        erBarnetFødt: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = MorForSykSpørsmålProps & InjectedIntlProps;

const MorForSykSpørsmål = (props: Props) => {
    const { onChange, erMorForSyk, intl, ...otherProps } = props;

    let checked;
    if (erMorForSyk === true) {
        checked = MorForSyk.FOR_SYK;
    } else if (erMorForSyk === false) {
        checked = MorForSyk.IKKE_FOR_SYK;
    }

    return (
        <RadioPanelGruppeResponsive
            name="morForSykSpørsmål"
            checked={checked}
            legend={getMessage(intl, 'morForSykSpørsmål.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: MorForSyk.FOR_SYK
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: MorForSyk.IKKE_FOR_SYK
                }
            ]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: MorForSyk) =>
                onChange(v === MorForSyk.FOR_SYK, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(MorForSykSpørsmål);
