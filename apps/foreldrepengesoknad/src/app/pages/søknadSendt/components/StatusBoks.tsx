import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import links from 'app/links/links';
import { bemUtils, Block } from '@navikt/fp-common';
import { BodyShort, Heading, Ingress, LinkPanel, Tag } from '@navikt/ds-react';

import './statusBoks.less';

interface Props {
    saksNr: string;
}

const StatusBoks: FunctionComponent<Props> = ({ saksNr }) => {
    const bem = bemUtils('statusBoks');

    return (
        <Block>
            <Block padBottom="l">
                <Heading size="medium">
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Heading>
            </Block>
            <LinkPanel href={links.innsyn} border={true} className="statusBoks__lenkepanel">
                <div className={bem.block}>
                    <div className={bem.element('left')}>
                        <Block padBottom="l">
                            <Heading size="small" as="h3">
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Heading>
                        </Block>
                        <Tag variant="warning">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </Tag>
                    </div>
                    {saksNr && (
                        <div className={bem.element('right')}>
                            <BodyShort>
                                <FormattedMessage id="søknadSendt.status.saksnummer" />
                            </BodyShort>
                            <Ingress>{saksNr}</Ingress>
                        </div>
                    )}
                </div>
            </LinkPanel>
        </Block>
    );
};

export default StatusBoks;
