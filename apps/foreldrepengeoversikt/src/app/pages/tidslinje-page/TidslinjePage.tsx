import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { bemUtils, useDocumentTitle } from '@navikt/fp-utils';

import Api, { hentTidslinjehendelser } from 'app/api/api';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import OversiktRoutes from 'app/routes/routes';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';

import './tidslinje-page.css';

interface Props {
    søkersBarn: SøkerinfoDTOBarn[] | undefined;
    saker: SakOppslag;
}

const TidslinjePage: React.FunctionComponent<Props> = ({ søkersBarn, saker }) => {
    const bem = bemUtils('tidslinje-page');
    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'heleProsessen' })} -${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.TIDSLINJEN);
    const params = useParams();

    const tidslinjeHendelserQuery = useQuery(hentTidslinjehendelser(params.saksnummer!));
    const { manglendeVedleggData, manglendeVedleggError } = Api.useGetManglendeVedlegg(params.saksnummer!);

    if (tidslinjeHendelserQuery.isPending || !manglendeVedleggData) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    return (
        <div className={bem.element('div')}>
            <Tidslinje
                saker={saker}
                visHeleTidslinjen={true}
                søkersBarn={søkersBarn}
                tidslinjeHendelserQuery={tidslinjeHendelserQuery}
                manglendeVedleggData={manglendeVedleggData}
                manglendeVedleggError={manglendeVedleggError}
            />
        </div>
    );
};

export default TidslinjePage;
