import * as React from 'react';
import { Avgrensninger } from 'nav-datovelger';
import DatoInput from '../components/dato-input/DatoInput';

interface DatospørsmålProps {
    spørsmål: string;
    id: string;
    onChange: (dato: Date) => void;
    avgrensninger?: Avgrensninger;
    dato?: Date;
    kalenderplassering?: 'under' | 'fullskjerm' | undefined;
}

const DatoSpørsmål = (props: DatospørsmålProps) => {
    const { onChange, spørsmål, ...rest } = props;
    return (
        <DatoInput
            onChange={(dato: Date) => onChange(dato)}
            label={spørsmål}
            {...rest}
        />
    );
};

export default DatoSpørsmål;
