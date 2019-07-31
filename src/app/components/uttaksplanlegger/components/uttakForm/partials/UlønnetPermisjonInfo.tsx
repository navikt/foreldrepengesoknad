import * as React from 'react';
import { FormattedHTMLMessage, injectIntl, InjectedIntl } from 'react-intl';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';

interface Props {
    intl: InjectedIntl;
}

const UlønnetPermisjonInfo: React.FunctionComponent<Props> = ({ intl }) => {
    return (
        <UtvidetInformasjon apneLabel={intl.formatMessage({ id: 'uttaksplan.ulønnetPermisjonInfo.tittel' })}>
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.ulønnetPermisjonInfo.del1" />
            </Block>
            <FormattedHTMLMessage id="uttaksplan.ulønnetPermisjonInfo.del2" />
        </UtvidetInformasjon>
    );
};

export default injectIntl(UlønnetPermisjonInfo);
