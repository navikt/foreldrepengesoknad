import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import EtikettBase from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel, Element, Ingress, Systemtittel } from 'nav-frontend-typografi';
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
                <Systemtittel>
                    <FormattedMessage id="søknadSendt.status.tittel" />
                </Systemtittel>
            </Block>
            <Block margin="l">
                <LenkepanelBase href={lenker.innsyn} border={true} className="statusBoks__lenkepanel">
                    <div className={bem.block}>
                        <div className={bem.element('left')}>
                            <Undertittel tag="h3">
                                <FormattedMessage id="søknadSendt.status.undertittel" />
                            </Undertittel>
                            <Block margin="l">
                                <EtikettBase type="fokus">
                                    <FormattedMessage id="søknadSendt.status.status" />
                                </EtikettBase>
                            </Block>
                        </div>
                        {saksNr && (
                            <div className={bem.element('right')}>
                                <Element>
                                    <FormattedMessage id="søknadSendt.status.saksnummer" />
                                </Element>
                                <Ingress>{saksNr}</Ingress>
                            </div>
                        )}
                    </div>
                </LenkepanelBase>
            </Block>
        </Block>
    );
};

export default StatusBoks;
