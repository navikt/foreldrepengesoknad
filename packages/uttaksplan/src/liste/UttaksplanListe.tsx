import {
    ArrowCirclepathReverseIcon,
    ArrowUndoIcon,
    ChevronDownIcon,
    NotePencilDashIcon,
    NotePencilIcon,
    PlusIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ActionMenu, Alert, BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';
import { Uttaksplanperiode } from '../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDagerOgPerioderUtenUttak } from '../utils/lagHullPerioder';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '../utils/periodeUtils';
import { LeggTilEllerEndrePeriodeListPanel } from './legg-til-endre-periode-panel/LeggTilEllerEndrePeriodeListPanel';
import { PeriodeListeItem } from './periode-liste-item/PeriodeListeItem';
import { mapUttaksplanperioderTilRaderIListe } from './utils/mapUttaksplanperioderTilRaderIListe';
import { getFørsteUttaksplanperiodeFom, getSisteUttaksplanperiodeTom } from './utils/uttaksplanperiodeUtils';

interface Props {
    isReadOnly: boolean;
}

export const UttaksplanListe = ({ isReadOnly }: Props) => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const {
        uttakPerioder,
        familiehendelsedato,
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const uttakPerioderJustertForFamiliehendelsesdato = uttakPerioder.flatMap((periode) =>
        splittPeriodePåFamiliehendelsesdato(periode, familiehendelsedato),
    );

    const uttakPerioderInkludertHull = useAlleUttakPerioderInklTapteDagerOgPerioderUtenUttak(
        uttakPerioderJustertForFamiliehendelsesdato,
    );

    const [isAllAccordionsOpen, setIsAllAccordionsOpen] = useState(false);

    const toggleAllAccordions = () => {
        setIsAllAccordionsOpen(!isAllAccordionsOpen);
    };

    const uttaksplanperioderPerRadIListe = mapUttaksplanperioderTilRaderIListe(
        uttakPerioderInkludertHull,
        familiehendelsedato,
    );

    const alleRader = leggTilPeriodeForFamiliehendelsedato(uttaksplanperioderPerRadIListe, familiehendelsedato);

    const harMorsAktivitetIkkeErValgt = harPeriodeDerMorsAktivitetIkkeErValgt(
        rettighetType,
        uttakPerioderJustertForFamiliehendelsesdato,
    );

    return (
        <VStack gap="space-16">
            {harMorsAktivitetIkkeErValgt && (
                <Alert variant="warning">
                    <FormattedMessage id="UttaksplanListe.ManglerMorsAktivitet" />
                </Alert>
            )}
            {uttakPerioder.length > 0 && (
                <div>
                    {alleRader.map((uttaksplanperioderForRad) => {
                        return (
                            <PeriodeListeItem
                                key={`${getFørsteUttaksplanperiodeFom(uttaksplanperioderForRad)}-${getSisteUttaksplanperiodeTom(uttaksplanperioderForRad)}`}
                                isReadOnly={isReadOnly}
                                uttaksplanperioder={uttaksplanperioderForRad}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                        );
                    })}
                </div>
            )}
            {uttakPerioder.length === 0 && (
                <HStack gap="space-12">
                    <NotePencilDashIcon fontSize={24} />
                    <VStack gap="space-8">
                        <BodyShort weight="semibold" size="large">
                            <FormattedMessage id="uttaksplan.ingenPerioder.tittel" />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.ingenPerioder.body" />
                        </BodyShort>
                    </VStack>
                </HStack>
            )}
            {uttaksplanRedigering && (
                <HStack gap="space-16" justify="space-between" wrap>
                    <HStack gap="space-16">
                        <Button
                            size="small"
                            variant="secondary"
                            data-color="neutral"
                            onClick={
                                uttaksplanRedigering.uttaksplanVersjoner.length > 0
                                    ? () => uttaksplanRedigering.angreSisteEndring()
                                    : undefined
                            }
                            disabled={uttaksplanRedigering.uttaksplanVersjoner.length === 0}
                        >
                            <VStack gap="space-4" align="center">
                                <ArrowUndoIcon aria-hidden height={24} width={24} />
                                <FormattedMessage id="UttaksplanHandlingKnapper.Angre" />
                            </VStack>
                        </Button>
                        <Button
                            size="small"
                            variant="secondary"
                            data-color="danger"
                            onClick={() => uttaksplanRedigering.setVisFjernAltModal(true)}
                            aria-haspopup="dialog"
                            aria-expanded={uttaksplanRedigering.visFjernAltModal}
                            aria-controls={
                                uttaksplanRedigering.visFjernAltModal ? 'FjernAltIUttaksplanModal' : undefined
                            }
                        >
                            <VStack gap="space-4" align="center">
                                <TrashIcon aria-hidden height={24} width={24} />
                                <FormattedMessage id="UttaksplanHandlingKnapper.FjernAlt" />
                            </VStack>
                        </Button>
                    </HStack>
                    {uttaksplanRedigering && (
                        <HStack gap="space-16" wrap>
                            <ActionMenu>
                                <ActionMenu.Trigger>
                                    <Button
                                        variant="tertiary"
                                        size="small"
                                        data-color="neutral"
                                        icon={<ChevronDownIcon aria-hidden />}
                                        iconPosition="right"
                                    >
                                        <HStack gap="space-4" align="center">
                                            <NotePencilIcon aria-hidden height={24} width={24} />
                                            <BodyShort size="small">
                                                <FormattedMessage id="UttaksplanHandlingKnapper.EndrePlanen" />
                                            </BodyShort>
                                        </HStack>
                                    </Button>
                                </ActionMenu.Trigger>
                                <ActionMenu.Content className="max-w-65 ax-md:max-w-none" align="end">
                                    <VStack gap="space-16">
                                        <ActionMenu.Item onClick={toggleAllAccordions} style={{ paddingTop: '4px' }}>
                                            <HStack gap="space-8" wrap={false}>
                                                <NotePencilIcon aria-hidden height={24} width={24} color="#3F8047" />
                                                <VStack gap="space-4">
                                                    <BodyShort weight="semibold" size="small">
                                                        <FormattedMessage id="UttaksplanHandlingKnapper.EndreValg" />
                                                    </BodyShort>
                                                    <ActionMenu.Label style={{ paddingLeft: '0', color: '#747A86' }}>
                                                        <FormattedMessage id="UttaksplanHandlingKnapper.EndreValg.Beskrivelse" />
                                                    </ActionMenu.Label>
                                                </VStack>
                                            </HStack>
                                        </ActionMenu.Item>

                                        <ActionMenu.Item
                                            onClick={
                                                uttaksplanRedigering.harEndretPlan
                                                    ? () => uttaksplanRedigering.setVisTilbakestillModal(true)
                                                    : undefined
                                            }
                                            disabled={!uttaksplanRedigering.harEndretPlan}
                                        >
                                            <HStack gap="space-8" wrap={false}>
                                                <ArrowCirclepathReverseIcon
                                                    aria-hidden
                                                    height={24}
                                                    width={24}
                                                    color="#413FC3"
                                                />
                                                <VStack gap="space-4">
                                                    <BodyShort weight="semibold" size="small">
                                                        <FormattedMessage id="UttaksplanHandlingKnapper.Tilbakestill" />
                                                    </BodyShort>
                                                    <ActionMenu.Label style={{ paddingLeft: '0', color: '#747A86' }}>
                                                        <FormattedMessage id="UttaksplanHandlingKnapper.Tilbakestill.Beskrivelse" />
                                                    </ActionMenu.Label>
                                                </VStack>
                                            </HStack>
                                        </ActionMenu.Item>
                                    </VStack>
                                </ActionMenu.Content>
                            </ActionMenu>
                        </HStack>
                    )}
                </HStack>
            )}

            {!isReadOnly && !isLeggTilPeriodePanelOpen && (
                <Button
                    variant="secondary"
                    onClick={() => setIsLeggTilPeriodePanelOpen(true)}
                    icon={<PlusIcon aria-hidden />}
                    style={{ outline: '1px solid var(--ax-border-subtle)', outlineOffset: '-1px' }}
                >
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Button>
            )}
            {isLeggTilPeriodePanelOpen && uttaksplanRedigering && (
                <LeggTilEllerEndrePeriodeListPanel
                    setIsLeggTilPeriodePanelOpen={setIsLeggTilPeriodePanelOpen}
                    erNyPeriodeModus
                    harPeriodeDerMorsAktivitetIkkeErValgt={false}
                />
            )}
        </VStack>
    );
};

const leggTilPeriodeForFamiliehendelsedato = (
    uttaksplanperioderPerRadIListe: Uttaksplanperiode[][],
    familiehendelsedato: string,
): Uttaksplanperiode[][] => {
    return uttaksplanperioderPerRadIListe
        .concat([
            [
                {
                    fom: familiehendelsedato,
                    tom: familiehendelsedato,
                    type: 'FAMILIEHENDELSE',
                },
            ],
        ])
        .sort((gruppeA, gruppeB) => {
            const a = gruppeA[0]!;
            const b = gruppeB[0]!;

            const aFom = dayjs(a.fom);
            const bFom = dayjs(b.fom);

            if (aFom.isBefore(bFom)) {
                return -1;
            }
            if (aFom.isAfter(bFom)) {
                return 1;
            }

            const aTom = dayjs(a.tom);
            const bTom = dayjs(b.tom);

            if (aTom.isBefore(bTom)) {
                return -1;
            }
            if (aTom.isAfter(bTom)) {
                return 1;
            }

            return 0;
        });
};

const splittPeriodePåFamiliehendelsesdato = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsesdato: string,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const fom = dayjs(periode.fom);
    const tom = dayjs(periode.tom);
    const famdato = dayjs(familiehendelsesdato);

    const erPeriodeLikFamiliehendelsesdato = famdato.isSame(fom) && famdato.isSame(tom);

    if (famdato.isBefore(fom) || famdato.isAfter(tom) || erPeriodeLikFamiliehendelsesdato) {
        return [periode];
    }

    const resultat: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> = [];

    if (fom.isBefore(famdato)) {
        resultat.push({
            ...periode,
            fom: periode.fom,
            tom: Uttaksdagen.forrige(familiehendelsesdato).getDato(),
        });
    }

    if (tom.isAfter(famdato)) {
        resultat.push({
            ...periode,
            fom: Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato(),
            tom: periode.tom,
        });
    }

    return resultat;
};
