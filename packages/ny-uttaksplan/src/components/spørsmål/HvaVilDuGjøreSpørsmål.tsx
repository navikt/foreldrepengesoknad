import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import {
    HvaVilDuGjøre,
    LeggTilPeriodePanelFormValues,
} from '../legg-til-periode-panel/types/LeggTilPeriodePanelFormValues';

type Props = {
    label: string;
    autoFocus?: boolean;
};

export const HvaVilDuGjøreSpørsmål = ({ label, autoFocus }: Props) => {
    const intl = useIntl();

    const { control } = useFormContext<LeggTilPeriodePanelFormValues>();

    return (
        <VStack gap="space-16">
            <RhfRadioGroup
                name="hvaVilDuGjøre"
                label={label}
                control={control}
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodePanel.hvaVilDuGjøre.påkrevd' }))]}
            >
                <Radio value={HvaVilDuGjøre.LEGG_TIL_FERIE} autoFocus={autoFocus}>
                    <FormattedMessage id="uttaksplan.valgPanel.leggTilFerie" />
                </Radio>
                <Radio value={HvaVilDuGjøre.LEGG_TIL_OPPHOLD}>
                    <FormattedMessage id="uttaksplan.valgPanel.leggTilOpphold" />
                </Radio>
                <Radio value={HvaVilDuGjøre.LEGG_TIL_PERIODE}>
                    <FormattedMessage id="uttaksplan.valgPanel.leggTilPeriode" />
                </Radio>
            </RhfRadioGroup>
        </VStack>
    );
};
