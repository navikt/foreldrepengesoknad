import * as React from 'react';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export enum AnnenInntekt {
    'HAR_HATT_ANNEN_INNTEKT' = 'harHattAnnenInntekt',
    'HAR_IKKE_HATT_ANNEN_INNTEKT' = 'harIkkeHattAnnenInntekt'
}

export interface OwnProps {
    harHattAnnenInntekt?: boolean;
    onChange: (value?: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AnnenInntektSiste10MndSpørsmål extends React.Component<Props> {
    render() {
        const { harHattAnnenInntekt, onChange, intl } = this.props;

        let checked;
        if (harHattAnnenInntekt === true) {
            checked = AnnenInntekt.HAR_HATT_ANNEN_INNTEKT;
        } else if (harHattAnnenInntekt === false) {
            checked = AnnenInntekt.HAR_IKKE_HATT_ANNEN_INNTEKT;
        }

        return (
            <RadioPanelGruppeResponsive
                legend={getMessage(intl, 'annenInntekt.spørsmål')}
                name="annenInntekt"
                checked={checked}
                radios={[
                    {
                        label: getMessage(intl, 'annenInntekt.alternativ.hatt'),
                        value: AnnenInntekt.HAR_HATT_ANNEN_INNTEKT
                    },
                    {
                        label: getMessage(
                            intl,
                            'annenInntekt.alternativ.ikkeHatt'
                        ),
                        value: AnnenInntekt.HAR_IKKE_HATT_ANNEN_INNTEKT
                    }
                ]}
                onChange={(
                    event: React.SyntheticEvent<EventTarget>,
                    value: string
                ) => onChange(value)}
            />
        );
    }
}

export default injectIntl(AnnenInntektSiste10MndSpørsmål);
