import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './component/MainPage';
import ItemDetail from './component/ItemDetail';
import { LoadingProvider,useLoading} from "./component/LoadingContext.js";
import Spinner from './component/Spinner';

const App = () => {
    return (
        <LoadingProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/item/:id" element={<ItemDetail />} />
                </Routes>
            </Router>
            <LoadingComponent />
        </LoadingProvider>
    );
  };
  const LoadingComponent = () => {
    const { loading } = useLoading(); 

    return loading ? <Spinner /> : null; 
};

  
  export default App;