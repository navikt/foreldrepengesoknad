import {
    BriefcaseFillIcon,
    ParasolBeachIcon,
    PersonPregnantFillIcon,
    PersonSuitFillIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types/src/genererteTyper';

import { Planperiode } from '../../types/Planperiode';

export type PlanperiodeMedAntallDager = Planperiode & { overlappendeDager: number };

interface Props {
    perioder: PlanperiodeMedAntallDager[];
    slettPeriode: (periode: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt }) => void;
}

export const EksisterendeValgtePerioder = ({ perioder, slettPeriode }: Props) => {
    const intl = useIntl();

    return (
        <VStack gap="space-12">
            {perioder.map((p) => {
                const erFellesperiodeOgMor =
                    p.kontoType === 'FELLESPERIODE' && !p.erAnnenPartEøs && p.forelder === 'MOR';
                const erFellesperiodeOgFar =
                    p.kontoType === 'FELLESPERIODE' && !p.erAnnenPartEøs && p.forelder === 'FAR_MEDMOR';
                const erForeldrepengerOgMor =
                    p.kontoType === 'FORELDREPENGER' && !p.erAnnenPartEøs && p.forelder === 'MOR';
                const erForeldrepengerOgFar =
                    p.kontoType === 'FORELDREPENGER' && !p.erAnnenPartEøs && p.forelder === 'FAR_MEDMOR';

                return (
                    <HStack
                        gap="space-8"
                        key={p.id}
                        wrap={false}
                        data-testid={`eksisterende-periode-${p.fom}-${p.tom}`}
                    >
                        {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                            p.kontoType === 'MØDREKVOTE' ||
                            erForeldrepengerOgMor ||
                            erFellesperiodeOgMor) && (
                            <PersonPregnantFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Mor' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-meta-purple-strong)"
                            />
                        )}
                        {(p.kontoType === 'FEDREKVOTE' || erFellesperiodeOgFar || erForeldrepengerOgFar) && (
                            <PersonSuitFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Far' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-success-strong)"
                            />
                        )}
                        {!p.erAnnenPartEøs && p.utsettelseÅrsak === 'LOVBESTEMT_FERIE' && (
                            <ParasolBeachIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Ferie' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-warning-strong)"
                            />
                        )}
                        {!p.erAnnenPartEøs && p.utsettelseÅrsak === 'ARBEID' && (
                            <BriefcaseFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Arbeid' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-info-strong)"
                            />
                        )}
                        <VStack gap="space-0">
                            {(p.erAnnenPartEøs || p.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') && (
                                <Heading size="xsmall">
                                    {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                                        p.kontoType === 'MØDREKVOTE' ||
                                        erFellesperiodeOgMor ||
                                        erForeldrepengerOgMor) && <FormattedMessage id="RedigeringPanel.Mor" />}
                                    {(p.kontoType === 'FEDREKVOTE' ||
                                        erFellesperiodeOgFar ||
                                        erForeldrepengerOgFar) && <FormattedMessage id="RedigeringPanel.Far" />}
                                    {!p.erAnnenPartEøs &&
                                        p.kontoType === undefined &&
                                        p.utsettelseÅrsak !== undefined &&
                                        p.forelder === 'MOR' && <FormattedMessage id="RedigeringPanel.Mor" />}
                                    {!p.erAnnenPartEøs &&
                                        p.kontoType === undefined &&
                                        p.utsettelseÅrsak !== undefined &&
                                        p.forelder === 'FAR_MEDMOR' && <FormattedMessage id="RedigeringPanel.Far" />}
                                </Heading>
                            )}
                            <BodyShort>
                                {p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' && (
                                    <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />
                                )}
                                {p.kontoType === 'MØDREKVOTE' && <FormattedMessage id="RedigeringPanel.MorKvote" />}
                                {p.kontoType === 'FEDREKVOTE' && <FormattedMessage id="RedigeringPanel.FarKvote" />}
                                {p.kontoType === 'FORELDREPENGER' && (
                                    <FormattedMessage id="RedigeringPanel.Foreldrepenger" />
                                )}
                                {p.kontoType === 'FELLESPERIODE' && (
                                    <FormattedMessage id="RedigeringPanel.Fellesperiode" />
                                )}
                                {!p.erAnnenPartEøs && p.utsettelseÅrsak === 'LOVBESTEMT_FERIE' && (
                                    <FormattedMessage id="RedigeringPanel.Ferie" />
                                )}
                                {!p.erAnnenPartEøs && p.utsettelseÅrsak === 'ARBEID' && (
                                    <FormattedMessage id="RedigeringPanel.Arbeid" />
                                )}
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="RedigeringPanel.Dager" values={{ antall: p.overlappendeDager }} />
                            </BodyShort>
                        </VStack>
                        <Spacer />
                        <TrashIcon
                            title={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                            fontSize="1.5rem"
                            className="cursor-pointer hover:opacity-70"
                            onClick={() => slettPeriode(p)}
                        />
                    </HStack>
                );
            })}
        </VStack>
    );
};
