import * as React from 'react';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export enum AnnenInntekt {
    'HAR_HATT_ANNEN_INNTEKT' = 'harHattAnnenInntekt',
    'HAR_IKKE_HATT_ANNEN_INNTEKT' = 'harIkkeHattAnnenInntekt'
}

export interface OwnProps {
    harHattAnnenInntekt?: AnnenInntekt;
    onChange: (value?: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AnnenInntektSiste10MndSpørsmål extends React.Component<Props> {
    render() {
        const { harHattAnnenInntekt, onChange } = this.props;

        let checked;
        if (harHattAnnenInntekt === AnnenInntekt.HAR_HATT_ANNEN_INNTEKT) {
            checked = AnnenInntekt.HAR_HATT_ANNEN_INNTEKT;
        } else if (
            harHattAnnenInntekt === AnnenInntekt.HAR_IKKE_HATT_ANNEN_INNTEKT
        ) {
            checked = AnnenInntekt.HAR_IKKE_HATT_ANNEN_INNTEKT;
        }

        return (
            <RadioPanelGruppeResponsive
                legend="De siste 10 månedene har jeg..."
                name="annenInntekt"
                checked={checked}
                radios={[
                    {
                        label: 'hatt annen inntekt',
                        value: AnnenInntekt.HAR_HATT_ANNEN_INNTEKT
                    },
                    {
                        label: 'ikke hatt annen inntekt',
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
