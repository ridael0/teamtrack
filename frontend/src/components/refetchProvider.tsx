import { createContext, useContext, useState } from "react"

type RefetchContextType = {
    isRefetch: boolean, 
    Refetch: () => void,
}

const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const RefetchProvider = ({children}: {children: React.ReactNode}) => {
    const [isRefetch, setRefetch] = useState(false);

    const Refetch = () => {
        setRefetch((prevState) => !prevState);
    }
    
    return <RefetchContext.Provider value={{isRefetch, Refetch}}>
        {children}
    </RefetchContext.Provider>
}

export const useRefetchContext = () => {
    const context = useContext(RefetchContext);

    if(!context){
        throw new Error("using RefetchContext must be within RefetchProvider.");
    }

    return context;
}