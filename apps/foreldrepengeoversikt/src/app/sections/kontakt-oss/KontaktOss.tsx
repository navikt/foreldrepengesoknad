import { FormattedMessage } from 'react-intl';

import { Dialog, Send, Telephone } from '@navikt/ds-icons';
import { BodyShort, Heading, Link } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { NavRoutes } from 'app/routes/routes';

import './kontaktOss.css';

const KontaktOss: React.FunctionComponent = () => {
    const bem = bemUtils('kontaktOss');

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <div className={bem.element('title')}>
                    <Heading size="medium">
                        <FormattedMessage id="saksoversikt.kontaktOss" />
                    </Heading>
                </div>
                <div className={bem.element('content')}>
                    <div className={bem.element('content_left')}>
                        <Link href={NavRoutes.CHAT_MED_OSS} className={bem.element('link')}>
                            <Dialog className={bem.element('linkIcon')} aria-hidden={true}></Dialog>
                            <BodyShort className={bem.element('linkTitle')}>
                                <FormattedMessage id="kontaktOss.chatMedOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.informasjonOmChat" />
                        </BodyShort>
                    </div>
                    <div className={bem.element('content_middle')}>
                        <Link href={NavRoutes.SKRIV_TIL_OSS} className={bem.element('link')}>
                            <Send className={bem.element('linkIcon')} aria-hidden={true}></Send>
                            <BodyShort className={bem.element('linkTitle')}>
                                <FormattedMessage id="kontaktOss.skrivTilOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.skrivTilOss.del1" />
                        </BodyShort>
                        <BodyShort size="medium" className={bem.element('content_text')}>
                            <FormattedMessage id="kontaktOss.skrivTilOss.del2" />
                        </BodyShort>
                    </div>
                    <div className={bem.element('content_right')}>
                        <Link href={NavRoutes.RING_OSS} className={bem.element('link')}>
                            <Telephone className={bem.element('linkIcon')} aria-hidden={true}></Telephone>
                            <BodyShort className={bem.element('linkTitle')}>
                                <FormattedMessage id="kontaktOss.ringOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.ringOss.åpningstider" />
                        </BodyShort>
                        <Link href={NavRoutes.SE_FLERE_TLF_NR_OG_TASTEVALG}>
                            <BodyShort size="medium" className={bem.element('content_text')}>
                                <FormattedMessage id="kontaktOss.ringOss.flereTelefonnummere" />
                            </BodyShort>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KontaktOss;
