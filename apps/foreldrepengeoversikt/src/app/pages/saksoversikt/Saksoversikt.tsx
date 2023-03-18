import { Loader } from '@navikt/ds-react';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import ContentSection from 'app/components/content-section/ContentSection';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useSetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { HendelseType } from 'app/types/HendelseType';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { SakOppslag } from 'app/types/SakOppslag';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Ytelse } from 'app/types/Ytelse';
import { getAlleYtelser, getFamiliehendelseDato, getNavnAnnenForelder } from 'app/utils/sakerUtils';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import './saksoversikt.css';

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    saker: SakOppslag;
    søkerinfo: SøkerinfoDTO;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ minidialogerData, minidialogerError, saker, søkerinfo }) => {
    const intl = useIntl();
    const bem = bemUtils('saksoversikt');
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);
    const navnPåSøker = søkerinfo.søker.fornavn;
    const params = useParams();
    const alleSaker = getAlleYtelser(saker);

    const gjeldendeSak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!;
    useSetSelectedSak(gjeldendeSak);

    const navnAnnenForelder = getNavnAnnenForelder(søkerinfo, gjeldendeSak);

    const aktiveMinidialogerForSaken = minidialogerData
        ? minidialogerData.filter(
              ({ gyldigTil, aktiv, hendelse, saksnr }) =>
                  aktiv &&
                  saksnr === gjeldendeSak.saksnummer &&
                  dayjs(gyldigTil).isSameOrAfter(new Date(), 'days') &&
                  hendelse !== HendelseType.TILBAKEKREVING_FATTET_VEDTAK
          )
        : undefined;

    let familiehendelsesdato = undefined;
    let annenPartFnr = undefined;
    let annenPartVedtakIsSuspended = true;

    if (gjeldendeSak.ytelse === Ytelse.FORELDREPENGER) {
        familiehendelsesdato = getFamiliehendelseDato(gjeldendeSak.familiehendelse);
        annenPartFnr = gjeldendeSak.annenPart?.fnr;
        annenPartVedtakIsSuspended =
            annenPartFnr === undefined || annenPartFnr === '' || familiehendelsesdato === undefined;
    }
    const { annenPartsVedakData, annenPartsVedtakError } = Api.useGetAnnenPartsVedtak(annenPartVedtakIsSuspended);

    useEffect(() => {
        if (annenPartsVedtakError) {
            throw new Error('Vi klarte ikke å hente opp informasjon om den andre forelderen.');
        }
    }, [annenPartsVedtakError]);

    if (!annenPartsVedakData) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }

    return (
        <div className={bem.block}>
            {((aktiveMinidialogerForSaken && aktiveMinidialogerForSaken.length > 0) || minidialogerError) && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.oppgaver')} backgroundColor={'yellow'}>
                    <Oppgaver
                        minidialogerData={aktiveMinidialogerForSaken}
                        minidialogerError={minidialogerError}
                        saksnummer={gjeldendeSak.saksnummer}
                    />
                </ContentSection>
            )}
            <ContentSection cornerStyle="square" heading={intlUtils(intl, 'saksoversikt.tidslinje')}>
                <Tidslinje sak={gjeldendeSak} />
            </ContentSection>
            <ContentSection padding="none">
                <SeDokumenter />
            </ContentSection>
            {gjeldendeSak.ytelse === Ytelse.FORELDREPENGER && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.dinPlan')} padding="large">
                    <DinPlan
                        sak={gjeldendeSak}
                        visHelePlanen={false}
                        navnPåSøker={navnPåSøker}
                        navnAnnenForelder={navnAnnenForelder}
                        annenPartsPerioder={annenPartsVedakData.perioder}
                    />
                </ContentSection>
            )}
        </div>
    );
};

export default Saksoversikt;
