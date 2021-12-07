import { intlUtils, Block } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    graderingsprosentVisible: boolean;
}

const validateGraderingsProsent = (intl: IntlShape) => (value: string) => {
    if (parseInt(value, 10) >= 100) {
        return intlUtils(intl, 'uttaksplan.skalHaGradering');
    }

    return undefined;
};

const SkalHaGraderingSpørsmål: FunctionComponent<Props> = ({ graderingsprosentVisible }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.YesOrNoQuestion
                    name={PeriodeUttakFormField.skalHaGradering}
                    legend={intlUtils(intl, 'uttaksplan.skalHaGradering')}
                />
            </Block>
            <Block visible={graderingsprosentVisible}>
                <PeriodeUttakFormComponents.NumberInput
                    name={PeriodeUttakFormField.stillingsprosent}
                    label={intlUtils(intl, 'uttaksplan.stillingsprosent')}
                    maxLength={4}
                    validate={validateGraderingsProsent(intl)}
                />
            </Block>
            <Block visible={graderingsprosentVisible}>stuff here</Block>
        </>
    );
};

export default SkalHaGraderingSpørsmål;
