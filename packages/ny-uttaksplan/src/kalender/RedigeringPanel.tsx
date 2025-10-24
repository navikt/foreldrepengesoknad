import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Planperiode } from 'types/Planperiode';

import { Box, Button, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { Period } from '@navikt/fp-ui';

import { EndrePeriodePanel } from '../components/endre-periode-panel/EndrePeriodePanel';
import { LeggTilPeriodePanel } from '../components/legg-til-periode-panel/LeggTilPeriodePanel';
import { mapPerioderToPermisjonsperiode } from '../utils/permisjonsperiodeUtils';

type Props = {
    valgtePerioder: Period[];
    komplettPlan: Planperiode[];
    handleOnPlanChange: (oppdatertPeriode: Planperiode, leggTil: boolean) => void;
    familiehendelsedato: string;
};

export const RedigeringPanel = ({ valgtePerioder, komplettPlan, handleOnPlanChange, familiehendelsedato }: Props) => {
    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);

    useEffect(() => {
        // Lukk redigeringsmodus når bruker endrer på valgte perioder i kalender
        setErIRedigeringsmodus(false);
    }, [valgtePerioder]);

    const valgtePerioderIKomplettPlan = komplettPlan.filter((p) =>
        valgtePerioder.some((vp) => {
            return (
                (dayjs(vp.fom).isSameOrAfter(dayjs(p.fom), 'day') &&
                    dayjs(vp.fom).isSameOrBefore(dayjs(p.tom), 'day')) ||
                (dayjs(vp.tom).isSameOrAfter(dayjs(p.fom), 'day') &&
                    dayjs(vp.tom).isSameOrBefore(dayjs(p.tom), 'day')) ||
                (dayjs(vp.fom).isBefore(dayjs(p.fom), 'day') && dayjs(vp.tom).isAfter(dayjs(p.tom), 'day'))
            );
        }),
    );

    //TODO EndrePeriodPanel kan i dag kun oppdatera ein periode om gongen. Må endrast
    const permisjonsperioder = mapPerioderToPermisjonsperiode(valgtePerioderIKomplettPlan, familiehendelsedato).at(0)!;

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
                            {valgtePerioder.map((periode) => (
                                <div key={periode.fom}>
                                    {periode.fom === periode.tom
                                        ? dayjs(periode.fom).format(DDMMYYYY_DATE_FORMAT)
                                        : `${dayjs(periode.fom).format(DDMMYYYY_DATE_FORMAT)} - ${dayjs(periode.tom).format(DDMMYYYY_DATE_FORMAT)}`}
                                </div>
                            ))}
                        </div>
                        <Button variant="primary" size="small" onClick={() => setErIRedigeringsmodus(true)}>
                            <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                        </Button>
                    </VStack>
                </Box.New>
            )}
            {erIRedigeringsmodus && (
                <>
                    {!permisjonsperioder && (
                        <LeggTilPeriodePanel
                            onCancel={() => setErIRedigeringsmodus(false)}
                            handleAddPeriode={(nyPeriode) => handleOnPlanChange(nyPeriode, true)}
                            erBarnetFødt
                            gjelderAdopsjon={false}
                        />
                    )}
                    {!!permisjonsperioder && (
                        <EndrePeriodePanel
                            closePanel={() => setErIRedigeringsmodus(false)}
                            handleUpdatePeriode={(oppdatertPeriode) => handleOnPlanChange(oppdatertPeriode, false)}
                            handleAddPeriode={() => {}}
                            permisjonsperiode={permisjonsperioder}
                            inneholderKunEnPeriode
                            erBarnetFødt
                            gjelderAdopsjon={false}
                        />
                    )}
                </>
            )}
        </>
    );
};
