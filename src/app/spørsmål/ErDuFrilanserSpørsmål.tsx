import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum Frilanser {
    'ER_FRILANSER' = 'erFrilanser',
    'IKKE_FRILANSER' = 'ikkeFrilanser'
}

interface ErDuFrilanserProps {
    erFrilanser: boolean;
    onChange: (
        erFrilanser: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = ErDuFrilanserProps & InjectedIntlProps;

const ErDuFrilanserSpørsmål = (props: Props) => {
    const { onChange, erFrilanser, intl, ...otherProps } = props;

    let checked;
    if (erFrilanser === true) {
        checked = Frilanser.ER_FRILANSER;
    } else if (erFrilanser === false) {
        checked = Frilanser.IKKE_FRILANSER;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erDuFrilanser.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: Frilanser.ER_FRILANSER
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: Frilanser.IKKE_FRILANSER
                }
            ]}
            name="erDuFrilanser"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: Frilanser) =>
                onChange(v === Frilanser.ER_FRILANSER, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(ErDuFrilanserSpørsmål);
