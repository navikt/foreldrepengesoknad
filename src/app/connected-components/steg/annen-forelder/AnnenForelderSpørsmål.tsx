import * as React from 'react';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import FødselsnummerBolk from '../../../bolker/FødselsnummerBolk';
import NavnPåAnnenForelderSpørsmål from '../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import Søknad, { Søkersituasjon, Skjemanummer } from '../../../types/søknad/Søknad';
import { InjectedIntlProps, FormattedMessage, injectIntl } from 'react-intl';
import ErMorUførSpørsmål from '../../../spørsmål/ErMorUførSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import ErAnnenForelderInformertSpørsmål from '../../../spørsmål/ErAnnenForelderInformertSpørsmål';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import AleneOmOmsorgSpørsmål from '../../../spørsmål/AleneOmOmsorgSpørsmål';
import { Søker } from '../../../types/søknad/Søker';
import RettPåForeldrepengerSpørsmål from '../../../spørsmål/RettPåForeldrepengerSpørsmål';
import { Barn, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AnnenForelderStegVisibility } from './visibility/annenForelderStegVisibility';

export interface OwnProps {
    annenForelder: AnnenForelder;
    søkerFnr: string;
    søker: Søker;
    søknad: Partial<Søknad>;
    situasjon: Søkersituasjon;
    vis: AnnenForelderStegVisibility;
    barn: Barn;
    onBarnChange: (barn: Partial<Barn>) => void;
    onAnnenForelderChange: (barn: Partial<AnnenForelder>) => void;
    onSøkerChange: (søker: Partial<Søker>) => void;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AnnenForelderSpørsmål extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.annenForelderKanIkkeOppgis = this.annenForelderKanIkkeOppgis.bind(this);
    }
    annenForelderKanIkkeOppgis() {
        this.props.onAnnenForelderChange({
            kanIkkeOppgis: !this.props.annenForelder.kanIkkeOppgis,
            fornavn: undefined,
            etternavn: undefined,
            fnr: undefined,
            utenlandskFnr: undefined,
            harRettPåForeldrepenger: undefined
        });
    }
    render() {
        const {
            søkerFnr,
            søker,
            annenForelder,
            barn,
            situasjon,
            vis,
            onAnnenForelderChange,
            onBarnChange,
            onSøkerChange,
            onFileDelete,
            onFilesSelect,
            intl
        } = this.props;
        const { kanIkkeOppgis, fornavn, etternavn } = annenForelder!;

        return (
            <>
                <Block margin="xs" visible={vis.navnPåAnnenForelder}>
                    <NavnPåAnnenForelderSpørsmål
                        fornavn={fornavn}
                        etternavn={etternavn}
                        kanIkkeOppgis={kanIkkeOppgis}
                        onChange={onAnnenForelderChange}
                    />
                </Block>

                <Block visible={vis.kanIkkeOppgis}>
                    <Checkbox
                        checked={kanIkkeOppgis || false}
                        label={
                            situasjon === Søkersituasjon.ADOPSJON
                                ? getMessage(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : getMessage(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                        onChange={this.annenForelderKanIkkeOppgis}
                    />
                </Block>

                <Block visible={vis.fødselsnummer} hasChildBlocks={true}>
                    <FødselsnummerBolk
                        kanIkkeOppgis={kanIkkeOppgis}
                        søkersFødselsnummer={søkerFnr}
                        navn={fornavn}
                        fnr={annenForelder.fnr}
                        utenlandskFnr={annenForelder.utenlandskFnr}
                        bostedsland={annenForelder.bostedsland}
                        onChange={onAnnenForelderChange}
                    />
                </Block>

                <Block visible={vis.deltOmsorg}>
                    <AleneOmOmsorgSpørsmål
                        aleneOmOmsorg={søker.erAleneOmOmsorg}
                        onChange={(deltOmsorg) => onSøkerChange({ erAleneOmOmsorg: !deltOmsorg })}
                    />
                </Block>

                <Block visible={vis.harRettPåForeldrepenger}>
                    <RettPåForeldrepengerSpørsmål
                        navnAnnenForelder={annenForelder.fornavn}
                        harAnnenForelderRettPåForeldrepenger={annenForelder.harRettPåForeldrepenger}
                        onChange={(harRettPåForeldrepenger) => onAnnenForelderChange({ harRettPåForeldrepenger })}
                    />
                </Block>

                <Block visible={vis.erMorUfør}>
                    <ErMorUførSpørsmål
                        navn={annenForelder.fornavn}
                        erUfør={annenForelder.erUfør}
                        onChange={(erUfør) => onAnnenForelderChange({ erUfør })}
                    />
                </Block>

                <Block visible={vis.harRettPåForeldrepenger && annenForelder.harRettPåForeldrepenger === true}>
                    <Veilederinfo>
                        {getMessage(intl, 'annenForelder.veileder.rettigheterOgDelingAvUttaksplan', {
                            navn: annenForelder.fornavn
                        })}
                    </Veilederinfo>
                </Block>

                <Block visible={vis.erAnnenForelderInformert}>
                    <ErAnnenForelderInformertSpørsmål
                        navn={annenForelder.fornavn}
                        erAnnenForelderInformert={annenForelder.erInformertOmSøknaden}
                        onChange={(erInformertOmSøknaden) => onAnnenForelderChange({ erInformertOmSøknaden })}
                    />
                </Block>
                <Block visible={vis.foreldreansvarsdato}>
                    <DatoInput
                        name="omsorgsovertakelseDato"
                        id="omsorgsovertakelseDato"
                        label={getMessage(intl, 'omsorgsovertakelseDato.spørsmål')}
                        onChange={(foreldreansvarsdato: Date | undefined) => onBarnChange({ foreldreansvarsdato })}
                        dato={(barn as ForeldreansvarBarn).foreldreansvarsdato}
                    />
                </Block>

                <Block
                    visible={vis.foreldreansvarsdato && (barn as ForeldreansvarBarn).foreldreansvarsdato !== undefined}>
                    <Block margin="xs">
                        <Veilederinfo>
                            <FormattedMessage id="far.omsorgsovertakelse.vedlegg.veileder" />
                        </Veilederinfo>
                    </Block>

                    <AttachmentsUploaderPure
                        attachments={barn.omsorgsovertakelseDato || []}
                        attachmentType={AttachmentType.OMSORGSOVERTAKELSEDATO}
                        onFilesSelect={onFilesSelect}
                        onFileDelete={onFileDelete}
                        skjemanummer={Skjemanummer.OMSORGSOVERTAKELSESDATO}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(AnnenForelderSpørsmål);
