import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

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
                legend={intlUtils(intl, 'uttaksplan.erMorForSyk')}
                validate={(value: YesOrNo) => {
                    if (value === YesOrNo.UNANSWERED) {
                        return intlUtils(intl, 'uttaksplan.validering.erMorForSyk');
                    }

                    return undefined;
                }}
            />
        </Block>
    );
};

export default ErMorForSykSpørsmål;
