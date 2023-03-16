import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import { lenker } from 'util/lenker';
import { Normaltekst } from 'nav-frontend-typografi';

import './modalContent.less';

const Plikter = () => {
    const intl = useIntl();
    return (
        <article className="modalContent">
            <ul>
                <li>
                    <Normaltekst>{getMessage(intl, 'rettigheter.text.2')}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage
                            id="rettigheter.text.lestOgForstått"
                            values={{
                                link: (
                                    <Lenke href={lenker.plikter} target="_blank">
                                        <FormattedMessage id="rettigheter.text.lestOgForstått.link" />
                                    </Lenke>
                                ),
                            }}
                        />
                    </Normaltekst>
                </li>
            </ul>
        </article>
    );
};

export default Plikter;
