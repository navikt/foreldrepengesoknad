import { TrashIcon } from '@navikt/aksel-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Checkbox, HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfCheckboxGroup, RhfForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';
import { isRequired } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../../context/UttaksplanRedigeringContext';
import { SlettPeriodeForskyvEllerErstattPanel } from '../../../../felles/forskyvEllerErstatt/SlettPeriodeForskyvEllerErstattPanel';
import { Uttaksplanperiode, erEøsUttakPeriode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { UttakPeriodeBuilder } from '../../../../utils/UttakPeriodeBuilder';
import { erDetEksisterendePerioderEtterValgtePerioder } from '../../../../utils/periodeUtils';
import { genererPeriodeKey, getStønadskontoNavn } from '../../../utils/uttaksplanListeUtils';

const ARIA_LABEL_ID = 'slett-periode-panel-heading';

interface Props {
    closePanel: () => void;
    uttaksplanperioder: Uttaksplanperiode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

interface FormValues {
    periodeIndexer: number[];
}

export const SlettPeriodePanel = ({ closePanel, uttaksplanperioder, navnPåForeldre, erFarEllerMedmor }: Props) => {
    const intl = useIntl();

    const { uttakPerioder } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const erEksisterendePerioderEtterValgteDager = erDetEksisterendePerioderEtterValgtePerioder(
        uttakPerioder,
        uttaksplanperioder,
    );

    const [valgtePerioderSomSkalSlettes, setValgtePerioderSomSkalSlettes] = useState<Uttaksplanperiode[]>(
        uttaksplanperioder.length === 1 ? uttaksplanperioder : [],
    );

    // TODO (TOR) Bør skriva om heile komponenten.
    useEffect(() => {
        if (!erEksisterendePerioderEtterValgteDager && uttaksplanperioder.length === 1) {
            // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-data-to-parent, react-hooks/immutability
            slettPerioder(uttaksplanperioder, false);
        }
    }, []);

    const formMethods = useForm<FormValues>();

    const onSubmit = (values: FormValues) => {
        const slettedePerioder: Uttaksplanperiode[] = [];

        for (const periodeIndex of values.periodeIndexer || []) {
            const periode = uttaksplanperioder.at(periodeIndex);

            if (periode) {
                slettedePerioder.push(periode);
            }
        }

        if (erEksisterendePerioderEtterValgteDager) {
            setValgtePerioderSomSkalSlettes(slettedePerioder);
        } else {
            slettPerioder(slettedePerioder, false);
        }
    };

    const slettPerioder = (perioderSomSkalSlettes: Uttaksplanperiode[], skalForskyveBakover: boolean) => {
        const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder)
            .fjernUttakPerioder(perioderSomSkalSlettes, skalForskyveBakover)
            .getUttakPerioder();
        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);

        closePanel();
    };

    return (
        <div aria-labelledby={ARIA_LABEL_ID} data-panel="slett-periode">
            <div className="mb-4">
                <HStack gap="space-8" align="center">
                    <TrashIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="uttaksplan.slettPeriode.tittel" />
                    </Heading>
                </HStack>
            </div>
            <div>
                {valgtePerioderSomSkalSlettes.length > 0 && (
                    <SlettPeriodeForskyvEllerErstattPanel
                        valgtePerioder={valgtePerioderSomSkalSlettes}
                        avbryt={() => {
                            setValgtePerioderSomSkalSlettes([]);
                        }}
                        fjernPeriode={(skalForskyveBakover: boolean) =>
                            slettPerioder(valgtePerioderSomSkalSlettes, skalForskyveBakover)
                        }
                    />
                )}
                {valgtePerioderSomSkalSlettes.length === 0 && (
                    <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                        <VStack gap="space-16">
                            <Heading size="medium">
                                <FormattedMessage id="uttaksplan.slettPeriode.hvilkePerioder" />
                            </Heading>
                            <RhfCheckboxGroup
                                name="periodeIndexer"
                                control={formMethods.control}
                                validate={[isRequired(intl.formatMessage({ id: 'uttaksplan.velgperiode' }))]}
                                label={intl.formatMessage({ id: 'uttaksplan.perioder' })}
                            >
                                {uttaksplanperioder.map((p, index) => {
                                    const morsAktivitet =
                                        erVanligUttakPeriode(p) && p.morsAktivitet ? p.morsAktivitet : undefined;

                                    return (
                                        <Checkbox key={genererPeriodeKey(p)} value={index} autoFocus={index === 0}>
                                            {`${formatDate(p.fom)} - ${formatDate(p.tom)} -
                                        ${getStønadskontoNavn(
                                            intl,
                                            navnPåForeldre,
                                            erFarEllerMedmor,
                                            erEøsUttakPeriode(p),
                                            morsAktivitet,
                                            erVanligUttakPeriode(p) ? p.kontoType : undefined,
                                        )}`}
                                        </Checkbox>
                                    );
                                })}
                            </RhfCheckboxGroup>
                            <HStack justify="space-between">
                                <Button type="button" variant="secondary" onClick={closePanel}>
                                    <FormattedMessage id="uttaksplan.avbryt" />
                                </Button>
                                <Button>
                                    <FormattedMessage id="uttaksplan.slettValgte" />
                                </Button>
                            </HStack>
                        </VStack>
                    </RhfForm>
                )}
            </div>
        </div>
    );
};
