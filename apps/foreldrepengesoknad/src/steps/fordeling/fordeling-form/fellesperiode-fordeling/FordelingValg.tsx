import { FormattedMessage, useIntl } from 'react-intl';
import { FellesperiodeFordelingValg } from 'types/Fordeling';
import { getVarighetString } from 'utils/dateUtils';

import { Radio } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

interface Props {
    dagerMedFellesperiode: number;
}

const FordelingValg: React.FunctionComponent<Props> = ({ dagerMedFellesperiode }) => {
    const intl = useIntl();
    return (
        <RhfRadioGroup
            name="fordelingValg"
            label={<FormattedMessage id="fordeling.fordelingvalg.spørsmål" />}
            description={<FormattedMessage id="fordeling.description.kanEndresSenere" />}
            validate={[isRequired(intl.formatMessage({ id: 'fordeling.fordelingsvalg.måOppgis' }))]}
        >
            <Radio
                value={FellesperiodeFordelingValg.ALT}
                description={intl.formatMessage(
                    {
                        id: 'fordeling.fordelingsvalg.option.alt.description',
                    },
                    {
                        ukerDeg: getVarighetString(dagerMedFellesperiode, intl),
                    },
                )}
            >
                <FormattedMessage id="fordeling.fordelingsvalg.option.alt" />
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
        </RhfRadioGroup>
    );
};

export default FordelingValg;
