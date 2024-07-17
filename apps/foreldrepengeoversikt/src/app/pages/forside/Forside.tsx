import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, VStack } from '@navikt/ds-react';

import { erSakOppdatertOptions } from 'app/api/api';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import SakLink from 'app/components/sak-link/SakLink';
import {
    useGetRedirectedFromSøknadsnummer,
    useSetRedirectedFromSøknadsnummer,
} from 'app/hooks/useRedirectedFromSøknadsnummer';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useSetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import Bankkonto from 'app/types/Bankkonto';
import { GruppertSak } from 'app/types/GruppertSak';
import { RedirectSource, UKNOWN_SAKSNUMMER } from 'app/types/RedirectSource';
import { Sak } from 'app/types/Sak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';

import './forside.css';

interface Props {
    alleYtelser: Sak[];
    grupperteSaker: GruppertSak[];
    avslåttSvangerskapspengesak: SvangerskapspengeSak | undefined;
    isFirstRender: React.MutableRefObject<boolean>;
    bankkonto: Bankkonto | undefined;
}

const Forside: React.FunctionComponent<Props> = ({
    alleYtelser,
    grupperteSaker,
    avslåttSvangerskapspengesak,
    isFirstRender,
    bankkonto,
}) => {
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);
    useSetSelectedSak(undefined);

    const harIkkeOppdatertSakQuery = useQuery(erSakOppdatertOptions());
    const harIkkeOppdatertSak = harIkkeOppdatertSakQuery.isSuccess && !harIkkeOppdatertSakQuery.data;

    const params = useParams();
    useSetRedirectedFromSøknadsnummer(params.redirect, undefined, isFirstRender);
    const navigate = useNavigate();
    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(OversiktRoutes.HOVEDSIDE);
    }
    const redirectedFromSøknadsnummer = useGetRedirectedFromSøknadsnummer();
    return (
        <VStack gap="10">
            <>
                {redirectedFromSøknadsnummer === UKNOWN_SAKSNUMMER && (
                    <BekreftelseSendtSøknad
                        relevantNyTidslinjehendelse={undefined}
                        bankkonto={bankkonto}
                        ytelse={undefined}
                    />
                )}
                {harIkkeOppdatertSak && (
                    <Alert variant="warning">
                        Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du
                        kan vente litt og komme tilbake senere for å se alle detaljene i saken din.
                    </Alert>
                )}
            </>
            {alleYtelser.length > 0 ? (
                <HarSaker grupperteSaker={grupperteSaker} />
            ) : (
                <HarIkkeSaker harOppdatertSak={!harIkkeOppdatertSak} />
            )}
            {avslåttSvangerskapspengesak && <SakLink sak={avslåttSvangerskapspengesak} />}
        </VStack>
    );
};

export default Forside;
