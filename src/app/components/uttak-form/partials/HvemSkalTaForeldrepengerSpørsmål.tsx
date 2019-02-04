import * as React from 'react';
import FlervalgSpørsmål from 'app/components/flervalg-spørsmål/FlervalgSpørsmål';
import { NavnPåForeldre, Forelder } from 'common/types';

interface HvemSkalTaForeldrepengerSpørsmålProps {
    navnPåForeldre: NavnPåForeldre;
    valgtForelder: Forelder | undefined;
    onChange: (forelder: Forelder) => void;
}

const HvemSkalTaForeldrepengerSpørsmål: React.StatelessComponent<HvemSkalTaForeldrepengerSpørsmålProps> = ({
    navnPåForeldre,
    valgtForelder,
    onChange
}) => {
    return (
        <FlervalgSpørsmål
            navn="periodenGjelder"
            toKolonner={true}
            valgtVerdi={valgtForelder}
            spørsmål="Hvem skal ha uttak i perioden?"
            onChange={(value: Forelder) => onChange(value)}
            alternativer={[
                {
                    label: navnPåForeldre.farMedmor,
                    value: Forelder.FARMEDMOR
                },
                {
                    label: navnPåForeldre.mor,
                    value: Forelder.MOR
                }
            ]}
        />
    );
};

export default HvemSkalTaForeldrepengerSpørsmål;
