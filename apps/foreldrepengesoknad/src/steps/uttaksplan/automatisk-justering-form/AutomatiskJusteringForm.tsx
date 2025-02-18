import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { UttaksplanFormComponents, UttaksplanFormField } from 'steps/uttaksplan/UttaksplanFormConfig';
import { mapUttaksplanFormValueToState } from 'steps/uttaksplan/UttaksplanFormUtils';

import { Alert, VStack } from '@navikt/ds-react';

import { Periode, StønadskontoType, isOverføringsperiode, isUttaksperiode } from '@navikt/fp-common';
import { Uttaksdagen } from '@navikt/fp-utils';
import { QuestionVisibility, YesOrNo } from '@navikt/fp-uttaksplan';

interface Props {
    termindato: Date;
    perioderMedUttakRundtFødsel: Periode[];
    antallBarn: number;
    visibility: QuestionVisibility<UttaksplanFormField, undefined>;
}
export const AutomatiskJusteringForm = ({ termindato, perioderMedUttakRundtFødsel, antallBarn, visibility }: Props) => {
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

    let infoTekst = undefined;
    if (svarteJaMenFlerePerioderInnen6Uker) {
        infoTekst = <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisFlerePerioder" />;
    }
    if (svarteJaMenStarterIkkeLengerPåTermin) {
        infoTekst = <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin" />;
    }

    if (svarteJaMenEndretPeriodenPåTermin) {
        infoTekst = <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodePåTermin" />;
    }
    if (svarteJaMenEndretPeriodenTilØnskerFlerbarnsdager) {
        infoTekst = (
            <FormattedMessage id="uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager" />
        );
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
                <VStack gap="2">
                    {infoTekst && <Alert variant="info">{infoTekst}</Alert>}
                    {visibility.isVisible(UttaksplanFormField.ønskerAutomatiskJustering) && (
                        <UttaksplanFormComponents.YesOrNoQuestion
                            name={UttaksplanFormField.ønskerAutomatiskJustering}
                            legend={intl.formatMessage(
                                { id: 'uttaksplan.automatiskJustering.spørsmål' },
                                {
                                    antallBarn,
                                },
                            )}
                            validate={(value: YesOrNo) => {
                                if (value === YesOrNo.UNANSWERED) {
                                    return intl.formatMessage({ id: 'uttaksplan.automatiskJustering.svar.påkrevd' });
                                }

                                return undefined;
                            }}
                            afterOnChange={(value: string) => handleOnChange(value)}
                        />
                    )}
                </VStack>
            </div>
        </UttaksplanFormComponents.Form>
    );
};
