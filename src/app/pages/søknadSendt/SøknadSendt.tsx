import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';

import KvitteringHeader from './components/KvitteringHeader';
import KvitteringSuksess from './components/KvitteringSuksess';
import StatusBoks from './components/StatusBoks';
import SøknadSendtSectionHeader from './components/SøknadSendtSectionHeader';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { openPdfPreview } from 'app/utils/pdfUtils';
import links from 'app/links/links';
import { logAmplitudeEvent, PageKeys } from 'app/amplitude/amplitude';
import dayjs from 'dayjs';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import SøknadSendtTittel from './components/SøknadSendtTittel';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Periode } from 'uttaksplan/types/Periode';

import './søknadSendt.less';
import { formaterDato } from 'app/utils/dateUtils';
import { finnSendSenereVedlegg } from 'app/steps/manglende-vedlegg/util';

const getBehandlingsFrist = (uttaksplan: Periode[]): string => {
    const førsteUttaksdag = dayjs(Periodene(uttaksplan).getFørsteUttaksdagEksluderInfoperioderOgFrittUttak()).subtract(
        4,
        'weeks'
    );

    const førsteMuligeBehandlingsfrist = dayjs(new Date()).isSameOrAfter(førsteUttaksdag)
        ? new Date()
        : førsteUttaksdag.toDate();

    return formaterDato(førsteMuligeBehandlingsfrist);
};

const SøknadSendt = () => {
    const søkerinfo = useSøkerinfo();
    const { state } = useForeldrepengesøknadContext();
    const { kvittering, søknad } = state;
    const { uttaksplan } = søknad;
    const alleSendSenereVedlegg = finnSendSenereVedlegg(søknad);
    const missingAttachments = Array.from(alleSendSenereVedlegg.values());
    const { erEndringssøknad } = søknad;
    const behandlingsFrist = getBehandlingsFrist(uttaksplan);
    const intl = useIntl();
    const { person, arbeidsforhold } = søkerinfo;
    const bem = bemUtils('søknadSendt');

    useEffect(() => {
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
                                <Normaltekst>{behandlingsFrist}</Normaltekst>
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
