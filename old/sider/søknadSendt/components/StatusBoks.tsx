import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import EtikettBase from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel, Ingress, Systemtittel, Normaltekst } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import lenker from 'app/util/routing/lenker';

import './statusBoks.less';

const cls = BEMHelper('statusBoks');
interface Props {
    saksNr: string;
}

const StatusBoks: React.FunctionComponent<Props> = ({ saksNr }) => {
    return (
        <Block>
            <Block margin="xs">
                <Systemtittel>
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Systemtittel>
            </Block>
            <LenkepanelBase href={lenker.innsyn} border={true} className="statusBoks__lenkepanel">
                <div className={cls.block}>
                    <div className={cls.element('left')}>
                        <Block margin="xs">
                            <Undertittel tag="h3">
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Undertittel>
                        </Block>
                        <EtikettBase type="fokus">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </EtikettBase>
                    </div>
                    {saksNr && (
                        <div className={cls.element('right')}>
                            <Normaltekst>
                                <FormattedMessage id="søknadSendt.status.saksnummer" />
                            </Normaltekst>
                            <Ingress>{saksNr}</Ingress>
                        </div>
                    )}
                </div>
            </LenkepanelBase>
        </Block>
    );
};

export default StatusBoks;
