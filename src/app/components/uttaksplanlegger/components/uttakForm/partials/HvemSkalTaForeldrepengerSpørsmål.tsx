import * as React from 'react';
import FlervalgSpørsmål from 'common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { NavnPåForeldre, Forelder } from 'common/types';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface HvemSkalTaForeldrepengerSpørsmålProps {
    navnPåForeldre: NavnPåForeldre;
    valgtForelder: Forelder | undefined;
    søkerErFarEllerMedmor: boolean;
    onChange: (forelder: Forelder) => void;
}

const HvemSkalTaForeldrepengerSpørsmål: React.StatelessComponent<HvemSkalTaForeldrepengerSpørsmålProps> = ({
    navnPåForeldre,
    valgtForelder,
    onChange,
    søkerErFarEllerMedmor,
}) => {
    const intl = useIntl();

    return (
        <FlervalgSpørsmål
            navn="periodenGjelder"
            toKolonner={true}
            valgtVerdi={valgtForelder}
            spørsmål={getMessage(intl, 'uttaksplan.periodenGjelder')}
            onChange={(value: Forelder) => onChange(value)}
            alternativer={[
                {
                    label: søkerErFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor,
                    value: søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
                },
                {
                    label: søkerErFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor,
                    value: søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor,
                },
            ]}
        />
    );
};

export default HvemSkalTaForeldrepengerSpørsmål;
