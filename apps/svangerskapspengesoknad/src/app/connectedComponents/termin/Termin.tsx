import React, { FunctionComponent } from 'react';
import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { useIntl } from 'react-intl';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import DatoInput from 'app/formik/wrappers/DatoInput';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import {
    dateToISOFormattedDateString,
    etÅrSiden,
    niMånederFremITid,
    tiMånederSiden,
} from '../../../common/util/datoUtils';
import { useNavigate } from 'react-router-dom';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

type Props = OwnProps;

const Termin: FunctionComponent<Props> = (props) => {
    const { step, formikProps } = props;
    const { values } = formikProps;

    const intl = useIntl();

    const navigateTo = useNavigate();

    const navigate = () => {
        navigateTo(getSøknadStepPath(StepID.ARBEIDSFORHOLD));
    };

    const showNesteknapp = values.barn.erBarnetFødt === false || values.barn.fødselsdato !== undefined;

    return (
        <Applikasjonsside visTittel={true} visSpråkvelger={true}>
            <FormikStep
                step={step}
                showNesteknapp={showNesteknapp}
                formikProps={formikProps}
                onValidFormSubmit={navigate}
            >
                <Block>
                    <DatoInput
                        name="barn.termindato"
                        label={getMessage(intl, 'termin.termindato')}
                        datoAvgrensinger={{
                            minDato: etÅrSiden(new Date()),
                            maksDato: niMånederFremITid(new Date()),
                        }}
                    />
                </Block>
                <Block visible={values.barn.termindato !== undefined}>
                    <JaNeiSpørsmål name="barn.erBarnetFødt" legend={getMessage(intl, 'termin.erBarnetFødt')} />
                </Block>
                <Block visible={values.barn.erBarnetFødt === true}>
                    <DatoInput
                        name="barn.fødselsdato"
                        label={getMessage(intl, 'termin.fødselsdato')}
                        datoAvgrensinger={{
                            minDato: tiMånederSiden(values.barn.termindato!),
                            maksDato: dateToISOFormattedDateString(new Date()),
                        }}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

export default Termin;
