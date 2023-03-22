import { BodyLong, Button, Link } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import {
    finnFremtidigePerioder,
    finnNåværendePerioder,
    finnTidligerePerioder,
    getCleanedPlanForVisning,
    getPerioderForVisning,
    leggTilVisningsInfo,
    normaliserPerioder,
    Periodene,
} from 'app/utils/periodeUtils';
import { NavRoutes } from 'app/routes/routes';
import './din-plan.css';
import PeriodeOversikt from 'app/components/periode-oversikt/PeriodeOversikt';
import { Foreldrepengesak } from 'app/types/Foreldrepengesak';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import { Periode } from 'app/types/Periode';

interface Props {
    annenPartsPerioder: Periode[] | undefined;
    navnAnnenForelder: string;
    navnPåSøker: string;
    sak: Foreldrepengesak;
    visHelePlanen: boolean;
}

const DinPlan: React.FunctionComponent<Props> = ({
    annenPartsPerioder,
    sak,
    visHelePlanen,
    navnPåSøker,
    navnAnnenForelder,
}) => {
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
    const annenPartsPerioderForVisning =
        annenPartsPerioder !== undefined
            ? getPerioderForVisning(
                  annenPartsPerioder.filter((p) => p.resultat.innvilget === true),
                  true
              )
            : undefined;
    let annenPartsPlan: Periode[] = [];
    let søkersPlan = erUttaksplanVedtatt ? vedtattUttaksplan : søktePerioder;
    if (søkersPlan && annenPartsPerioderForVisning) {
        const { normaliserteEgnePerioder, normaliserteAnnenPartsPerioder } = normaliserPerioder(
            søkersPlan,
            annenPartsPerioderForVisning
        );
        søkersPlan = normaliserteEgnePerioder;
        annenPartsPlan = leggTilVisningsInfo(normaliserteAnnenPartsPerioder, søkersPlan);
    }
    const annenPartsPlanUtenOverlapp = annenPartsPlan ? annenPartsPlan.filter((p) => p.visIPlan) : [];
    const annenPartsOverlappendePerioder = annenPartsPlan ? annenPartsPlan.filter((p) => !p.visIPlan) : [];
    const allePerioderForVisning = søkersPlan
        ? Periodene(søkersPlan.concat(annenPartsPlanUtenOverlapp)).sort()
        : annenPartsPlan;
    const filtrertPlan = getCleanedPlanForVisning(allePerioderForVisning, erUttaksplanVedtatt);
    const tidligerePerioder = filtrertPlan ? finnTidligerePerioder(filtrertPlan) : undefined;
    const nåværendePerioder = filtrertPlan ? finnNåværendePerioder(filtrertPlan) : undefined;
    const fremtidligePerioder = filtrertPlan ? finnFremtidigePerioder(filtrertPlan) : undefined;
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
                overlappendePerioderAnnenPart={annenPartsOverlappendePerioder}
            />
        </>
    );
};

export default DinPlan;
