import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

interface VarigEndringAvNæringsinntektSpørsmålProps {
    varigEndringAvNæringsinntekt?: boolean;
    onChange: (varigEndringAvNæringsinntekt: boolean) => void;
}

type Props = VarigEndringAvNæringsinntektSpørsmålProps & InjectedIntlProps;

enum VarigEndringAvNæringsinntekt {
    'VARIG_ENDRING_AV_NÆRINGSINNTEKT' = 'varigEndringAvNæringsinntekt',
    'IKKE_VARIG_ENDRING_AV_NÆRINGSINNTEKT' = 'ikkeVarigEndringAvNæringsinntekt'
}

const VarigEndringAvNæringsinntektSpørsmål = (props: Props) => {
    const { onChange, varigEndringAvNæringsinntekt, intl } = props;

    let checked;
    if (varigEndringAvNæringsinntekt === true) {
        checked = VarigEndringAvNæringsinntekt.VARIG_ENDRING_AV_NÆRINGSINNTEKT;
    } else if (varigEndringAvNæringsinntekt === false) {
        checked = VarigEndringAvNæringsinntekt.IKKE_VARIG_ENDRING_AV_NÆRINGSINNTEKT;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'varigEndringAvNæringsinntekt.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: VarigEndringAvNæringsinntekt.VARIG_ENDRING_AV_NÆRINGSINNTEKT
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: VarigEndringAvNæringsinntekt.IKKE_VARIG_ENDRING_AV_NÆRINGSINNTEKT
                }
            ]}
            name="varigEndringAvNæringsinntekt"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: VarigEndringAvNæringsinntekt) =>
                onChange(v === VarigEndringAvNæringsinntekt.VARIG_ENDRING_AV_NÆRINGSINNTEKT)
            }
        />
    );
};

export default injectIntl(VarigEndringAvNæringsinntektSpørsmål);
