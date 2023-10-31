import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import { Block, bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import SakLink from 'app/components/sak-link/SakLink';
import { Alert, Heading } from '@navikt/ds-react';

import './forside.css';
import BekreftelseSendtSøknad from 'app/components/bekreftelse-sendt-søknad/BekreftelseSendtSøknad';
import { useGetIsRedirectedFromSøknad, useSetIsRedirectedFromSøknad } from 'app/hooks/useIsRedirectedFromSøknad';
import { useNavigate, useParams } from 'react-router-dom';
import { RedirectSource } from 'app/types/RedirectSource';

interface Props {
    alleYtelser: Sak[];
    grupperteSaker: GruppertSak[];
    avslåttSvangerskapspengesak: SvangerskapspengeSak | undefined;
    oppdatertData: boolean;
    storageData: any;
    isFirstRender: React.MutableRefObject<boolean>;
}

const Forside: React.FunctionComponent<Props> = ({
    alleYtelser,
    grupperteSaker,
    avslåttSvangerskapspengesak,
    oppdatertData,
    storageData,
    isFirstRender,
}) => {
    const bem = bemUtils('forside');
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);

    const params = useParams();
    useSetIsRedirectedFromSøknad(params.redirect, isFirstRender);
    const navigate = useNavigate();
    if (params.redirect === RedirectSource.REDIRECT_FROM_SØKNAD) {
        navigate(OversiktRoutes.HOVEDSIDE);
    }
    const redirectedFromSoknad = useGetIsRedirectedFromSøknad();
    return (
        <div className={bem.block}>
            <Block padBottom="xl">
                {redirectedFromSoknad && (
                    <BekreftelseSendtSøknad oppdatertData={oppdatertData} tidslinjehendelser={[]} />
                )}
                {!oppdatertData && (
                    <Alert variant="warning">
                        Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du
                        kan vente litt og komme tilbake senere for å se alle detaljene i saken din.
                    </Alert>
                )}
            </Block>
            <Block>
                {storageData && storageData.søknad.harGodkjentVilkår && (
                    <Heading level="1" size="large">
                        Dette er en mellomlagret søknad av typen: {storageData.søknad.type}
                    </Heading>
                )}
            </Block>
            {alleYtelser.length > 0 ? (
                <HarSaker grupperteSaker={grupperteSaker} />
            ) : (
                <HarIkkeSaker oppdatertData={oppdatertData} />
            )}
            {avslåttSvangerskapspengesak && <SakLink sak={avslåttSvangerskapspengesak} />}
        </div>
    );
};

export default Forside;
