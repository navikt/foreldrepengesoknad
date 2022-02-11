import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Block, intlUtils } from '@navikt/fp-common';
import { MorFarAdopsjonFormComponents, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { isAdoptertAnnetBarn, isAdoptertBarn } from 'app/context/types/Barn';
import { DateRange } from '@navikt/sif-common-formik/lib';
import { formaterDatoUtenDag, ISOStringToDate } from 'app/utils/dateUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { DatepickerDateRange } from 'nav-datovelger';
import { validateErAnnenStartdatoAdopsjonGyldig } from './validation/morFarAdopsjonValidering';
import AdopsjonStartdatoValg from './adopsjonStartdatoValg';
import { assertUnreachable } from 'app/utils/globalUtil';

export const finnStartdatoAdopsjon = (
    startdatoAdopsjonValg: AdopsjonStartdatoValg,
    annenStartdatoAdopsjon?: string,
    adopsjonsdato?: string,
    ankomstdato?: string
): string => {
    switch (startdatoAdopsjonValg) {
        case AdopsjonStartdatoValg.ANKOMST:
            return ankomstdato!;
        case AdopsjonStartdatoValg.OMSORGSOVERTAKELSE:
            return adopsjonsdato!;
        case AdopsjonStartdatoValg.ANNEN:
            return annenStartdatoAdopsjon!;
        default:
            return assertUnreachable(startdatoAdopsjonValg, 'Startdato for adopsjon er ikke valgt');
    }
};

const konverterStringTilDate = (invalidDateRanges?: DatepickerDateRange[]): DateRange[] | undefined => {
    if (!invalidDateRanges) {
        return undefined;
    }

    return invalidDateRanges.map((r) => ({
        from: ISOStringToDate(r.from)!,
        to: ISOStringToDate(r.to)!,
    }));
};

interface Props {
    valgtStartdatoAdopsjon?: AdopsjonStartdatoValg;
}

const StartdatoAdopsjon: FunctionComponent<Props> = ({ valgtStartdatoAdopsjon }) => {
    const intl = useIntl();
    const { barn } = useSøknad();
    const familiehendelsesdato = getFamiliehendelsedato(barn);

    const radios = [];
    if (isAdoptertAnnetBarn(barn) && barn.ankomstdato) {
        radios.push({
            label: intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.alternativ.ankomst', {
                dato: formaterDatoUtenDag(barn.ankomstdato),
            }),
            value: AdopsjonStartdatoValg.ANKOMST,
        });
    }

    if (isAdoptertBarn(barn)) {
        radios.push({
            label: intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.alternativ.omsorgsovertakelse', {
                dato: formaterDatoUtenDag(barn.adopsjonsdato),
            }),
            value: AdopsjonStartdatoValg.OMSORGSOVERTAKELSE,
        });
    }

    radios.push({
        label: intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.alternativ.annen'),
        value: AdopsjonStartdatoValg.ANNEN,
    });

    const datoAvgrensninger = uttaksplanDatoavgrensninger.startdatoPermisjonAdopsjon(familiehendelsesdato);

    return (
        <>
            <Block padBottom="l">
                <MorFarAdopsjonFormComponents.RadioPanelGroup
                    name={MorFarAdopsjonFormField.startdatoAdopsjonValg}
                    radios={radios}
                    legend={intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.spørsmål')}
                    useTwoColumns={true}
                />
            </Block>
            <Block padBottom="l" visible={valgtStartdatoAdopsjon === AdopsjonStartdatoValg.ANNEN}>
                <MorFarAdopsjonFormComponents.DatePicker
                    name={MorFarAdopsjonFormField.annenStartdatoAdopsjon}
                    label={intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.annenDato.spørsmål')}
                    minDate={datoAvgrensninger.minDate ? ISOStringToDate(datoAvgrensninger.minDate) : undefined}
                    maxDate={datoAvgrensninger.maxDate ? ISOStringToDate(datoAvgrensninger.maxDate) : undefined}
                    disabledDateRanges={konverterStringTilDate(datoAvgrensninger.invalidDateRanges)}
                    disableWeekend={datoAvgrensninger.weekendsNotSelectable}
                    validate={validateErAnnenStartdatoAdopsjonGyldig(intl)}
                />
            </Block>
        </>
    );
};

export default StartdatoAdopsjon;
