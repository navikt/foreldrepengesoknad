import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { BodyShort, HGrid, HStack, Heading, Hide, Show } from '@navikt/ds-react';

import { Tidsperioden, formatDateShortMonth } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { ISOStringToDate, getVarighetString } from '../../utils/dateUtils';
import { finnBakgrunnsfarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
    isOpen: boolean;
}

export const PeriodeListeHeader = ({ permisjonsperiode, erFamiliehendelse, isOpen }: Props) => {
    const intl = useIntl();

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));
    const familiesituasjon = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIESITUASJON));
    console.log(navnPåForeldre);
    const { tidsperiode } = permisjonsperiode;

    const antallDager = Tidsperioden({
        fom: ISOStringToDate(tidsperiode.fom)!,
        tom: ISOStringToDate(tidsperiode.tom)!,
    }).getAntallUttaksdager();

    const erPermisjonsperiodeTilbakeITid = dayjs(
        erFamiliehendelse ? permisjonsperiode.tidsperiode.fom : permisjonsperiode.tidsperiode.tom,
    ).isBefore(new Date());

    const tekst = getTekst(
        intl,
        permisjonsperiode,
        erFarEllerMedmor,
        navnPåForeldre,
        familiesituasjon,
        erFamiliehendelse,
    );

    return (
        <HGrid columns={{ xs: '4fr 4fr 1fr 1fr', md: '3fr 3fr 3fr 1fr' }}>
            <div
                className={`ax-sm:px-2 ax-md:px-4 px-1 py-2 ${erPermisjonsperiodeTilbakeITid ? 'opacity-75' : 'opacity-100'}`}
            >
                <Heading size="xsmall" as="p">
                    {erFamiliehendelse
                        ? formatDateShortMonth(familiehendelsedato)
                        : `${formatDateShortMonth(permisjonsperiode.tidsperiode.fom)} - ${formatDateShortMonth(permisjonsperiode.tidsperiode.tom)}`}
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
                            permisjonsperiode,
                            erFamiliehendelse,
                        )}`
                    }
                >
                    <HStack flexGrow="1" justify={{ xs: 'center', md: 'space-between' }} wrap={false} gap="space-4">
                        <Show above="md">
                            <BodyShort>{tekst}</BodyShort>
                        </Show>
                        <div className="flex items-center">
                            {getIkon(permisjonsperiode, familiehendelsedato, erFamiliehendelse)}
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
