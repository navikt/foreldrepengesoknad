import { readFileSync } from 'node:fs';
import * as ts from 'typescript';

/**
 * Henter ut statiske i18n-nøkler (`id`) som koden refererer til, via TypeScript sin AST.
 *
 * Erstatter `extract` fra `@formatjs/cli-lib`. Vi bruker aldri auto-genererte ID-er
 * (alle meldinger har eksplisitte streng-ID-er), så vi trenger kun å plukke ut `id` fra:
 * - `formatMessage({ id: '...' })` (typisk `intl.formatMessage(...)`)
 * - `<FormattedMessage id="..." />`
 * - `defineMessages({ ... })`
 *
 * Dynamiske ID-er (template-literaler med innsetting, f.eks. `` `ettersendelse.${x}` ``)
 * ignoreres – akkurat som FormatJS gjorde.
 */
export const extractMessageIds = (files: string[]): string[] => {
    const ids: string[] = [];
    for (const file of files) {
        const content = readFileSync(file).toString();
        const scriptKind = file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
        const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, scriptKind);
        visit(sourceFile, ids);
    }
    return [...new Set(ids)];
};

const visit = (node: ts.Node, ids: string[]): void => {
    if (ts.isCallExpression(node)) {
        const fnName = getCalleeName(node.expression);
        const firstArgument = node.arguments[0];
        if (firstArgument !== undefined) {
            if (fnName === 'formatMessage') {
                collectIdFromObject(firstArgument, ids);
            } else if (fnName === 'defineMessages') {
                collectIdsFromMessagesObject(firstArgument, ids);
            }
        }
    } else if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        if (getJsxTagName(node.tagName) === 'FormattedMessage') {
            collectIdFromJsxAttributes(node.attributes, ids);
        }
    }
    ts.forEachChild(node, (child) => visit(child, ids));
};

/** Returnerer funksjonsnavnet for `foo()` og `obj.foo()`. */
const getCalleeName = (expression: ts.Expression): string | undefined => {
    if (ts.isIdentifier(expression)) {
        return expression.text;
    }
    if (ts.isPropertyAccessExpression(expression)) {
        return expression.name.text;
    }
    return undefined;
};

/** Returnerer JSX-tagnavnet, f.eks. `FormattedMessage` for `<Intl.FormattedMessage>`. */
const getJsxTagName = (tagName: ts.JsxTagNameExpression): string | undefined => {
    if (ts.isIdentifier(tagName)) {
        return tagName.text;
    }
    if (ts.isPropertyAccessExpression(tagName)) {
        return tagName.name.text;
    }
    return undefined;
};

/** Plukker ut `id` fra et meldingsdeskriptor-objekt: `{ id: '...' }`. */
const collectIdFromObject = (node: ts.Node, ids: string[]): void => {
    if (!ts.isObjectLiteralExpression(node)) {
        return;
    }
    for (const property of node.properties) {
        if (
            ts.isPropertyAssignment(property) &&
            getPropertyName(property.name) === 'id'
        ) {
            const id = getStaticString(property.initializer);
            if (id !== undefined) {
                ids.push(id);
            }
        }
    }
};

/** Plukker ut `id` fra hvert deskriptor-objekt i `defineMessages({ a: {...}, b: {...} })`. */
const collectIdsFromMessagesObject = (node: ts.Node, ids: string[]): void => {
    if (!ts.isObjectLiteralExpression(node)) {
        return;
    }
    for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) {
            collectIdFromObject(property.initializer, ids);
        }
    }
};

/** Plukker ut `id="..."` eller `id={'...'}` fra JSX-attributter. */
const collectIdFromJsxAttributes = (attributes: ts.JsxAttributes, ids: string[]): void => {
    for (const attribute of attributes.properties) {
        if (
            ts.isJsxAttribute(attribute) &&
            attribute.name.getText() === 'id' &&
            attribute.initializer !== undefined
        ) {
            const id = getJsxAttributeString(attribute.initializer);
            if (id !== undefined) {
                ids.push(id);
            }
        }
    }
};

const getPropertyName = (name: ts.PropertyName): string | undefined => {
    if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
        return name.text;
    }
    return undefined;
};

const getJsxAttributeString = (
    initializer: ts.JsxAttributeValue,
): string | undefined => {
    if (ts.isStringLiteral(initializer)) {
        return initializer.text;
    }
    if (ts.isJsxExpression(initializer) && initializer.expression !== undefined) {
        return getStaticString(initializer.expression);
    }
    return undefined;
};

/** Returnerer verdien for statiske strenger, men ignorerer dynamiske template-literaler. */
const getStaticString = (node: ts.Expression): string | undefined => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        return node.text;
    }
    return undefined;
};
