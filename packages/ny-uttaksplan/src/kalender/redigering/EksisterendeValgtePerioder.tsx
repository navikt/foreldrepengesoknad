import { PersonGroupIcon, PersonPregnantFillIcon, PersonSuitFillIcon, TrashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { getFomPeriodeUtenUttakValidator } from '../../utils/dateFomValidators';
import { getTomPeriodeUtenUttakValidator } from '../../utils/dateTomValidators';

export type PlanperiodeMedAntallDager = Planperiode & { overlappendeDager: number };

interface Props {
    perioder: PlanperiodeMedAntallDager[];
    slettPeriode: (periode: { fom: string; tom: string }) => void;
}

export const EksisterendeValgtePerioder = ({ perioder, slettPeriode }: Props) => {
    const intl = useIntl();
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const periodeUtenUttakFomValidatorer = getFomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon);
    const periodeUtenUttakTomValidatorer = getTomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon);

    return (
        <VStack gap="space-12">
            {perioder.map((p) => {
                const erPeriodeSlettbar =
                    periodeUtenUttakFomValidatorer(p.fom) === null && periodeUtenUttakTomValidatorer(p.tom) === null;

                return (
                    <HStack gap="space-4" key={p.id} wrap={false}>
                        {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' || p.kontoType === 'MØDREKVOTE') && (
                            <PersonPregnantFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Mor' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-meta-purple-strong)"
                            />
                        )}
                        {p.kontoType === 'FEDREKVOTE' && (
                            <PersonSuitFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Far' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-success-strong)"
                            />
                        )}
                        {p.kontoType === 'FELLESPERIODE' && (
                            <PersonGroupIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Felles' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-success-strong)"
                            />
                        )}
                        <VStack gap="space-0">
                            <Heading size="xsmall">
                                {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' || p.kontoType === 'MØDREKVOTE') && (
                                    <FormattedMessage id="RedigeringPanel.Mor" />
                                )}
                                {p.kontoType === 'FEDREKVOTE' && <FormattedMessage id="RedigeringPanel.Far" />}
                                {p.kontoType === 'FELLESPERIODE' && <FormattedMessage id="RedigeringPanel.Felles" />}
                                {p.utsettelseÅrsak === 'LOVBESTEMT_FERIE' && (
                                    <FormattedMessage id="RedigeringPanel.Ferie" />
                                )}
                            </Heading>
                            <BodyShort>
                                {p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' && (
                                    <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />
                                )}
                                {(p.kontoType === 'MØDREKVOTE' || p.kontoType === 'FEDREKVOTE') && (
                                    <FormattedMessage id="RedigeringPanel.Foreldrepenger" />
                                )}
                                {p.kontoType === 'FELLESPERIODE' && (
                                    <FormattedMessage id="RedigeringPanel.Fellesperiode" />
                                )}
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage
                                    id="RedigeringPanel.Dager"
                                    values={{ dato: formaterDato(p.fom, p.tom), antall: p.overlappendeDager }}
                                />
                            </BodyShort>
                        </VStack>
                        <Spacer />
                        {erPeriodeSlettbar && (
                            <TrashIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                                fontSize="1.5rem"
                                className="cursor-pointer hover:opacity-70"
                                onClick={() => slettPeriode(p)}
                            />
                        )}
                    </HStack>
                );
            })}
        </VStack>
    );
};

const formaterDato = (fom: string, tom: string): string => {
    const start = dayjs(fom);
    const end = dayjs(tom);

    const sameDay = start.isSame(end, 'day');
    const sameMonth = start.isSame(end, 'month');
    const sameYear = start.isSame(end, 'year');

    if (sameDay) {
        return start.format('D. MMM YYYY.');
    }

    if (sameMonth && sameYear) {
        return `${start.format('D.')}-${end.format('D. MMM.')}`;
    }

    if (!sameMonth && sameYear) {
        return `${start.format('D. MMM')} - ${end.format('D. MMM.')}`;
    }

    return `${start.format('D. MMM YY')} - ${end.format('D. MMM YY.')}`;
};
