import { Block, intlUtils } from '@navikt/fp-common';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import actionCreator from 'app/context/action/actionCreator';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Forelder } from 'app/types/Forelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { storeAppState } from 'app/utils/submitUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { isInfoPeriode } from 'uttaksplan/types/Periode';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import {
    FarMedmorFørstegangssøknadMedAnnenPartFormComponents,
    FarMedmorFørstegangssøknadMedAnnenPartFormData,
    FarMedmorFørstegangssøknadMedAnnenPartFormField,
} from './farMedmorFørstegangssøknadMedAnnenPartFormConfig';
import { farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig } from './farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig';
import { getFarMedmorFørstegangssøknadMedAnnenPartInitialValues } from './farMedmorFørstegangssøknadMedAnnenPartUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFørstegangssøknadMedAnnenPart: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
}) => {
    const søknad = useSøknad();
    const intl = useIntl();
    const { barn, søkersituasjon, annenForelder } = søknad;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo>();

    const onValidSubmitHandler = (values: Partial<FarMedmorFørstegangssøknadMedAnnenPartFormData>) => {
        const uttaksplanInfo: FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo = {
            permisjonStartdato: values.permisjonStartdato!,
        };
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[grunnlag.dekningsgrad]);
        return [
            actionCreator.setAntallUkerIUttaksplan(antallUker),
            actionCreator.setUttaksplanInfo(uttaksplanInfo),
            actionCreator.setDekningsgrad(grunnlag.dekningsgrad),
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    if (!eksisterendeSakAnnenPart || !erFarEllerMedmor) {
        return null;
    }

    const familiehendelsedato = getFamiliehendelsedato(barn);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const navnMor = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : '';
    const { grunnlag, uttaksplan } = eksisterendeSakAnnenPart;
    const morsPerioder = uttaksplan.filter((p) => isInfoPeriode(p) && p.forelder === Forelder.mor);
    const morsSisteDag = morsPerioder.reverse()[0].tidsperiode.tom;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
        familiehendelsedato,
        erMorUfør
    );

    return (
        <FarMedmorFørstegangssøknadMedAnnenPartFormComponents.FormikWrapper
            initialValues={getFarMedmorFørstegangssøknadMedAnnenPartInitialValues(lagretUttaksplanInfo)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig.getVisbility(formValues);
                const valgtMengdeStønadskonto = tilgjengeligeStønadskontoer[grunnlag.dekningsgrad];

                return (
                    <FarMedmorFørstegangssøknadMedAnnenPartFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block padBottom="l">
                            <InfoOmSøknaden
                                eksisterendeSak={eksisterendeSakAnnenPart}
                                erIUttaksplanenSteg={false}
                                tilgjengeligeStønadskontoer={valgtMengdeStønadskonto}
                            />
                        </Block>
                        <Block padBottom="l">
                            <FarMedmorsFørsteDag
                                FormComponents={FarMedmorFørstegangssøknadMedAnnenPartFormComponents}
                                fieldName={FarMedmorFørstegangssøknadMedAnnenPartFormField.permisjonStartdato}
                                familiehendelsesdato={familiehendelsedato}
                                setFieldValue={setFieldValue}
                                morsSisteDag={morsSisteDag}
                                navnMor={navnMor}
                            />
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Hovedknapp>
                        </Block>
                    </FarMedmorFørstegangssøknadMedAnnenPartFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFørstegangssøknadMedAnnenPart;
