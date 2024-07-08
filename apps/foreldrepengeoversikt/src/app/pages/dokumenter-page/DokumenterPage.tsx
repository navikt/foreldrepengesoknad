import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';

import { Alert, BodyLong, Heading, LinkPanel, Loader } from '@navikt/ds-react';

import { bemUtils, useDocumentTitle } from '@navikt/fp-utils';

import { hentDokumenterOptions } from 'app/api/api';
import Dokument from 'app/components/dokument/Dokument';
import GrupperteDokumenter from 'app/components/grupperte-dokumenter/GrupperteDokumenter';
import NoeGikkGalt from 'app/components/noe-gikk-galt/NoeGikkGalt';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import { grupperDokumenterPåTidspunkt } from 'app/utils/dokumenterUtils';
import { guid } from 'app/utils/guid';

import './dokumenter-page.css';

const DokumenterPage: React.FunctionComponent = () => {
    const bem = bemUtils('dokumenter-page');
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.DOKUMENTER);
    const params = useParams();

    const intl = useIntl();
    const title = intl.formatMessage({ id: 'dokumenter' });
    const lastOppDokTittel = intl.formatMessage({ id: 'lastOppDokumenter' });
    useDocumentTitle(`${title} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`);
    const dokumenterQuery = useQuery(hentDokumenterOptions(params.saksnummer!));

    if (dokumenterQuery.isPending) {
        return <Loader size="large" aria-label="Henter dokumenter" />;
    }

    const dokumenterGruppertPåTidspunkt = grupperDokumenterPåTidspunkt(dokumenterQuery.data ?? []);

    return (
        <>
            <LinkPanel
                as={Link}
                to={`../${OversiktRoutes.ETTERSEND}`}
                border={false}
                className={bem.element('ettersend')}
            >
                <LinkPanel.Title as="h2">{lastOppDokTittel}</LinkPanel.Title>
            </LinkPanel>
            {!dokumenterQuery.isError && (
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
            {dokumenterQuery.isError && (
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
