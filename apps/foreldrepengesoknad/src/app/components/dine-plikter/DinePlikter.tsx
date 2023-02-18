import { bemUtils, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import links from 'app/links/links';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import './dinePlikter.less';

const DinePlikter = () => {
    const intl = useIntl();
    const bem = bemUtils('dinePlikter');

    return (
        <UtvidetInformasjon apneLabel="Les om dine plikter">
            <article className="velkommenDinePlikter">
                <ul className={bem.block}>
                    <li>
                        <Normaltekst>{intlUtils(intl, 'velkommen.dinePlikter.listeElement.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage
                                id="velkommen.dinePlikter.listeElement.2"
                                values={{
                                    link: (
                                        <Lenke href={links.rettOgPlikt} target="_blank">
                                            <FormattedMessage id="velkommen.dinePlikter.listeElement.2.link" />
                                        </Lenke>
                                    ),
                                }}
                            />
                        </Normaltekst>
                    </li>
                </ul>
            </article>
        </UtvidetInformasjon>
    );
};

export default DinePlikter;
