import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import Spørsmål from '../components/spørsmål/Spørsmål';
import getMessage from '../util/i18nUtils';

export enum FødselEllerAdopsjon {
    'GJELDER_ADOPSJON' = 'gjelderAdopsjon',
    'GJELDER_FØDSEL' = 'gjelderFødsel'
}

interface FødselEllerAdopsjonProps {
    gjelderAdopsjon: boolean;
    onChange: (
        erBarnetFødt: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = FødselEllerAdopsjonProps & InjectedIntlProps;

const FødselEllerAdopsjonSpørsmål = (props: Props) => {
    const { onChange, gjelderAdopsjon, intl, ...otherProps } = props;

    let checked;
    if (gjelderAdopsjon === true) {
        checked = FødselEllerAdopsjon.GJELDER_ADOPSJON;
    } else if (gjelderAdopsjon === false) {
        checked = FødselEllerAdopsjon.GJELDER_FØDSEL;
    }

    const adopsjonLabel = getMessage(
        intl,
        'fødselEllerAdopsjon.alternativ.adopsjon'
    );
    const fødselLabel = getMessage(
        intl,
        'fødselEllerAdopsjon.alternativ.fødsel'
    );

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'fødselEllerAdopsjon.spørsmål')}
            radios={[
                {
                    label: adopsjonLabel,
                    value: FødselEllerAdopsjon.GJELDER_ADOPSJON
                },
                {
                    label: fødselLabel,
                    value: FødselEllerAdopsjon.GJELDER_FØDSEL
                }
            ]}
            name="adopsjonEllerFødsel"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: FødselEllerAdopsjon
            ) => onChange(v === FødselEllerAdopsjon.GJELDER_ADOPSJON, e)}
            {...otherProps}
        />
    );
};

export default injectIntl((props: Props) => (
    <Spørsmål>
        <FødselEllerAdopsjonSpørsmål {...props} />
    </Spørsmål>
));
