import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Box, Button, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, Forelder } from '@navikt/fp-constants';
import { Period } from '@navikt/fp-ui';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';

type Props = {
    valgtePerioder: Period[];
    komplettPlan: Planperiode[];
    handleOnPlanChange: (oppdatertPeriode: Planperiode[], leggTil: boolean) => void;
    familiehendelsedato: string;
    setSelectedPeriods: (perioder: Period[]) => void;
};

export const RedigeringPanel = ({ valgtePerioder, handleOnPlanChange, setSelectedPeriods }: Props) => {
    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);
    const { erFarEllerMedmor } = useUttaksplanData();

    const sammenslåtteValgtePerioder = slåSammenTilstøtendePerioder(valgtePerioder);

    // useEffect(() => {
    //     // Lukk redigeringsmodus når bruker endrer på valgte perioder i kalender
    //     setErIRedigeringsmodus(false);
    // }, [sammenslåtteValgtePerioder]);

    // const valgtePerioderIKomplettPlan = komplettPlan.filter((p) =>
    //     sammenslåtteValgtePerioder.some((vp) => {
    //         return (
    //             (dayjs(vp.fom).isSameOrAfter(dayjs(p.fom), 'day') &&
    //                 dayjs(vp.fom).isSameOrBefore(dayjs(p.tom), 'day')) ||
    //             (dayjs(vp.tom).isSameOrAfter(dayjs(p.fom), 'day') &&
    //                 dayjs(vp.tom).isSameOrBefore(dayjs(p.tom), 'day')) ||
    //             (dayjs(vp.fom).isBefore(dayjs(p.fom), 'day') && dayjs(vp.tom).isAfter(dayjs(p.tom), 'day'))
    //         );
    //     }),
    // );

    const slettPeriode = () => {
        const planperioder = sammenslåtteValgtePerioder.map((p) => ({
            forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
            periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
            fom: p.fom,
            tom: p.tom,
            readOnly: false,
            id: uniqueId(),
        }));

        handleOnPlanChange(planperioder, true);

        setErIRedigeringsmodus(false);
        setSelectedPeriods([]);
    };

    //TODO EndrePeriodPanel kan i dag kun oppdatera ein periode om gongen. Må endrast
    // const permisjonsperioder = mapPerioderToPermisjonsperiode(valgtePerioderIKomplettPlan, familiehendelsedato).at(0)!;

    //TODO Korleis skal ein håndtera valg av både nye og endra datoar samtidig?

    return (
        <>
            {!erIRedigeringsmodus && (
                <Box.New
                    borderWidth="1"
                    borderRadius="4"
                    borderColor="neutral-subtle"
                    padding="4"
                    width="300px"
                    height="fit-content"
                >
                    <VStack gap="space-16">
                        <div>
                            {sammenslåtteValgtePerioder.map((periode) => (
                                <div key={periode.fom}>
                                    {periode.fom === periode.tom
                                        ? dayjs(periode.fom).format(DDMMYYYY_DATE_FORMAT)
                                        : `${dayjs(periode.fom).format(DDMMYYYY_DATE_FORMAT)} - ${dayjs(periode.tom).format(DDMMYYYY_DATE_FORMAT)}`}
                                </div>
                            ))}
                        </div>

                        <Button variant="secondary" size="small" onClick={slettPeriode}>
                            <FormattedMessage id="RedigeringPanel.SlettPeriode" />
                        </Button>
                        <Button variant="secondary" size="small" onClick={() => setErIRedigeringsmodus(true)}>
                            <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                        </Button>
                        {/* <Button variant="secondary" size="small" onClick={() => setErIRedigeringsmodus(true)}>
                            <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                        </Button> */}
                    </VStack>
                </Box.New>
            )}
            {/* {erIRedigeringsmodus && (
                <>
                    {!permisjonsperioder && (
                        <LeggTilPeriodePanel
                            onCancel={() => setErIRedigeringsmodus(false)}
                            handleAddPeriode={(nyPeriode) => handleOnPlanChange([nyPeriode], true)}
                        />
                    )}
                    {!!permisjonsperioder && (
                        <EndrePeriodePanel
                            closePanel={() => setErIRedigeringsmodus(false)}
                            handleUpdatePeriode={(oppdatertPeriode) => handleOnPlanChange([oppdatertPeriode], false)}
                            handleAddPeriode={() => {}}
                            permisjonsperiode={permisjonsperioder}
                            inneholderKunEnPeriode
                        />
                    )}
                </>
            )} */}
        </>
    );
};

const slåSammenTilstøtendePerioder = (perioder: Period[]): Period[] => {
    if (!perioder.length) return [];

    return [...perioder]
        .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
        .reduce<Period[]>((acc, curr) => {
            const last = acc[acc.length - 1];

            if (last && dayjs(last.tom).add(1, 'day').isSame(dayjs(curr.fom))) {
                return acc.slice(0, -1).concat({
                    ...curr,
                    fom: last.fom,
                    tom: curr.tom,
                });
            }

            acc.push(curr);
            return acc;
        }, []);
};
