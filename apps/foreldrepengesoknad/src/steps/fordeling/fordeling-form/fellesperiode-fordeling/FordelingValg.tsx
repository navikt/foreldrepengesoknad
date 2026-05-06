import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { FellesperiodeFordelingValg, Fordeling } from 'types/Fordeling';
import { getVarighetString } from 'utils/dateUtils';

import { Radio } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

interface Props {
    dagerMedFellesperiode: number;
}

export const FordelingValg = ({ dagerMedFellesperiode }: Props) => {
    const intl = useIntl();
    const { control } = useFormContext<Fordeling>();
    const varighetTekst = getVarighetString(dagerMedFellesperiode, intl);

    return (
        <RhfRadioGroup
            name="fordelingValg"
            control={control}
            label={<FormattedMessage id="fordeling.fordelingvalg.spørsmål" values={{ varighetTekst }} />}
            validate={[isRequired(intl.formatMessage({ id: 'fordeling.fordelingsvalg.måOppgis' }))]}
        >
            <Radio value={FellesperiodeFordelingValg.ALT}>
                <FormattedMessage id="fordeling.fordelingsvalg.option.alt" />
            </Radio>
            <Radio value={FellesperiodeFordelingValg.VIL_VELGE}>
                <FormattedMessage id="fordeling.fordelingsvalg.option.valgfritt" />
            </Radio>
            <Radio value={FellesperiodeFordelingValg.HOPP_OVER_FORDELING}>
                <FormattedMessage id="fordeling.fordelingsvalg.option.senere" />
            </Radio>
        </RhfRadioGroup>
    );
};
