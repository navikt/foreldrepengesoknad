import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';

const UlønnetPermisjonInfo = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon apneLabel={intl.formatMessage({ id: 'uttaksplan.ulønnetPermisjonInfo.tittel' })}>
            <Block margin="xs">
                <FormattedMessage id="uttaksplan.ulønnetPermisjonInfo.del1" />
            </Block>
            <FormattedMessage id="uttaksplan.ulønnetPermisjonInfo.del2" />
        </UtvidetInformasjon>
    );
};

export default UlønnetPermisjonInfo;
