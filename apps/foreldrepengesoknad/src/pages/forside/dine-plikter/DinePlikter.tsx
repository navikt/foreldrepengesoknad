import { FormattedMessage } from 'react-intl';

import { BodyLong, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

export const DinePlikter = () => {
    return (
        <ul>
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
                    .
                </BodyLong>
            </li>
            <li>
                <BodyLong>
                    <FormattedMessage id="velkommen.dinePlikter.listeElement.2" />
                </BodyLong>
            </li>
        </ul>
    );
};
