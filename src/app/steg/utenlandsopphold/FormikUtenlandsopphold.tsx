import React from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import moment from 'moment';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { validateYesOrNoIsAnswered } from '../../../common/util/validateYesOrNoIsAnswered';
import {
    validateUtenlandsoppholdNeste12Mnd,
    validateUtenlandsoppholdSiste12Mnd
} from 'app/validation/fieldValidations';
import { commonFieldErrorRenderer } from './bostedUtlandListAndDialog/BostedUtlandForm';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import {
    FormComponents,
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormValues
} from './formTypes/utenlandsoppholdFormTypes';

const initialValues: UtenlandsoppholdFormValues = {
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.UNANSWERED,
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.UNANSWERED,
    utenlandsoppholdNeste12Mnd: [],
    utenlandsoppholdSiste12Mnd: []
};

const dateToday = new Date();
const date1YearFromNow = moment()
    .add(1, 'year')
    .toDate();
const date1YearAgo = moment()
    .subtract(1, 'year')
    .toDate();

interface Props {
    intl: InjectedIntl;
    onValidSubmit: (values: UtenlandsoppholdFormValues) => void;
}

const MedlemsskapStep: React.FunctionComponent<Props> = ({ intl, onValidSubmit }) => {
    return (
        <FormComponents.FormikWrapper
            initialValues={initialValues}
            onSubmit={(values: UtenlandsoppholdFormValues) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                return (
                    <div>
                        <FormComponents.Form
                            includeButtons={true}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            includeValidationSummary={true}
                            submitButtonLabel="Fortsett"
                            id={'utenlandsoppholdForm'}
                        >
                            <div>
                                <Block margin="m">
                                    <FormComponents.YesOrNoQuestion
                                        legend={getMessage(intl, 'iNorgeNeste12Mnd.spørsmål')}
                                        name={UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd}
                                        info={getMessage(intl, 'utenlandsopphold.neste12MånederInfotekst')}
                                        labels={{
                                            no: getMessage(intl, 'iNorgeNeste12Mnd.alternativ.boINorge'),
                                            yes: getMessage(intl, 'iNorgeNeste12Mnd.alternativ.boIUtlandet')
                                        }}
                                        validate={validateYesOrNoIsAnswered}
                                    />
                                </Block>
                                {formValues.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                                    <Block margin="l">
                                        <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                            name={UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd}
                                            minDate={date1YearAgo}
                                            maxDate={dateToday}
                                            labels={{
                                                addLabel: 'Legg til nytt utenlandsopphold',
                                                modalTitle: 'Utenlandsopphold siste 12 måneder'
                                            }}
                                            erFremtidigOpphold={true}
                                            validate={validateUtenlandsoppholdSiste12Mnd}
                                        />
                                    </Block>
                                )}
                                <Block>
                                    <FormComponents.YesOrNoQuestion
                                        legend={getMessage(intl, 'boddINorgeSiste12Mnd.spørsmål')}
                                        name={UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd}
                                        info={getMessage(intl, 'utenlandsopphold.siste12MånederInfotekst')}
                                        labels={{
                                            no: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddINorge'),
                                            yes: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddIUtlandet')
                                        }}
                                        validate={validateYesOrNoIsAnswered}
                                    />
                                </Block>
                                {formValues.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                                    <Block margin="m">
                                        <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                            minDate={dateToday}
                                            maxDate={date1YearFromNow}
                                            name={UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd}
                                            labels={{
                                                addLabel: 'Legg til nytt utenlandsopphold',
                                                modalTitle: 'Utenlandsopphold neste 12 måneder'
                                            }}
                                            erFremtidigOpphold={false}
                                            validate={validateUtenlandsoppholdNeste12Mnd}
                                        />
                                    </Block>
                                )}
                            </div>
                        </FormComponents.Form>
                    </div>
                );
            }}
        />
    );
};

export default injectIntl(MedlemsskapStep);
