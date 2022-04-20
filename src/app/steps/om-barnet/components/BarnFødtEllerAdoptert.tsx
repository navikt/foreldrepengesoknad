import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormField } from '../omBarnetFormConfig';

interface Props {
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const BarnFødtEllerAdoptert: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.adopsjonAvEktefellesBarn)}>
                <OmBarnetFormComponents.YesOrNoQuestion
                    name={OmBarnetFormField.adopsjonAvEktefellesBarn}
                    legend={intlUtils(intl, 'omBarnet.adopsjonGjelder')}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.erBarnetFødt)}>
                <OmBarnetFormComponents.YesOrNoQuestion
                    name={OmBarnetFormField.erBarnetFødt}
                    legend={intlUtils(intl, 'omBarnet.erBarnetFødt')}
                />
            </Block>
        </>
    );
};

export default BarnFødtEllerAdoptert;
