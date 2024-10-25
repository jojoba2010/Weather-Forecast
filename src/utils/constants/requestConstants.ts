import { IState } from '@typings/requestPayloads'
import { STATUS } from '@features/General'

export const initialState: IState = {
    status: STATUS.IDLE,
    data: null,
    errors: null
}

export const API_KEY="0e0a74a08bbd47ecb547481141d3dc6f"
export const BASEURL="https://api.weatherbit.io/v2.0/"