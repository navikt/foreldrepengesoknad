import { bemUtils, intlUtils, links } from '@navikt/fp-common';

import { FormattedMessage, useIntl } from 'react-intl';
import { BodyLong, Link } from '@navikt/ds-react';

import './dinePlikter.less';

const DinePlikter = () => {
    const intl = useIntl();
    const bem = bemUtils('dinePlikter');

    return (
        <div className="velkommenDinePlikter">
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
        </div>
    );
};

export default DinePlikter;
