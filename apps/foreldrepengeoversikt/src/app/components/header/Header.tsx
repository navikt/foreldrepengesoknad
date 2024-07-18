import { BabyWrappedIcon, PersonPregnantIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, Detail, HGrid, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { hentSakerOptions, søkerInfoOptions } from 'app/api/api';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import {
    getFamiliehendelseDato,
    getSakTittel,
    grupperSakerPåBarn,
    mapSakerDTOToSaker,
    utledFamiliesituasjon,
} from 'app/utils/sakerUtils';

import Breadcrumb from '../breadcrumb/Breadcrumb';
import StatusTag from '../status-tag/StatusTag';
import './header.css';

export const getSaksoversiktHeading = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Engangsstønadsak';
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Svangerskapspengesak';
    }

    return 'Din sak';
};

const renderHeaderContent = (
    selectedRoute: OversiktRoutes,
    sak: Sak | undefined,
    barn: BarnGruppering | undefined,
    intl: IntlShape,
) => {
    const bem = bemUtils('header');

    if (selectedRoute === OversiktRoutes.TIDSLINJEN) {
        return (
            <div className={bem.element('content-fixed')}>
                <div>
                    <Heading size="large">Hele prosessen</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedRoute === OversiktRoutes.DOKUMENTER) {
        return (
            <div className={bem.element('content')}>
                <div>
                    <Heading size="large">Dokumenter</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <div className={bem.element('divider')}>|</div>
                        <BodyShort className={bem.element('divider-text')}>
                            Liste over dokumenter som tilhører saken
                        </BodyShort>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedRoute === OversiktRoutes.ETTERSEND) {
        return (
            <div className={bem.element('content')}>
                <div>
                    <Heading size="large">Last opp dokumenter</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <div className={bem.element('divider')}>|</div>
                        <BodyShort className={bem.element('divider-text')}>
                            Ettersend dokumenter som tilhører saken
                        </BodyShort>
                    </div>
                </div>
            </div>
        );
    }
};

interface Props {
    grupperteSaker: GruppertSak[];
    oppgaverIds: string[];
}

const Header: React.FunctionComponent<Props> = ({ grupperteSaker, oppgaverIds }) => {
    const bem = bemUtils('header');
    const intl = useIntl();
    const selectedRoute = useGetSelectedRoute();
    const sak = useGetSelectedSak();
    const sakIGrupperteSaker = sak
        ? grupperteSaker.find((gruppe) => gruppe.saker.map((s) => s.saksnummer).includes(sak.saksnummer))
        : undefined;
    const barnGrupperingForSak = sakIGrupperteSaker?.barn;
    const path = location.pathname;
    const currentOppgaveId = oppgaverIds.find((id) => path.includes(id));
    return (
        <div className={bem.block}>
            <Breadcrumb selectedRoute={selectedRoute} oppgaveId={currentOppgaveId} />
            <div className={bem.element('wrapper')}>
                {renderHeaderContent(selectedRoute, sak, barnGrupperingForSak, intl)}
            </div>
        </div>
    );
};

function HeaderWrapper({ children }: { children: ReactNode }) {
    const bem = bemUtils('header');
    const selectedRoute = useGetSelectedRoute();
    // TODO: oppgaveid
    return (
        <div className={bem.block}>
            <Breadcrumb selectedRoute={selectedRoute} oppgaveId={undefined} />
            <div className={bem.element('wrapper')}>{children}</div>
        </div>
    );
}
export function ForsideHeader() {
    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="6" align="center">
                <BabyIkon ytelse={Ytelse.FORELDREPENGER} />
                <Heading level="1" size="large">
                    Oversikt over foreldrepengesaker
                </Heading>
            </HGrid>
        </HeaderWrapper>
    );
}

function BabyIkon({ ytelse }: { ytelse: Ytelse }) {
    const YtelseIkon = ytelse === Ytelse.SVANGERSKAPSPENGER ? PersonPregnantIcon : BabyWrappedIcon;
    return (
        <>
            <Show above="md">
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--a-deepblue-100)',
                        paddingTop: '8px',
                        paddingLeft: '8px',
                    }}
                >
                    <YtelseIkon fontSize={44} style={{ color: 'var(--a-lightblue-800)' }} />
                </div>
            </Show>
            <Show below="md">
                <div
                    style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--a-deepblue-100)',
                        paddingTop: '8px',
                        paddingLeft: '8px',
                    }}
                >
                    <YtelseIkon fontSize={22} style={{ color: 'var(--a-lightblue-800)' }} />
                </div>
            </Show>
        </>
    );
}

export function DinSakHeader({ sak }: { sak: Sak }) {
    const bem = bemUtils('header');
    const intl = useIntl();

    const søkerinfo = useQuery(søkerInfoOptions()).data;
    const saker = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    }).data;

    // TODO: utleding av info her er litt kronglete, kan det gjøres bedre? Også vise noe når vi ikke har familiehendelse?
    if (!søkerinfo || !saker || !sak.familiehendelse) {
        return null;
    }

    const grupperteSaker = grupperSakerPåBarn(søkerinfo.søker.barn, saker);
    const sakIGrupperteSaker = sak
        ? grupperteSaker.find((gruppe) => gruppe.saker.map((s) => s.saksnummer).includes(sak.saksnummer))
        : undefined;

    const situasjon = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon);
    const barnTittel = getSakTittel({
        barngruppering: sakIGrupperteSaker?.barn,
        familiehendelsedato: getFamiliehendelseDato(sak.familiehendelse),
        intl,
        antallBarn: sak.ytelse === Ytelse.FORELDREPENGER ? sak.familiehendelse.antallBarn : 0,
        situasjon,
    });

    return (
        <HeaderWrapper>
            <HGrid columns="max-content 1fr" gap="6" align="start">
                <BabyIkon ytelse={sak.ytelse} />
                <VStack>
                    <HStack gap="6" align="center">
                        <Heading level="1" size="large">
                            Din sak
                        </Heading>
                        <StatusTag sak={sak} className={bem.element('tag')} />
                    </HStack>
                    <Show above="md">
                        <HStack gap="3" align="center">
                            <Detail uppercase>{sak.ytelse}</Detail>
                            <BlueDot />
                            <Detail>SAKSNR {sak.saksnummer}</Detail>
                            <BlueDot />
                            <Detail textColor="subtle">
                                {barnTittel.tittel} {barnTittel.undertittel}
                            </Detail>
                        </HStack>
                    </Show>
                    <Show below="md">
                        <VStack gap="1">
                            <HStack gap="2" align="center">
                                <Detail uppercase>{sak.ytelse}</Detail>
                                <BlueDot />
                                <Detail>SAKSNR {sak.saksnummer}</Detail>
                            </HStack>
                            <Detail textColor="subtle">
                                {barnTittel.tittel} {barnTittel.undertittel}
                            </Detail>
                        </VStack>
                    </Show>
                </VStack>
            </HGrid>
        </HeaderWrapper>
    );
}

function BlueDot() {
    return <div style={{ height: '4px', width: '4px', borderRadius: '50%', background: 'var(--a-deepblue-300)' }} />;
}

export default Header;
