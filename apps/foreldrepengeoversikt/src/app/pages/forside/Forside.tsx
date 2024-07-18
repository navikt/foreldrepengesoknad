import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, VStack } from '@navikt/ds-react';

import { erSakOppdatertOptions } from 'app/api/api';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import { ForsideHeader } from 'app/components/header/Header';
import SakLink from 'app/components/sak-link/SakLink';
import {
    useGetRedirectedFromSøknadsnummer,
    useSetRedirectedFromSøknadsnummer,
} from 'app/hooks/useRedirectedFromSøknadsnummer';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';
import { RedirectSource, UKNOWN_SAKSNUMMER } from 'app/types/RedirectSource';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { getAlleYtelser, grupperSakerPåBarn } from 'app/utils/sakerUtils';

import './forside.css';

interface Props {
    saker: SakOppslag;
    isFirstRender: React.MutableRefObject<boolean>;
    søkerinfo: SøkerinfoDTO;
}

const Forside: React.FunctionComponent<Props> = ({ saker, isFirstRender, søkerinfo }) => {
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);
    const params = useParams();
    useSetRedirectedFromSøknadsnummer(params.redirect, undefined, isFirstRender);

    const harIkkeOppdatertSakQuery = useQuery(erSakOppdatertOptions());
    const harIkkeOppdatertSak = harIkkeOppdatertSakQuery.isSuccess && !harIkkeOppdatertSakQuery.data;

    const navigate = useNavigate();
    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(OversiktRoutes.HOVEDSIDE);
    }
    const redirectedFromSøknadsnummer = useGetRedirectedFromSøknadsnummer();

    const grupperteSaker = grupperSakerPåBarn(søkerinfo.søker.barn, saker);
    const alleYtelser = getAlleYtelser(saker);

    // Super spesifikt case for avslåtte papirsøknad for svangerskapspenger. Bør fjernes
    const avslåttSvangerskapspengesak =
        grupperteSaker.length === 0 && alleYtelser.length === 1 && saker.svangerskapspenger.length === 1
            ? saker.svangerskapspenger[0]
            : undefined;

    return (
        <PageRouteLayout header={<ForsideHeader />}>
            <VStack gap="10">
                {redirectedFromSøknadsnummer === UKNOWN_SAKSNUMMER && (
                    <BekreftelseSendtSøknad
                        relevantNyTidslinjehendelse={undefined}
                        bankkonto={søkerinfo.søker.bankkonto}
                        ytelse={undefined}
                    />
                )}
                {harIkkeOppdatertSak && (
                    <Alert variant="warning">
                        Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du
                        kan vente litt og komme tilbake senere for å se alle detaljene i saken din.
                    </Alert>
                )}
                {alleYtelser.length > 0 ? (
                    <HarSaker grupperteSaker={grupperteSaker} />
                ) : (
                    <HarIkkeSaker harOppdatertSak={!harIkkeOppdatertSak} />
                )}
                {avslåttSvangerskapspengesak && <SakLink sak={avslåttSvangerskapspengesak} />}
            </VStack>
        </PageRouteLayout>
    );
};

export default Forside;
