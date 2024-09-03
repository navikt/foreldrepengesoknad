import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Forelder, NavnPåForeldre, hasValue } from '@navikt/fp-common';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

const HvemSkalHaUttakSpørsmål: FunctionComponent<Props> = ({ fieldName, navnPåForeldre, erFarEllerMedmor }) => {
    const intl = useIntl();

    return (
        <PeriodeUttakFormComponents.RadioGroup
            legend={intl.formatMessage({ id: 'uttaksplan.hvemSkalHaUttak' })}
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
            validate={(value) => {
                if (!hasValue(value)) {
                    return intl.formatMessage({ id: 'uttaksplan.validering.hvemSkalHaUttak' });
                }

                return undefined;
            }}
        />
    );
};

export default HvemSkalHaUttakSpørsmål;
