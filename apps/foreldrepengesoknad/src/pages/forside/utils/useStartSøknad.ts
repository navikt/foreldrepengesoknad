import { useQueryClient } from '@tanstack/react-query';
import { uttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetAnyData, useContextSaveAnyData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { useSetSøknadsdata } from 'appData/useSetSøknadsdata';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { getUttaksplanParam } from 'utils/annenForelderUtils';
import {
    lagEndringsSøknad,
    lagNySøknadForRegistrerteBarn,
    lagSøknadFraValgteBarnMedSak,
    mapSøkerensEksisterendeSakFromDTO,
} from 'utils/eksisterendeSakUtils';

import { captureMessage } from '@navikt/fp-observability';
import { FellesUttaksplanDto_fpoversikt, FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ValgtBarn } from '../../../types/ValgtBarn';
import { ForsideFormValues } from '../types/ForsideFormValues';
import { bestemSøknadsstart } from './forsideUtils';

export type Søknadsmetadata = {
    harGodkjentVilkår: boolean;
    erEndringssøknad: boolean;
    søknadGjelderNyttBarn: boolean;
};

interface Args {
    saker: FpSak_fpoversikt[];
    selectableBarn: ValgtBarn[];
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    harPlanleggerData: boolean;
    oppdaterSøknadsmetadata: (metadata: Søknadsmetadata) => void;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
}

/**
 * Utfører valet brukaren gjer på forsida: initialiserer søknadsdata, set
 * søknadsmetadata og navigerer vidare. Sjølve avgjerda om kva slags søknad det
 * blir, ligg i den reine funksjonen `bestemSøknadsstart`.
 */
export const useStartSøknad = ({
    saker,
    selectableBarn,
    søkerInfo,
    harPlanleggerData,
    oppdaterSøknadsmetadata,
    mellomlagreSøknadOgNaviger,
}: Args) => {
    const intl = useIntl();
    const queryClient = useQueryClient();
    const [startFeilet, setStartFeilet] = useState(false);
    const starterSøknadRef = useRef(false);
    const navigator = useFpNavigator({
        arbeidsforhold: søkerInfo.arbeidsforhold,
        harRegistrertNæring: søkerInfo.selvstendigNæring.length > 0,
        mellomlagreOgNaviger: mellomlagreSøknadOgNaviger,
    });
    const oppdaterDataIState = useContextSaveAnyData();
    const getData = useContextGetAnyData();
    const resetUttaksplanData = useResetUttaksplanData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    const forlaterSøknadUtenVedtak = () => {
        const valgtSak = saker.find((sak) => sak.saksnummer === getData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR));
        return valgtSak !== undefined && !valgtSak.gjeldendeVedtak;
    };

    const nullstillGjenbruktPlan = () => {
        resetUttaksplanData();
        oppdaterDataIState(ContextDataType.OPPRINNELIG_UTTAKSPLAN, undefined);
    };

    const nullstillPlanleggerTilstand = () => {
        oppdaterDataIState(ContextDataType.SØKERSITUASJON, undefined);
        oppdaterDataIState(ContextDataType.OM_BARNET, undefined);
        oppdaterDataIState(ContextDataType.PERIODE_MED_FORELDREPENGER, undefined);
        oppdaterDataIState(ContextDataType.UTTAKSPLAN, undefined);
        oppdaterDataIState(ContextDataType.KOMMER_FRA_PLANLEGGER, undefined);
    };

    const startSomNySøknad = () => {
        if (forlaterSøknadUtenVedtak()) {
            nullstillGjenbruktPlan();
            oppdaterDataIState(ContextDataType.VALGT_EKSISTERENDE_SAKSNR, undefined);
            oppdaterDataIState(ContextDataType.FORDELING, undefined);
        }
        oppdaterSøknadsmetadata({ harGodkjentVilkår: true, erEndringssøknad: false, søknadGjelderNyttBarn: true });
        return navigator.goToStep(SøknadRoutes.SØKERSITUASJON);
    };

    const startEndringssøknad = (valgteBarn: ValgtBarn, sak: FpSak_fpoversikt) => {
        const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(sak, valgteBarn.fødselsdatoer);
        const søknad = lagEndringsSøknad(søkerInfo, eksisterendeSak, intl, sak.annenPart, valgteBarn);
        oppdaterSøknadIState(søknad);

        oppdaterSøknadsmetadata({ harGodkjentVilkår: true, erEndringssøknad: true, søknadGjelderNyttBarn: false });
        return navigator.goToStep(SøknadRoutes.UTTAKSPLAN);
    };

    const startNySøknadFraValgtBarn = async (valgteBarn: ValgtBarn) => {
        if (
            valgteBarn.sak &&
            !valgteBarn.sak.gjeldendeVedtak &&
            valgteBarn.sak.saksnummer === getData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR) &&
            getData(ContextDataType.SØKERSITUASJON) &&
            getData(ContextDataType.OM_BARNET)
        ) {
            oppdaterSøknadsmetadata({ harGodkjentVilkår: true, erEndringssøknad: false, søknadGjelderNyttBarn: false });
            return navigator.goToStep(SøknadRoutes.SØKERSITUASJON);
        }
        const søknad =
            valgteBarn.sak !== undefined && valgteBarn.kanSøkeOmEndring === false
                ? lagSøknadFraValgteBarnMedSak(
                      { ...valgteBarn, sak: valgteBarn.sak }, // Gjør dette slik at funksjonen slipper deale med undefined sak
                      intl,
                      søkerInfo.barn,
                      søkerInfo.fnr,
                      !valgteBarn.sak.gjeldendeVedtak,
                  )
                : lagNySøknadForRegistrerteBarn(valgteBarn);

        if (valgteBarn.sak && !valgteBarn.sak.gjeldendeVedtak) {
            const options = uttaksplanOptions(
                getUttaksplanParam(notEmpty(søknad.annenForelder), notEmpty(søknad.barn)),
            );
            let uttaksplan: FellesUttaksplanDto_fpoversikt | null;
            try {
                uttaksplan = await queryClient.fetchQuery(options);
            } catch {
                setStartFeilet(true);
                return;
            }
            const perioder = uttaksplan?.perioder ?? [];
            nullstillGjenbruktPlan();
            oppdaterDataIState(ContextDataType.OPPRINNELIG_UTTAKSPLAN, {
                saksnummer: valgteBarn.sak.saksnummer,
                perioder,
            });
            oppdaterDataIState(
                ContextDataType.UTTAKSPLAN,
                perioder.some((periode) => periode.søker !== undefined) ? perioder : undefined,
            );
        } else if (forlaterSøknadUtenVedtak()) {
            nullstillGjenbruktPlan();
        }
        oppdaterDataIState(ContextDataType.VALGT_EKSISTERENDE_SAKSNR, valgteBarn.sak?.saksnummer);
        oppdaterSøknadIState(søknad);

        oppdaterSøknadsmetadata({ harGodkjentVilkår: true, erEndringssøknad: false, søknadGjelderNyttBarn: false });
        return navigator.goToStep(SøknadRoutes.SØKERSITUASJON);
    };

    const startSøknad = (values: ForsideFormValues) => {
        // Skal i utgangspunktet ikke få submitte hvis denne ikke er true
        if (!values.harForståttRettigheterOgPlikter) {
            captureMessage('harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den');
            return;
        }

        const start = bestemSøknadsstart(values, selectableBarn, saker);

        // Bruker har valgt det planlagte barnet fra planleggeren — behold mappet planlegger-tilstand
        if (start.type === 'PLANLAGT_BARN') {
            return startSomNySøknad();
        }

        // Bruker har valgt noe annet — nullstill eventuell mappet planlegger-tilstand
        if (harPlanleggerData) {
            nullstillPlanleggerTilstand();
        }

        // Har valgt å opprette en helt ny sak
        if (start.type === 'NYTT_BARN') {
            return startSomNySøknad();
        }

        if (start.type === 'ENDRING') {
            if (
                forlaterSøknadUtenVedtak() &&
                getData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR) !== start.sak.saksnummer
            ) {
                nullstillGjenbruktPlan();
            }
            oppdaterDataIState(ContextDataType.VALGT_EKSISTERENDE_SAKSNR, start.valgteBarn.sak?.saksnummer);
            return startEndringssøknad(start.valgteBarn, start.sak);
        }

        return startNySøknadFraValgtBarn(start.valgteBarn);
    };

    return {
        startSøknad: async (values: ForsideFormValues) => {
            if (starterSøknadRef.current) {
                return;
            }
            starterSøknadRef.current = true;
            try {
                await startSøknad(values);
            } finally {
                starterSøknadRef.current = false;
            }
        },
        startFeilet,
        nullstillStartFeilet: () => setStartFeilet(false),
    };
};
