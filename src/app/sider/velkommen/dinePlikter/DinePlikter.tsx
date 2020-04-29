import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';

const DinePlikter = () => {
    const intl = useIntl();
    return (
        <article className="velkommenDinePlikter">
            <ul>
                <li>
                    <Normaltekst>{getMessage(intl, 'dinePlikter.listeElement.1')}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage
                            id="dinePlikter.listeElement.2"
                            values={{
                                link: (
                                    <Lenke href={lenker.rettOgPlikt} target="_blank">
                                        <FormattedMessage id="dinePlikter.listeElement.2.link" />
                                    </Lenke>
                                )
                            }}
                        />
                    </Normaltekst>
                </li>
            </ul>
        </article>
    );
};

export default injectIntl(DinePlikter);
