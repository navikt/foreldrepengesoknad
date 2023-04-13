import { bemUtils, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import links from 'app/links/links';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyLong, Link } from '@navikt/ds-react';

import './dinePlikter.less';

const DinePlikter = () => {
    const intl = useIntl();
    const bem = bemUtils('dinePlikter');

    return (
        <UtvidetInformasjon apneLabel="Les om dine plikter">
            <article className="velkommenDinePlikter">
                <ul className={bem.block}>
                    <li>
                        <BodyLong>{intlUtils(intl, 'velkommen.dinePlikter.listeElement.1')}</BodyLong>
                    </li>
                    <li>
                        <BodyLong>
                            <FormattedMessage
                                id="velkommen.dinePlikter.listeElement.2"
                                values={{
                                    link: (
                                        <Link href={links.rettOgPlikt} target="_blank">
                                            <FormattedMessage id="velkommen.dinePlikter.listeElement.2.link" />
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                    </li>
                </ul>
            </article>
        </UtvidetInformasjon>
    );
};

export default DinePlikter;
