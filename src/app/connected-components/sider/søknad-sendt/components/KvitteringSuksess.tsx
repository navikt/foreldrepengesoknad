import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import CheckmarkIkon from 'app/components/uttaksplan-ikon/ikoner/CheckmarkIkon';
import Block from 'common/components/block/Block';
import { MissingAttachment } from 'app/types/MissingAttachment';
import AdvarselIkon from 'app/components/advarsel-ikon/AdvarselIkon';

import './kvitteringSuksess.less';

interface Props {
    missingAttachments: MissingAttachment[];
}

const cls = BEMHelper('kvittering');
const KvitteringSuksess: React.StatelessComponent<Props> = ({ missingAttachments }) => {
    const isMissingAttachments = missingAttachments.length > 0;
    return (
        <div className={cls.block}>
            <div
                className={cls.classNames(
                    cls.element('suksess'),
                    cls.modifierConditional('mangler-vedlegg', isMissingAttachments)
                )}>
                <div className={cls.element('ikon')}>
                    {isMissingAttachments ? <AdvarselIkon height={24} width={24} /> : <CheckmarkIkon />}
                </div>
                <div className={cls.element('tekst')}>
                    <Block margin="xxs">
                        <Undertittel>
                            <FormattedMessage
                                id={
                                    isMissingAttachments
                                        ? 'søknadSendt.info.tittel.isMissingAttachments'
                                        : 'søknadSendt.info.tittel'
                                }
                            />
                        </Undertittel>
                    </Block>
                    <div>
                        <FormattedHTMLMessage
                            id={
                                isMissingAttachments
                                    ? 'søknadSendt.info.innhold.isMissingAttachments'
                                    : 'søknadSendt.info.innhold'
                            }
                        />
                        {isMissingAttachments && (
                            <ul>
                                {missingAttachments.map((a) => (
                                    <li>
                                        <FormattedHTMLMessage id={`søknadSendt.info.missingAttachmen.${a.type}`} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KvitteringSuksess;
