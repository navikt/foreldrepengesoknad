import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { Block, UtvidetInformasjon } from '@navikt/fp-common';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import VeilederNormal from 'app/assets/VeilederNormal';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { isFødtBarn } from 'app/context/types/Barn';
import { MorFødselFormComponents, MorFødselFormField } from './morFødselFormConfig';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { Tidsperioden } from '../../../utils/Tidsperioden';
import { getInitialMorFødselValues } from './morFødselUtils';

const skalViseInfoOmPrematuruker = (fødselsdato: Date | undefined, termindato: Date | undefined): boolean => {
    if (fødselsdato === undefined || termindato === undefined) {
        return false;
    }

    const fødselsdatoEtterEllerLikFørsteJuli = dayjs(fødselsdato).isSameOrAfter(dayjs(new Date('2019-07-01')));

    return (
        dayjs(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(dayjs(termindato)) &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
}) => {
    const { annenForelder, søkersituasjon, barn } = useSøknad();
    const erMor = !isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';

    const shouldRender = erMor && erFødsel;

    if (!shouldRender) {
        return null;
    }

    const fødselsdato = isFødtBarn(barn) ? ISOStringToDate(barn.fødselsdatoer[0]) : undefined;
    const termindato = isFødtBarn(barn) ? ISOStringToDate(barn.termindato) : undefined;
    const visInfoOmPrematuruker =
        søkersituasjon.situasjon === 'fødsel' ? skalViseInfoOmPrematuruker(fødselsdato, termindato) : false;
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato, tom: termindato }).getAntallUttaksdager() - 1
        : undefined;

    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const familiehendelsesdato = getFamiliehendelsedato(barn);

    return (
        <MorFødselFormComponents.FormikWrapper
            initialValues={getInitialMorFødselValues()}
            onSubmit={() => null}
            renderForm={({ values: formValues }) => {
                const tilgjengeligeStønadskontoer = getValgtStønadskontoMengde(
                    formValues.dekningsgrad as Dekningsgrad,
                    tilgjengeligeStønadskontoer80DTO,
                    tilgjengeligeStønadskontoer100DTO,
                    familiehendelsesdato,
                    erMorUfør
                );
                return (
                    <MorFødselFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l">
                            <MorFødselFormComponents.RadioPanelGroup
                                name={MorFødselFormField.dekningsgrad}
                                radios={[
                                    {
                                        label: '49 uker med 100 prosent foreldrepenger',
                                        value: Dekningsgrad.HUNDRE_PROSENT,
                                    },
                                    {
                                        label: '59 uker med 80 prosent foreldrepenger',
                                        value: Dekningsgrad.ÅTTI_PROSENT,
                                    },
                                ]}
                                legend="Hvor lang periode med foreldrepenger har dere valgt?"
                                description={
                                    <UtvidetInformasjon apneLabel="Les mer om lengden på foreldrepengeperioden">
                                        Den totale utbetalingen blir høyere hvis du velger 100 prosent. Valget gjelder
                                        dere begge, og kan ikke endres senere.
                                    </UtvidetInformasjon>
                                }
                                useTwoColumns={true}
                            />
                        </Block>
                        <Block padBottom="l" visible={formValues.dekningsgrad !== ''}>
                            <TilgjengeligeDagerGraf
                                erDeltUttak={true}
                                erFarEllerMedmor={true}
                                navnFarMedmor="Ola"
                                navnMor="Kari"
                                tilgjengeligeDager={getTilgjengeligeDager(tilgjengeligeStønadskontoer, true, undefined)}
                            />
                        </Block>
                        <Block padBottom="l">
                            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonPrematuruker"
                                    values={{
                                        antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                        antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                    }}
                                />
                            </Veilederpanel>
                        </Block>
                    </MorFødselFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFødsel;
