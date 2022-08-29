import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import VeilederNormal from 'app/assets/VeilederNormal';
import useSøknad from 'app/utils/hooks/useSøknad';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Uttaksperiode } from 'uttaksplan/types/Periode';

import {
    AutomatiskJusteringFormComponents,
    AutomatiskJusteringFormData,
    AutomatiskJusteringFormField,
} from './AutomatiskJusteringFormConfig';
import {
    getAutomatiskJusteringFormInitialValues,
    mapAutomatiskJusteringFormToState,
} from './AutomatiskJusteringFormUtils';
import automatiskJusteringFormQuestionsConfig from './automatiskJusteringQuestionConfig';

interface Props {
    termindato: Date;
    perioderRundtFødsel: Uttaksperiode[];
    setØnskerJustertUttakVedFødsel: (ønskerJustertUttakVedFødsel: boolean) => void;
}
const AutomatiskJusteringForm: FunctionComponent<Props> = ({
    termindato,
    perioderRundtFødsel,
    setØnskerJustertUttakVedFødsel,
}) => {
    const intl = useIntl();
    const søknad = useSøknad();

    // const [svarteJaPåAutomatiskJustering, setSvarteJaPåAutomatiskJustering] = useState(false); //TODO Use context values
    const handleSubmit = (values: Partial<AutomatiskJusteringFormData>) => {
        const ønskerJustertUttakVedFødsel = mapAutomatiskJusteringFormToState(values);
        setØnskerJustertUttakVedFødsel(!!ønskerJustertUttakVedFødsel);
        console.log('Submit i AutomatiskJusteringForm ');
        console.log(values);
    };

    const svarteJaMenFlerePerioderInnen6Uker = søknad.ønskerJustertUttakVedFødsel && perioderRundtFødsel.length > 1;
    const svarteJaMenStarterIkkeLengerPåTermin =
        søknad.ønskerJustertUttakVedFødsel &&
        perioderRundtFødsel.length === 1 &&
        perioderRundtFødsel[0].tidsperiode.fom !== termindato;
    let infoTekstId = '';
    if (svarteJaMenFlerePerioderInnen6Uker) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisFlerePerioder';
    }
    if (svarteJaMenStarterIkkeLengerPåTermin) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin';
    }

    return (
        <AutomatiskJusteringFormComponents.FormikWrapper
            initialValues={getAutomatiskJusteringFormInitialValues()}
            onSubmit={(values) => handleSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = automatiskJusteringFormQuestionsConfig.getVisbility({
                    ...formValues,
                    termindato,
                    perioderRundtFødsel,
                });

                return (
                    <AutomatiskJusteringFormComponents.Form>
                        {infoTekstId !== '' && (
                            <Block padBottom="l">
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage id={infoTekstId} />
                                </Veilederpanel>
                            </Block>
                        )}
                        <Block
                            visible={visibility.isVisible(AutomatiskJusteringFormField.ønskerAutomatiskJustering)}
                            padBottom="l"
                        >
                            <AutomatiskJusteringFormComponents.YesOrNoQuestion
                                name={AutomatiskJusteringFormField.ønskerAutomatiskJustering}
                                legend={intlUtils(intl, 'uttaksplan.automatiskJustering.spørsmål')}
                                validate={(value: YesOrNo) => {
                                    if (value === YesOrNo.UNANSWERED) {
                                        return intlUtils(intl, 'uttaksplan.automatiskJustering.svar.påkrevd');
                                    }
                                }}
                            />
                        </Block>
                    </AutomatiskJusteringFormComponents.Form>
                );
            }}
        />
    );
};

export default AutomatiskJusteringForm;
