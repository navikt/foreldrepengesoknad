import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Block, intlUtils, bemUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { MorFødselFormComponents, MorFødselFormField } from './morFødselFormConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { isFødtBarn } from 'app/context/types/Barn';
import { Tidsperioden, getValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import uttaksConstants from 'app/constants';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { validateErStartdatoFørTermindato } from 'app/steps/uttaksplan-info/validation/uttaksplanInfoValidering';
import VeilederStartdatoPermisjon from './VeilederStartdatoPermisjon';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { getVarighetString } from 'app/utils/dateUtils';

import './startdatoPermisjonMor.less';

const getVarighetForStartdato = (antallDager: number, barnetErFødt: boolean, intl: IntlShape): string | undefined =>
    antallDager > 0
        ? barnetErFødt
            ? intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.barnetErFødt.varighet', {
                  varighet: getVarighetString(antallDager, intl),
              })
            : intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.varighet', {
                  varighet: getVarighetString(antallDager, intl),
              })
        : undefined;

interface Props {
    permisjonStartdato: string;
    skalIkkeHaUttakFørTermin: boolean;
}

const StartdatoPermisjonMor: FunctionComponent<Props> = ({ permisjonStartdato, skalIkkeHaUttakFørTermin }) => {
    const intl = useIntl();
    const { barn } = useSøknad();
    const bem = bemUtils('datoInput');

    const erBarnFødt = isFødtBarn(barn);
    const spørsmålNår = erBarnFødt
        ? intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.barnetErFødt.label')
        : intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.label');

    const spørsmålHaddeIkke = erBarnFødt
        ? intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.skalIkkeHaUttak.barnetErFødt.label')
        : intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjon.skalIkkeHaUttak.label');

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = dayjs(familiehendelsesdato).toDate();
    const sisteUttaksdagFørTermin = Uttaksdagen(familiehendelsesdatoDate).forrige();
    const tidsperiode = getValidTidsperiode({
        fom: ISOStringToDate(permisjonStartdato)!,
        tom: sisteUttaksdagFørTermin,
    });
    const antallDager = tidsperiode ? Tidsperioden(tidsperiode).getAntallUttaksdager() : 0;
    const antallDagerFørFødselIhtRegler = uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5;
    const visVeileder = antallDager !== antallDagerFørFødselIhtRegler;

    const datoAvgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdato);
    const startdato = skalIkkeHaUttakFørTermin !== true ? permisjonStartdato : undefined;

    const maksDato = Uttaksdagen(familiehendelsesdatoDate).forrige();

    return (
        <>
            <Block padBottom="l">
                <div className={bem.block}>
                    <MorFødselFormComponents.DatePicker
                        name={MorFødselFormField.permisjonStartdato}
                        label={spørsmålNår}
                        disabled={skalIkkeHaUttakFørTermin}
                        maxDate={maksDato}
                        dayPickerProps={{
                            initialMonth: ISOStringToDate(permisjonStartdato) || familiehendelsesdatoDate,
                        }}
                        validate={validateErStartdatoFørTermindato(
                            intl,
                            familiehendelsesdatoDate,
                            skalIkkeHaUttakFørTermin
                        )}
                    />
                    <div className={bem.element('postfix')}>
                        {getVarighetForStartdato(antallDager, erBarnFødt, intl)}
                    </div>
                </div>
            </Block>
            <Block padBottom={visVeileder ? 'l' : 'm'}>
                <MorFødselFormComponents.Checkbox
                    name={MorFødselFormField.skalIkkeHaUttakFørTermin}
                    label={spørsmålHaddeIkke}
                    autoComplete="off"
                />
            </Block>
            <Block padBottom={visVeileder ? 'l' : 'm'} visible={visVeileder}>
                <VeilederStartdatoPermisjon
                    startdato={ISOStringToDate(startdato)}
                    antallDager={antallDager}
                    skalIkkeHaUttakFørTermin={skalIkkeHaUttakFørTermin === true}
                    antallDagerFørFødselIhtRegler={antallDagerFørFødselIhtRegler}
                    førsteMuligeStartdato={datoAvgrensninger.minDate ? new Date(datoAvgrensninger.minDate) : undefined}
                />
            </Block>
        </>
    );
};

export default StartdatoPermisjonMor;
