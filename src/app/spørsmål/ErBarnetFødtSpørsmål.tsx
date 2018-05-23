import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';

export enum BarnFødt {
    'ER_FØDT' = 'erFødt',
    'IKKE_FØDT' = 'ikkeFødt'
}

interface BarnFødtBolkProps {
    erBarnetFødt?: boolean;
    onChange: (
        erBarnetFødt: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const ErBarnetFødtSpørsmål = (props: Props) => {
    const { onChange, erBarnetFødt, intl, ...otherProps } = props;

    let checked;
    if (erBarnetFødt === true) {
        checked = BarnFødt.ER_FØDT;
    } else if (erBarnetFødt === false) {
        checked = BarnFødt.IKKE_FØDT;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erBarnetFødt.spørsmål')}
            radios={[
                { label: getMessage(intl, 'ja'), value: BarnFødt.ER_FØDT },
                { label: getMessage(intl, 'nei'), value: BarnFødt.IKKE_FØDT }
            ]}
            name="barnFødt"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: BarnFødt) =>
                onChange(v === BarnFødt.ER_FØDT, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(ErBarnetFødtSpørsmål);
