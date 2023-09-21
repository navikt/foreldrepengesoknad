import OversiktRoutes from 'app/routes/routes';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';

import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import './tidslinje-page.css';
import { bemUtils } from '@navikt/fp-common';
import { SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';
import { SakOppslag } from 'app/types/SakOppslag';
import Api from 'app/api/api';
import { useParams } from 'react-router-dom';
import { Loader } from '@navikt/ds-react';
interface Props {
    søkersBarn: SøkerinfoDTOBarn[] | undefined;
    saker: SakOppslag;
}

const TidslinjePage: React.FunctionComponent<Props> = ({ søkersBarn, saker }) => {
    const bem = bemUtils('tidslinje-page');
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.TIDSLINJEN);
    const params = useParams();

    const { tidslinjeHendelserData, tidslinjeHendelserError } = Api.useGetTidslinjeHendelser(params.saksnummer!);
    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);

    if (!tidslinjeHendelserData || !manglendeVedleggData) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    return (
        <div className={bem.element('div')}>
            <Tidslinje
                saker={saker}
                visHeleTidslinjen={true}
                søkersBarn={søkersBarn}
                tidslinjeHendelserData={tidslinjeHendelserData}
                tidslinjeHendelserError={tidslinjeHendelserError}
                manglendeVedleggData={manglendeVedleggData}
                manglendeVedleggError={manglendeVedleggError}
            />
        </div>
    );
};

export default TidslinjePage;
