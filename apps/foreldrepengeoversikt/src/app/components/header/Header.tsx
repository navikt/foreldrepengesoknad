import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { getFamiliehendelseDato, getSakTittel, utledFamiliesituasjon } from 'app/utils/sakerUtils';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import classNames from 'classnames';

import { IntlShape, useIntl } from 'react-intl';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import StatusTag from '../status-tag/StatusTag';

import './header.css';

const getSaksoversiktHeading = (ytelse: Ytelse) => {
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
    intl: IntlShape
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

    if (selectedRoute === OversiktRoutes.SAKSOVERSIKT && sak) {
        if (!sak.familiehendelse) {
            return (
                <div className={bem.element('content')}>
                    <div className={bem.element('baby-ikonBox')}>
                        <TåteflaskeBaby />
                    </div>
                    <div className={bem.element('title-with-status-saksnr')}>
                        <Heading size="large">{getSaksoversiktHeading(sak.ytelse)}</Heading>

                        <StatusTag sak={sak} className={bem.element('tag')} />

                        <div className={bem.element('text-with-bar')}>
                            <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        </div>
                    </div>
                </div>
            );
        }

        const situasjon = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon);
        const familiehendelsedato = ISOStringToDate(getFamiliehendelseDato(sak.familiehendelse));
        const barnTittel = getSakTittel(
            barn?.fornavn,
            barn?.fødselsdatoer,
            familiehendelsedato!,
            !!barn?.alleBarnaLever,
            sak.ytelse === Ytelse.FORELDREPENGER ? sak.familiehendelse.antallBarn : 0,
            intl,
            situasjon
        );

        return (
            <div className={bem.element('content')}>
                <div className={bem.element('baby-ikonBox')}>
                    <TåteflaskeBaby />
                </div>
                <div className={bem.element('content-detaljer')}>
                    <div className={bem.element('title-with-status-saksnr')}>
                        <Heading size="large">{getSaksoversiktHeading(sak.ytelse)}</Heading>
                        <StatusTag sak={sak} className={bem.element('tag')} />
                    </div>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <hr className={classNames(bem.element('divider'))}></hr>
                        <BodyShort className={bem.element('divider-text')}>{barnTittel}</BodyShort>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={bem.element('content')}>
            <div className={bem.element('baby-ikonBox')}>
                <TåteflaskeBaby />
            </div>
            <div className={bem.element('title-container')}>
                <Heading size="large">Oversikt over foreldrepenger</Heading>
                <div className={bem.element('text-with-bar')}>
                    <BodyShort>PENGESTØTTE</BodyShort>
                </div>
            </div>
        </div>
    );
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

export default Header;
