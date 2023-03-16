import React, { FunctionComponent } from 'react';
import { connect } from 'formik';
import { useIntl } from 'react-intl';
import { flattenErrors, translateError } from 'app/utils/errorUtils';
import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import getMessage from 'common/util/i18nUtils';
import './validationErrorSummary.less';

const cls = BEMHelper('validationErrorSummary');

type Props = FormikProps;

const ValidationErrorSummary: FunctionComponent<Props> = ({ formik: { errors, submitCount } }) => {
    const intl = useIntl();
    if (errors) {
        const errorMessages = flattenErrors(errors).map((error) => ({
            ...error,
            text: translateError(intl, error.text),
        }));

        return (
            <Block visible={errorMessages.length > 0 && submitCount > 0}>
                <Feiloppsummering
                    show={true}
                    className={cls.block}
                    title={getMessage(intl, 'feiloppsummering.tittel')}
                    errors={errorMessages}
                />
            </Block>
        );
    }

    return null;
};

export default connect<unknown, UferdigSøknad>(ValidationErrorSummary);
