import * as React from 'react';
import { useIntl } from 'react-intl';
import { UtenlandsoppholdFormData } from 'app/steps/utenlandsopphold/utenlandsoppholdFormTypes';
import dayjs from 'dayjs';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import LandOppsummering from './LandOppsummering';
import { Block, DisplayTextWithLabel } from '@navikt/fp-common';
import { Label } from '@navikt/ds-react';

interface Props {
    barn: OmBarnetFormData;
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData;
}

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData
) => {
    return (
        informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd.some((tidligereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, tidligereOpphold.fom, tidligereOpphold.tom)
        ) ||
        informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd.some((senereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, senereOpphold.fom, senereOpphold.tom)
        )
    );
};

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({ barn, informasjonOmUtenlandsopphold }) => {
    const intl = useIntl();

    return (
        <Block>
            {informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge" />
            ) : (
                <div className="textWithLabel">
                    <Label className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </Label>
                    <LandOppsummering
                        utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd}
                    />
                </div>
            )}
            {informasjonOmUtenlandsopphold.skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.neste12mnd')}
                    text={getMessage(intl, 'medlemmskap.radiobutton.boNorge')}
                />
            ) : (
                <div className="textWithLabel">
                    <Label className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.neste12mnd')}
                    </Label>
                    <LandOppsummering
                        utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd}
                    />
                </div>
            )}
            {barn.erBarnetFødt === YesOrNo.NO && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(barn.termindato!, informasjonOmUtenlandsopphold)
                            ? getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
                    }
                />
            )}
            {barn.erBarnetFødt === YesOrNo.YES && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.varPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            barn.fødselsdatoer[0],
                            informasjonOmUtenlandsopphold
                        )
                            ? getMessage(intl, 'oppsummering.utenlandsopphold.iUtlandet')
                            : getMessage(intl, 'oppsummering.utenlandsopphold.iNorge')
                    }
                />
            )}
        </Block>
    );
};

export default UtenlandsoppholdOppsummering;
