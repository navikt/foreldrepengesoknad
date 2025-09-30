import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { getStønadskontoNavnSimple } from '../../utils/stønadskontoerUtils';
import { EndrePeriodePanelStepFormValues } from '../endre-periode-panel/steps/EndrePeriodePanelStep';
import { LeggTilPeriodePanelFormValues } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';

export const KontotypeSpørsmål = () => {
    const intl = useIntl();
    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();
    const valgtStønadskonto = notEmpty(useContextGetData(UttaksplanContextDataType.VALGT_STØNADSKONTO));
    const erMedmorDelAvSøknaden = notEmpty(useContextGetData(UttaksplanContextDataType.ER_MEDMOR_DEL_AV_SØKNADEN));
    const kontoTypeValue = watch('kontoType');

    return (
        <VStack gap="space-16">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.velgKontotypeModal.tittel" />
            </Heading>
            <RhfRadioGroup
                name="kontoType"
                control={control}
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.kontoType.påkrevd' }))]}
                label={intl.formatMessage({ id: 'KontotypeSpørsmål.velgKontotype' })}
            >
                {valgtStønadskonto.kontoer.map((konto) => {
                    return (
                        <Radio key={konto.konto} value={konto.konto}>
                            {getStønadskontoNavnSimple(intl, konto.konto, erMedmorDelAvSøknaden)}
                        </Radio>
                    );
                })}
            </RhfRadioGroup>
            {kontoTypeValue === StønadskontoType.Fellesperiode && (
                <RhfRadioGroup
                    name="forelder"
                    control={control}
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.forelder.påkrevd' }))]}
                    label={intl.formatMessage({ id: 'KontotypeSpørsmål.hvemGjelder' })}
                >
                    <Radio value={Forelder.mor}>
                        <FormattedMessage id="uttaksplan.mor" />
                    </Radio>
                    <Radio value={Forelder.farMedmor}>
                        <FormattedMessage id="uttaksplan.far" />
                    </Radio>
                </RhfRadioGroup>
            )}
        </VStack>
    );
};
