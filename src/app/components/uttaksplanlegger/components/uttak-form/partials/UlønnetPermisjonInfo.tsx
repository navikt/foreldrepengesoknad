import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';

const UlønnetPermisjonInfo: React.SFC<{}> = () => {
    return (
        <UtvidetInformasjon apneLabel="Vi ønsker en periode med ulønnet permisjon">
            <Block margin="xs">
                <FormattedHTMLMessage id="uttaksplan.ulønnetPermisjonInfo.del1" />
            </Block>
            <FormattedHTMLMessage id="uttaksplan.ulønnetPermisjonInfo.del2" />
        </UtvidetInformasjon>
    );
};

export default UlønnetPermisjonInfo;
