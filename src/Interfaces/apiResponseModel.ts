export default interface apiResponseModel {
    data?:{
        statusCode?: number,
        isSuccess?: boolean,
        errorMessages?: Array<string>,
        result:{
            [key: string] : string
        }
    },
    error?: any
}