import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Heading, Ingress, Label, LinkPanel, Tag } from '@navikt/ds-react';
import { bemUtils, Block } from '@navikt/fp-common';
import { lenker } from 'app/util/lenker';

import './statusBoks.less';

interface Props {
    saksNr: string;
}

const StatusBoks: React.FunctionComponent<Props> = ({ saksNr }) => {
    const bem = bemUtils('statusBoks');

    return (
        <Block margin="l">
            <Block>
                <Heading size="medium">
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Heading>
            </Block>
            <Block margin="l">
                <LinkPanel href={lenker.innsyn} border={true} className="statusBoks__lenkepanel">
                    <div className={bem.block}>
                        <div className={bem.element('left')}>
                            <Heading size="small">
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Heading>
                            <Block margin="l">
                                <Tag variant="warning">
                                    <FormattedMessage id="søknadSendt.status.status" />
                                </Tag>
                            </Block>
                        </div>
                        {saksNr && (
                            <div className={bem.element('right')}>
                                <Label>
                                    <FormattedMessage id="søknadSendt.status.saksnummer" />
                                </Label>
                                <Ingress>{saksNr}</Ingress>
                            </div>
                        )}
                    </div>
                </LinkPanel>
            </Block>
        </Block>
    );
};

export default StatusBoks;
