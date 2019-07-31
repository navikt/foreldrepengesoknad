import * as React from 'react';
import { FormattedHTMLMessage, injectIntl, InjectedIntl } from 'react-intl';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';

interface Props {
    intl: InjectedIntl;
}

const ArbeideHelgInfo: React.FunctionComponent<Props> = ({ intl }) => {
    return (
        <UtvidetInformasjon apneLabel={intl.formatMessage({ id: 'uttaksplan.arbeideHelgInfo.tittel' })}>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del1" />
            </Block>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del2" />
            </Block>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del3" />
            </Block>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del4" />
            </Block>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del5" />
            </Block>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del6" />
            </Block>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del7" />
            </Block>
            <FormattedHTMLMessage id="uttaksplan.arbeideHelgInfo.del8" />
        </UtvidetInformasjon>
    );
};

export default injectIntl(ArbeideHelgInfo);
