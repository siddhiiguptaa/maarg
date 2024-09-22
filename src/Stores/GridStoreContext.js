import React, { createContext, useContext } from 'react';
import GridStore from './GridStore';

const GridStoreContext = createContext(null);

const GridStoreProvider = ({ children, rows, columns }) => {
    const store = new GridStore(rows, columns);

    return (
        <GridStoreContext.Provider value={store}>
            {children}
        </GridStoreContext.Provider>
    )
}

const useGridStore = () => useContext(GridStoreContext);

export {
    GridStoreProvider, 
    useGridStore
}
