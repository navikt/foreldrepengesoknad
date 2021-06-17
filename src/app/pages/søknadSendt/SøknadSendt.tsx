import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';

import KvitteringHeader from './components/KvitteringHeader';
import KvitteringSuksess from './components/KvitteringSuksess';
import StatusBoks from './components/StatusBoks';
import SøknadSendtSectionHeader from './components/SøknadSendtSectionHeader';
import { Kvittering } from 'app/types/Kvittering';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { openPdfPreview } from 'app/utils/pdfUtils';
import links from 'app/links/links';
import { logAmplitudeEvent, PageKeys } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import dayjs from 'dayjs';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { MissingAttachment } from 'app/types/MissingAttachment';

import './søknadSendt.less';
import SøknadSendtTittel from './components/SøknadSendtTittel';

const SøknadSendt = () => {
    const [kvittering, setKvittering] = useState<Kvittering>();
    const søkerinfo = useSøkerinfo();
    const missingAttachments: MissingAttachment[] = [];
    const erEndringssøknad = false;
    const behandlingsFrist = '2021-06-14';
    const intl = useIntl();
    const { person, arbeidsforhold } = søkerinfo;
    const bem = bemUtils('søknadSendt');

    useEffect(() => {
        Api.sendStorageKvittering({ innsendingstidspunkt: dayjs().format('YYYY-MM-DD') }, søkerinfo.person.fnr).then(
            (response) => setKvittering(response.data)
        );

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.SøknadSendt,
        });
    }, []);

    if (!kvittering) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    return (
        <>
            <DocumentTitle title={intlUtils(intl, 'søknad.søknadSendt')} />
            <SøknadSendtTittel />
            <div className={bem.block}>
                <KvitteringHeader søker={person} kvittering={kvittering} />

                <Block padBottom="l">
                    <KvitteringSuksess missingAttachments={missingAttachments} />
                </Block>

                {!erEndringssøknad && (
                    <>
                        <Block padBottom="l">
                            <SøknadSendtSectionHeader
                                title={intlUtils(intl, 'søknadSendt.når.tittel')}
                                type="kalender"
                                info={intlUtils(intl, 'søknadSendt.når.infoBox')}
                                infoApneLabel={intlUtils(intl, 'søknadSendt.når.infoBox.apneLabel')}
                            >
                                <Normaltekst>{dayjs(behandlingsFrist).format('D. MMMM YYYY')}</Normaltekst>
                            </SøknadSendtSectionHeader>
                        </Block>

                        {arbeidsforhold && arbeidsforhold.length > 0 && (
                            <Block padBottom="l">
                                <SøknadSendtSectionHeader
                                    title={intlUtils(intl, 'søknadSendt.infoFraArbeidsgiver.tittel')}
                                    type="koffert"
                                    info={intlUtils(intl, 'søknadSendt.infoFraArbeidsgiver.infoBox')}
                                    infoApneLabel={intlUtils(intl, 'søknadSendt.infoFraArbeidsgiver.infoBox.apneLabel')}
                                >
                                    <Block padBottom="l">
                                        <Normaltekst>
                                            <FormattedMessage id={'søknadSendt.infoFraArbeidsgiver.del1'} />
                                        </Normaltekst>
                                    </Block>
                                    <Normaltekst>
                                        <Lenke
                                            href={'#'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openPdfPreview(kvittering.infoskrivPdf);
                                            }}
                                        >
                                            <FormattedMessage id={'søknadSendt.infoFraArbeidsgiver.del2'} />
                                        </Lenke>
                                    </Normaltekst>
                                </SøknadSendtSectionHeader>
                            </Block>
                        )}

                        <Block padBottom="l">
                            <SøknadSendtSectionHeader
                                title={intlUtils(intl, 'søknadSendt.pengene.tittel')}
                                type="cash"
                                info={intlUtils(intl, 'søknadSendt.pengene.infoBox')}
                                infoApneLabel={intlUtils(intl, 'søknadSendt.pengene.infoBox.apneLabel')}
                            >
                                {person.bankkonto && person.bankkonto.kontonummer ? (
                                    <>
                                        <Block padBottom="l">
                                            <Normaltekst>
                                                <FormattedMessage id="søknadSendt.pengene.kontonummer" />
                                            </Normaltekst>
                                        </Block>
                                        <Block padBottom="l">
                                            <Ingress>{person.bankkonto && person.bankkonto.kontonummer}</Ingress>
                                        </Block>
                                        <Block padBottom="l">
                                            <Normaltekst>
                                                <Lenke href={links.brukerprofil}>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer.endre" />
                                                </Lenke>
                                            </Normaltekst>
                                        </Block>
                                    </>
                                ) : (
                                    <>
                                        <Block padBottom="l">
                                            <Normaltekst>
                                                <FormattedMessage id="søknadSendt.pengene.ingenKontonummer" />
                                            </Normaltekst>
                                        </Block>
                                        <Block padBottom="l">
                                            <Normaltekst>
                                                <Lenke href={links.brukerprofil}>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer.leggTil" />
                                                </Lenke>
                                            </Normaltekst>
                                        </Block>
                                    </>
                                )}
                            </SøknadSendtSectionHeader>
                        </Block>
                    </>
                )}

                <StatusBoks saksNr={kvittering.saksNr} />
            </div>
        </>
    );
};

export default SøknadSendt;
