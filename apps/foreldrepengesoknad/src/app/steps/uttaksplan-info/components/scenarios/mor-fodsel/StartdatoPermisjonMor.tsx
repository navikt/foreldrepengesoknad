import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import {
    Barn,
    Block,
    ISOStringToDate,
    Tidsperioden,
    Uttaksdagen,
    bemUtils,
    getValidTidsperiode,
    getVarighetString,
    intlUtils,
    isFødtBarn,
    uttaksConstants,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';

import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import VeilederStartdatoPermisjon from './VeilederStartdatoPermisjon';
import { MorFødselFormComponents, MorFødselFormField } from './morFødselFormConfig';
import './startdatoPermisjonMor.less';
import { validateErStartdatoFørTermindato } from './validation/morFodselValidering';

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
    termindato: string | undefined;
    barn: Barn;
}

const StartdatoPermisjonMor: FunctionComponent<Props> = ({
    permisjonStartdato,
    skalIkkeHaUttakFørTermin,
    termindato,
    barn,
}) => {
    const intl = useIntl();
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
    const startdato = skalIkkeHaUttakFørTermin !== true ? permisjonStartdato : undefined;
    const tidsperiode = getValidTidsperiode({
        fom: ISOStringToDate(startdato)!,
        tom: sisteUttaksdagFørTermin,
    });
    const antallDager = tidsperiode ? Tidsperioden(tidsperiode).getAntallUttaksdager() : 0;
    const antallDagerFørFødselIhtRegler = uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5;
    const visVeileder = antallDager !== antallDagerFørFødselIhtRegler;

    const datoAvgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(
        familiehendelsesdatoDate,
        termindato ? dayjs(termindato).toDate() : undefined,
    );
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
                            defaultMonth: ISOStringToDate(permisjonStartdato) || familiehendelsesdatoDate,
                        }}
                        validate={validateErStartdatoFørTermindato(
                            intl,
                            familiehendelsesdatoDate,
                            skalIkkeHaUttakFørTermin,
                            termindato,
                        )}
                        disableWeekend
                        placeholder={'dd.mm.åååå'}
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
