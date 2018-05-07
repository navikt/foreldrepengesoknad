import * as React from 'react';
import Bolk from '../components/layout/Bolk';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

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

const FødselEllerAdopsjonSpørsmål = (props: FødselEllerAdopsjonProps) => {
    const { onChange, gjelderAdopsjon, ...otherProps } = props;

    let checked;
    if (gjelderAdopsjon === true) {
        checked = FødselEllerAdopsjon.GJELDER_ADOPSJON;
    } else if (gjelderAdopsjon === false) {
        checked = FødselEllerAdopsjon.GJELDER_FØDSEL;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend="Gjelder søknanden adopsjon eller fødsel?"
            radios={[
                {
                    label: 'Adopsjon',
                    value: FødselEllerAdopsjon.GJELDER_ADOPSJON
                },
                { label: 'Fødsel', value: FødselEllerAdopsjon.GJELDER_FØDSEL }
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

export default (props: FødselEllerAdopsjonProps) => (
    <Bolk render={() => <FødselEllerAdopsjonSpørsmål {...props} />} />
);
