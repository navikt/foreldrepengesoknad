import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, Box, Button, ErrorMessage, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { RhfForm } from '@navikt/fp-form-hooks';
import type { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { getFloatFromString } from '@navikt/fp-utils';

import { PanelButtons } from '../../components/panel-buttons/PanelButtons';
import { GraderingSpørsmål } from '../../components/spørsmål/GraderingSpørsmål';
import { KontotypeSpørsmål } from '../../components/spørsmål/KontotypeSpørsmål';
import { SamtidigUttakSpørsmål } from '../../components/spørsmål/SamtidigUttakSpørsmål';
import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { getVarighetString } from '../../utils/dateUtils';
import { getGradering } from '../../utils/graderingUtils';
import { PeriodeDetaljerOgInfoMeldinger } from './PeriodeDetaljerOgInfoMeldinger';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { RødRamme } from './utils/RødRamme';
import { finnAntallDager } from './utils/kalenderPeriodeUtils';
import { useMediaRemoveScrollingOnMobile, useMediaResetMinimering } from './utils/useMediaActions';
import { usePeriodeValidator } from './utils/usePeriodeValidator';

type FormValues = {
    kontoType?: KontoTypeUttak;
    forelder?: BrukerRolleSak_fpoversikt;
    skalDuJobbe?: boolean;
    stillingsprosent?: string;
    samtidigUttak?: boolean;
    samtidigUttaksprosent?: string;
};

interface Props {
    lukkRedigeringsmodus: () => void;
    labels: React.ReactNode;
}

export const LeggTilEllerEndrePeriodePanel = ({ lukkRedigeringsmodus, labels }: Props) => {
    const intl = useIntl();

    const { uttaksplan, aleneOmOmsorg, familiehendelsedato } = useUttaksplanData();

    const { erKunEnHelEksisterendePeriodeValgt, sammenslåtteValgtePerioder, oppdaterUttaksplan, setValgtePerioder } =
        useKalenderRedigeringContext();

    const [feilmelding, setFeilmelding] = useState<string | undefined>();

    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(false);

    const [erMinimert, setErMinimert] = useState(false);

    useMediaResetMinimering(setErMinimert);
    useMediaRemoveScrollingOnMobile(erMinimert);

    const { finnKontotypeGyldigFeilmeldinger, finnPerioderGyldigeFeilmeldinger } =
        usePeriodeValidator(sammenslåtteValgtePerioder);

    const formMethods = useForm<FormValues>({
        defaultValues: erKunEnHelEksisterendePeriodeValgt
            ? lagDefaultValues(uttaksplan, sammenslåtteValgtePerioder[0]!)
            : undefined,
    });

    const onSubmit = (values: FormValues) => {
        const valideringsfeil = finnKontotypeGyldigFeilmeldinger(values.kontoType, values.samtidigUttak).concat(
            finnPerioderGyldigeFeilmeldinger(
                values.kontoType,
                values.samtidigUttak,
                values.skalDuJobbe,
                values.forelder,
            ),
        );

        if (valideringsfeil.length > 0) {
            setFeilmelding(valideringsfeil.at(0));
            return;
        }
        setFeilmelding(undefined);

        oppdaterUttaksplan(
            sammenslåtteValgtePerioder.map((periode) => ({
                erAnnenPartEøs: false,
                fom: periode.fom,
                tom: periode.tom,
                readOnly: false,
                id: `${periode.fom} - ${periode.tom} - ${values.kontoType} - ${values.forelder}`,
                kontoType: values.kontoType === 'AKTIVITETSFRI_KVOTE' ? 'FORELDREPENGER' : values.kontoType,
                morsAktivitet: values.kontoType === 'AKTIVITETSFRI_KVOTE' ? 'IKKE_OPPGITT' : undefined,
                forelder: getForelderFraKontoType(values.kontoType, values.forelder),
                gradering: values.skalDuJobbe
                    ? getGradering(values.skalDuJobbe, values.stillingsprosent, values.kontoType)
                    : undefined,
                samtidigUttak: values.samtidigUttak ? getFloatFromString(values.samtidigUttaksprosent) : undefined,
            })),
        );
        setValgtePerioder([]);

        lukkRedigeringsmodus();
    };

    const harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato = !sammenslåtteValgtePerioder.some((periode) =>
        dayjs(periode.tom).isAfter(dayjs(familiehendelsedato).subtract(22, 'days')),
    );

    const gyldigeKontotyper = useGyldigeKontotyper(sammenslåtteValgtePerioder);

    return (
        <VStack
            gap="space-2"
            className={
                !erMinimert
                    ? 'bg-ax-bg-default fixed inset-0 z-50 overflow-y-auto md:static md:max-h-[calc(100vh-100px)] md:overflow-visible'
                    : undefined
            }
        >
            <Show above="md">
                <Box.New background="accent-soft" padding="4">
                    <VStack gap="space-16">
                        <HStack justify="space-between" align="center" wrap={false}>
                            <RødRamme>
                                <Heading size="xsmall">
                                    <FormattedMessage
                                        id="RedigeringPanel.ValgteDager"
                                        values={{
                                            varighet: getVarighetString(
                                                finnAntallDager(sammenslåtteValgtePerioder),
                                                intl,
                                            ),
                                        }}
                                    />
                                </Heading>
                            </RødRamme>
                            {visPeriodeDetaljer ? (
                                <ChevronUpIcon
                                    title={intl.formatMessage({ id: 'RedigeringPanel.SkjulDetaljer' })}
                                    fontSize="1.5rem"
                                    onClick={() => setVisPeriodeDetaljer(false)}
                                />
                            ) : (
                                <ChevronDownIcon
                                    title={intl.formatMessage({ id: 'RedigeringPanel.VisDetaljer' })}
                                    fontSize="1.5rem"
                                    onClick={() => setVisPeriodeDetaljer(true)}
                                />
                            )}
                        </HStack>
                        {labels}
                        {visPeriodeDetaljer && <PeriodeDetaljerOgInfoMeldinger />}
                    </VStack>
                </Box.New>
            </Show>

            <Show below="md">
                <VStack gap="space-12">
                    <Box.New
                        padding="space-12"
                        onClick={() => setErMinimert(!erMinimert)}
                        className="bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer"
                    >
                        <VStack gap="space-4" align="center">
                            {erMinimert ? (
                                <ChevronUpIcon
                                    title={intl.formatMessage({ id: 'RedigeringPanel.Maksimer' })}
                                    height={24}
                                    width={24}
                                />
                            ) : (
                                <ChevronDownIcon
                                    title={intl.formatMessage({ id: 'RedigeringPanel.Minimer' })}
                                    height={24}
                                    width={24}
                                />
                            )}

                            <HStack>
                                <RødRamme>
                                    <Heading size="xsmall">
                                        <FormattedMessage
                                            id="RedigeringPanel.ValgteDager"
                                            values={{
                                                varighet: getVarighetString(
                                                    finnAntallDager(sammenslåtteValgtePerioder),
                                                    intl,
                                                ),
                                            }}
                                        />
                                    </Heading>
                                </RødRamme>
                            </HStack>
                        </VStack>
                    </Box.New>
                    {!erMinimert && (
                        <VStack gap="space-16" className="px-4 pb-4">
                            {labels}
                            <PeriodeDetaljerOgInfoMeldinger />
                        </VStack>
                    )}
                </VStack>
            </Show>

            <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <div className={erMinimert ? 'hidden' : 'block'}>
                    <div className="px-4 pt-4 pb-4">
                        {gyldigeKontotyper.length === 0 && (
                            <VStack gap="space-16">
                                <Alert variant="info" role="alert">
                                    <FormattedMessage id="LeggTilPeriodePanel.IngenGyldigeKontotyper" />
                                </Alert>
                                <div>
                                    <Button type="button" variant="secondary" onClick={lukkRedigeringsmodus}>
                                        <FormattedMessage id="uttaksplan.gåTilbake" />
                                    </Button>
                                </div>
                            </VStack>
                        )}
                        {gyldigeKontotyper.length > 0 && (
                            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                                <VStack gap="space-16">
                                    {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
                                    <KontotypeSpørsmål
                                        gyldigeKontotyper={gyldigeKontotyper}
                                        skalViseTittel={false}
                                        harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato={
                                            harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato
                                        }
                                    />
                                    {!aleneOmOmsorg && !harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato && (
                                        <SamtidigUttakSpørsmål />
                                    )}
                                    <GraderingSpørsmål />
                                    <PanelButtons
                                        onCancel={lukkRedigeringsmodus}
                                        isFinalStep={true}
                                        addButtonText={intl.formatMessage({ id: 'LeggTilPeriodePanel.LeggTil' })}
                                    />
                                </VStack>
                            </RhfForm>
                        )}
                    </div>
                </div>
            </div>
        </VStack>
    );
};

const getForelderFraKontoType = (
    kontotype: KontoTypeUttak | undefined,
    foreldre: BrukerRolleSak_fpoversikt | undefined,
): BrukerRolleSak_fpoversikt | undefined => {
    switch (kontotype) {
        case 'FEDREKVOTE':
            return 'FAR_MEDMOR';
        case 'MØDREKVOTE':
        case 'FORELDREPENGER_FØR_FØDSEL':
            return 'MOR';
        default:
            return foreldre;
    }
};

const useGyldigeKontotyper = (valgtePerioder: CalendarPeriod[]) => {
    const { valgtStønadskonto } = useUttaksplanData();

    const { erKontotypeGyldigForPerioder } = usePeriodeValidator(valgtePerioder);

    return valgtStønadskonto.kontoer.map((k) => k.konto).filter((kt) => erKontotypeGyldigForPerioder(kt));
};

const lagDefaultValues = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod): FormValues | undefined => {
    const eksisterendePeriode = uttaksplan.find(
        (periode) =>
            dayjs(periode.fom).isSame(dayjs(valgtPeriode.fom), 'day') &&
            dayjs(periode.tom).isSame(dayjs(valgtPeriode.tom), 'day'),
    );

    if (!eksisterendePeriode || eksisterendePeriode.erAnnenPartEøs) {
        return undefined;
    }

    return {
        kontoType:
            eksisterendePeriode.kontoType === 'FORELDREPENGER' &&
            !eksisterendePeriode.erAnnenPartEøs &&
            eksisterendePeriode.morsAktivitet === 'IKKE_OPPGITT'
                ? 'AKTIVITETSFRI_KVOTE'
                : eksisterendePeriode.kontoType,
        forelder: eksisterendePeriode.forelder,
        skalDuJobbe: !!eksisterendePeriode.gradering,
        stillingsprosent: eksisterendePeriode.gradering?.arbeidstidprosent.toString(),
        samtidigUttak: !!eksisterendePeriode.samtidigUttak,
        samtidigUttaksprosent: eksisterendePeriode.samtidigUttak?.toString(),
    };
};
