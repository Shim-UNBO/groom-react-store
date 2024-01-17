import React,{useState,useEffect} from "react";
import "./MainPage.css";
import Header from "./Header";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useLoading} from './LoadingContext'
import Spinner from './Spinner';

const MainPage = () => {
  const [products, setProducts] = useState([]); //  상품 목록 상태
  const [error, setError] = useState(''); // 에러 상태
  const  {setLoading } = useLoading(); // 로딩 창



    useEffect(() => {
        setLoading(true);
        axios.get('https://fakestoreapi.com/products?limit=10')
            .then((response) => {
            console.log(response);
            setProducts(response.data); // 상품 데이터 설정
            setLoading(false);
            })
        .catch((error) => {
          setError('데이터를 불러오는 데 실패했습니다.'); // 에러 메시지 설정
          setLoading(false);
        });
    }, [setLoading]);

    return (
        <div>   
            {loading && <Spinner />}
        <Header />
        {error && <p>{error}</p>}
            <div className="product-list">
                {products.map(product => (
                    <Link to={`/item/${product.id}`} key={product.id}>
                        <div className="product-item">
                            <img src={product.image} alt={product.title} />
                            <div className="product-text">
                                <h3>{product.title}</h3>
                                <p>가격: ${product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
    </div>
    );
};
export default MainPage;