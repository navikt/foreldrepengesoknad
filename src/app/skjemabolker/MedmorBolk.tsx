import * as React from 'react';
import Bolk from '../components/layout/Bolk';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { SøkerRolle } from '../types/søknad/Søknad';

interface MedmorBolkProps {
    checked: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        erMedmor: SøkerRolle
    ) => void;
}

const MedmorBolk = (props: MedmorBolkProps) => (
    <RadioPanelGruppeResponsive
        legend="Er du medmor?"
        radios={[
            { label: 'Ja', value: SøkerRolle.MEDMOR },
            { label: 'Nei', value: SøkerRolle.MOR }
        ]}
        name="medmorBolk"
        {...props}
    />
);

export default (props: MedmorBolkProps) => (
    <Bolk render={() => <MedmorBolk {...props} />} />
);
