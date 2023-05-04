import { FunctionComponent } from 'react';

import './statusBoks.less';
import BEMHelper from 'common/util/bem';
import { BodyShort, Heading, Ingress, LinkPanel, Tag } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

const cls = BEMHelper('statusBoks');

interface Props {
    saksNr: string;
}

const StatusBoks: FunctionComponent<Props> = ({ saksNr }) => {
    return (
        <Block>
            <Block margin="xs">
                <Heading size="medium">
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Heading>
            </Block>
            <LinkPanel href="https://foreldrepenger.nav.no" border={true} className="statusBoks__lenkepanel">
                <div className={cls.block}>
                    <div className={cls.element('left')}>
                        <Block margin="xs">
                            <Heading size="small">
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Heading>
                        </Block>
                        <Tag variant="warning">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </Tag>
                    </div>
                    <div className={cls.element('right')}>
                        <BodyShort>
                            <FormattedMessage id="søknadSendt.status.saksnummer" />
                        </BodyShort>
                        <Ingress>{saksNr}</Ingress>
                    </div>
                </div>
            </LinkPanel>
        </Block>
    );
};

export default StatusBoks;
