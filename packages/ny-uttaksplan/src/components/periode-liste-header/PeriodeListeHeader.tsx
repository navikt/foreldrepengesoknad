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
        <HStack gap="0" wrap={false}>
            <div
                className={`min-w-[60%] md:min-w-[30%] px-4 py-2 ${erPermisjonsperiodeTilbakeITid ? 'opacity-75' : 'opacity-100'}`}
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
            <div className="min-w-[22%] md:min-w-[25%] px-4 py-2">
                {!erFamiliehendelse && <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>}
            </div>
            <div
                className={`min-w-[60px] md:min-w-[38%] p-4 rounded-2xl md:px-4 md:py-2 md:rounded-xl 
                        ${finnBakgrunnsfarge(permisjonsperiode, erFamiliehendelse)}`}
            >
                <HStack justify="space-between" wrap={false}>
                    <Show above="md">
                        <BodyShort>{tekst}</BodyShort>
                    </Show>
                    <div>{getIkon(permisjonsperiode, familiehendelsedato, erFamiliehendelse)}</div>
                </HStack>
            </div>
            <div className="p-4 rounded-[2rem] md:px-4 md:py-2 md:rounded-[1.25rem]">
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
