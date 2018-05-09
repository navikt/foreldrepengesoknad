import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';

enum INorgeVedFødsel {
    'JA' = 'ja',
    'NEI' = 'nei'
}

interface VæreINorgeVedFødselSpørsmålProps {
    fødselINorge: boolean;
    onChange: (
        erMedmor: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = VæreINorgeVedFødselSpørsmålProps & InjectedIntlProps;

const VæreINorgeVedFødselSpørsmål = (props: Props) => {
    const { onChange, fødselINorge, intl, ...otherProps } = props;

    let fødselINorgeValue;
    if (fødselINorge === true) {
        fødselINorgeValue = INorgeVedFødsel.JA;
    } else if (fødselINorge === false) {
        fødselINorgeValue = INorgeVedFødsel.NEI;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={fødselINorgeValue}
            legend={getMessage(intl, 'væreINorgeVedFødsel.spørsmål')}
            radios={[
                { label: getMessage(intl, 'ja'), value: INorgeVedFødsel.JA },
                { label: getMessage(intl, 'nei'), value: INorgeVedFødsel.NEI }
            ]}
            name="væreINorgeVedFødsel"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: INorgeVedFødsel
            ) => onChange(v === INorgeVedFødsel.JA, e)}
            {...otherProps}
        />
    );
};

export default injectIntl(VæreINorgeVedFødselSpørsmål);
