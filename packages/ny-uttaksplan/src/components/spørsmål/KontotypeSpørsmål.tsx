import { FormattedMessage, useIntl } from 'react-intl';

import { Heading, Radio, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { getStønadskontoNavnSimple } from '../../utils/stønadskontoerUtils';

interface Props {
    formMethods: any;
}

export const KontotypeSpørsmål = ({ formMethods }: Props) => {
    const intl = useIntl();
    const valgtStønadskonto = notEmpty(useContextGetData(UttaksplanContextDataType.VALGT_STØNADSKONTO));

    const kontoTypeValue = formMethods.watch('kontoType');

    return (
        <VStack gap="4">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.velgKontotypeModal.tittel" />
            </Heading>
            <RhfRadioGroup
                name="kontoType"
                validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.kontoType.påkrevd' }))]}
                label={intl.formatMessage({ id: 'KontotypeSpørsmål.velgKontotype' })}
            >
                {valgtStønadskonto.kontoer.map((konto) => {
                    return (
                        <Radio key={konto.konto} value={konto.konto}>
                            {getStønadskontoNavnSimple(intl, konto.konto)}
                        </Radio>
                    );
                })}
            </RhfRadioGroup>
            {kontoTypeValue === StønadskontoType.Fellesperiode && (
                <RhfRadioGroup
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.forelder.påkrevd' }))]}
                    label={intl.formatMessage({ id: 'KontotypeSpørsmål.hvemGjelder' })}
                    name="forelder"
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
