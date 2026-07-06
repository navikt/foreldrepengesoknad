import { CheckmarkCircleIcon, ChevronDownIcon, ChevronUpIcon, NotePencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, Detail, HStack, Heading, Link, Show, Tag, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { UttaksplanHandlingKnapper } from '../../../felles/UttaksplanHandlingKnapper';
import { getVarighetString } from '../../../utils/dateUtils';
import {
    useTellDagerIUttaksPeriodene,
    useUbrukteDagerPerKontoKunEnHarRett,
} from '../../../utils/kvoteOppsummeringUtils';
import { useErDesktop, useMediaResetMinimering } from '../utils/useMediaActions';

interface Props {
    scrollToKvoteOppsummering: () => void;
    labels: React.ReactNode;
}

export const IngenDagerValgtPanel = ({ scrollToKvoteOppsummering, labels }: Props) => {
    const intl = useIntl();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const erDesktop = useErDesktop();

    const [erMinimert, setErMinimert] = useState(!erDesktop);

    useMediaResetMinimering(setErMinimert);

    return (
        <VStack gap="space-16">
            <Box
                padding="space-12"
                onClick={erDesktop ? undefined : () => setErMinimert(!erMinimert)}
                className={
                    erDesktop
                        ? 'bg-ax-bg-accent-soft'
                        : 'bg-ax-bg-accent-soft hover:bg-ax-bg-accent-moderate cursor-pointer'
                }
            >
                <Show below="md">
                    <VStack gap="space-1" align="center">
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
                        <Heading size="small">
                            <HStack gap="space-4" align="center">
                                <NotePencilIcon aria-hidden height={16} width={16} />
                                <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                            </HStack>
                        </Heading>
                    </VStack>
                </Show>
                <Show above="md">
                    <VStack gap="space-4">
                        <BodyShort size="small">
                            <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                        </BodyShort>
                    </VStack>
                </Show>
            </Box>
            <div style={erMinimert ? { display: 'none' } : undefined}>
                <VStack gap="space-16" className="px-4 pb-4">
                    {labels}
                    <VStack gap="space-8">
                        <PlanStatus />
                        <Link as="button" onClick={scrollToKvoteOppsummering}>
                            <FormattedMessage id="RedigeringKalenderIndex.SeDetaljer" />
                        </Link>
                    </VStack>
                    <UttaksplanHandlingKnapper
                        tilbakestillPlan={
                            uttaksplanRedigering?.harEndretPlan
                                ? () => uttaksplanRedigering.setVisTilbakestillModal(true)
                                : undefined
                        }
                        angreEndring={
                            uttaksplanRedigering && uttaksplanRedigering.uttaksplanVersjoner.length > 0
                                ? () => uttaksplanRedigering.angreSisteEndring()
                                : undefined
                        }
                        visTilbakestillModal={uttaksplanRedigering?.visTilbakestillModal}
                    />
                </VStack>
            </div>
        </VStack>
    );
};

const PlanStatus = () => {
    const tellingData = useTellDagerIUttaksPeriodene();
    const harPerioderSomKanLeggesTil = useHarPerioderSomKanLeggesTil(tellingData);
    const harLagtTilForMye = useHarLagtTilForMye(tellingData);

    if (!harPerioderSomKanLeggesTil && !harLagtTilForMye) {
        return <AlleDagerLagtTilBoks />;
    }

    return (
        <VStack gap="space-12">
            {harPerioderSomKanLeggesTil && (
                <VStack gap="space-4">
                    <Detail uppercase style={{ letterSpacing: '1.05px' }}>
                        <FormattedMessage id="IngenDagerValgtPanel.PerioderSomKanLeggesTil" />
                    </Detail>
                    <PerioderSomKanLeggesTilTags />
                </VStack>
            )}
            {harLagtTilForMye && <LagtTilForMyeTags />}
        </VStack>
    );
};

const AlleDagerLagtTilBoks = () => (
    <Box
        padding="space-12"
        borderRadius="8"
        borderWidth="1"
        className="bg-ax-bg-success-soft border-ax-border-success"
    >
        <HStack gap="space-8" align="start" wrap={false}>
            <CheckmarkCircleIcon className="text-ax-text-success shrink-0" fontSize="1.5rem" aria-hidden />
            <BodyShort size="small">
                <FormattedMessage id="IngenDagerValgtPanel.AlleDagerLagtTil" />
            </BodyShort>
        </HStack>
    </Box>
);

const LagtTilForMyeTags = () => {
    const intl = useIntl();
    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    return (
        <VStack gap="space-4">
            <Detail uppercase style={{ letterSpacing: '1.05px' }}>
                <FormattedMessage id="IngenDagerValgtPanel.LagtTilForMyeTittel" />
            </Detail>
            {rettighetType === 'BEGGE_RETT' ? (
                <ForMyeTagsBeggeRett erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} intl={intl} />
            ) : søker === 'FAR_MEDMOR' ? (
                <ForMyeTagsKunFar intl={intl} />
            ) : (
                <ForMyeTagsKunMor intl={intl} />
            )}
        </VStack>
    );
};

