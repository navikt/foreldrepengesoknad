import { FormattedMessage } from 'react-intl';

import { BodyLong, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { bemUtils } from '@navikt/fp-utils';

import './dinePlikter.less';

export const DinePlikter = () => {
    const bem = bemUtils('dinePlikter');

    return (
        <div className="velkommenDinePlikter">
            <ul className={bem.block}>
                <li>
                    <BodyLong>
                        <FormattedMessage
                            id="velkommen.dinePlikter.listeElement.1"
                            values={{
                                link: (
                                    <Link href={links.rettOgPlikt} target="_blank">
                                        <FormattedMessage id="velkommen.dinePlikter.listeElement.1.link" />
                                    </Link>
                                ),
                            }}
                        />
                    </BodyLong>
                </li>
                <li>
                    <BodyLong>
                        <FormattedMessage id="velkommen.dinePlikter.listeElement.2" />
                    </BodyLong>
                </li>
            </ul>
        </div>
    );
};
