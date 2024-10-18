import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Heading, Loader } from '@navikt/ds-react';

import { bemUtils, useDocumentTitle } from '@navikt/fp-utils';

import { hentManglendeVedleggOptions, hentTidslinjehendelserOptions } from './../../api/api';
import { DinSakHeader } from './../../components/header/Header';
import { useSetBackgroundColor } from './../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from './../../hooks/useSelectedRoute';
import { useGetSelectedSak } from './../../hooks/useSelectedSak';
import { PageRouteLayout } from './../../routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from './../../routes/routes';
import Tidslinje from './../../sections/tidslinje/Tidslinje';
import { Sak } from './../../types/Sak';
import { SøkerinfoDTOBarn } from './../../types/SøkerinfoDTO';
import './tidslinje-page.css';

type OuterProps = {
    søkersBarn: SøkerinfoDTOBarn[];
};
type InnerProps = OuterProps & {
    sak?: Sak;
};

const TidslinjePageInner: React.FunctionComponent<InnerProps> = ({ søkersBarn, sak }) => {
    const bem = bemUtils('tidslinje-page');
    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'heleProsessen' })} -${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.TIDSLINJEN);
    const params = useParams();

    const tidslinjeHendelserQuery = useQuery(hentTidslinjehendelserOptions(params.saksnummer!));
    const manglendeVedleggQuery = useQuery(hentManglendeVedleggOptions(params.saksnummer!));

    if (tidslinjeHendelserQuery.isPending || manglendeVedleggQuery.isPending || !sak) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    return (
        <div className={bem.element('div')}>
            <Heading spacing level="2" size="medium">
                Dette skjer i saken
            </Heading>
            <Tidslinje
                sak={sak}
                visHeleTidslinjen={true}
                søkersBarn={søkersBarn}
                tidslinjeHendelserQuery={tidslinjeHendelserQuery}
                manglendeVedleggQuery={manglendeVedleggQuery}
            />
        </div>
    );
};

function TidslinjePage({ søkersBarn }: OuterProps) {
    const sak = useGetSelectedSak();

    return (
        <PageRouteLayout header={<DinSakHeader sak={sak} />}>
            <TidslinjePageInner sak={sak} søkersBarn={søkersBarn} />
        </PageRouteLayout>
    );
}

export default TidslinjePage;
