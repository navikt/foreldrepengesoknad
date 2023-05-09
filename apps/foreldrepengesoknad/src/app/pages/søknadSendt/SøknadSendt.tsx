import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import KvitteringHeader from './components/KvitteringHeader';
import KvitteringSuksess from './components/KvitteringSuksess';
import StatusBoks from './components/StatusBoks';
import SøknadSendtSectionHeader from './components/SøknadSendtSectionHeader';
import { bemUtils, Block, intlUtils, useDocumentTitle } from '@navikt/fp-common';
import { openPdfPreview } from 'app/utils/pdfUtils';
import links from 'app/links/links';
import { logAmplitudeEvent, PageKeys } from 'app/amplitude/amplitude';
import dayjs from 'dayjs';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import SøknadSendtTittel from './components/SøknadSendtTittel';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Periode } from 'uttaksplan/types/Periode';
import { formaterDato } from 'app/utils/dateUtils';
import { finnSendSenereVedlegg } from 'app/steps/manglende-vedlegg/util';
import { BodyShort, Ingress, Link, Loader } from '@navikt/ds-react';

import './søknadSendt.less';

const getBehandlingsFrist = (uttaksplan: Periode[]): string => {
    const førsteUttaksdag = dayjs
        .utc(Periodene(uttaksplan).getFørsteUttaksdagEksluderInfoperioderOgFrittUttak())
        .subtract(4, 'weeks');

    const førsteMuligeBehandlingsfrist = dayjs.utc(new Date()).isSameOrAfter(dayjs.utc(førsteUttaksdag), 'day')
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
    useDocumentTitle(intlUtils(intl, 'søknad.søknadSendt'));

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
                <Loader size="2xlarge" />
            </div>
        );
    }

    return (
        <>
            <SøknadSendtTittel />
            <div className={bem.block}>
                <KvitteringHeader søker={person} kvittering={kvittering} />

                <Block padBottom="xl">
                    <KvitteringSuksess missingAttachments={missingAttachments} />
                </Block>

                {!erEndringssøknad && (
                    <>
                        <Block padBottom="xl">
                            <SøknadSendtSectionHeader
                                title={intlUtils(intl, 'søknadSendt.når.tittel')}
                                type="kalender"
                                info={intlUtils(intl, 'søknadSendt.når.infoBox')}
                                infoApneLabel={intlUtils(intl, 'søknadSendt.når.infoBox.apneLabel')}
                            >
                                <BodyShort>{behandlingsFrist}</BodyShort>
                            </SøknadSendtSectionHeader>
                        </Block>

                        {arbeidsforhold && arbeidsforhold.length > 0 && (
                            <Block padBottom="xl">
                                <SøknadSendtSectionHeader
                                    title={intlUtils(intl, 'søknadSendt.infoFraArbeidsgiver.tittel')}
                                    type="koffert"
                                    info={intlUtils(intl, 'søknadSendt.infoFraArbeidsgiver.infoBox')}
                                    infoApneLabel={intlUtils(intl, 'søknadSendt.infoFraArbeidsgiver.infoBox.apneLabel')}
                                >
                                    <Block padBottom="l">
                                        <BodyShort>
                                            <FormattedMessage id={'søknadSendt.infoFraArbeidsgiver.del1'} />
                                        </BodyShort>
                                    </Block>
                                    <BodyShort>
                                        <Link
                                            href={'#'}
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                openPdfPreview(kvittering.infoskrivPdf);
                                            }}
                                        >
                                            <FormattedMessage id={'søknadSendt.infoFraArbeidsgiver.del2'} />
                                        </Link>
                                    </BodyShort>
                                </SøknadSendtSectionHeader>
                            </Block>
                        )}

                        <Block padBottom="xl">
                            <SøknadSendtSectionHeader
                                title={intlUtils(intl, 'søknadSendt.pengene.tittel')}
                                type="cash"
                                info={intlUtils(intl, 'søknadSendt.pengene.infoBox')}
                                infoApneLabel={intlUtils(intl, 'søknadSendt.pengene.infoBox.apneLabel')}
                            >
                                {person.bankkonto && person.bankkonto.kontonummer ? (
                                    <>
                                        <Block padBottom="l">
                                            <BodyShort>
                                                <FormattedMessage id="søknadSendt.pengene.kontonummer" />
                                            </BodyShort>
                                        </Block>
                                        <Block padBottom="l">
                                            <Ingress>{person.bankkonto && person.bankkonto.kontonummer}</Ingress>
                                        </Block>
                                        <Block padBottom="l">
                                            <BodyShort>
                                                <Link href={links.brukerprofil}>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer.endre" />
                                                </Link>
                                            </BodyShort>
                                        </Block>
                                    </>
                                ) : (
                                    <>
                                        <Block padBottom="l">
                                            <BodyShort>
                                                <FormattedMessage id="søknadSendt.pengene.ingenKontonummer" />
                                            </BodyShort>
                                        </Block>
                                        <Block padBottom="l">
                                            <BodyShort>
                                                <Link href={links.brukerprofil}>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer.leggTil" />
                                                </Link>
                                            </BodyShort>
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
