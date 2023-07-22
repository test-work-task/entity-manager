import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IEntity } from '../../interfaces/entity.interface';

const apiUrl = import.meta.env.VITE_API_URL
const headers = { 'Content-Type': 'application/json' }

export const fetchEntities = createAsyncThunk(
    'entities/fetchEntities',
    async function () {
        const response = await fetch(apiUrl)
        return (await response.json()) as IEntity[]
    }
)
export const deleteEntity = createAsyncThunk(
    'entities/deleteEntity',
    async function (id: string, { dispatch }) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        dispatch(removeEntity({ id }))
    }
)
export const addEntity = createAsyncThunk(
    'entities/createEntity',
    async function (newEntity: IEntity) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(newEntity)
        })
        return (await response.json()) as IEntity
    }
)
export const editEntity = createAsyncThunk(
    'entities/editEntity',
    async function (newEntity: IEntity) {
        const response = await fetch(`${apiUrl}/${newEntity._id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(newEntity)
        })
        return (await response.json()) as IEntity
    }
)

interface entitiesState {
    status: null | string
    errors: null | string
    entities: IEntity[]
    curentEntityIndex: null | number
}

const entitiesSlice = createSlice({
    name: 'entities',
    initialState: {
        status: null,
        errors: null,
        curentEntityIndex: null,
        entities: []
    } as entitiesState,
    reducers: {
        setCurentEntityIndex(state, action) {
            state.curentEntityIndex = action.payload.index
        },
        removeEntity(state, action) {
            state.entities = state.entities.filter(entity => entity._id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntities.pending, (state) => {
                state.errors = null;
            })
            .addCase(fetchEntities.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.entities = action.payload;
            })
            .addCase(addEntity.pending, (state) => {
                state.errors = null;
                state.status = 'loading';
            })
            .addCase(addEntity.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.entities.push(action.payload);
            })
            .addCase(editEntity.pending, (state) => {
                state.errors = null;
                state.status = 'loading';
            })
            .addCase(editEntity.fulfilled, (state, action) => {
                state.status = 'resolved';
                if (state.curentEntityIndex === null) return;
                state.entities[state.curentEntityIndex].coordinate = action.payload.coordinate;
                state.entities[state.curentEntityIndex].name = action.payload.name;
                state.entities[state.curentEntityIndex].labels = action.payload.labels;
            })
    },
});

export const { setCurentEntityIndex, removeEntity } = entitiesSlice.actions;
export default entitiesSlice.reducer;