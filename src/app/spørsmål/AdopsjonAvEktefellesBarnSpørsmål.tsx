import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { InputChangeEvent } from '../types/dom/Events';

export enum AdopsjonAvEktefellesBarn {
    'ADOPSJON_AV_EKTEFELLES_BARN' = 'adopsjonAvEktefellesBarn',
    'IKKE_ADOPSJON_AV_EKTEFELLES_BARN' = 'ikkeAdopsjonAvEktefelles'
}

interface AdopsjonAvEktefellesBarnSpørsmålProps {
    adopsjonAvEktefellesBarn?: boolean;
    onChange: (adopsjonAvEktefellesBarn: boolean, e: InputChangeEvent) => void;
}

type Props = AdopsjonAvEktefellesBarnSpørsmålProps & InjectedIntlProps;

const AdopsjonAvEktefellesBarnSpørsmål = (props: Props) => {
    const { onChange, adopsjonAvEktefellesBarn, intl } = props;

    let checked;
    if (adopsjonAvEktefellesBarn === true) {
        checked = AdopsjonAvEktefellesBarn.ADOPSJON_AV_EKTEFELLES_BARN;
    } else if (adopsjonAvEktefellesBarn === false) {
        checked = AdopsjonAvEktefellesBarn.IKKE_ADOPSJON_AV_EKTEFELLES_BARN;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'adopsjonAvEktefellesBarn.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: AdopsjonAvEktefellesBarn.ADOPSJON_AV_EKTEFELLES_BARN
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        AdopsjonAvEktefellesBarn.IKKE_ADOPSJON_AV_EKTEFELLES_BARN
                }
            ]}
            name="adopsjonAvEktefellesBarn"
            onChange={(e: InputChangeEvent, v: AdopsjonAvEktefellesBarn) =>
                onChange(
                    v === AdopsjonAvEktefellesBarn.ADOPSJON_AV_EKTEFELLES_BARN,
                    e
                )
            }
        />
    );
};

export default injectIntl(AdopsjonAvEktefellesBarnSpørsmål);
