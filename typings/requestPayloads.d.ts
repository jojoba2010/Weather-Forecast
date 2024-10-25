export interface ISagaCb {
    sagaCB?: {
        onSuccess?: (payload?: any) => void
        onError?: (error?: any) => void
        successMessage?: string
    }
}

export interface IState {
    status: string
    data: any
    errors: any
}
