import * as React from 'react';
import Bolk from '../components/layout/Bolk';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

export enum BarnFødt {
    'ER_FØDT' = 'erFødt',
    'IKKE_FØDT' = 'ikkeFødt'
}

interface BarnFødtBolkProps {
    erBarnetFødt: boolean;
    onChange: (
        erBarnetFødt: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

const ErBarnetFødtSpørsmål = (props: BarnFødtBolkProps) => {
    const { onChange, erBarnetFødt, ...otherProps } = props;

    let checked;
    if (erBarnetFødt === true) {
        checked = BarnFødt.ER_FØDT;
    } else if (erBarnetFødt === false) {
        checked = BarnFødt.IKKE_FØDT;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend="Er barnet født?"
            radios={[
                { label: 'Ja', value: BarnFødt.ER_FØDT },
                { label: 'Nei', value: BarnFødt.IKKE_FØDT }
            ]}
            name="barnFødt"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: BarnFødt) =>
                onChange(v === BarnFødt.ER_FØDT, e)
            }
            {...otherProps}
        />
    );
};

export default (props: BarnFødtBolkProps) => (
    <Bolk render={() => <ErBarnetFødtSpørsmål {...props} />} />
);
