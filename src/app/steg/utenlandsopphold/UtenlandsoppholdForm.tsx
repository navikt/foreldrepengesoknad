import React from 'react';
import moment from 'moment';
import { useIntl } from 'react-intl';

import Block from 'common/components/block/Block';
import { UnansweredQuestionsInfo, YesOrNo } from '@navikt/sif-common-formik/lib';
import getMessage from 'common/util/i18nUtils';
import {
    UtenlandsoppholdFormValues,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFieldNames,
} from './form/utenlandsoppholdFormTypes';
import { utenlandsoppholdFormQuestions } from './form/utenlandsoppholdFormQuestions';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import {
    validateUtenlandsoppholdSiste12Mnd,
    validateUtenlandsoppholdNeste12Mnd,
    validateYesOrNoIsAnswered,
    commonFieldErrorRenderer,
} from 'app/validation/fieldValidations';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/søknad/InformasjonOmUtenlandsopphold';
import { utenlandsoppholdErGyldig } from '../../util/validation/steg/utenlandsopphold';
import { BostedUtland } from './bostedUtlandListAndDialog/types';
import utenlandsoppholdFormCleanup from './form/utenlandsoppholdFormCleanup';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';

const defaultInitialValues: UtenlandsoppholdFormValues = {
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.UNANSWERED,
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.UNANSWERED,
    utenlandsoppholdNeste12Mnd: [],
    utenlandsoppholdSiste12Mnd: [],
};

const dateToday = new Date();
const date1YearFromNow = moment().add(1, 'year').toDate();
const date1YearAgo = moment().subtract(1, 'year').toDate();

interface Props {
    informasjonOmUtenlandsoppholdFraSøknad: InformasjonOmUtenlandsopphold;
    onValidSubmit: (values: UtenlandsoppholdFormValues) => void;
}

const mapTilBostedUtland = (opphold: Utenlandsopphold): BostedUtland => ({
    fom: opphold.tidsperiode.fom,
    tom: opphold.tidsperiode.tom,
    landkode: opphold.land,
});

const getInitialValues = (
    informasjonOmUtenlandsoppholdFraSøknad: InformasjonOmUtenlandsopphold
): UtenlandsoppholdFormValues => {
    if (utenlandsoppholdErGyldig(informasjonOmUtenlandsoppholdFraSøknad)) {
        const {
            iNorgeSiste12Mnd,
            iNorgeNeste12Mnd,
            senereOpphold,
            tidligereOpphold,
        } = informasjonOmUtenlandsoppholdFraSøknad;

        const initialValues: UtenlandsoppholdFormValues = {
            harBoddUtenforNorgeSiste12Mnd: iNorgeSiste12Mnd ? YesOrNo.NO : YesOrNo.YES,
            skalBoUtenforNorgeNeste12Mnd: iNorgeNeste12Mnd ? YesOrNo.NO : YesOrNo.YES,
            utenlandsoppholdNeste12Mnd: senereOpphold.map(mapTilBostedUtland),
            utenlandsoppholdSiste12Mnd: tidligereOpphold.map(mapTilBostedUtland),
        };

        return initialValues;
    }

    return defaultInitialValues;
};

const UtenlandsoppholdForm: React.FunctionComponent<Props> = ({
    informasjonOmUtenlandsoppholdFraSøknad,
    onValidSubmit,
}) => {
    const intl = useIntl();
    const initialValues = getInitialValues(informasjonOmUtenlandsoppholdFraSøknad);

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={initialValues}
            onSubmit={(values: UtenlandsoppholdFormValues) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <div>
                        <UtenlandsoppholdFormComponents.Form
                            includeButtons={allQuestionsAnswered}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            includeValidationSummary={true}
                            submitButtonLabel="Fortsett"
                            runDelayedFormValidation={true}
                            cleanup={(values) => utenlandsoppholdFormCleanup(values)}
                            noButtonsContentRenderer={
                                allQuestionsAnswered
                                    ? undefined
                                    : () => (
                                          <UnansweredQuestionsInfo>
                                              {getMessage(intl, 'steg.footer.spørsmålMåBesvares')}
                                          </UnansweredQuestionsInfo>
                                      )
                            }
                        >
                            <div>
                                <Block
                                    margin="m"
                                    visible={visibility.isVisible(
                                        UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd
                                    )}
                                >
                                    <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                        legend={getMessage(intl, 'iNorgeNeste12Mnd.spørsmål')}
                                        name={UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd}
                                        description={
                                            <UtvidetInformasjon
                                                apneLabel={getMessage(
                                                    intl,
                                                    'utenlandsopphold.neste12MånederInfotekst.apneLabel'
                                                )}
                                                description={true}
                                            >
                                                {getMessage(intl, 'utenlandsopphold.neste12MånederInfotekst')}
                                            </UtvidetInformasjon>
                                        }
                                        labels={{
                                            no: getMessage(intl, 'iNorgeNeste12Mnd.alternativ.boINorge'),
                                            yes: getMessage(intl, 'iNorgeNeste12Mnd.alternativ.boIUtlandet'),
                                        }}
                                        validate={validateYesOrNoIsAnswered}
                                    />
                                </Block>
                                <Block
                                    margin="l"
                                    visible={visibility.isVisible(
                                        UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd
                                    )}
                                >
                                    <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                        name={UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd}
                                        minDate={dateToday}
                                        maxDate={date1YearFromNow}
                                        labels={{
                                            addLabel: 'Legg til nytt utenlandsopphold',
                                            modalTitle: 'Utenlandsopphold neste 12 måneder',
                                        }}
                                        erFremtidigOpphold={true}
                                        validate={validateUtenlandsoppholdNeste12Mnd}
                                    />
                                </Block>
                                <Block
                                    visible={visibility.isVisible(
                                        UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd
                                    )}
                                >
                                    <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                        legend={getMessage(intl, 'boddINorgeSiste12Mnd.spørsmål')}
                                        name={UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd}
                                        description={
                                            <UtvidetInformasjon
                                                apneLabel={getMessage(
                                                    intl,
                                                    'utenlandsopphold.siste12MånederInfotekst.apneLabel'
                                                )}
                                                description={true}
                                            >
                                                {getMessage(intl, 'utenlandsopphold.siste12MånederInfotekst')}
                                            </UtvidetInformasjon>
                                        }
                                        labels={{
                                            no: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddINorge'),
                                            yes: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddIUtlandet'),
                                        }}
                                        validate={validateYesOrNoIsAnswered}
                                    />
                                </Block>
                                <Block
                                    margin="m"
                                    visible={visibility.isVisible(
                                        UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd
                                    )}
                                >
                                    <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                        minDate={date1YearAgo}
                                        maxDate={dateToday}
                                        name={UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd}
                                        labels={{
                                            addLabel: 'Legg til nytt utenlandsopphold',
                                            modalTitle: 'Utenlandsopphold siste 12 måneder',
                                        }}
                                        erFremtidigOpphold={false}
                                        validate={validateUtenlandsoppholdSiste12Mnd}
                                    />
                                </Block>
                            </div>
                        </UtenlandsoppholdFormComponents.Form>
                    </div>
                );
            }}
        />
    );
};

export default UtenlandsoppholdForm;
