import { ContextDataType, useContextSaveAnyData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useSetSøknadsdata } from 'appData/useSetSøknadsdata';
import { useIntl } from 'react-intl';
import {
    lagEndringsSøknad,
    lagNySøknadForRegistrerteBarn,
    lagSøknadFraValgteBarnMedSak,
    mapSøkerensEksisterendeSakFromDTO,
} from 'utils/eksisterendeSakUtils';

import { captureMessage } from '@navikt/fp-observability';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';

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
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger);
    const oppdaterDataIState = useContextSaveAnyData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    const nullstillPlanleggerTilstand = () => {
        oppdaterDataIState(ContextDataType.SØKERSITUASJON, undefined);
        oppdaterDataIState(ContextDataType.OM_BARNET, undefined);
        oppdaterDataIState(ContextDataType.PERIODE_MED_FORELDREPENGER, undefined);
        oppdaterDataIState(ContextDataType.UTTAKSPLAN, undefined);
        oppdaterDataIState(ContextDataType.KOMMER_FRA_PLANLEGGER, undefined);
    };

    const startSomNySøknad = () => {
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

    const startNySøknadFraValgtBarn = (valgteBarn: ValgtBarn) => {
        if (valgteBarn.sak !== undefined && valgteBarn.kanSøkeOmEndring === false) {
            const søknad = lagSøknadFraValgteBarnMedSak(
                { ...valgteBarn, sak: valgteBarn.sak }, // Gjør dette slik at funksjonen slipper deale med undefined sak
                intl,
                søkerInfo.barn,
                søkerInfo.fnr,
            );
            oppdaterSøknadIState(søknad);
        } else {
            // Barn er registrert, men det finnes ingen sak
            const søknad = lagNySøknadForRegistrerteBarn(valgteBarn);
            oppdaterSøknadIState(søknad);
        }

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

        oppdaterDataIState(ContextDataType.VALGT_EKSISTERENDE_SAKSNR, start.valgteBarn.sak?.saksnummer);

        if (start.type === 'ENDRING') {
            return startEndringssøknad(start.valgteBarn, start.sak);
        }

        return startNySøknadFraValgtBarn(start.valgteBarn);
    };

    return { startSøknad };
};
