import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Link } from '@navikt/ds-react';
import getMessage from 'common/util/i18nUtils';
import { lenker } from 'util/lenker';

import './modalContent.less';

const Plikter = () => {
    const intl = useIntl();
    return (
        <article className="modalContent">
            <ul>
                <li>
                    <BodyShort>{getMessage(intl, 'rettigheter.text.2')}</BodyShort>
                </li>
                <li>
                    <BodyShort>
                        <FormattedMessage
                            id="rettigheter.text.lestOgForstått"
                            values={{
                                link: (
                                    <Link href={lenker.plikter} target="_blank">
                                        <FormattedMessage id="rettigheter.text.lestOgForstått.link" />
                                    </Link>
                                ),
                            }}
                        />
                    </BodyShort>
                </li>
            </ul>
        </article>
    );
};

export default Plikter;
