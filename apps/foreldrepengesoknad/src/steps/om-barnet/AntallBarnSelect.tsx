import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { RhfSelect } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { BarnetFormValues } from './OmBarnetFormValues';

export const AntallBarnSelect = () => {
    const intl = useIntl();
    const { control } = useFormContext<BarnetFormValues>();

    return (
        <RhfSelect
            name="antallBarnSelect"
            control={control}
            label={intl.formatMessage({ id: 'omBarnet.antallBarnSelect.label' })}
            validate={[
                isRequired(intl.formatMessage({ id: 'valideringsfeil.omBarnet.antallBarnSelect.duMåOppgi' })),
            ]}
        >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </RhfSelect>
    );
};
