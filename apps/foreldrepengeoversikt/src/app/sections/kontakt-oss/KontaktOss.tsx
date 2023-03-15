import React from 'react';
import { NavRoutes } from 'app/routes/routes';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import './kontaktOss.css';
import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { Dialog, Send, Telephone } from '@navikt/ds-icons';

const KontaktOss: React.FunctionComponent = () => {
    const bem = bemUtils('kontaktOss');
    const intl = useIntl();

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <div className={bem.element('title')}>
                    <Heading size="medium">{intlUtils(intl, 'saksoversikt.kontaktOss')}</Heading>
                </div>
                <div className={bem.element('content')}>
                    <div className={bem.element('content_left')}>
                        <Link href={NavRoutes.CHAT_MED_OSS} className={bem.element('link')}>
                            <Dialog className={bem.element('linkIcon')}></Dialog>
                            <BodyShort className={bem.element('linkTitle')}>
                                {intlUtils(intl, 'kontaktOss.chatMedOss')}
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium"> {intlUtils(intl, 'kontaktOss.informasjonOmChat')}</BodyShort>
                    </div>
                    <div className={bem.element('content_middle')}>
                        <Link href={NavRoutes.SKRIV_TIL_OSS} className={bem.element('link')}>
                            <Send className={bem.element('linkIcon')}></Send>
                            <BodyShort className={bem.element('linkTitle')}>
                                {intlUtils(intl, 'kontaktOss.skrivTilOss')}
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">{intlUtils(intl, 'kontaktOss.skrivTilOss.del1')}</BodyShort>
                        <BodyShort size="medium" className={bem.element('content_text')}>
                            {intlUtils(intl, 'kontaktOss.skrivTilOss.del2')}
                        </BodyShort>
                    </div>
                    <div className={bem.element('content_right')}>
                        <Link href={NavRoutes.RING_OSS} className={bem.element('link')}>
                            <Telephone className={bem.element('linkIcon')}></Telephone>
                            <BodyShort className={bem.element('linkTitle')}>
                                {intlUtils(intl, 'kontaktOss.ringOss')}
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">{intlUtils(intl, 'kontaktOss.ringOss.åpningstider')}</BodyShort>
                        <Link href={NavRoutes.SE_FLERE_TLF_NR_OG_TASTEVALG}>
                            <BodyShort size="medium" className={bem.element('content_text')}>
                                {intlUtils(intl, 'kontaktOss.ringOss.flereTelefonnummere')}
                            </BodyShort>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KontaktOss;
