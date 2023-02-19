export interface IResult {
    title?: string;
    outlines?: string[];
    content?: string ;
    createdBy?: string;
    usage?: {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
    };
}
