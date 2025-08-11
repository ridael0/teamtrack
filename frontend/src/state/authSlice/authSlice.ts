import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    token: string,
    admin: {
        id: string,
        name: string,
        email: string,
    },
    status: 'error' | 'loading' | 'login' | 'logout',
    error: string,
}



const getInitialState = (): AuthState => {
    const admin_auth_state = localStorage.getItem('admin_auth_state');
    const { token, admin } = admin_auth_state ? JSON.parse(admin_auth_state) : {token: '', admin: {id: '', name: '', email: ''}} 
    return {
        token,
        admin,
        status: token ? 'login' : 'logout',
        error: '',
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        logout: () => {
            localStorage.removeItem('admin_auth_state');
            return {
                ...getInitialState(),
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                return {
                    ...state,
                    status: 'loading',
                    error: '',
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                const {token, id, name, email} = action.payload;
                localStorage.setItem('admin_auth_state', JSON.stringify({
                    token,
                    admin: {id, name, email}
                }))
                return {
                    ...state,
                    token,
                    admin: {id,name,email},
                    status: 'login',
                    error: ''
                }
            })
            .addCase(login.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'error',
                    error: String(action?.payload) || 'Somthing went wrong !',
                }
            })
            .addCase(createAccount.pending, (state) => {
                return {
                    ...state,
                    status: 'loading',
                    error: '',
                }
            })
            .addCase(createAccount.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'error',
                    error: String(action?.payload) || 'Somthing went wrong !',
                }
            })

    }, 
});

export const login = createAsyncThunk("auth/login", async ({email, password}: {email: string, password: string}, thunkAPI) => {
    try {
        const response = await fetch(import.meta.env.VITE_api_login, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if(!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage);
        }
        return response.json();
    }catch (error: any){
        return thunkAPI.rejectWithValue(error?.message);
    }
});

export const createAccount = createAsyncThunk('auth/createAccount', async ({name, email, password}: {name: string, email: string, password: string}, thunkAPI) => {
    try {
        const response = await fetch(import.meta.env.VITE_api_register, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        if(!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        thunkAPI.dispatch(login({email,password}));
    }catch (error: any){
        return thunkAPI.rejectWithValue(error?.message);
    }
})

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;