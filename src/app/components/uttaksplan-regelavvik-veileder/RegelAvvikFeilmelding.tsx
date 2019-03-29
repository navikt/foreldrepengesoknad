import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { RegelTestresultatInfo } from '../../regler/uttaksplanValidering/types';
import { getRegelIntlValues } from '../../regler/uttaksplanValidering/regelUtils';
import { intlHasKey } from 'common/util/intlUtils';
import { Element } from 'nav-frontend-typografi';

interface Props {
    info: RegelTestresultatInfo;
}

const RegelAvvikFeilmelding: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, info }) => {
    const tittelIntlKey = `${info.intlKey}.tittel`;
    const harTittel = intlHasKey(intl, tittelIntlKey);

    return (
        <>
            {harTittel && (
                <Element>
                    <FormattedMessage id={tittelIntlKey} />
                </Element>
            )}
            {info.renderAsHtml ? (
                <FormattedHTMLMessage id={info.intlKey || 'missingKey'} values={getRegelIntlValues(intl, info)} />
            ) : (
                <FormattedMessage id={info.intlKey || 'missingKey'} values={getRegelIntlValues(intl, info)} />
            )}
        </>
    );
};
export default injectIntl(RegelAvvikFeilmelding);
