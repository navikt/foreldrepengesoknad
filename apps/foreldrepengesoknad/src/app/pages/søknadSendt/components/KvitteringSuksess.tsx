import React, { FunctionComponent } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';
import { MissingAttachment } from 'app/types/MissingAttachment';
import { guid } from 'nav-frontend-js-utils';
import { AdvarselIkon, bemUtils, Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import CheckmarkIkon from 'app/assets/CheckmarkIkon';

import './kvitteringSuksess.less';

interface Props {
    missingAttachments: MissingAttachment[];
}

const KvitteringSuksess: FunctionComponent<Props> = ({ missingAttachments }) => {
    const intl = useIntl();
    const bem = bemUtils('kvittering');
    const isMissingAttachments = missingAttachments.length > 0;

    return (
        <div className={bem.block}>
            <div
                className={bem.classNames(
                    bem.element('suksess'),
                    bem.modifierConditional('mangler-vedlegg', isMissingAttachments)
                )}
            >
                <div className={bem.element('ikon')}>{isMissingAttachments ? <AdvarselIkon /> : <CheckmarkIkon />}</div>
                <div className={bem.element('tekst')}>
                    <Block padBottom="l">
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
                            <FormattedMessage
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
                                                <FormattedMessage
                                                    id={`søknadSendt.info.missingAttachment.${a.skjemanummer}`}
                                                />
                                            </Normaltekst>
                                        </li>
                                    ))}
                                </ul>

                                <UtvidetInformasjon
                                    apneLabel={intlUtils(intl, 'søknadSendt.info.missingAttachment.lesMer')}
                                >
                                    <Normaltekst>
                                        <FormattedMessage id="søknadSendt.info.missingAttachment.lesMer.content" />
                                    </Normaltekst>
                                </UtvidetInformasjon>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KvitteringSuksess;
