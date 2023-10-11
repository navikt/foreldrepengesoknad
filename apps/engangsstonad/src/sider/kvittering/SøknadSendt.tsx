import { BodyShort, HStack, Heading, Ingress, Label, Link, VStack } from '@navikt/ds-react';
import { UtvidetInformasjon, bemUtils, useDocumentTitle } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { lenker } from 'fpcommon/util/lenker';
import ContentWrapper from 'fpcommon/components/ContentWrapper';
import Person from 'types/Person';
import Kvittering from 'types/Kvittering';
import KvitteringHeader from './KvitteringHeader';
import CheckmarkIkon from './ikon/CheckmarkIkon';
import StatusBoks from './StatusBoks';
import SøknadSendtIkon from './ikon/SøknadSendtIkon';
import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';

import './søknadSendt.less';

export interface Props {
    person: Person;
    kvittering?: Kvittering;
}

const SøknadSendt: React.FunctionComponent<Props> = ({ person, kvittering }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknadSendt.dokumenttittel' }));

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: '/kvittering',
    });

    const bem = bemUtils('kvittering');

    return (
        <>
            <div className="søknadSendtTittel" role="main" aria-label="Engangsstønad">
                <h2 className="typo-undertittel">Engangsstønad</h2>
            </div>
            <ContentWrapper>
                <VStack gap="10">
                    <KvitteringHeader søker={person} kvittering={kvittering} />
                    <HStack gap="4" wrap={false} className={bem.element('suksess')}>
                        <div>
                            <CheckmarkIkon />
                        </div>
                        <VStack gap="4">
                            <Heading size="small">
                                <FormattedMessage id="søknadSendt.info.tittel" />
                            </Heading>
                            <BodyShort>
                                <FormattedMessage id="søknadSendt.info.innhold" />
                            </BodyShort>
                        </VStack>
                    </HStack>
                    <section>
                        <HStack gap="8" wrap={false}>
                            <div>
                                <SøknadSendtIkon type="cash" />
                            </div>
                            <VStack gap="4">
                                <VStack gap="1">
                                    <Heading size="small">
                                        <FormattedMessage id="søknadSendt.pengene.tittel" />
                                    </Heading>
                                    <UtvidetInformasjon
                                        apneLabel={<FormattedMessage id="søknadSendt.pengene.apneLabel" />}
                                    >
                                        <FormattedMessage id="søknadSendt.pengene.infoBox" />
                                    </UtvidetInformasjon>
                                </VStack>
                                {person.bankkonto && person.bankkonto.kontonummer ? (
                                    <VStack gap="1">
                                        <Label>
                                            <FormattedMessage id="søknadSendt.pengene.kontonummer" />
                                        </Label>
                                        <Ingress>{person.bankkonto && person.bankkonto.kontonummer}</Ingress>
                                        <Link href={lenker.brukerprofil}>
                                            <FormattedMessage id="søknadSendt.pengene.kontonummer.endre" />
                                        </Link>
                                    </VStack>
                                ) : (
                                    <VStack gap="1">
                                        <BodyShort>
                                            <FormattedMessage id="søknadSendt.pengene.ingenKontonummer" />
                                        </BodyShort>
                                        <Link href={lenker.brukerprofil}>
                                            <FormattedMessage id="søknadSendt.pengene.kontonummer.leggTil" />
                                        </Link>
                                    </VStack>
                                )}
                            </VStack>
                        </HStack>
                    </section>
                    <StatusBoks saksNr={kvittering?.saksNr || ''} />
                </VStack>
            </ContentWrapper>
        </>
    );
};

export default SøknadSendt;
