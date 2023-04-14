import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { VelkommenFormComponents, VelkommenFormData, VelkommenFormField } from '../../velkommenFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import SøknadStatusEtikett from '../SøknadStatus';
import { validateHarValgtEtBarn } from '../../validation/velkommenValidation';
import { formaterFødselsdatoerPåBarn, formaterNavnPåBarn, getTekstForAntallBarn } from 'app/utils/barnUtils';
import { Sak } from 'app/types/Sak';
import { RegistrertAnnenForelder } from 'app/types/Person';

import './barnVelger.less';
import { BodyShort } from '@navikt/ds-react';

export enum SelectableBarnType {
    FØDT = 'født',
    UFØDT = 'ufødt',
    ADOPTERT = 'adoptert',
    IKKE_UTFYLT = 'ikkeUtfylt',
}

export enum SelectableBarnOptions {
    SØKNAD_GJELDER_NYTT_BARN = 'søknad_gjeder_nytt_barn',
}

export interface SelectableBarn {
    id: string;
    type: SelectableBarnType;
    antallBarn: number;
    sortableDato: Date;
    fnr?: string[];
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: Sak;
    annenForelder?: RegistrertAnnenForelder;
    familiehendelsesdato?: Date;
    startdatoFørsteStønadsperiode?: Date;
    alleBarnaLever: boolean;
}

interface Props {
    selectableBarn: SelectableBarn[];
    visibility: QuestionVisibility<VelkommenFormField>;
    formValues: VelkommenFormData;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const getRadioForNyttBarn = (intl: IntlShape): any => {
    return {
        label: (
            <>
                <BodyShort className="radioTittle" size="medium">
                    {intlUtils(intl, 'omBarnet.gjelderAnnetBarn')}
                </BodyShort>
                <Block margin="l">
                    <BodyShort size="small"> {intlUtils(intl, 'velkommen.intro.harSaker.barnVelger.info')}</BodyShort>
                </Block>
            </>
        ),
        value: SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN,
        className: 'radioGroupButton',
    };
};

const getSakstatus = (sakErFerdigbehandlet: boolean) => {
    return (
        <Block className="radioDescription" margin="l">
            <SøknadStatusEtikett sakErFerdigbehandlet={sakErFerdigbehandlet}></SøknadStatusEtikett>
        </Block>
    );
};

const getTittelForUfødtBarn = (antallBarn: number, termindato: Date, intl: IntlShape): string => {
    const barnTekst = getTekstForAntallBarn(antallBarn, intl);
    return intlUtils(intl, 'velkommen.barnVelger.ufødtBarn', {
        antallBarnTekst: barnTekst,
        termin: formatDate(termindato),
    });
};

const getRadioForUfødtBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const tittel = getTittelForUfødtBarn(barn.antallBarn, barn.termindato!, intl);
    const saksStatus = barn.sak !== undefined ? getSakstatus(barn.sak.åpenBehandling === undefined) : undefined;
    const saksnummerTekst =
        barn.sak !== undefined
            ? intlUtils(intl, 'velkommen.barnVelger.saksnummer', { saksnummer: barn.sak.saksnummer })
            : '';
    const harSak = barn.sak !== undefined;

    return {
        label: (
            <>
                <BodyShort className="radioTittle" size="medium">
                    {tittel}
                </BodyShort>

                {harSak && (
                    <>
                        <BodyShort size="small" className="radioDescription">
                            {saksnummerTekst}
                        </BodyShort>
                        {saksStatus}
                    </>
                )}
            </>
        ),
        value: barn.id,
        className: 'radioGroupButton',
    };
};

const getRadioForFødtEllerAdoptertBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const navnTekstEllerBarnMedUkjentNavnTekst = formaterNavnPåBarn(
        barn.fornavn,
        barn.fødselsdatoer,
        barn.omsorgsovertagelse,
        barn.alleBarnaLever,
        barn.antallBarn,
        intl
    );
    const fødselsdatoerTekst = formaterFødselsdatoerPåBarn(barn.fødselsdatoer);
    const fødtAdoptertDatoTekst =
        barn.type === SelectableBarnType.FØDT || barn.type === SelectableBarnType.IKKE_UTFYLT
            ? fødselsdatoerTekst
            : formatDate(barn.omsorgsovertagelse!);
    const situasjonTekst =
        barn.type === SelectableBarnType.FØDT || barn.type === SelectableBarnType.IKKE_UTFYLT
            ? intlUtils(intl, 'velkommen.barnVelger.født')
            : intlUtils(intl, 'velkommen.barnVelger.adopsjon');

    const saksnummerTekst =
        barn.sak !== undefined
            ? intlUtils(intl, 'velkommen.barnVelger.saksnummer', { saksnummer: barn.sak.saksnummer })
            : '';
    const saksStatus = barn.sak !== undefined ? getSakstatus(barn.sak.åpenBehandling === undefined) : undefined;
    return {
        label: (
            <>
                <BodyShort size="medium" className="radioTittle">
                    {navnTekstEllerBarnMedUkjentNavnTekst}
                </BodyShort>
                {barn.alleBarnaLever && (
                    <BodyShort size="small" className="radioDescription">
                        {situasjonTekst} {fødtAdoptertDatoTekst}
                    </BodyShort>
                )}
                <BodyShort size="small">{saksnummerTekst}</BodyShort>
                {saksStatus !== undefined && saksStatus}
            </>
        ),
        value: barn.id,
        name: VelkommenFormField.valgteBarn,
        className: 'radioGroupButton',
    };
};

const getCheckboxForBarn = (barn: SelectableBarn, intl: IntlShape): any => {
    const barnType = barn.type;
    switch (barnType) {
        case SelectableBarnType.FØDT:
        case SelectableBarnType.ADOPTERT:
        case SelectableBarnType.IKKE_UTFYLT:
            return getRadioForFødtEllerAdoptertBarn(barn, intl);
        case SelectableBarnType.UFØDT:
            return getRadioForUfødtBarn(barn, intl);
        default:
            return undefined;
    }
};

const BarnVelger: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();

    return (
        <Block visible={props.visibility.isVisible(VelkommenFormField.valgteBarn)}>
            <Block margin="xl">
                <VelkommenFormComponents.RadioGroup
                    legend={intlUtils(intl, 'velkommen.intro.harSaker.barnVelger.label')}
                    name={VelkommenFormField.valgteBarn}
                    validate={validateHarValgtEtBarn(intl)}
                    radios={props.selectableBarn
                        .map((barnet) => getCheckboxForBarn(barnet, intl))
                        .concat([getRadioForNyttBarn(intl)])}
                />
            </Block>
        </Block>
    );
};

export default BarnVelger;
