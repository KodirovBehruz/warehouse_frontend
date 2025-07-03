export interface IResponseJSON<DataType> {
    result?: DataType | null
    error?: string | null
}

export interface IApiResult<DataType> {
    value?: DataType | null
    error?: string | null
}

export interface GetListResponse<DataType> {
    data: DataType[]
}