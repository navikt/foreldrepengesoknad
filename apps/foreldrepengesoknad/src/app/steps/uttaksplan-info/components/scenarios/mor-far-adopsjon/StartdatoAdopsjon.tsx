import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import {
    Barn,
    Block,
    ISOStringToDate,
    formaterDatoUtenDag,
    hasValue,
    intlUtils,
    isAdoptertAnnetBarn,
    isAdoptertBarn,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';
import { MorFarAdopsjonFormComponents, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { validateErAnnenStartdatoAdopsjonGyldig } from './validation/morFarAdopsjonValidering';
import AdopsjonStartdatoValg from './adopsjonStartdatoValg';
import { DatepickerDateRange } from '@navikt/ds-datepicker';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { assertUnreachable } from '@navikt/fp-common/src/common/utils/globalUtil';

export const finnStartdatoAdopsjon = (
    startdatoAdopsjonValg: AdopsjonStartdatoValg,
    annenStartdatoAdopsjon?: string,
    adopsjonsdato?: string,
    ankomstdato?: string,
    søkersFørsteDag?: string,
): string => {
    if (hasValue(søkersFørsteDag)) {
        return søkersFørsteDag!;
    }

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
    barn: Barn;
}

const StartdatoAdopsjon: FunctionComponent<Props> = ({ valgtStartdatoAdopsjon, barn }) => {
    const intl = useIntl();
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;

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
                <MorFarAdopsjonFormComponents.RadioGroup
                    name={MorFarAdopsjonFormField.startdatoAdopsjonValg}
                    radios={radios}
                    legend={intlUtils(intl, 'uttaksplaninfo.startdatoAdopsjon.spørsmål')}
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
                    placeholder={'dd.mm.åååå'}
                />
            </Block>
        </>
    );
};

export default StartdatoAdopsjon;
