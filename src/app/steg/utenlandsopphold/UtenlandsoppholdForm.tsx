import React from 'react';
import moment from 'moment';
import { injectIntl, InjectedIntl } from 'react-intl';

import Block from 'common/components/block/Block';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import getMessage from 'common/util/i18nUtils';
import {
    UtenlandsoppholdFormValues,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFieldNames
} from './formTypes/utenlandsoppholdFormTypes';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import { commonFieldErrorRenderer } from './bostedUtlandListAndDialog/BostedUtlandForm';
import {
    validateUtenlandsoppholdSiste12Mnd,
    validateUtenlandsoppholdNeste12Mnd,
    validateYesOrNoIsAnswered
} from 'app/validation/fieldValidations';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/søknad/InformasjonOmUtenlandsopphold';
import { utenlandsoppholdErGyldig } from '../../util/validation/steg/utenlandsopphold';
import { BostedUtland } from './bostedUtlandListAndDialog/types';

const defaultInitialValues: UtenlandsoppholdFormValues = {
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
    informasjonOmUtenlandsoppholdFraSøknad: InformasjonOmUtenlandsopphold;
    onValidSubmit: (values: UtenlandsoppholdFormValues) => void;
}

const mapTilBostedUtland = (opphold: Utenlandsopphold): BostedUtland => ({
    fom: opphold.tidsperiode.fom,
    tom: opphold.tidsperiode.tom,
    landkode: opphold.land
});

const getInitialValues = (
    informasjonOmUtenlandsoppholdFraSøknad: InformasjonOmUtenlandsopphold
): UtenlandsoppholdFormValues => {
    if (utenlandsoppholdErGyldig(informasjonOmUtenlandsoppholdFraSøknad)) {
        const {
            iNorgeSiste12Mnd,
            iNorgeNeste12Mnd,
            senereOpphold,
            tidligereOpphold
        } = informasjonOmUtenlandsoppholdFraSøknad;

        const initialValues: UtenlandsoppholdFormValues = {
            harBoddUtenforNorgeSiste12Mnd: iNorgeSiste12Mnd ? YesOrNo.NO : YesOrNo.YES,
            skalBoUtenforNorgeNeste12Mnd: iNorgeNeste12Mnd ? YesOrNo.NO : YesOrNo.YES,
            utenlandsoppholdNeste12Mnd: senereOpphold.map(mapTilBostedUtland),
            utenlandsoppholdSiste12Mnd: tidligereOpphold.map(mapTilBostedUtland)
        };

        return initialValues;
    }

    return defaultInitialValues;
};

const UtenlandsoppholdForm: React.FunctionComponent<Props> = ({
    intl,
    informasjonOmUtenlandsoppholdFraSøknad,
    onValidSubmit
}) => {
    const initialValues = getInitialValues(informasjonOmUtenlandsoppholdFraSøknad);

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={initialValues}
            onSubmit={(values: UtenlandsoppholdFormValues) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                return (
                    <div>
                        <UtenlandsoppholdFormComponents.Form
                            includeButtons={true}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            includeValidationSummary={true}
                            submitButtonLabel="Fortsett"
                            runDelayedFormValidation={true}
                        >
                            <div>
                                <Block margin="m">
                                    <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                        legend={getMessage(intl, 'iNorgeNeste12Mnd.spørsmål')}
                                        name={UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd}
                                        info={getMessage(intl, 'utenlandsopphold.neste12MånederInfotekst')}
                                        labels={{
                                            no: getMessage(intl, 'iNorgeNeste12Mnd.alternativ.boINorge'),
                                            yes: getMessage(intl, 'iNorgeNeste12Mnd.alternativ.boIUtlandet')
                                        }}
                                        validate={validateYesOrNoIsAnswered}
                                    />
                                </Block>
                                {formValues.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                                    <Block margin="l">
                                        <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                            name={UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd}
                                            minDate={dateToday}
                                            maxDate={date1YearFromNow}
                                            labels={{
                                                addLabel: 'Legg til nytt utenlandsopphold',
                                                modalTitle: 'Utenlandsopphold neste 12 måneder'
                                            }}
                                            erFremtidigOpphold={true}
                                            validate={validateUtenlandsoppholdNeste12Mnd}
                                        />
                                    </Block>
                                )}
                                <Block>
                                    <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                        legend={getMessage(intl, 'boddINorgeSiste12Mnd.spørsmål')}
                                        name={UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd}
                                        info={getMessage(intl, 'utenlandsopphold.siste12MånederInfotekst')}
                                        labels={{
                                            no: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddINorge'),
                                            yes: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddIUtlandet')
                                        }}
                                        validate={validateYesOrNoIsAnswered}
                                    />
                                </Block>
                                {formValues.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                                    <Block margin="m">
                                        <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                            minDate={date1YearAgo}
                                            maxDate={dateToday}
                                            name={UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd}
                                            labels={{
                                                addLabel: 'Legg til nytt utenlandsopphold',
                                                modalTitle: 'Utenlandsopphold siste 12 måneder'
                                            }}
                                            erFremtidigOpphold={false}
                                            validate={validateUtenlandsoppholdSiste12Mnd}
                                        />
                                    </Block>
                                )}
                            </div>
                        </UtenlandsoppholdFormComponents.Form>
                    </div>
                );
            }}
        />
    );
};

export default injectIntl(UtenlandsoppholdForm);
