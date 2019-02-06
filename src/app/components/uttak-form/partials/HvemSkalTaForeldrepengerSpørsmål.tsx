import * as React from 'react';
import FlervalgSpørsmål from 'app/components/flervalg-spørsmål/FlervalgSpørsmål';
import { NavnPåForeldre, Forelder } from 'common/types';
import { injectIntl, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface HvemSkalTaForeldrepengerSpørsmålProps {
    navnPåForeldre: NavnPåForeldre;
    valgtForelder: Forelder | undefined;
    onChange: (forelder: Forelder) => void;
    intl: InjectedIntl;
}

const HvemSkalTaForeldrepengerSpørsmål: React.StatelessComponent<HvemSkalTaForeldrepengerSpørsmålProps> = ({
    navnPåForeldre,
    valgtForelder,
    onChange,
    intl
}) => {
    return (
        <FlervalgSpørsmål
            navn="periodenGjelder"
            toKolonner={true}
            valgtVerdi={valgtForelder}
            spørsmål={getMessage(intl, 'uttaksplan.periodenGjelder')}
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

export default injectIntl(HvemSkalTaForeldrepengerSpørsmål);
