import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import Block from '../../../../common/block/Block';
import { YesOrNo } from '../../../../formik-wrappers';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
}

const ErMorForSykSpørsmål: FunctionComponent<Props> = ({ fieldName }) => {
    const intl = useIntl();

    return (
        <Block padBottom="l">
            <PeriodeUttakFormComponents.YesOrNoQuestion
                name={fieldName}
                legend={intl.formatMessage({ id: 'uttaksplan.erMorForSyk' })}
                validate={(value: YesOrNo) => {
                    if (value === YesOrNo.UNANSWERED) {
                        return intl.formatMessage({ id: 'uttaksplan.validering.erMorForSyk' });
                    }

                    return undefined;
                }}
            />
        </Block>
    );
};

export default ErMorForSykSpørsmål;
