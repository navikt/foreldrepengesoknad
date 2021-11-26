import { intlUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
}

const ErMorForSykSpørsmål: FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();

    return (
        <PeriodeUttakFormComponents.YesOrNoQuestion
            name={fieldName}
            legend={intlUtils(intl, 'uttaksplan.erMorForSyk')}
        />
    );
};

export default ErMorForSykSpørsmål;
