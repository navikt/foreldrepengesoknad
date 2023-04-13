import React, { FunctionComponent } from 'react';
import { Block, intlUtils, Kjønn } from '@navikt/fp-common';
import { SøkersituasjonFormComponents, SøkersituasjonFormField } from '../søkersituasjonFormConfig';
import { useIntl } from 'react-intl';

interface Props {
    kjønn: Kjønn;
}

const VelgRolle: FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();

    if (kjønn === 'M') {
        return null;
    }

    return (
        <Block margin="xl">
            <SøkersituasjonFormComponents.RadioGroup
                name={SøkersituasjonFormField.rolle}
                radios={[
                    {
                        label: intlUtils(intl, 'søkersituasjon.radioButton.mor'),
                        value: 'mor',
                    },
                    {
                        label: intlUtils(intl, 'søkersituasjon.radioButton.medmor'),
                        value: 'medmor',
                    },
                ]}
                legend={intlUtils(intl, 'søkersituasjon.text.rolle')}
            />
        </Block>
    );
};

export default VelgRolle;
