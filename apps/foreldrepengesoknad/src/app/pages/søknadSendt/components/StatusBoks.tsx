import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import EtikettBase from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel, Ingress, Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import links from 'app/links/links';
import { bemUtils, Block } from '@navikt/fp-common';

import './statusBoks.less';

interface Props {
    saksNr: string;
}

const StatusBoks: FunctionComponent<Props> = ({ saksNr }) => {
    const bem = bemUtils('statusBoks');

    return (
        <Block>
            <Block padBottom="l">
                <Systemtittel>
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Systemtittel>
            </Block>
            <LenkepanelBase href={links.innsyn} border={true} className="statusBoks__lenkepanel">
                <div className={bem.block}>
                    <div className={bem.element('left')}>
                        <Block padBottom="l">
                            <Undertittel tag="h3">
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Undertittel>
                        </Block>
                        <EtikettBase type="fokus">
                            <FormattedMessage id="søknadSendt.status.status" />
                        </EtikettBase>
                    </div>
                    {saksNr && (
                        <div className={bem.element('right')}>
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
