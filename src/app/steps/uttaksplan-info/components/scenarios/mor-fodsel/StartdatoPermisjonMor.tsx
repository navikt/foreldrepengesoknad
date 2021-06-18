import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Block, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { MorFødselFormComponents, MorFødselFormField } from './morFødselFormConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { isFødtBarn } from 'app/context/types/Barn';
import { Tidsperioden, getValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import uttaksConstants from 'app/constants';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { validateErStartdatoFørTermindato } from 'app/steps/uttaksplan-info/validation/uttaksplanInfoValidering';

interface Props {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean;
}

const StartdatoPermisjonMor: FunctionComponent<Props> = ({ permisjonStartdato, skalIkkeHaUttakFørTermin }) => {
    const intl = useIntl();
    const { barn } = useSøknad();

    const erBarnFødt = isFødtBarn(barn);
    const spørsmålNår = erBarnFødt
        ? intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.barnetErFødt.label')
        : intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.label');

    const spørsmålHaddeIkke = erBarnFødt
        ? intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.skalIkkeHaUttak.barnetErFødt.label')
        : intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.skalIkkeHaUttak.label');

    const familiehendelsesdato = dayjs(getFamiliehendelsedato(barn)).toDate();
    const sisteUttaksdagFørTermin = Uttaksdagen(familiehendelsesdato).forrige();
    const tidsperiode = getValidTidsperiode({
        fom: ISOStringToDate(permisjonStartdato),
        tom: sisteUttaksdagFørTermin,
    });
    const antallDager = tidsperiode ? Tidsperioden(tidsperiode).getAntallUttaksdager() : 0;
    const antallDagerFørFødselIhtRegler = uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5;
    const visVeileder = antallDager !== antallDagerFørFødselIhtRegler;

    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();

    return (
        <>
            <Block padBottom="l">
                <MorFødselFormComponents.DatePicker
                    name={MorFødselFormField.permisjonStartdato}
                    label={spørsmålNår}
                    disabled={skalIkkeHaUttakFørTermin}
                    maxDate={maksDato}
                    dayPickerProps={{
                        initialMonth: ISOStringToDate(permisjonStartdato) || familiehendelsesdato,
                    }}
                    validate={validateErStartdatoFørTermindato(intl, familiehendelsesdato, skalIkkeHaUttakFørTermin)}
                />
            </Block>
            <Block margin={visVeileder ? 's' : 'm'}>
                <MorFødselFormComponents.Checkbox
                    name={MorFødselFormField.skalIkkeHaUttakFørTermin}
                    label={spørsmålHaddeIkke}
                    autoComplete="off"
                />
            </Block>
        </>
    );
};

export default StartdatoPermisjonMor;
