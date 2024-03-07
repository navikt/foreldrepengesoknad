import { CalendarIcon, SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { erBarnetIkkeFødt } from 'types/Barnet';
import { Fellesperiodefordeling, Fordeling } from 'types/Fordeling';
import {
    HvemPlanlegger,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    isAlene,
    isFar,
    isFarOgFar,
    isMor,
    isMorOgFar,
    isMorOgMedmor,
} from 'types/HvemPlanlegger';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { BodyLong, Heading, VStack } from '@navikt/ds-react';

import { Dekningsgrad, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-common';
import { Form, Select, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';

const finnSøkerTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    isMorOgFar(hvemPlanlegger) || isMorOgMedmor(hvemPlanlegger) || isMor(hvemPlanlegger)
        ? intl.formatMessage({ id: 'FlereForsørgere.Mor' })
        : intl.formatMessage({ id: 'FlereForsørgere.Far' });

const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Medmor' });
    }
    if (isFar(hvemPlanlegger) || isFarOgFar(hvemPlanlegger) || isMorOgFar(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Far' });
    }
    return undefined;
};

export const getFellesperiodefordelingOptionValues = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [{ id: 0, antallUkerSøker1: undefined, antallUkerSøker2: undefined }] as Fellesperiodefordeling[];
    console.log(antallUkerFellesperiode);

    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        const value = { id: i + 1, antallUkerSøker2: antallUkerFellesperiode - i, antallUkerSøker1: i };
        values.push(value);
    }
    return values;
};

export const getFellesperiodefordelingSelectOptions = (
    intl: IntlShape,
    selectValues: Fellesperiodefordeling[],
    hvemPlanlegger: HvemPlanlegger,
) => {
    const søkerTekst = finnSøkerTekst(intl, hvemPlanlegger);
    const annenPartTekst = finnAnnenPartTekst(intl, hvemPlanlegger);

    const options = selectValues.map((value) => {
        if (value.antallUkerSøker1 === undefined && value.antallUkerSøker2 === undefined) {
            return <option key={value.id} value={value.id}></option>;
        }
        if (value.antallUkerSøker1 === 0) {
            return (
                <option key={value.id} value={value.id}>
                    <FormattedMessage
                        id="periode.fordelingOptionAlt"
                        values={{ hvem: annenPartTekst, uker: value.antallUkerSøker2 }}
                    />
                </option>
            );
        }
        if (value.antallUkerSøker2 === 0) {
            return (
                <option key={value.id} value={value.id}>
                    <FormattedMessage
                        id="periode.fordelingOptionAlt"
                        values={{ hvem: søkerTekst, uker: value.antallUkerSøker1 }}
                    />
                </option>
            );
        }
        return (
            <option key={value.id} value={value.id}>
                <FormattedMessage
                    id="periode.fordelingOptions"
                    values={{
                        hvem: søkerTekst,
                        hvem2: annenPartTekst,
                        uker: value.antallUkerSøker1,
                        uker2: value.antallUkerSøker2,
                    }}
                />
            </option>
        );
    });

    return options;
};

