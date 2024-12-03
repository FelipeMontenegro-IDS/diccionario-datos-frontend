import { AxiosRequestConfig } from "axios";
import { ISchema } from "../interfaces/ISchema";
import { ITable } from "../interfaces/ITable";
import api from "./http.common"
import { ITableStructure } from "../interfaces/ITableStructure";
import { IAddDescripcionTableWrite } from "../interfaces/IAddDescripcionTable";
import { IBaseResponseDTO } from "../interfaces/dtos/IBaseResponseDTO";

export const GetAllSchemas = async () => {
    const response = api.get<ISchema[]>(`/schema`);
    return response;
}

export const GetAllTablesByNameAndSchema = async (schema: string = "per", config?: AxiosRequestConfig) => {
    const response = api.get<ITable[]>(`/tables/${schema}`, config);
    return response;
}

export const GetAllTableStructureByNameAndSchema = async (name: string, schema: string) => {
    const response = api.get<ITableStructure[]>(`/tables-structure/${name}/${schema}`);
    return response;
}

export const SaveDescriptionTable = async (tableDescription: IAddDescripcionTableWrite) => {
    const response = api.post<IBaseResponseDTO>(`/table`, tableDescription);
    return response;
}