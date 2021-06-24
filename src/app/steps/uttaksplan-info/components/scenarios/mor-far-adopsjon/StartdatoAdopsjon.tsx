import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Block, intlUtils } from '@navikt/fp-common';
import { MorFarAdopsjonFormComponents, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { isAdoptertAnnetBarn, isAdoptertBarn } from 'app/context/types/Barn';
import { DateRange, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { DatepickerDateRange } from 'nav-datovelger';

const konverterStringTilDate = (invalidDateRanges?: DatepickerDateRange[]): DateRange[] | undefined => {
    if (!invalidDateRanges) {
        return undefined;
    }

    return invalidDateRanges.map((r) => ({
        from: ISOStringToDate(r.from)!,
        to: ISOStringToDate(r.to)!,
    }));
};

const StartdatoAdopsjon: FunctionComponent = () => {
    const intl = useIntl();
    const { barn } = useSøknad();
    const familiehendelsesdato = getFamiliehendelsedato(barn);

    const radios = [];
    if (isAdoptertAnnetBarn(barn) && barn.ankomstdato) {
        radios.push({
            label: intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.alternativ.ankomst', {
                dato: formaterDatoUtenDag(ISOStringToDate(barn.ankomstdato)!),
            }),
            value: barn.ankomstdato,
        });
    }

    if (isAdoptertBarn(barn)) {
        radios.push({
            label: intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.alternativ.omsorgsovertakelse', {
                dato: formaterDatoUtenDag(ISOStringToDate(barn.adopsjonsdato)!),
            }),
            value: barn.adopsjonsdato,
        });
    }

    radios.push({
        label: intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.alternativ.annen'),
        value: 'startdatoPermisjon',
    });

    const datoAvgrensninger = uttaksplanDatoavgrensninger.startdatoPermisjonAdopsjon(familiehendelsesdato);

    return (
        <>
            <Block padBottom="l">
                <MorFarAdopsjonFormComponents.RadioPanelGroup
                    name={MorFarAdopsjonFormField.startdatoAdopsjon}
                    radios={radios}
                    legend={intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.spørsmål')}
                    useTwoColumns={true}
                />
            </Block>
            <Block padBottom="l">
                <MorFarAdopsjonFormComponents.DatePicker
                    name={MorFarAdopsjonFormField.annenStartdatoAdopsjon}
                    label={intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.annenDato.spørsmål')}
                    minDate={datoAvgrensninger.minDate ? ISOStringToDate(datoAvgrensninger.minDate) : undefined}
                    maxDate={datoAvgrensninger.maxDate ? ISOStringToDate(datoAvgrensninger.maxDate) : undefined}
                    disabledDateRanges={konverterStringTilDate(datoAvgrensninger.invalidDateRanges)}
                    disableWeekend={datoAvgrensninger.weekendsNotSelectable}
                />
            </Block>
        </>
    );
};

export default StartdatoAdopsjon;
