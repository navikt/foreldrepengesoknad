import { Alert, BodyLong, Heading, LinkPanel, Loader } from '@navikt/ds-react';
import { bemUtils, guid } from '@navikt/fp-common';
import Api from 'app/api/api';
import Dokument from 'app/components/dokument/Dokument';
import React from 'react';
import { grupperDokumenterPåTidspunkt } from 'app/utils/dokumenterUtils';
import GrupperteDokumenter from 'app/components/grupperte-dokumenter/GrupperteDokumenter';
import { useParams } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';
import { Link } from 'react-router-dom';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import NoeGikkGalt from 'app/components/noe-gikk-galt/NoeGikkGalt';
import { RequestStatus } from 'app/types/RequestStatus';

import './dokumenter-page.css';

interface Props {
    fnr: string;
}

const DokumenterPage: React.FunctionComponent<Props> = ({ fnr }) => {
    const bem = bemUtils('dokumenter-page');
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.DOKUMENTER);
    const params = useParams();

    const { dokumenterData, dokumenterError, dokumenterStatus } = Api.useGetDokumenter(fnr);

    if (!dokumenterData && dokumenterStatus !== RequestStatus.FINISHED) {
        return <Loader size="large" aria-label="Henter dokumenter" />;
    }

    const dokumenterForSak = (dokumenterData || []).filter((dok) => dok.saksnummer === params.saksnummer);

    const dokumenterGruppertPåTidspunkt = grupperDokumenterPåTidspunkt(dokumenterForSak);

    return (
        <>
            <LinkPanel
                as={Link}
                to={`../${OversiktRoutes.ETTERSEND}`}
                border={false}
                className={bem.element('ettersend')}
            >
                <LinkPanel.Title as="h2">Last opp dokumenter</LinkPanel.Title>
            </LinkPanel>
            {!dokumenterError && (
                <>
                    <div className={bem.element('dokumenter-liste')}>
                        {Object.entries(dokumenterGruppertPåTidspunkt).map((dokument) => {
                            const dokumenter = dokument[1];

                            if (dokumenter.length === 1) {
                                return <Dokument key={guid()} dokument={dokumenter[0]} />;
                            } else {
                                return <GrupperteDokumenter key={guid()} dokumenter={dokumenter} />;
                            }
                        })}
                    </div>
                    <Alert variant="info" className={bem.element('ikke-alle-dokumenter')}>
                        <Heading level="3" size="small">
                            Er det noen dokumenter du savner?
                        </Heading>
                        <BodyLong>
                            Vi har foreløpig ikke mulighet til å vise papirer du har sendt til NAV i posten, eller
                            dokumenter som gjelder saken din, men som er sendt av andre på vegne av deg. Det kan for
                            eksempel være en lege, advokat, verge eller fullmektig.
                        </BodyLong>
                    </Alert>
                </>
            )}
            {dokumenterError && (
                <div style={{ marginBottom: '2rem' }}>
                    <NoeGikkGalt>
                        Vi har problemer med å vise informasjon om dine dokumenter akkurat nå. Feilen er hos oss, ikke
                        hos deg. Prøv igjen senere.
                    </NoeGikkGalt>
                </div>
            )}
        </>
    );
};

export default DokumenterPage;
