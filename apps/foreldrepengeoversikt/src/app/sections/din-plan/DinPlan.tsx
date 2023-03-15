import { BodyLong, Button, Link } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import {
    finnFremtidigePerioder,
    finnNåværendePerioder,
    finnTidligerePerioder,
    getCleanedPlanForVisning,
} from 'app/utils/periodeUtils';
import { NavRoutes } from 'app/routes/routes';
import './din-plan.css';
import PeriodeOversikt from 'app/components/periode-oversikt/PeriodeOversikt';
import { Foreldrepengesak } from 'app/types/Foreldrepengesak';
import { slåSammenLikePerioder } from 'app/utils/planUtils';

interface Props {
    navnAnnenForelder: string;
    navnPåSøker: string;
    sak: Foreldrepengesak;
    visHelePlanen: boolean;
}

const DinPlan: React.FunctionComponent<Props> = ({ sak, visHelePlanen, navnPåSøker, navnAnnenForelder }) => {
    const bem = bemUtils('din-plan');

    let vedtattUttaksplan = undefined;
    let søktePerioder = undefined;
    if (sak.gjeldendeVedtak) {
        vedtattUttaksplan = slåSammenLikePerioder(sak.gjeldendeVedtak.perioder);
    }

    if (sak.åpenBehandling && sak.åpenBehandling.søknadsperioder) {
        søktePerioder = slåSammenLikePerioder(sak.åpenBehandling.søknadsperioder);
    }
    const erUttaksplanVedtatt = vedtattUttaksplan ? true : false;

    const planForVisning = erUttaksplanVedtatt ? vedtattUttaksplan : søktePerioder;
    const filtrertPlan = getCleanedPlanForVisning(planForVisning, erUttaksplanVedtatt);
    const planMedHull = filtrertPlan; //TODO fyllInnHull(filtrertPlan);
    const tidligerePerioder = planMedHull ? finnTidligerePerioder(planMedHull) : undefined;
    const nåværendePerioder = planMedHull ? finnNåværendePerioder(planMedHull) : undefined;
    const fremtidligePerioder = planMedHull ? finnFremtidigePerioder(planMedHull) : undefined;
    const kunTidligerePerioderFinnes =
        (nåværendePerioder === undefined || nåværendePerioder.length === 0) &&
        (fremtidligePerioder === undefined || fremtidligePerioder.length === 0);
    let tekstForVedtattPlan = '';
    if (visHelePlanen || !kunTidligerePerioderFinnes) {
        tekstForVedtattPlan = 'Du har fått vedtatt planen nedenfor.';
    }

    return (
        <>
            <div className={bem.element('header')}>
                <div className={bem.element('header-tekst')}>
                    {erUttaksplanVedtatt && <BodyLong> {tekstForVedtattPlan} </BodyLong>}
                    {!erUttaksplanVedtatt && <BodyLong> Du har søkt om planen nedenfor. </BodyLong>}
                    {!erUttaksplanVedtatt && <BodyLong> Planen er ikke vedtatt av NAV ennå. </BodyLong>}
                </div>
                {(visHelePlanen || !kunTidligerePerioderFinnes) && (
                    <Button
                        as={Link}
                        href={NavRoutes.FORELDREPENGESOKNAD}
                        variant="secondary"
                        icon={<Edit aria-hidden />}
                        iconPosition="right"
                    >
                        Endre plan
                    </Button>
                )}
            </div>
            <PeriodeOversikt
                tidligerePerioder={tidligerePerioder}
                nåværendePerioder={nåværendePerioder}
                fremtidigePerioder={fremtidligePerioder}
                sak={sak}
                visHelePlanen={visHelePlanen}
                navnPåSøker={navnPåSøker}
                navnAnnenForelder={navnAnnenForelder}
            />
        </>
    );
};

export default DinPlan;
