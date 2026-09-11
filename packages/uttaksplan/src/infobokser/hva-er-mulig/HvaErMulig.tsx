import { PencilWritingIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { AktivitetskravFar } from './tekster/AktivitetskravFar';
import { DetteKanIkkeEndres } from './tekster/DetteKanIkkeEndres';
import { FarFellesperiode } from './tekster/FarFellesperiode';
import { ForeldrepengerSamtidig } from './tekster/ForeldrepengerSamtidig';
import { FpMedKrav } from './tekster/FpMedKrav';
import { FpUtenKrav } from './tekster/FpUtenKrav';
import { JobbeSamtidig } from './tekster/JobbeSamtidig';
import { LeggeTilFerie } from './tekster/LeggeTilFerie';
import { LeggeTilPause } from './tekster/LeggeTilPause';
import { Omsorgspermisjon } from './tekster/Omsorgspermisjon';
import { ToUkerRundtFødsel } from './tekster/ToUkerRundtFødsel';

interface Props {
    erFarOgFar: boolean;
    loggExpansionCardOpen: (tittel: string) => (open: boolean) => void;
}

export const HvaErMulig = ({ loggExpansionCardOpen, erFarOgFar }: Props) => {
    const {
        familiesituasjon,
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();

    const erAlene = rettighetType === 'ALENEOMSORG';

    const kunEnPartSkalHa = rettighetType !== 'BEGGE_RETT';

    const kunSøker2SkalHa = kunEnPartSkalHa && søker === 'FAR_MEDMOR';

    return (
        <ExpansionCard
            aria-label="Expansion card"
            onToggle={loggExpansionCardOpen('toggle-tilpasse-planen')}
            size="small"
        >
            <ExpansionCard.Header>
                <HStack gap="space-24" align="center" wrap={false}>
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <PencilWritingIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="HvaErMulig.Tittel" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="space-20">
                    <Heading size="small">
                        <FormattedMessage id="HvaErMulig.MyeDuKanEndre" />
                    </Heading>
                    {familiesituasjon !== 'adopsjon' && (
                        <>
                            {kunSøker2SkalHa ? (
                                <>
                                    <FpUtenKrav />
                                    <FpMedKrav />
                                    <LeggeTilPause />
                                    <LeggeTilFerie />
                                    <ToUkerRundtFødsel erFarOgFar={erFarOgFar} />
                                    <JobbeSamtidig />
                                </>
                            ) : (
                                <>
                                    {!erFarOgFar && <DetteKanIkkeEndres erFarOgFar={erFarOgFar} />}
                                    {erFarOgFar && <ToUkerRundtFødsel erFarOgFar={erFarOgFar} />}
                                    {erFarOgFar && !kunEnPartSkalHa && <AktivitetskravFar />}

                                    <LeggeTilFerie />

                                    {!kunEnPartSkalHa && !erFarOgFar && <FarFellesperiode erFarOgFar={erFarOgFar} />}

                                    <JobbeSamtidig />

                                    {!erAlene && !kunEnPartSkalHa && (
                                        <ForeldrepengerSamtidig erFarOgFar={erFarOgFar} />
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {familiesituasjon === 'adopsjon' && (
                        <>
                            {!kunEnPartSkalHa && <FarFellesperiode erFarOgFar={erFarOgFar} />}

                            <LeggeTilFerie />

                            <JobbeSamtidig />
                            <Omsorgspermisjon />

                            {(!erAlene || !erFarOgFar) && !kunEnPartSkalHa && (
                                <ForeldrepengerSamtidig erFarOgFar={erFarOgFar} />
                            )}
                        </>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
