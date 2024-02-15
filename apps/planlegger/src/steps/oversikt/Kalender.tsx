import { Box, HStack, Heading, VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import dayjs from 'dayjs';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';
import localeData from 'dayjs/plugin/localeData';
import { bemUtils } from '@navikt/fp-common';
import './kalender.css';
dayjs.extend(localeData);
dayjs.locale('nb');

const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const hentMånedOgDager = (måned: number, termindato: string): { månednavn: string; dager: number } => {
    const dato = dayjs(termindato).subtract(3, 'weeks').add(måned, 'month');
    const dager = dato.daysInMonth();
    return { månednavn: capitalize(dato.format('MMMM')), dager };
};

const Kalender = () => {
    const bem = bemUtils('kalender');
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const mapBarn = (omBarnet: OmBarnet) => {
        if (erBarnetIkkeFødt(omBarnet)) {
            return {
                termindato: omBarnet.termindato,
            };
        }
        throw Error('Det er feil i data om barnet');
    };
    const termindato = mapBarn(omBarnet).termindato;

    const treUkerFørTerminDato = dayjs(termindato).subtract(3, 'weeks').startOf('day').format('DD.MM.YYYY');
    const sluttdato49 = dayjs(treUkerFørTerminDato).add(46, 'weeks').format('DD.MM.YYYY');
    const year = dayjs(termindato).year();
    console.log('termindato: ', termindato);
    console.log('tre uker før: ', treUkerFørTerminDato);
    console.log('sluttdato: ', sluttdato49);

    const alleMånederOgDager = [];
    for (let i = 0; i < 20; i++) {
        alleMånederOgDager.push(hentMånedOgDager(i, termindato));
    }
    const brukt = (month: number, day: number) => {
        const dato = dayjs(new Date(2022, month, day));
        console.log('dato: ', dato);

        if (dato.isBetween(treUkerFørTerminDato, sluttdato49, 'day', '[]')) {
            return bem.element('brukt');
        }

        return undefined;
    };

    function getMånednummer(månednavn: string): number {
        switch (månednavn) {
            case 'Januar':
                return 1;
            case 'Februar':
                return 2;
            case 'Mars':
                return 3;
            case 'April':
                return 4;
            case 'Mai':
                return 5;
            case 'Juni':
                return 6;
            case 'Juli':
                return 7;
            case 'August':
                return 8;
            case 'September':
                return 9;
            case 'Oktober':
                return 10;
            case 'November':
                return 11;
            case 'Desember':
                return 12;
            default:
                return 0;
        }
    }

    return (
        <VStack gap="5">
            <Heading size="large">{year}</Heading>
            <HStack gap="10">
                <HStack gap="10">
                    {alleMånederOgDager.map((månedOgDager) => (
                        <Box className="kalenderboks">
                            <Heading size="small">{månedOgDager.månednavn}</Heading>
                            <HStack gap="2">
                                {[...Array(månedOgDager.dager).keys()].map((dag) => (
                                    <div className={brukt(getMånednummer(månedOgDager.månednavn), dag + 1)}>
                                        {dag + 1}
                                    </div>
                                ))}
                            </HStack>
                        </Box>
                    ))}
                </HStack>
            </HStack>
        </VStack>
    );
};
export default Kalender;
