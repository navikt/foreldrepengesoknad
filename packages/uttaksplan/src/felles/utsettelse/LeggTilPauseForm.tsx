import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Detail, Heading, VStack } from '@navikt/ds-react';

import { RhfSelect } from '@navikt/fp-form-hooks';
import { MorsAktivitet } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { getAktivitetskravOptions, getAktivitetskravTekst } from '../../utils/periodeUtils';

export type FormValues = {
    morsAktivitet?: MorsAktivitet;
};

interface Props {
    visTittel?: boolean;
}

export const LeggTilPauseForm = ({ visTittel = false }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<FormValues>();

    return (
        <VStack gap="space-16">
            {visTittel && (
                <VStack gap="space-0">
                    <Heading size="xsmall">
                        <FormattedMessage id="LeggTilPauseForm.Heading" />
                    </Heading>
                    <Detail>
                        <FormattedMessage id="LeggTilPauseForm.Aktivitetskrav" />
                    </Detail>
                </VStack>
            )}
            <RhfSelect
                name="morsAktivitet"
                control={formMethods.control}
                className="max-w-100"
                label={intl.formatMessage({ id: 'LeggTilPauseForm.VelgMorsAktivitet' })}
                validate={[isRequired(intl.formatMessage({ id: 'LeggTilPauseForm.VelgMorsAktivitet.Required' }))]}
            >
                {getAktivitetskravOptions(false).map((value) => (
                    <option key={value} value={value}>
                        {getAktivitetskravTekst(value, intl)}
                    </option>
                ))}
            </RhfSelect>
        </VStack>
    );
};
