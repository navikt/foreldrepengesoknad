import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, Hide, Show } from '@navikt/ds-react';

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
        <HStack width="100%" gap="0" wrap={false}>
            <div
                className={`md:min-w-1/4 w-1/2 px-1 xs:px-2 md:px-4 py-2 ${erPermisjonsperiodeTilbakeITid ? 'opacity-75' : 'opacity-100'}`}
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
            <div className="md:min-w-1/4 min-w-[30%] w-1/4 px-1 md:px-4 py-2">
                {!erFamiliehendelse && <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>}
            </div>
            <div className="flex flex-col justify-center md:block">
                <div
                    className={`md:min-w-2/5 md:p-4 min-w-[2rem] rounded-2xl md:px-4 md:py-2 md:rounded-xl w-1/8 
                        md:w-auto md:h-auto flex items-center justify-center m-2 md:m-0 w-10 h-10
                            ${finnBakgrunnsfarge(permisjonsperiode, erFamiliehendelse)}`}
                >
                    <HStack justify={{ xs: 'center', md: 'space-between' }} wrap={false} className="sm:p-3 md:p-0">
                        <Show above="md">
                            <BodyShort>{tekst}</BodyShort>
                        </Show>
                        <div>{getIkon(permisjonsperiode, familiehendelsedato, erFamiliehendelse)}</div>
                    </HStack>
                </div>
            </div>
            <div
                className="sm:p-3 rounded-[2rem] md:px-4 md:py-2 md:rounded-[1.25rem] ml-auto  flex items-center justify-center
"
            >
                <div className="flex items-center justify-center w-6 h-6 rounded-2xl bg-ax-bg-accent-moderate">
                    {isOpen ? (
                        <ChevronUpIcon color="var(--ax-bg-accent-strong)" />
                    ) : (
                        <ChevronDownIcon color="var(--ax-bg-accent-strong)" />
                    )}
                </div>
            </div>
        </HStack>
    );
};
