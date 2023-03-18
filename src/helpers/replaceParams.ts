export interface ContentParam {
    name: string;
    content: string;
}

export const replaceParams = (content: string, params: ContentParam[]): string => {
    return params.reduce((result, param) => result.replace(`{$${param.name}}`, param.content), content);
};
