import { VStack } from '@navikt/ds-react';

import { Søkerinfo } from '@navikt/fp-types';

import { HarIkkeSaker } from '../../components/har-ikke-saker/HarIkkeSaker';
import { HarSaker } from '../../components/har-saker/HarSaker';
import { ForsideHeader } from '../../components/header/Header';
import { SakLink } from '../../components/sak-link/SakLink';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { SakOppslag } from '../../types/SakOppslag';
import { getAlleYtelser, grupperSakerPåBarn } from '../../utils/sakerUtils';
import './forside.css';

interface Props {
    saker: SakOppslag;
    søkerinfo: Søkerinfo;
}

export const Forside = ({ saker, søkerinfo }: Props) => {
    useSetSelectedRoute(OversiktRoutes.HOVEDSIDE);

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
                {alleYtelser.length > 0 ? (
                    <HarSaker grupperteSaker={grupperteSaker} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />
                ) : (
                    <HarIkkeSaker harOppdatertSak />
                )}
                {avslåttSvangerskapspengesak && (
                    <SakLink sak={avslåttSvangerskapspengesak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />
                )}
            </VStack>
        </PageRouteLayout>
    );
};
