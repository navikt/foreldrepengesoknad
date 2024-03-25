import { FormattedMessage, useIntl } from 'react-intl';

import { Radio } from '@navikt/ds-react';

import { getVarighetString } from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';

interface Props {
    dagerMedFellesperiode: number;
    navnAnnenForelder: string;
}

const FordelingValg: React.FunctionComponent<Props> = ({ dagerMedFellesperiode, navnAnnenForelder }) => {
    const intl = useIntl();
    const likFordeling = getVarighetString(dagerMedFellesperiode / 2, intl);
    return (
        <RadioGroup
            name="fordelingValg"
            label={<FormattedMessage id="fordeling.fordelingvalg.spørsmål" />}
            description={<FormattedMessage id="fordeling.description.kanEndresSenere" />}
            validate={[isRequired(intl.formatMessage({ id: 'fordeling.fordelingsvalg.måOppgis' }))]}
        >
            <Radio
                value={FellesperiodeFordelingValg.LIKT}
                description={intl.formatMessage(
                    {
                        id: 'fordeling.fordelingsvalg.option.likt.description',
                    },
                    {
                        ukerDeg: likFordeling,
                        ukerAnnenForelder: likFordeling,
                        navnAnnenForelder: navnAnnenForelder,
                    },
                )}
            >
                <FormattedMessage id="fordeling.fordelingsvalg.option.likt" />
            </Radio>
            <Radio
                value={FellesperiodeFordelingValg.VIL_VELGE}
                description={intl.formatMessage({ id: 'fordeling.fordelingsvalg.option.valgfritt.description' })}
            >
                <FormattedMessage id="fordeling.fordelingsvalg.option.valgfritt" />
            </Radio>
            <Radio value={FellesperiodeFordelingValg.HOPP_OVER_FORDELING}>
                <FormattedMessage id="fordeling.fordelingsvalg.option.senere" />
            </Radio>
        </RadioGroup>
    );
};

export default FordelingValg;
