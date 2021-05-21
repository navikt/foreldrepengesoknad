import { Block, intlUtils } from '@navikt/fp-common';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormField } from '../omBarnetFormConfig';

interface Props {
    søkersituasjon: Søkersituasjon;
}

const BarnFødtEllerAdoptert: FunctionComponent<Props> = ({ søkersituasjon }) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'adopsjon') {
        return (
            <Block padBottom="l">
                <OmBarnetFormComponents.YesOrNoQuestion
                    name={OmBarnetFormField.adopsjonAvEktefellesBarn}
                    legend={intlUtils(intl, 'omBarnet.adopsjonGjelder')}
                />
            </Block>
        );
    }

    return (
        <Block padBottom="l">
            <OmBarnetFormComponents.YesOrNoQuestion
                name={OmBarnetFormField.erBarnetFødt}
                legend={intlUtils(intl, 'omBarnet.erBarnetFødt')}
            />
        </Block>
    );
};

export default BarnFødtEllerAdoptert;
