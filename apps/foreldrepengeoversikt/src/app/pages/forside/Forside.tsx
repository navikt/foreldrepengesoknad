import HarIkkeSaker from 'app/components/har-ikke-saker/HarIkkeSaker';
import HarSaker from 'app/components/har-saker/HarSaker';
import { Block, bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import SakLink from 'app/components/sak-link/SakLink';
import { Alert } from '@navikt/ds-react';

import './forside.css';

interface Props {
    alleYtelser: Sak[];
    grupperteSaker: GruppertSak[];
    avslåttSvangerskapspengesak: SvangerskapspengeSak | undefined;
    oppdatertData: boolean;
}

const Forside: React.FunctionComponent<Props> = ({
    alleYtelser,
    grupperteSaker,
    avslåttSvangerskapspengesak,
    oppdatertData,
}) => {
    const bem = bemUtils('forside');
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);

    return (
        <div className={bem.block}>
            <Block padBottom="xl">
                {!oppdatertData && (
                    <Alert variant="warning">
                        Det ser ut som det tar litt tid å opprette saken din akkurat i dag. Søknaden din er sendt, så du
                        kan vente litt og komme tilbake senere for å se alle detaljene i saken din.
                    </Alert>
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
