export interface ContentParam {
    name: string;
    content: string;
}

export const replaceParams = (content: string, params: ContentParam[]): string => {
    let result = content;
    params.forEach(param => {
        result = result.replace(`{$${param.name}}`, param.content);
    });
    
    return result;
};
