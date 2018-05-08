import * as React from 'react';
import { Avgrensninger } from 'nav-datovelger';
import DatoInput from '../components/dato-input/DatoInput';

interface DatospørsmålProps {
    avgrensninger?: Avgrensninger;
    dato?: Date;
    kalenderplassering?: 'under' | 'fullskjerm' | undefined;
    onChange: (dato: Date) => void;
    spørsmål: string;
    id: string;
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
