export interface IEntity {
    name: string
    coordinate: ICoordinate
    labels: string[]
    _id?: string
}

export type ICoordinate = [string, string]
