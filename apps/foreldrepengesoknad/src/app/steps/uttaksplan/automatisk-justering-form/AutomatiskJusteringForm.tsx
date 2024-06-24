import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert } from '@navikt/ds-react';

import { Block, Periode, StønadskontoType, intlUtils, isOverføringsperiode, isUttaksperiode } from '@navikt/fp-common';
import { Uttaksdagen } from '@navikt/fp-common/src/common/utils/Uttaksdagen';
import { QuestionVisibility, YesOrNo } from '@navikt/fp-formik';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { UttaksplanFormComponents, UttaksplanFormField } from 'app/steps/uttaksplan/UttaksplanFormConfig';
import { mapUttaksplanFormValueToState } from 'app/steps/uttaksplan/UttaksplanFormUtils';

interface Props {
    termindato: Date;
    perioderMedUttakRundtFødsel: Periode[];
    antallBarn: number;
    visibility: QuestionVisibility<UttaksplanFormField, undefined>;
}
const AutomatiskJusteringForm: FunctionComponent<Props> = ({
    termindato,
    perioderMedUttakRundtFødsel,
    antallBarn,
    visibility,
}) => {
    const intl = useIntl();
    const uttaksdagPåEllerEtterTermin = Uttaksdagen(termindato).denneEllerNeste();

    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);

    const oppdaterUttaksplanMetadata = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA);
    const brukerSvarteJaPåAutoJustering = uttaksplanMetadata?.ønskerJustertUttakVedFødsel;

    const svarteJaMenFlerePerioderInnen6Uker = brukerSvarteJaPåAutoJustering && perioderMedUttakRundtFødsel.length > 1;
    const svarteJaMenStarterIkkeLengerPåTermin =
        brukerSvarteJaPåAutoJustering &&
        perioderMedUttakRundtFødsel.length === 1 &&
        !dayjs(perioderMedUttakRundtFødsel[0].tidsperiode.fom).isSame(uttaksdagPåEllerEtterTermin, 'day');
    const svarteJaMenEndretPeriodenPåTermin =
        brukerSvarteJaPåAutoJustering &&
        perioderMedUttakRundtFødsel.length === 1 &&
        dayjs(perioderMedUttakRundtFødsel[0].tidsperiode.fom).isSame(uttaksdagPåEllerEtterTermin, 'day') &&
        ((isUttaksperiode(perioderMedUttakRundtFødsel[0]) &&
            (perioderMedUttakRundtFødsel[0].konto !== StønadskontoType.Fedrekvote ||
                !perioderMedUttakRundtFødsel[0].ønskerSamtidigUttak)) ||
            isOverføringsperiode(perioderMedUttakRundtFødsel[0]));
    const svarteJaMenEndretPeriodenTilØnskerFlerbarnsdager =
        brukerSvarteJaPåAutoJustering &&
        perioderMedUttakRundtFødsel.length === 1 &&
        dayjs(perioderMedUttakRundtFødsel[0].tidsperiode.fom).isSame(uttaksdagPåEllerEtterTermin, 'day') &&
        isUttaksperiode(perioderMedUttakRundtFødsel[0]) &&
        perioderMedUttakRundtFødsel[0].konto === StønadskontoType.Fedrekvote &&
        perioderMedUttakRundtFødsel[0].ønskerFlerbarnsdager === true;

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
    if (svarteJaMenEndretPeriodenTilØnskerFlerbarnsdager) {
        infoTekstId = 'uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager';
    }

    const handleOnChange = (value: string) => {
        const ønskerJustertUttakVedFødsel = mapUttaksplanFormValueToState(value as YesOrNo);
        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            ønskerJustertUttakVedFødsel: ønskerJustertUttakVedFødsel,
        });
    };

    return (
        <UttaksplanFormComponents.Form includeButtons={false}>
            <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                {infoTekstId !== '' && (
                    <Block padBottom="l">
                        <Alert variant="info">
                            <FormattedMessage id={infoTekstId} />
                        </Alert>
                    </Block>
                )}
                <Block visible={visibility.isVisible(UttaksplanFormField.ønskerAutomatiskJustering)} padBottom="l">
                    <UttaksplanFormComponents.YesOrNoQuestion
                        name={UttaksplanFormField.ønskerAutomatiskJustering}
                        legend={intlUtils(intl, 'uttaksplan.automatiskJustering.spørsmål', {
                            antallBarn,
                        })}
                        validate={(value: YesOrNo) => {
                            if (value === YesOrNo.UNANSWERED) {
                                return intlUtils(intl, 'uttaksplan.automatiskJustering.svar.påkrevd');
                            }

                            return undefined;
                        }}
                        afterOnChange={(value: string) => handleOnChange(value)}
                    />
                </Block>
            </div>
        </UttaksplanFormComponents.Form>
    );
};

export default AutomatiskJusteringForm;
