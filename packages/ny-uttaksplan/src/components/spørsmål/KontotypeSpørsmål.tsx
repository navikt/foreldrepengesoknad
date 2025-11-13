import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { KontoTypeUttak } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { getStønadskontoNavnSimple } from '../../utils/stønadskontoerUtils';
import { EndrePeriodePanelStepFormValues } from '../endre-periode-panel/steps/EndrePeriodePanelStep';
import { LeggTilPeriodePanelFormValues } from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';

interface Props {
    gyldigeKontotyper?: KontoTypeUttak[];
    skalViseTittel?: boolean;
}

export const KontotypeSpørsmål = ({ gyldigeKontotyper, skalViseTittel = true }: Props) => {
    const intl = useIntl();
    const { watch, control } = useFormContext<LeggTilPeriodePanelFormValues | EndrePeriodePanelStepFormValues>();
    const { valgtStønadskonto, erMedmorDelAvSøknaden } = useUttaksplanData();

    const kontoTypeValue = watch('kontoType');

    return (
        <VStack gap="space-16">
            {skalViseTittel && (
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.velgKontotypeModal.tittel" />
                </Heading>
            )}
            <RhfRadioGroup
                name="kontoType"
                control={control}
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.kontoType.påkrevd' }))]}
                label={intl.formatMessage({ id: 'KontotypeSpørsmål.velgKontotype' })}
            >
                {valgtStønadskonto.kontoer
                    .filter((kontotype) => !gyldigeKontotyper || gyldigeKontotyper.includes(kontotype.konto))
                    .map((konto) => {
                        return (
                            <Radio key={konto.konto} value={konto.konto}>
                                {getStønadskontoNavnSimple(intl, konto.konto, erMedmorDelAvSøknaden)}
                            </Radio>
                        );
                    })}
            </RhfRadioGroup>
            {kontoTypeValue === 'FELLESPERIODE' && (
                <RhfRadioGroup
                    name="forelder"
                    control={control}
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.forelder.påkrevd' }))]}
                    label={intl.formatMessage({ id: 'KontotypeSpørsmål.hvemGjelder' })}
                >
                    <Radio value={'MOR'}>
                        <FormattedMessage id="uttaksplan.mor" />
                    </Radio>
                    <Radio value={'FAR_MEDMOR'}>
                        <FormattedMessage id="uttaksplan.far" />
                    </Radio>
                </RhfRadioGroup>
            )}
        </VStack>
    );
};
