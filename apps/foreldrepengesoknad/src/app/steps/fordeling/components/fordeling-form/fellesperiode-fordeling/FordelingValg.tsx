import { getVarighetString } from '@navikt/uttaksplan/src/components/periodeliste-item-header/PeriodelisteItemHeader';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radio } from '@navikt/ds-react';

import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

import { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';

interface Props {
    dagerMedFellesperiode: number;
}

const FordelingValg: React.FunctionComponent<Props> = ({ dagerMedFellesperiode }) => {
    const intl = useIntl();
    return (
        <RadioGroup
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
        </RadioGroup>
    );
};

export default FordelingValg;
