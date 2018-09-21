import * as React from 'react';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import FødselsnummerBolk from '../../../bolker/F\u00F8dselsnummerBolk';
import NavnPåAnnenForelderSpørsmål from '../../../sp\u00F8rsm\u00E5l/NavnP\u00E5AnnenForelderSp\u00F8rsm\u00E5l';
import Søknad, { Søkersituasjon, Skjemanummer } from '../../../types/s\u00F8knad/S\u00F8knad';
import { InjectedIntlProps, FormattedMessage, injectIntl } from 'react-intl';
import ErMorUførSpørsmål from '../../../sp\u00F8rsm\u00E5l/ErMorUf\u00F8rSp\u00F8rsm\u00E5l';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import ErAnnenForelderInformertSpørsmål from '../../../sp\u00F8rsm\u00E5l/ErAnnenForelderInformertSp\u00F8rsm\u00E5l';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import AnnenForelder from '../../../types/s\u00F8knad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import AleneOmOmsorgSpørsmål from '../../../sp\u00F8rsm\u00E5l/AleneOmOmsorgSp\u00F8rsm\u00E5l';
import { Søker } from '../../../types/s\u00F8knad/S\u00F8ker';
import RettPåForeldrepengerSpørsmål from '../../../sp\u00F8rsm\u00E5l/RettP\u00E5ForeldrepengerSp\u00F8rsm\u00E5l';
import { Barn, ForeldreansvarBarn } from '../../../types/s\u00F8knad/Barn';
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
                <Block visible={vis.omsorgsovertakelseDato}>
                    <DatoInput
                        name="omsorgsovertakelseDato"
                        id="omsorgsovertakelseDato"
                        label={getMessage(intl, 'omsorgsovertakelseDato.spørsmål')}
                        onChange={(foreldreansvarsdato: Date | undefined) => onBarnChange({ foreldreansvarsdato })}
                        dato={(barn as ForeldreansvarBarn).foreldreansvarsdato}
                    />
                </Block>

                <Block
                    visible={
                        vis.omsorgsovertakelseDato && (barn as ForeldreansvarBarn).foreldreansvarsdato !== undefined
                    }>
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
