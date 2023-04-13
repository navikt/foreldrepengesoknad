import { intlUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

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

                return undefined;
            }}
        />
    );
};

export default FlerbarnsdagerSpørsmål;
