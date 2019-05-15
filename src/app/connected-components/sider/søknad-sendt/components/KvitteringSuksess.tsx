import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';
import CheckmarkIkon from 'app/components/uttaksplan-ikon/ikoner/CheckmarkIkon';
import Block from 'common/components/block/Block';
import { MissingAttachment } from 'app/types/MissingAttachment';
import AdvarselIkon from 'app/components/advarsel-ikon/AdvarselIkon';

import getMessage from 'common/util/i18nUtils';
import UtvidetInformasjon from 'app/components/utvidetinformasjon/UtvidetInformasjon';

import './kvitteringSuksess.less';
import { guid } from 'nav-frontend-js-utils';

interface KvitteringSuksessProps {
    missingAttachments: MissingAttachment[];
}

type Props = KvitteringSuksessProps & InjectedIntlProps;
const cls = BEMHelper('kvittering');
const KvitteringSuksess: React.StatelessComponent<Props> = ({ missingAttachments, intl }) => {
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
                        <Normaltekst>
                            <FormattedHTMLMessage
                                id={
                                    isMissingAttachments
                                        ? 'søknadSendt.info.innhold.isMissingAttachments'
                                        : 'søknadSendt.info.innhold'
                                }
                            />
                        </Normaltekst>
                        {isMissingAttachments && (
                            <>
                                <ul>
                                    {missingAttachments.map((a) => (
                                        <li key={guid()}>
                                            <Normaltekst>
                                                <FormattedHTMLMessage
                                                    id={`søknadSendt.info.missingAttachment.${a.skjemanummer}`}
                                                />
                                            </Normaltekst>
                                        </li>
                                    ))}
                                </ul>

                                <UtvidetInformasjon
                                    apneLabel={getMessage(intl, 'søknadSendt.info.missingAttachment.lesMer')}>
                                    <FormattedHTMLMessage id="søknadSendt.info.missingAttachment.lesMer.content" />
                                </UtvidetInformasjon>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(KvitteringSuksess);
