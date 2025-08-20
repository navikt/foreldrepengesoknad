import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, VStack } from '@navikt/ds-react';

import { Søkerinfo } from '@navikt/fp-types';

import { erSakOppdatertOptions } from '../../api/api';
import { BekreftelseSendtSøknad } from '../../components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import { HarIkkeSaker } from '../../components/har-ikke-saker/HarIkkeSaker';
import { HarSaker } from '../../components/har-saker/HarSaker';
import { ForsideHeader } from '../../components/header/Header';
import { SakLink } from '../../components/sak-link/SakLink';
import {
    useGetRedirectedFromSøknadsnummer,
    useSetRedirectedFromSøknadsnummer,
} from '../../hooks/useRedirectedFromSøknadsnummer';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { RedirectSource, UKNOWN_SAKSNUMMER } from '../../types/RedirectSource';
import { SakOppslag } from '../../types/SakOppslag';
import { getAlleYtelser, grupperSakerPåBarn } from '../../utils/sakerUtils';
import './forside.css';

interface Props {
    saker: SakOppslag;
    isFirstRender: React.MutableRefObject<boolean>;
    søkerinfo: Søkerinfo;
}

export const Forside = ({ saker, isFirstRender, søkerinfo }: Props) => {
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

    const grupperteSaker = grupperSakerPåBarn(søkerinfo.søker.barn ?? [], saker);
    const alleYtelser = getAlleYtelser(saker);

    // Super spesifikt case for avslåtte papirsøknad for svangerskapspenger. Bør fjernes
    const avslåttSvangerskapspengesak =
        grupperteSaker.length === 0 && alleYtelser.length === 1 && saker.svangerskapspenger.length === 1
            ? saker.svangerskapspenger[0]
            : undefined;

    const harMinstEttArbeidsforhold = !!søkerinfo?.arbeidsforhold && søkerinfo.arbeidsforhold.length > 0;

    return (
        <PageRouteLayout header={<ForsideHeader />}>
            <VStack gap="space-40">
                {redirectedFromSøknadsnummer === UKNOWN_SAKSNUMMER && (
                    <BekreftelseSendtSøknad
                        relevantNyTidslinjehendelse={undefined}
                        bankkonto={søkerinfo.søker.bankkonto}
                        ytelse={undefined}
                        manglendeVedlegg={[]}
                        harMinstEttArbeidsforhold={harMinstEttArbeidsforhold}
                    />
                )}
                {harIkkeOppdatertSak && (
                    <Alert variant="warning">
                        Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du
                        kan vente litt og komme tilbake senere for å se alle detaljene i saken din.
                    </Alert>
                )}
                {alleYtelser.length > 0 ? (
                    <HarSaker grupperteSaker={grupperteSaker} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />
                ) : (
                    <HarIkkeSaker harOppdatertSak={!harIkkeOppdatertSak} />
                )}
                {avslåttSvangerskapspengesak && (
                    <SakLink sak={avslåttSvangerskapspengesak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />
                )}
            </VStack>
        </PageRouteLayout>
    );
};
