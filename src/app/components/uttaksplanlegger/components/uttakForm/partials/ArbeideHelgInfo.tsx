import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';

const ArbeideHelgInfo = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon apneLabel={intl.formatMessage({ id: 'uttaksplan.arbeideHelgInfo.tittel' })}>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del1" />
            </Block>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del2" />
            </Block>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del3" />
            </Block>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del4" />
            </Block>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del5" />
            </Block>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del6" />
            </Block>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.arbeideHelgInfo.del7" />
            </Block>
            <FormattedMessage id="uttaksplan.arbeideHelgInfo.del8" />
        </UtvidetInformasjon>
    );
};

export default ArbeideHelgInfo;
