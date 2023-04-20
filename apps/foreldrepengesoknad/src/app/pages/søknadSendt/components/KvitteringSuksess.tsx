import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { MissingAttachment } from 'app/types/MissingAttachment';
import { AdvarselIkon, bemUtils, Block, guid, intlUtils } from '@navikt/fp-common';
import CheckmarkIkon from 'app/assets/CheckmarkIkon';
import { BodyShort, Heading, ReadMore } from '@navikt/ds-react';

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
                        <Heading size="small">
                            <FormattedMessage
                                id={
                                    isMissingAttachments
                                        ? 'søknadSendt.info.tittel.isMissingAttachments'
                                        : 'søknadSendt.info.tittel'
                                }
                            />
                        </Heading>
                    </Block>
                    <div>
                        <BodyShort>
                            <FormattedMessage
                                id={
                                    isMissingAttachments
                                        ? 'søknadSendt.info.innhold.isMissingAttachments'
                                        : 'søknadSendt.info.innhold'
                                }
                            />
                        </BodyShort>
                        {isMissingAttachments && (
                            <>
                                <ul>
                                    {missingAttachments.map((a) => (
                                        <li key={guid()}>
                                            <BodyShort>
                                                <FormattedMessage
                                                    id={`søknadSendt.info.missingAttachment.${a.skjemanummer}`}
                                                />
                                            </BodyShort>
                                        </li>
                                    ))}
                                </ul>

                                <ReadMore header={intlUtils(intl, 'søknadSendt.info.missingAttachment.lesMer')}>
                                    <BodyShort>
                                        <FormattedMessage id="søknadSendt.info.missingAttachment.lesMer.content" />
                                    </BodyShort>
                                </ReadMore>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KvitteringSuksess;
