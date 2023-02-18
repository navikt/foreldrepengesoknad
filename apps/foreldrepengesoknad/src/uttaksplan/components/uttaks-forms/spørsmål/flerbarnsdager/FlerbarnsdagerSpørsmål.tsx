import { intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
}

const FlerbarnsdagerSpørsmål: FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();

    return (
        <PeriodeUttakFormComponents.YesOrNoQuestion
            name={fieldName}
            legend={intlUtils(intl, 'uttaksplan.flerbarnsdager')}
            validate={(value: YesOrNo) => {
                if (value === YesOrNo.UNANSWERED) {
                    return intlUtils(intl, 'uttaksplan.validering.flerbarnsdager');
                }
            }}
        />
    );
};

export default FlerbarnsdagerSpørsmål;
