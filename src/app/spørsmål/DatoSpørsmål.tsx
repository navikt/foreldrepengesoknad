import * as React from 'react';
import { Avgrensninger } from 'nav-datovelger';
import DatoInput from '../components/dato-input/DatoInput';
import { Språkkode } from '../intl/types';

interface DatospørsmålProps {
    spørsmål: string;
    id: string;
    språkkode: Språkkode;
    onChange: (dato: Date) => void;
    avgrensninger?: Avgrensninger;
    dato?: Date;
    kalenderplassering?: 'under' | 'fullskjerm' | undefined;
}

const DatoSpørsmål = (props: DatospørsmålProps) => {
    const { onChange, spørsmål, språkkode, ...rest } = props;
    return (
        <DatoInput
            onChange={(dato: Date) => onChange(dato)}
            label={spørsmål}
            språkkode={språkkode}
            {...rest}
        />
    );
};

export default DatoSpørsmål;
