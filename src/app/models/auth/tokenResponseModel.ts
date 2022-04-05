import { ResponseModel } from './../responses/responseModel';
import { TokenModel } from './tokenModel';

export interface TokenRespoinseModel extends ResponseModel{
    accessToken:TokenModel;
    refreshToken:TokenModel;
}