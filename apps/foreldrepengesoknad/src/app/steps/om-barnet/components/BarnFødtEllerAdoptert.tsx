import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormField } from '../omBarnetFormConfig';
import { ReadMore } from '@navikt/ds-react';

interface Props {
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const BarnFødtEllerAdoptert: FunctionComponent<Props> = ({ visibility }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.adopsjonAvEktefellesBarn)}>
                <OmBarnetFormComponents.YesOrNoQuestion
                    name={OmBarnetFormField.adopsjonAvEktefellesBarn}
                    legend={intlUtils(intl, 'omBarnet.adopsjonGjelder')}
                />
            </Block>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.erBarnetFødt)}>
                <OmBarnetFormComponents.YesOrNoQuestion
                    name={OmBarnetFormField.erBarnetFødt}
                    legend={intlUtils(intl, 'omBarnet.erBarnetFødt')}
                />
                <ReadMore header={intlUtils(intl, 'omBarnet.erBarnetFødt.readMore.header')}>
                    <Block padBottom="m">
                        <FormattedMessage id="omBarnet.erBarnetFødt.readMore.innhold.del1" />
                    </Block>
                    <FormattedMessage id="omBarnet.erBarnetFødt.readMore.innhold.del2" />
                </ReadMore>
            </Block>
        </>
    );
};

export default BarnFødtEllerAdoptert;
