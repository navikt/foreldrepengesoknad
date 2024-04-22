import { InformationIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import Calendar from 'components/calendar/Calendar';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import 'dayjs/locale/nb';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { isAlene } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import { lagKalenderPerioder } from 'utils/kalenderPerioderHjelper';
import {
    getAntallUkerFellesperiode,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import useScrollBehaviour from 'utils/useScrollBehaviour';
import { finnAntallUkerMedForeldrepenger, finnUttaksdata } from 'utils/uttakHjelper';

import { BodyLong, Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import OmÅTilpassePlanen from './OmÅTilpassePlanen';
import OversiktLabels from './OversiktLabels';
import UforutsetteEndringer from './UforutsetteEndringer';
import styles from './oversiktSteg.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
    locale: LocaleAll;
}

const OversiktSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const lagreHvorLangPeriode = notEmpty(useContextSaveData(ContextDataType.HVOR_LANG_PERIODE));

    const stønadskonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.HUNDRE_PROSENT],
    );
    const stønadskonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const uttaksdata100 = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        stønadskonto100,
        barnet,
        fordeling?.antallUkerSøker1,
    );
    const uttaksdata80 = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        stønadskonto80,
        barnet,
        fordeling?.antallUkerSøker1,
    );

    const antallUker100 = finnAntallUkerMedForeldrepenger(uttaksdata100);
    const antallUker80 = finnAntallUkerMedForeldrepenger(uttaksdata80);

    const erAleneforsørger = isAlene(hvemPlanlegger);

    const uttaksperioder = lagKalenderPerioder(
        valgtStønadskonto,
        barnet,
        hvemPlanlegger,
        arbeidssituasjon,
        fordeling?.antallUkerSøker1,
    );

    return (
        <form>
            <PlanleggerStepPage steps={stepConfig}>
                <VStack gap="10">
                    <Heading size="large" spacing level="2">
                        <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger }} />
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" />}
                        isGray
                        icon={<InformationIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                    >
                        <BodyLong>
                            <FormattedMessage id="OversiktSteg.Infoboks.Utkast.Tekst" values={{ erAleneforsørger }} />
                        </BodyLong>
                    </Infobox>
                    <ToggleGroup
                        defaultValue={hvorLangPeriode?.dekningsgrad}
                        size="medium"
                        variant="neutral"
                        onChange={(value) => lagreHvorLangPeriode({ dekningsgrad: value as Dekningsgrad })}
                        style={{ width: '100%' }}
                    >
                        <ToggleGroup.Item value={Dekningsgrad.HUNDRE_PROSENT}>
                            <FormattedMessage
                                id="OversiktSteg.100"
                                values={{
                                    uker: antallUker100,
                                }}
                            />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
                            <FormattedMessage id="OversiktSteg.80" values={{ uker: antallUker80 }} />
                        </ToggleGroup.Item>
                    </ToggleGroup>
                    {hvemHarRett === 'beggeHarRett' && (
                        <Select
                            defaultValue={fordeling?.antallUkerSøker1}
                            label={<FormattedMessage id="OversiktSteg.Fellesperiodefordeling" />}
                            name="antallUkerSøker1"
                            onChange={(e) => {
                                lagreFordeling({ antallUkerSøker1: parseInt(e.target.value, 10) });
                            }}
                        >
                            {getFellesperiodefordelingSelectOptions(antallUkerFellesperiode).map((value) => (
                                <option key={value.antallUkerSøker1} value={value.antallUkerSøker1}>
                                    {finnFellesperiodeFordelingOptionTekst(intl, value, hvemPlanlegger)}
                                </option>
                            ))}
                        </Select>
                    )}
                    <OversiktLabels
                        uttaksdata={
                            hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? uttaksdata100 : uttaksdata80
                        }
                        hvemPlanlegger={hvemPlanlegger}
                        barnet={barnet}
                        valgtStønadskonto={valgtStønadskonto}
                        hvemHarRett={hvemHarRett}
                    />
                    <div className={styles.calendar}>
                        <Calendar periods={uttaksperioder} />
                    </div>
                    <VStack gap="5">
                        <OmÅTilpassePlanen />
                        <UforutsetteEndringer />
                    </VStack>
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </PlanleggerStepPage>
        </form>
    );
};

export default OversiktSteg;
