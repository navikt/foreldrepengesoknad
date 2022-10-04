import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { UttaksplanFormComponents, UttaksplanFormField } from 'app/steps/uttaksplan/UttaksplanFormConfig';
import { mapUttaksplanFormValueToState } from 'app/steps/uttaksplan/UttaksplanFormUtils';
import dayjs from 'dayjs';
import AlertStripe from 'nav-frontend-alertstriper';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isOverføringsperiode, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

interface Props {
    termindato: Date;
    perioderMedUttakRundtFødsel: Periode[];
    visibility: QuestionVisibility<UttaksplanFormField, undefined>;
}
const AutomatiskJusteringForm: FunctionComponent<Props> = ({ termindato, perioderMedUttakRundtFødsel, visibility }) => {
    const intl = useIntl();

    const { dispatch, state } = useForeldrepengesøknadContext();
    const svarteJaMenFlerePerioderInnen6Uker =
        state.brukerSvarteJaPåAutoJustering && perioderMedUttakRundtFødsel.length > 1;
    const svarteJaMenStarterIkkeLengerPåTermin =
        state.brukerSvarteJaPåAutoJustering &&
        perioderMedUttakRundtFødsel.length === 1 &&
        !dayjs(perioderMedUttakRundtFødsel[0].tidsperiode.fom).isSame(termindato, 'day');
    const svarteJaMenEndretPeriodenPåTermin =
        state.brukerSvarteJaPåAutoJustering &&
        perioderMedUttakRundtFødsel.length === 1 &&
        dayjs(perioderMedUttakRundtFødsel[0].tidsperiode.fom).isSame(termindato, 'day') &&
        ((isUttaksperiode(perioderMedUttakRundtFødsel[0]) &&
            (perioderMedUttakRundtFødsel[0].konto !== StønadskontoType.Fedrekvote ||
                !perioderMedUttakRundtFødsel[0].ønskerSamtidigUttak)) ||
            isOverføringsperiode(perioderMedUttakRundtFødsel[0]));
    let infoTekstId = '';
    if (svarteJaMenFlerePerioderInnen6Uker) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisFlerePerioder';
    }
    if (svarteJaMenStarterIkkeLengerPåTermin) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin';
    }

    if (svarteJaMenEndretPeriodenPåTermin) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisEndretPeriodePåTermin';
    }

    const handleOnChange = (value: string) => {
        const ønskerJustertUttakVedFødsel = mapUttaksplanFormValueToState(value as YesOrNo);
        dispatch(actionCreator.setØnskerJustertUttakVedFødsel(ønskerJustertUttakVedFødsel));
        dispatch(actionCreator.setBrukerSvarteJaPåAutoJustering(ønskerJustertUttakVedFødsel));
    };

    return (
        <UttaksplanFormComponents.Form includeButtons={false}>
            <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                {infoTekstId !== '' && (
                    <Block padBottom="l">
                        <AlertStripe type="info">
                            <FormattedMessage id={infoTekstId} />
                        </AlertStripe>
                    </Block>
                )}
                <Block visible={visibility.isVisible(UttaksplanFormField.ønskerAutomatiskJustering)} padBottom="l">
                    <UttaksplanFormComponents.YesOrNoQuestion
                        name={UttaksplanFormField.ønskerAutomatiskJustering}
                        legend={intlUtils(intl, 'uttaksplan.automatiskJustering.spørsmål')}
                        validate={(value: YesOrNo) => {
                            if (value === YesOrNo.UNANSWERED) {
                                return intlUtils(intl, 'uttaksplan.automatiskJustering.svar.påkrevd');
                            }
                        }}
                        afterOnChange={(value) => handleOnChange(value)}
                    />
                </Block>
            </div>
        </UttaksplanFormComponents.Form>
    );
};

export default AutomatiskJusteringForm;
