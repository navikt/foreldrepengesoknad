import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import { formaterNavn } from 'app/utils/personUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getInitialMorFarAdopsjonValues } from './morFarAdopsjonUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { MorFarAdopsjonFormComponents, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { morFarAdopsjonQuestionsConfig } from './morFarAdopsjonQuestionsConfig';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { Forelder } from 'app/types/Forelder';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFarAdopsjon: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
}) => {
    const intl = useIntl();
    const {
        søkersituasjon,
        annenForelder,
        barn,
        søker: { erAleneOmOmsorg },
    } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!erAleneOmOmsorg;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger !== undefined
        : false;

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    if (!shouldRender) {
        return null;
    }

    const erSøkerMor = søkersituasjon.rolle === 'mor';
    const familiehendelsesdato = getFamiliehendelsedato(barn);

    const harAnnenForeldreRettPåForeldrepenger = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger
        : false;
    const fornavnAnnenForeldre = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : undefined;

    const erDeltUttak = erAleneOmOmsorg === false || !annenForelder.kanIkkeOppgis;

    const erAnnenPartUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const erMorUfør = erSøkerMor ? false : erAnnenPartUfør;

    const navnSøker = formaterNavn(fornavn, etternavn, mellomnavn);
    const navnAnnenPart = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn)
        : '';

    return (
        <MorFarAdopsjonFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonValues()}
            onSubmit={() => undefined}
            renderForm={({ values: formValues }) => {
                const visibility = morFarAdopsjonQuestionsConfig.getVisbility({
                    ...formValues,
                });

                const tilgjengeligeStønadskontoer = getValgtStønadskontoMengde(
                    formValues.dekningsgrad as Dekningsgrad,
                    tilgjengeligeStønadskontoer80DTO,
                    tilgjengeligeStønadskontoer100DTO,
                    familiehendelsesdato,
                    erMorUfør
                );

                return (
                    <MorFarAdopsjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l" visible={harAnnenForeldreRettPåForeldrepenger} textAlignCenter={true}>
                            <MorFarAdopsjonFormComponents.YesOrNoQuestion
                                name={MorFarAdopsjonFormField.harAnnenForelderSøktFP}
                                legend={intlUtils(intl, 'uttaksplaninfo.spørsmål.harAnnenForelderSøktFP.label', {
                                    navnAnnenForelder: fornavnAnnenForeldre,
                                })}
                            />
                        </Block>
                        <Block padBottom="l" visible={formValues.harAnnenForelderSøktFP === YesOrNo.YES}>
                            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id="uttaksplaninfo.informasjon.tilAnnenForelder"
                                    values={{
                                        navn: getNavnGenitivEierform(fornavnAnnenForeldre!, intl.locale),
                                    }}
                                />
                            </Veilederpanel>
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                formValues.harAnnenForelderSøktFP !== YesOrNo.UNANSWERED ||
                                !harAnnenForeldreRettPåForeldrepenger
                            }
                        >
                            <MorFarAdopsjonFormComponents.RadioPanelGroup
                                name={MorFarAdopsjonFormField.dekningsgrad}
                                radios={[
                                    {
                                        label: intlUtils(intl, 'uttaksplaninfo.49Uker'),
                                        value: Dekningsgrad.HUNDRE_PROSENT,
                                    },
                                    {
                                        label: intlUtils(intl, 'uttaksplaninfo.59Uker'),
                                        value: Dekningsgrad.ÅTTI_PROSENT,
                                    },
                                ]}
                                legend={intlUtils(intl, 'uttaksplaninfo.dekningsgrad.label.deltUttak')}
                                description={
                                    <UtvidetInformasjon apneLabel="Les mer om lengden på foreldrepengeperioden">
                                        <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad80" />
                                    </UtvidetInformasjon>
                                }
                                useTwoColumns={true}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isAnswered(MorFarAdopsjonFormField.dekningsgrad)}>
                            <TilgjengeligeDagerGraf
                                erDeltUttak={erDeltUttak}
                                erFarEllerMedmor={!erSøkerMor}
                                navnFarMedmor={erSøkerMor ? navnAnnenPart : navnSøker}
                                navnMor={erSøkerMor ? navnSøker : navnAnnenPart}
                                tilgjengeligeDager={getTilgjengeligeDager(
                                    tilgjengeligeStønadskontoer,
                                    erDeltUttak,
                                    erSøkerMor ? Forelder.mor : Forelder.farMedmor
                                )}
                            />
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </MorFarAdopsjonFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarAdopsjon;
