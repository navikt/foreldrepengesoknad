import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import {
    HvaVilDuGjøre,
    LeggTilPeriodeModalFormValues,
} from '../legg-til-periode-modal/types/LeggTilPeriodeModalFormValues';

type Props = {
    label: string;
};

export const HvaVilDuGjøreSpørsmål = ({ label }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<LeggTilPeriodeModalFormValues>();

    return (
        <>
            <VStack gap="space-16">
                <RhfRadioGroup
                    name="hvaVilDuGjøre"
                    label={label}
                    control={control}
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
                >
                    <Radio value={HvaVilDuGjøre.LEGG_TIL_FERIE}>
                        <FormattedMessage id="uttaksplan.valgModal.leggTilFerie" />
                    </Radio>
                    <Radio value={HvaVilDuGjøre.LEGG_TIL_OPPHOLD}>
                        <FormattedMessage id="uttaksplan.valgModal.leggTilOpphold" />
                    </Radio>
                    <Radio value={HvaVilDuGjøre.LEGG_TIL_PERIODE}>
                        <FormattedMessage id="uttaksplan.valgModal.leggTilPeriode" />
                    </Radio>
                </RhfRadioGroup>
            </VStack>
        </>
    );
};