const ForMyeTagsBeggeRett = ({
    erMedmorDelAvSøknaden,
    intl,
}: {
    erMedmorDelAvSøknaden: boolean;
    intl: ReturnType<typeof useIntl>;
}) => {
    const { ubrukteDagerMor, ubrukteDagerFar, ubrukteDagerFelles } = useTellDagerIUttaksPeriodene();

    const tags = [
        ubrukteDagerMor < 0 && (
            <Tag key="mor" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeMor"
                    values={{ varighet: getVarighetString(ubrukteDagerMor * -1, intl) }}
                />
            </Tag>
        ),
        ubrukteDagerFar < 0 && (
            <Tag key="far" variant="error" size="small">
                {erMedmorDelAvSøknaden ? (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.LagtTilForMyeMedmor"
                        values={{ varighet: getVarighetString(ubrukteDagerFar * -1, intl) }}
                    />
                ) : (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.LagtTilForMyeFar"
                        values={{ varighet: getVarighetString(ubrukteDagerFar * -1, intl) }}
                    />
                )}
            </Tag>
        ),
        ubrukteDagerFelles < 0 && (
            <Tag key="felles" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeFellesperiode"
                    values={{ varighet: getVarighetString(ubrukteDagerFelles * -1, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const ForMyeTagsKunFar = ({ intl }: { intl: ReturnType<typeof useIntl> }) => {
    const { overtrukketDagerAktivitetsfri, overtrukketDagerMedAktivitetskrav } = useUbrukteDagerPerKontoKunEnHarRett();

    const tags = [
        overtrukketDagerAktivitetsfri > 0 && (
            <Tag key="aktivitetsfri" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeUtenAktivitetskrav"
                    values={{ varighet: getVarighetString(overtrukketDagerAktivitetsfri, intl) }}
                />
            </Tag>
        ),
        overtrukketDagerMedAktivitetskrav > 0 && (
            <Tag key="medAktivitetskrav" variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMyeMedAktivitetskrav"
                    values={{ varighet: getVarighetString(overtrukketDagerMedAktivitetskrav, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const ForMyeTagsKunMor = ({ intl }: { intl: ReturnType<typeof useIntl> }) => {
    const { antallOvertrukketDager } = useTellDagerIUttaksPeriodene();
    const { overtrukketDagerAktivitetsfri, overtrukketDagerMedAktivitetskrav } = useUbrukteDagerPerKontoKunEnHarRett();

    const totalOvertrukket =
        antallOvertrukketDager > 0
            ? antallOvertrukketDager
            : overtrukketDagerAktivitetsfri + overtrukketDagerMedAktivitetskrav;

    if (totalOvertrukket <= 0) {
        return null;
    }

    return (
        <HStack gap="space-4">
            <Tag variant="error" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.LagtTilForMye"
                    values={{ varighet: getVarighetString(totalOvertrukket, intl) }}
                />
            </Tag>
        </HStack>
    );
};

const useHarPerioderSomKanLeggesTil = ({
    ubrukteDagerMor,
    ubrukteDagerFar,
    ubrukteDagerFelles,
    antallUbrukteDager,
}: ReturnType<typeof useTellDagerIUttaksPeriodene>) => {
    const {
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();
    const { ubrukteDagerAktivitetsfri, ubrukteDagerMedAktivitetskrav } = useUbrukteDagerPerKontoKunEnHarRett();

    if (rettighetType === 'BEGGE_RETT') {
        return ubrukteDagerMor > 0 || ubrukteDagerFar > 0 || ubrukteDagerFelles > 0;
    }
    if (søker === 'FAR_MEDMOR') {
        return ubrukteDagerAktivitetsfri > 0 || ubrukteDagerMedAktivitetskrav > 0;
    }
    return antallUbrukteDager > 0 || ubrukteDagerAktivitetsfri + ubrukteDagerMedAktivitetskrav > 0;
};

const useHarLagtTilForMye = ({
    ubrukteDagerMor,
    ubrukteDagerFar,
    ubrukteDagerFelles,
    antallOvertrukketDager,
}: ReturnType<typeof useTellDagerIUttaksPeriodene>) => {
    const {
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();
    const { overtrukketDagerAktivitetsfri, overtrukketDagerMedAktivitetskrav } = useUbrukteDagerPerKontoKunEnHarRett();

    if (rettighetType === 'BEGGE_RETT') {
        return ubrukteDagerMor < 0 || ubrukteDagerFar < 0 || ubrukteDagerFelles < 0;
    }
    if (søker === 'FAR_MEDMOR') {
        return overtrukketDagerAktivitetsfri > 0 || overtrukketDagerMedAktivitetskrav > 0;
    }
    return antallOvertrukketDager > 0 || overtrukketDagerAktivitetsfri + overtrukketDagerMedAktivitetskrav > 0;
};

const PerioderSomKanLeggesTilTags = () => {
    const intl = useIntl();
    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    if (rettighetType === 'BEGGE_RETT') {
        return <TagsBeggeRett erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} intl={intl} />;
    }

    if (søker === 'FAR_MEDMOR') {
        return <TagsKunFar intl={intl} />;
    }

    return <TagsKunMor intl={intl} />;
};

const TagsBeggeRett = ({
    erMedmorDelAvSøknaden,
    intl,
}: {
    erMedmorDelAvSøknaden: boolean;
    intl: ReturnType<typeof useIntl>;
}) => {
    const { ubrukteDagerMor, ubrukteDagerFar, ubrukteDagerFelles } = useTellDagerIUttaksPeriodene();

    const tags = [
        ubrukteDagerMor > 0 && (
            <Tag key="mor" variant="info" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerTilMor"
                    values={{ varighet: getVarighetString(ubrukteDagerMor, intl) }}
                />
            </Tag>
        ),
        ubrukteDagerFar > 0 && (
            <Tag key="far" variant="success" size="small">
                {erMedmorDelAvSøknaden ? (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.UkerTilMedmor"
                        values={{ varighet: getVarighetString(ubrukteDagerFar, intl) }}
                    />
                ) : (
                    <FormattedMessage
                        id="IngenDagerValgtPanel.UkerTilFar"
                        values={{ varighet: getVarighetString(ubrukteDagerFar, intl) }}
                    />
                )}
            </Tag>
        ),
        ubrukteDagerFelles > 0 && (
            <Tag key="felles" variant="neutral" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerFellesperiode"
                    values={{ varighet: getVarighetString(ubrukteDagerFelles, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const TagsKunFar = ({ intl }: { intl: ReturnType<typeof useIntl> }) => {
    const { ubrukteDagerAktivitetsfri, ubrukteDagerMedAktivitetskrav } = useUbrukteDagerPerKontoKunEnHarRett();

    const tags = [
        ubrukteDagerAktivitetsfri > 0 && (
            <Tag key="aktivitetsfri" variant="success" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerUtenAktivitetskrav"
                    values={{ varighet: getVarighetString(ubrukteDagerAktivitetsfri, intl) }}
                />
            </Tag>
        ),
        ubrukteDagerMedAktivitetskrav > 0 && (
            <Tag key="medAktivitetskrav" variant="success" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerMedAktivitetskrav"
                    values={{ varighet: getVarighetString(ubrukteDagerMedAktivitetskrav, intl) }}
                />
            </Tag>
        ),
    ].filter(Boolean);

    if (tags.length === 0) {
        return null;
    }
    return (
        <HStack gap="space-4" wrap>
            {tags}
        </HStack>
    );
};

const TagsKunMor = ({ intl }: { intl: ReturnType<typeof useIntl> }) => {
    const { antallUbrukteDager } = useTellDagerIUttaksPeriodene();
    const { ubrukteDagerAktivitetsfri, ubrukteDagerMedAktivitetskrav } = useUbrukteDagerPerKontoKunEnHarRett();

    const totalUbrukte =
        antallUbrukteDager > 0 ? antallUbrukteDager : ubrukteDagerAktivitetsfri + ubrukteDagerMedAktivitetskrav;

    if (totalUbrukte <= 0) {
        return null;
    }

    return (
        <HStack gap="space-4">
            <Tag variant="info" size="small">
                <FormattedMessage
                    id="IngenDagerValgtPanel.UkerTilMor"
                    values={{ varighet: getVarighetString(totalUbrukte, intl) }}
                />
            </Tag>
        </HStack>
    );
};
