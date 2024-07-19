import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Heading, Loader } from '@navikt/ds-react';

import { bemUtils, useDocumentTitle } from '@navikt/fp-utils';

import { hentManglendeVedleggOptions, hentTidslinjehendelserOptions } from 'app/api/api';
import { DinSakHeader } from 'app/components/header/Header';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import { PageRouteLayout } from 'app/routes/ForeldrepengeoversiktRoutes';
import OversiktRoutes from 'app/routes/routes';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { Sak } from 'app/types/Sak';
import { SøkerinfoDTOBarn } from 'app/types/SøkerinfoDTO';

import './tidslinje-page.css';

type OuterProps = {
    readonly søkersBarn: SøkerinfoDTOBarn[];
};
type InnerProps = OuterProps & {
    readonly sak: Sak;
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

    if (tidslinjeHendelserQuery.isPending || manglendeVedleggQuery.isPending) {
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
    const sak = useGetSelectedSak()!; // TODO: burde ikke ha "!-assertion"

    return (
        <PageRouteLayout header={<DinSakHeader sak={sak} />}>
            <TidslinjePageInner sak={sak} søkersBarn={søkersBarn} />
        </PageRouteLayout>
    );
}

export default TidslinjePage;
