import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

interface HeltNyIArbeidslivetSpørsmålProps {
    nyIArbeidslivet?: boolean;
    onChange: (nyIArbeidslivet: boolean) => void;
}

type Props = HeltNyIArbeidslivetSpørsmålProps & InjectedIntlProps;

enum NyIArbeidslivet {
    'NY_I_ARBEIDSLIVET' = 'nyIArbeidslivet',
    'IKKE_NY_I_ARBEIDSLIVET' = 'ikkeNyIArbeidslivet'
}

const HeltNyIArbeidslivetSpørsmål = (props: Props) => {
    const { onChange, nyIArbeidslivet, intl } = props;

    let checked;
    if (nyIArbeidslivet === true) {
        checked = NyIArbeidslivet.NY_I_ARBEIDSLIVET;
    } else if (nyIArbeidslivet === false) {
        checked = NyIArbeidslivet.IKKE_NY_I_ARBEIDSLIVET;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'nyIArbeidslivet.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: NyIArbeidslivet.NY_I_ARBEIDSLIVET
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: NyIArbeidslivet.IKKE_NY_I_ARBEIDSLIVET
                }
            ]}
            name="nyIArbeidslivet"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: NyIArbeidslivet
            ) => onChange(v === NyIArbeidslivet.NY_I_ARBEIDSLIVET)}
        />
    );
};

export default injectIntl(HeltNyIArbeidslivetSpørsmål);
