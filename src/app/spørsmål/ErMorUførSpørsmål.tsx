import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum Mor {
    'ER_UFØR' = 'erUfør',
    'ER_IKKE_UFØR' = 'ikkeUfør'
}

interface ErMorUførProps {
    navn?: string;
    erUfør?: boolean;
    onChange: (erFrilanser: boolean) => void;
}

type Props = ErMorUførProps & InjectedIntlProps;

const ErMorUfør = (props: Props) => {
    const { onChange, navn, intl, erUfør } = props;

    let checked;
    if (erUfør === true) {
        checked = Mor.ER_UFØR;
    } else if (erUfør === false) {
        checked = Mor.ER_IKKE_UFØR;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erMorUfør.spørsmål', { navn })}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: Mor.ER_UFØR
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: Mor.ER_IKKE_UFØR
                }
            ]}
            name="erMorUfør"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: Mor) => onChange(v === Mor.ER_UFØR)}
        />
    );
};

export default injectIntl(ErMorUfør);
