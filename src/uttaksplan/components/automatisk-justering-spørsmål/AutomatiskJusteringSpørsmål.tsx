import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import VeilederNormal from 'app/assets/VeilederNormal';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { UttaksplanFormComponents, UttaksplanFormField } from 'app/steps/uttaksplan/UttaksplanFormConfig';
import { mapUttaksplanFormValueToState } from 'app/steps/uttaksplan/UttaksplanFormUtils';
import dayjs from 'dayjs';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Uttaksperiode } from 'uttaksplan/types/Periode';

interface Props {
    termindato: Date;
    perioderRundtFødsel: Uttaksperiode[];
    visibility: QuestionVisibility<UttaksplanFormField, undefined>;
}
const AutomatiskJusteringSpørsmål: FunctionComponent<Props> = ({ termindato, perioderRundtFødsel, visibility }) => {
    const intl = useIntl();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const svarteJaMenFlerePerioderInnen6Uker =
        state.søknad.ønskerJustertUttakVedFødsel && perioderRundtFødsel.length > 1;
    const svarteJaMenStarterIkkeLengerPåTermin =
        state.søknad.ønskerJustertUttakVedFødsel &&
        perioderRundtFødsel.length === 1 &&
        !dayjs(perioderRundtFødsel[0].tidsperiode.fom).isSame(termindato, 'day');
    let infoTekstId = '';
    if (svarteJaMenFlerePerioderInnen6Uker) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisFlerePerioder';
    }
    if (svarteJaMenStarterIkkeLengerPåTermin) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin';
    }

    const handleOnChange = (value: string) => {
        const ønskerJustertUttakVedFødsel = mapUttaksplanFormValueToState(value);
        dispatch(actionCreator.setØnskerJustertUttakVedFødsel(ønskerJustertUttakVedFødsel));
    };

    return (
        <UttaksplanFormComponents.Form includeButtons={false}>
            {infoTekstId !== '' && (
                <Block padBottom="l">
                    <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                        <FormattedMessage id={infoTekstId} />
                    </Veilederpanel>
                </Block>
            )}
            <Block visible={visibility.isVisible(UttaksplanFormField.ønskerAutomatiskJustering)} padBottom="l">
                <UttaksplanFormComponents.YesOrNoQuestion
                    name={UttaksplanFormField.ønskerAutomatiskJustering}
                    legend={intlUtils(intl, 'uttaksplan.automatiskJustering.spørsmål')}
                    validate={(value: YesOrNo) => {
                        console.log('value satt: ', value);
                        if (value === YesOrNo.UNANSWERED) {
                            return intlUtils(intl, 'uttaksplan.automatiskJustering.svar.påkrevd');
                        }
                    }}
                    afterOnChange={(value) => handleOnChange(value)}
                />
            </Block>
        </UttaksplanFormComponents.Form>
    );
};

export default AutomatiskJusteringSpørsmål;
