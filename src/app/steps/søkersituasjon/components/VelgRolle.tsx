import React, { FunctionComponent } from 'react';
import { Block, intlUtils, Kjønn } from '@navikt/fp-common';
import { SøkersituasjonFormComponents, SøkersituasjonFormField } from '../søkersituasjonFormConfig';
import { useIntl } from 'react-intl';

interface Props {
    kjønn: Kjønn;
}

const VelgRolle: FunctionComponent<Props> = ({ kjønn }) => {
    if (kjønn === 'M') {
        return null;
    }

    const intl = useIntl();

    return (
        <Block margin="xl">
            <SøkersituasjonFormComponents.RadioPanelGroup
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
                useTwoColumns={true}
                legend={intlUtils(intl, 'søkersituasjon.text.rolle')}
            />
        </Block>
    );
};

export default VelgRolle;
