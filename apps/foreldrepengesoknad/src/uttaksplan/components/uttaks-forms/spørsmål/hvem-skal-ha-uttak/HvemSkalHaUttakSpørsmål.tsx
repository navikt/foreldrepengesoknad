import { hasValue, intlUtils } from '@navikt/fp-common';
import { Forelder } from 'app/types/Forelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { capitalizeFirstLetter } from 'app/utils/stringUtils';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

const HvemSkalHaUttakSpørsmål: FunctionComponent<Props> = ({ fieldName, navnPåForeldre, erFarEllerMedmor }) => {
    const intl = useIntl();

    return (
        <PeriodeUttakFormComponents.RadioPanelGroup
            legend={intlUtils(intl, 'uttaksplan.hvemSkalHaUttak')}
            name={fieldName}
            radios={[
                {
                    label: erFarEllerMedmor
                        ? capitalizeFirstLetter(navnPåForeldre.farMedmor)
                        : capitalizeFirstLetter(navnPåForeldre.mor),
                    value: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
                },
                {
                    label: erFarEllerMedmor
                        ? capitalizeFirstLetter(navnPåForeldre.mor)
                        : capitalizeFirstLetter(navnPåForeldre.farMedmor),
                    value: erFarEllerMedmor ? Forelder.mor : Forelder.farMedmor,
                },
            ]}
            useTwoColumns={true}
            validate={(value) => {
                if (!hasValue(value)) {
                    return intlUtils(intl, 'uttaksplan.validering.hvemSkalHaUttak');
                }
            }}
        />
    );
};

export default HvemSkalHaUttakSpørsmål;
