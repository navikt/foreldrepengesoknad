import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { YesOrNo } from '../../../../formik-wrappers';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
}

const FlerbarnsdagerSpørsmål: FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();

    return (
        <PeriodeUttakFormComponents.YesOrNoQuestion
            name={fieldName}
            legend={intl.formatMessage({ id: 'uttaksplan.flerbarnsdager' })}
            validate={(value: YesOrNo) => {
                if (value === YesOrNo.UNANSWERED) {
                    return intl.formatMessage({ id: 'uttaksplan.validering.flerbarnsdager' });
                }

                return undefined;
            }}
        />
    );
};

export default FlerbarnsdagerSpørsmål;
