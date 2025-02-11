import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { YesOrNo } from '../../../../formik-wrappers';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
// eslint-disable-next-line import/no-default-export
export default FlerbarnsdagerSpørsmål;
