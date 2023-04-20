import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React, { FunctionComponent } from 'react';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { Block, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    FarMedmorFødselBeggeHarRettFormComponents,
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import {
    getInitialFarMedmorFødselBeggeHarRettValues,
    mapFarMedmorFødselBeggeHarRettToState,
} from './farMedmorFødselBeggeHarRettUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import farMedmorFødselBeggeHarRettQuestionsConfig, {
    FarMedmorFødselBeggeHarRettFormPayload,
} from './farMedmorFødselBeggeHarRettQuestionsConfig';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { Forelder } from 'app/types/Forelder';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import { FarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { andreAugust2022ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Button, GuidePanel } from '@navikt/ds-react';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFødselFørsteganggsøknadBeggeHarRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
}) => {
    const intl = useIntl();
    const { state } = useForeldrepengesøknadContext();
    const { annenForelder, søkersituasjon, barn, dekningsgrad, erEndringssøknad } = useSøknad();
    const { person } = useSøkerinfo();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorFødselBeggeHarRettUttaksplanInfo>();

    const navnFar = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.fornavn
        : '';
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const navnMor = erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : person.fornavn;

    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO
    );

    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const termindato = getTermindato(barn);
    const førsteUttaksdagNesteBarnsSak =
        state.barnFraNesteSak !== undefined ? state.barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const onValidSubmitHandler = (values: Partial<FarMedmorFødselBeggeHarRettFormData>) => {
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[values.dekningsgrad! === '100' ? 100 : 80]);
        return [
            actionCreator.setAntallUkerIUttaksplan(antallUker),
            actionCreator.setUttaksplanInfo(mapFarMedmorFødselBeggeHarRettToState(values)),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
            actionCreator.lagUttaksplanforslag(
                lagUttaksplan({
                    annenForelderErUfør: erMorUfør,
                    erDeltUttak: true,
                    erEndringssøknad,
                    erEnkelEndringssøknad: erEndringssøknad,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                    førsteUttaksdagEtterSeksUker: Uttaksdagen(
                        Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()
                    ).leggTil(30),
                    situasjon: erFødsel ? 'fødsel' : 'adopsjon',
                    søkerErFarEllerMedmor: erFarEllerMedmor,
                    søkerHarMidlertidigOmsorg: false,
                    tilgjengeligeStønadskontoer:
                        tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
                    uttaksplanSkjema: {
                        morSinSisteUttaksdag: values.morsSisteDag,
                        farSinFørsteUttaksdag: values.farMedmorsFørsteDag,
                        antallDagerFellesperiodeFarMedmor: parseInt(values.antallDagerFellesperiode || '0', 10),
                        antallUkerFellesperiodeFarMedmor: parseInt(values.antallUkerFellesperiode || '0', 10),
                    },
                    bareFarMedmorHarRett: false,
                    termindato,
                    harAktivitetskravIPeriodeUtenUttak: false,
                    førsteUttaksdagNesteBarnsSak,
                })
            ),
        ];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    return (
        <FarMedmorFødselBeggeHarRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselBeggeHarRettValues(lagretUttaksplanInfo, dekningsgrad)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = farMedmorFødselBeggeHarRettQuestionsConfig.getVisbility({
                    ...formValues,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                } as FarMedmorFødselBeggeHarRettFormPayload);

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad === '100' ? 100 : 80];
                const tilgjengeligeDager = valgtStønadskonto
                    ? getTilgjengeligeDager(valgtStønadskonto, false, Forelder.farMedmor)
                    : undefined;

                return (
                    <FarMedmorFødselBeggeHarRettFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block padBottom="xl">
                            <GuidePanel>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonTilAnnenForelder"
                                    values={{
                                        navn: isAnnenForelderOppgitt(annenForelder)
                                            ? getNavnGenitivEierform(annenForelder.fornavn, intl.locale)
                                            : '',
                                    }}
                                />
                            </GuidePanel>
                        </Block>
                        <Block padBottom="l">
                            <DekningsgradSpørsmål
                                FormKomponent={FarMedmorFødselBeggeHarRettFormComponents}
                                dekningsgradFeltNavn={FarMedmorFødselBeggeHarRettFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                erDeltUttak={true}
                            />
                        </Block>
                        <Block padBottom="xl" visible={formValues.dekningsgrad !== ''}>
                            {tilgjengeligeDager && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={true}
                                    erFarEllerMedmor={true}
                                    navnFarMedmor={navnFar}
                                    navnMor={navnMor}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                />
                            )}
                        </Block>
                        <Block
                            padBottom="xl"
                            visible={
                                erFarEllerMedmor &&
                                formValues.dekningsgrad !== '' &&
                                !andreAugust2022ReglerGjelder(ISOStringToDate(familiehendelsesdato)!)
                            }
                        >
                            <GuidePanel>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.farMedmor.infoOmTidsromMellomMorsSisteDagOgFarsFørsteDag"
                                    values={{ navnMor }}
                                />
                            </GuidePanel>
                        </Block>
                        <Block
                            padBottom="xl"
                            visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.morsSisteDag)}
                        >
                            <MorsSisteDagSpørsmål
                                FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                fieldName={FarMedmorFødselBeggeHarRettFormField.morsSisteDag}
                                navnMor={navnMor}
                                familiehendelsesdato={familiehendelsesdato}
                            />
                        </Block>
                        <Block
                            padBottom="xl"
                            visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag)}
                        >
                            <FarMedmorsFørsteDag
                                FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                fieldName={FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag}
                                familiehendelsesdato={familiehendelsesdatoDate!}
                                setFieldValue={setFieldValue}
                                morsSisteDag={ISOStringToDate(formValues.morsSisteDag)}
                                navnMor={navnMor}
                                termindato={termindato}
                                situasjon={søkersituasjon.situasjon}
                                morHarRettTilForeldrepengerIEØS={false}
                            />
                        </Block>
                        <Block
                            padBottom="xl"
                            visible={visibility.isVisible(
                                FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode
                            )}
                        >
                            {tilgjengeligeDager && (
                                <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                    FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                    ukerFieldName={FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode}
                                    dagerFieldName={FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode}
                                    antallDager={formValues.antallDagerFellesperiode!}
                                    antallUker={formValues.antallUkerFellesperiode!}
                                    setFieldValue={setFieldValue}
                                    ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                                />
                            )}
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Button>
                        </Block>
                    </FarMedmorFødselBeggeHarRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
