import React from 'react';
import {
    AnnenForelderFormValues,
    AnnenForelderFormComponents,
    AnnenForelderFieldNames
} from './formTypes/annenforelderFormTypes';
import { commonFieldErrorRenderer } from '../utenlandsopphold/bostedUtlandListAndDialog/BostedUtlandForm';
import { injectIntl, InjectedIntl } from 'react-intl';
import OppgiPersonalia from './oppgi-personalia/OppgiPersonalia';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';

interface Props {
    intl: InjectedIntl;
    onValidSubmit: (values: AnnenForelderFormValues) => void;
}

const AnnenForelderForm: React.FunctionComponent<Props> = ({ onValidSubmit, intl }) => {
    return (
        <AnnenForelderFormComponents.FormikWrapper
            initialValues={{}}
            onSubmit={(values: AnnenForelderFormValues) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                return (
                    <div>
                        <AnnenForelderFormComponents.Form
                            includeButtons={true}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            includeValidationSummary={true}
                            submitButtonLabel="Fortsett"
                            runDelayedFormValidation={true}
                        >
                            <OppgiPersonalia fornavn={formValues.fornavn} erUtenlandskFnr={formValues.utenlandskFnr} />
                            <Block>
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFieldNames.aleneOmOmsorg}
                                    info={getMessage(intl, 'annenForelder.aleneOmOmsorg.veileder')}
                                    legend={getMessage(intl, 'annenForelder.aleneOmOmsorg')}
                                />
                            </Block>
                            <Block>
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFieldNames.harRettPåForeldrepenger}
                                    legend={getMessage(intl, 'annenForelderRettPåForeldrepenger.spørsmål', {
                                        navn: formValues.fornavn
                                    })}
                                />
                            </Block>
                            <Block>
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFieldNames.erInformertOmSøknaden}
                                    legend={getMessage(intl, 'erAnnenForelderInformert.spørsmål', {
                                        navn: formValues.fornavn
                                    })}
                                />
                            </Block>
                        </AnnenForelderFormComponents.Form>
                    </div>
                );
            }}
        />
    );
};

export default injectIntl(AnnenForelderForm);
