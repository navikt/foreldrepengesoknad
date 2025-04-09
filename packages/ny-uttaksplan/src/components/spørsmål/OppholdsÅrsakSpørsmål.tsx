import { FormattedMessage, useIntl } from 'react-intl';

import { Radio, VStack } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { PeriodeHullType } from '../../types/Planperiode';

export const OppholdsÅrsakSpørsmål = () => {
    const intl = useIntl();

    return (
        <VStack gap="4">
            <RhfRadioGroup
                name="årsak"
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
