import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { BodyShort, HGrid, HStack, Heading, Hide, Show } from '@navikt/ds-react';

import { TidsperiodenString, formatDateShortMonth } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode } from '../../types/UttaksplanPeriode';
import { getVarighetString } from '../../utils/dateUtils';
import { getFørsteUttaksplanperiodeFom, getSisteUttaksplanperiodeTom } from '../uttaksplanperiodeUtils';
import { finnBakgrunnsfarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';

interface Props {
    uttaksplanperioder: Uttaksplanperiode[];
    erFamiliehendelse?: boolean;
    isOpen: boolean;
}

export const PeriodeListeHeader = ({ uttaksplanperioder, erFamiliehendelse, isOpen }: Props) => {
    const intl = useIntl();

    const { familiehendelsedato, foreldreInfo, familiesituasjon } = useUttaksplanData();

    const førsteFom = getFørsteUttaksplanperiodeFom(uttaksplanperioder);
    const sisteTom = getSisteUttaksplanperiodeTom(uttaksplanperioder);

    const antallDager = TidsperiodenString({
        fom: førsteFom,
        tom: sisteTom,
    }).getAntallUttaksdager();

    const erPermisjonsperiodeTilbakeITid = dayjs(erFamiliehendelse ? førsteFom : sisteTom).isBefore(
        dayjs().startOf('day'),
    );

    const tekst = getTekst(
        intl,
        uttaksplanperioder,
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR',
        foreldreInfo.navnPåForeldre,
        familiesituasjon,
        foreldreInfo.rettighetType === 'BEGGE_RETT',
        erFamiliehendelse,
    );

    return (
        <HGrid
            columns={{ xs: '4fr 4fr 1fr 1fr', md: '3fr 3fr 3fr 1fr' }}
            data-testid={
                erFamiliehendelse ? `${familiehendelsedato} - ${familiehendelsedato}` : `${førsteFom} - ${sisteTom}`
            }
        >
            <div className={`px-4 py-2 ${erPermisjonsperiodeTilbakeITid ? 'opacity-75' : 'opacity-100'}`}>
                <Heading size="xsmall" as="p">
                    {erFamiliehendelse
                        ? formatDateShortMonth(familiehendelsedato)
                        : `${formatDateShortMonth(førsteFom)} - ${formatDateShortMonth(sisteTom)}`}
                </Heading>
                <Hide above="md">
                    <BodyShort>{tekst}</BodyShort>
                </Hide>
            </div>
            <div className="ax-md:px-4 px-1 py-2">
                {!erFamiliehendelse && <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>}
            </div>
            <div className="ax-md:grow flex w-full flex-col justify-center">
                <div
                    className={
                        `ax-md:m-0 ax-md:h-auto ax-md:w-full ax-md:rounded-xl ax-md:px-4 ax-md:py-2` +
                        ` m-2 flex h-12 w-12 justify-between rounded-2xl ${finnBakgrunnsfarge(
                            uttaksplanperioder,
                            erFamiliehendelse,
                        )}`
                    }
                >
                    <HStack flexGrow="1" justify={{ xs: 'center', md: 'space-between' }} wrap={false} gap="space-4">
                        <Show above="md">
                            <BodyShort>{tekst}</BodyShort>
                        </Show>
                        <div className="flex items-center">
                            {getIkon(uttaksplanperioder, familiehendelsedato, erFamiliehendelse)}
                        </div>
                    </HStack>
                </div>
            </div>
            <div className="ax-md:px-4 ax-md:py-2 flex items-center justify-center p-3">
                <div className="bg-ax-bg-accent-moderate flex h-6 w-6 items-center justify-center rounded-2xl">
                    {isOpen ? (
                        <ChevronUpIcon color="var(--ax-bg-accent-strong)" />
                    ) : (
                        <ChevronDownIcon color="var(--ax-bg-accent-strong)" />
                    )}
                </div>
            </div>
        </HGrid>
    );
};
