import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Heading, Loader } from '@navikt/ds-react';

import { BarnDto_fpoversikt } from '@navikt/fp-types';
import { useDocumentTitle } from '@navikt/fp-utils';

import { hentManglendeVedleggOptions, hentTidslinjehendelserOptions } from '../../api/queries.ts';
import { DinSakHeader } from '../../components/header/Header';
import { NoeGikkGalt } from '../../components/noe-gikk-galt/NoeGikkGalt';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { Tidslinje } from '../../sections/tidslinje/Tidslinje2.tsx';
import { Sak } from '../../types/Sak';

type OuterProps = {
    søkersBarn: BarnDto_fpoversikt[];
    visHeleTidslinjen?: boolean;
};
type InnerProps = OuterProps & {
    sak?: Sak;
};

const TidslinjePageInner = ({ søkersBarn, sak, visHeleTidslinjen = true }: InnerProps) => {
    const intl = useIntl();
    useDocumentTitle(
        `${intl.formatMessage({ id: 'heleProsessen' })} -${intl.formatMessage({ id: 'dineForeldrepenger' })}`,
    );
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.TIDSLINJEN);
    const params = useParams();

    const tidslinjeHendelserQuery = useQuery(hentTidslinjehendelserOptions(params.saksnummer!));
    const manglendeVedleggQuery = useQuery(hentManglendeVedleggOptions(params.saksnummer!));

    if (tidslinjeHendelserQuery.isPending || manglendeVedleggQuery.isPending || sak === undefined) {
        return <Loader size="large" aria-label="Henter status for din søknad" />;
    }

    if (tidslinjeHendelserQuery.isError || manglendeVedleggQuery.isError) {
        return (
            <NoeGikkGalt>
                Vi klarer ikke å vise informasjon om hva som skjer i saken din akkurat nå. Feilen er hos oss, ikke hos
                deg. Prøv igjen senere.
            </NoeGikkGalt>
        );
    }

    return (
        <div className="bg-ax-bg-default mb-10 rounded-[0.5rem] p-4 pb-8">
            <Heading spacing level="2" size="medium">
                Dette skjer i saken
            </Heading>
            <Tidslinje
                sak={sak}
                visHeleTidslinjen={visHeleTidslinjen}
                søkersBarn={søkersBarn}
                tidslinjeHendelser={tidslinjeHendelserQuery.data ?? []}
                manglendeVedlegg={manglendeVedleggQuery.data ?? []}
            />
        </div>
    );
};

// visHeleTidslinjen kunne vært inlinet i Tidslinje komponenten. Men har den herfra slik at man kan toggle den i storybook.
export const TidslinjePage = ({ søkersBarn, visHeleTidslinjen = true }: OuterProps) => {
    const sak = useGetSelectedSak();

    return (
        <PageRouteLayout header={<DinSakHeader sak={sak} />}>
            <TidslinjePageInner sak={sak} søkersBarn={søkersBarn} visHeleTidslinjen={visHeleTidslinjen} />
        </PageRouteLayout>
    );
};