const FordelingSteg: FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);

    const lagre = (formValues: Fordeling) => {
        lagreFordeling(formValues);
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<Fordeling>({ defaultValues: fordeling });

    const fornavnSøker = getFornavnPåSøker(hvemPlanlegger);
    const fornavnAnnenPart = getFornavnPåAnnenPart(hvemPlanlegger);

    const fellesperiodefordeling = formMethods.watch('fellesperiodefordeling');
    console.log(fellesperiodefordeling);
    const [currentOption, setCurrentOption] = useState('');

    // TODO: hent fra api
    const konto100 = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80 = {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const konto100tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 165,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 200,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const mappedKonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100);
    const mappedKonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80);
    const mappedKonto100tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100tvillinger);
    const mappedKonto80tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80tvillinger);

    const toBarn = barnet.hvorMange === 'to';
    const ettBarn = barnet.hvorMange === 'ett';

    const finnSelectedKonto = () => {
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && ettBarn) {
            return mappedKonto100;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && ettBarn) {
            return mappedKonto80;
        }
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && toBarn) {
            return mappedKonto100tvillinger;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && toBarn) {
            return mappedKonto80tvillinger;
        }
        return mappedKonto100;
    };
    /* const selectedKonto = dekningsgrad
        ? dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? mappedKonto100
            : mappedKonto80
        : mappedKonto100;
        */

    const selectedKonto = finnSelectedKonto();
    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    console.log('selectedKonto', selectedKonto);
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());

    const fellesperiodeOptionValues = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);
    const antallUkerFellesperiodeSøker1 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    const antallUkerFellesperiodeSøker2 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    console.log('antallUkerFellesperiodeSøker1: ', antallUkerFellesperiodeSøker1);
    console.log('fellesperiodefordeling: ', fellesperiodefordeling);

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    console.log('sluttdato: ', sluttdatoSøker1);
    console.log('antallUkerFellesperiodeSøker1: ', antallUkerFellesperiodeSøker1);
    console.log('antallUkerFellesperiodeSøker2: ', antallUkerFellesperiodeSøker2);
    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : undefined;
    console.log('startdatoSøker1: ', startdatoSøker1);
    console.log('sluttdatoSøker1: ', sluttdatoSøker1);
    console.log('startdatoSøker2: ', startdatoSøker2);
    console.log('sluttdatoSøker2: ', sluttdatoSøker2);
    const fellesperiodeSelectOptions = getFellesperiodefordelingSelectOptions(
        intl,
        fellesperiodeOptionValues,
        hvemPlanlegger,
    );
    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="20">
                    <VStack gap="10">
                        <Heading size="large" spacing>
                            <FormattedMessage id="periode.tittel" />
                        </Heading>
                        {!isAlene(hvemPlanlegger) && dekningsgrad && (
                            <VStack gap="10">
                                <VStack gap="10">
                                    <InfoboksGenerell
                                        header={<FormattedMessage id="periode.infoboks.hvordanFordeleTittel" />}
                                        icon={
                                            <SectorChartIcon
                                                height={28}
                                                width={28}
                                                color="#020C1CAD"
                                                fontSize="1.5rem"
                                            />
                                        }
                                    >
                                        <BodyLong>
                                            <FormattedMessage id="periode.infoboks.hvordanFordeleTekst" />
                                        </BodyLong>
                                    </InfoboksGenerell>
                                </VStack>

                                <VStack gap="10">
                                    <GreenPanel isDarkGreen={fordeling === undefined}>
                                        <Select
                                            label={<FormattedMessage id="periode.fordelingTittel" />}
                                            name="fellesperiodefordeling"
                                            onChange={(e) => {
                                                setCurrentOption(e.target.value);
                                            }}
                                        >
                                            {fellesperiodeSelectOptions}
                                        </Select>
                                    </GreenPanel>

                                    {currentOption !== undefined && currentOption > '0' && (
                                        <Infoboks
                                            header={<FormattedMessage id="periode.infoboksTittel" />}
                                            icon={
                                                <CalendarIcon
                                                    height={28}
                                                    width={28}
                                                    color="#020C1CAD"
                                                    fontSize="1.5rem"
                                                />
                                            }
                                        >
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavnSøker,
                                                        dag: dayjs(startdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong spacing>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavnSøker,
                                                        dag: sluttdatoSøker1.format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>

                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavnAnnenPart,
                                                        dag: dayjs(startdatoSøker2).add(1, 'day').format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong spacing>
                                                <FormattedMessage
                                                    id="periode.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavnAnnenPart,
                                                        dag: dayjs(sluttdatoSøker2).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong size="small">
                                                <FormattedMessage id="periode.infoboksTekst.hvis" />
                                            </BodyLong>
                                        </Infoboks>
                                    )}
                                </VStack>
                            </VStack>
                        )}
                    </VStack>

                    <VStack gap="10">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <VStack gap="10">
                            <StepButtonsHookForm<Fordeling>
                                saveDataOnPreviousClick={lagreFordeling}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                useSimplifiedTexts
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default FordelingSteg;
