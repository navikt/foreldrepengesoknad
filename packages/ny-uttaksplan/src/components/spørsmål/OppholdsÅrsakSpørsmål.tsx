import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { PeriodeHullType } from '../../types/Planperiode';
import { LeggTilPeriodeModalFormValues } from '../legg-til-periode-modal/types/LeggTilPeriodeModalFormValues';

// TODO (TOR) Bør ikkje denne komponenten ligga under folder legg-til-periode-modal? Den blir kun brukt der.
// Det er bedre å ha ein funksjonell inndeling enn gruppering av like komponentar

export const OppholdsÅrsakSpørsmål = () => {
    const intl = useIntl();

    const { control } = useFormContext<LeggTilPeriodeModalFormValues>();

    return (
        <VStack gap="space-16">
            <RhfRadioGroup
                name="årsak"
                control={control}
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
            >
                <Radio value={UtsettelseÅrsakType.Ferie}>
                    <FormattedMessage id="uttaksplan.oppholdsårsakModal.ferie" />
                </Radio>
                <Radio value={PeriodeHullType.PERIODE_UTEN_UTTAK}>
                    <FormattedMessage id="uttaksplan.oppholdsårsakModal.periodeUtenForeldrepenger" />
                </Radio>
            </RhfRadioGroup>
        </VStack>
    );
};
