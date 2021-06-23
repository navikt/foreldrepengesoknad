import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Block, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getInitialMorFarAdopsjonValues } from './morFarAdopsjonUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { MorFarAdopsjonFormComponents, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFarAdopsjon: FunctionComponent<Props> = () => {
    const intl = useIntl();
    const { søkersituasjon, annenForelder, søker } = useSøknad();

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!søker.erAleneOmOmsorg;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger !== undefined
        : false;

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    if (!shouldRender) {
        return null;
    }

    const harAnnenForeldreRettPåForeldrepenger = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger
        : false;
    const fornavnAnnenForeldre = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : undefined;

    return (
        <MorFarAdopsjonFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonValues()}
            onSubmit={() => undefined}
            renderForm={() => {
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
                        <Block visible={true} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </MorFarAdopsjonFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarAdopsjon;
