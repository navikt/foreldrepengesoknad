import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Barn, Step, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Søker } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getRegistrerteBarnOmDeFinnes } from 'app/utils/barnUtils';

import RegistrertePersonalia from '../../components/registrerte-personalia/RegistrertePersonalia';
import { AnnenForelderFormData } from './AnnenForelderFormData';
import AnnenForelderOppgittPanel from './AnnenForelderOppgittPanel';
import OppgiPersonalia from './OppgiPersonalia';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';

const getRegistrertAnnenForelder = (barn: NonNullable<Barn | undefined>, søker: Søker) => {
    const registrerteBarn = getRegistrerteBarnOmDeFinnes(barn, søker.barn);
    const registrertBarnMedAnnenForelder =
        registrerteBarn === undefined || registrerteBarn.length === 0
            ? undefined
            : registrerteBarn.find((barn) => barn.annenForelder !== undefined);
    return registrertBarnMedAnnenForelder !== undefined ? registrertBarnMedAnnenForelder.annenForelder : undefined;
};

type Props = {
    søker: Søker;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const AnnenForelderSteg: React.FunctionComponent<Props> = ({ søker, mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);

    const { rolle } = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);

    const oppdaterAnnenForeldre = useContextSaveData(ContextDataType.ANNEN_FORELDER);

    const annenForelderFraRegistrertBarn = getRegistrertAnnenForelder(barn, søker);

    const skalOppgiPersonalia =
        annenForelderFraRegistrertBarn === undefined ||
        annenForelder === undefined ||
        (isAnnenForelderOppgitt(annenForelder) && annenForelder.fnr !== annenForelderFraRegistrertBarn.fnr);

    const onSubmit = (values: AnnenForelderFormData) => {
        if (values.kanIkkeOppgis === true) {
            oppdaterAnnenForeldre({ kanIkkeOppgis: true });
        } else {
            const fornavn =
                !skalOppgiPersonalia && annenForelderFraRegistrertBarn
                    ? annenForelderFraRegistrertBarn.fornavn
                    : values.fornavn;
            const etternavn =
                !skalOppgiPersonalia && annenForelderFraRegistrertBarn
                    ? annenForelderFraRegistrertBarn.etternavn
                    : values.etternavn;
            const fnr =
                !skalOppgiPersonalia && annenForelderFraRegistrertBarn
                    ? annenForelderFraRegistrertBarn.fnr
                    : values.fnr;
            oppdaterAnnenForeldre({
                ...values,
                fornavn: replaceInvisibleCharsWithSpace(fornavn),
                etternavn: replaceInvisibleCharsWithSpace(etternavn),
                fnr: replaceInvisibleCharsWithSpace(fnr.trim()),
                harRettPåForeldrepengerIEØS: values.harOppholdtSegIEØS ? values.harRettPåForeldrepengerIEØS : false,
            });
        }

        return navigator.goToNextDefaultStep();
    };

    // TODO (TOR) Typen AnnenForelderFormData bør erstattast av AnnenForelder.ts (som bør flyttast til denne appen)
    const formMethods = useForm<AnnenForelderFormData>({
        shouldUnregister: true,
        defaultValues: annenForelder,
    });

    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {skalOppgiPersonalia && (
                        <OppgiPersonalia rolle={rolle} barn={barn} søkersFødselsnummer={søker.fnr} />
                    )}
                    {!skalOppgiPersonalia && (
                        <RegistrertePersonalia
                            person={annenForelderFraRegistrertBarn}
                            fødselsnummerForVisning={annenForelderFraRegistrertBarn.fnr}
                            visEtternavn
                        />
                    )}
                    {kanIkkeOppgis !== true && (
                        <AnnenForelderOppgittPanel
                            rolle={rolle}
                            barn={barn}
                            annenForelder={annenForelder}
                            søkerInfo={søkerInfo}
                        />
                    )}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default AnnenForelderSteg;
