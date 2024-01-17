import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import './ItemDetail.css';
import {useLoading} from './LoadingContext'

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const  {setLoading } = useLoading(); // 로딩 창

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setItem(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      })
  }, [id, setLoading]);

  if (!item) {
    return null;
  }

  return (
    <div className='item-detail'>
        <Header/>
      <h2>{item.title}</h2>
      <img src={item.image} alt={item.title} />
      <p>{item.description}</p>
      <p>가격: ${item.price}</p>
      <p>평점: {item.rating.rate} ({item.rating.count} 리뷰)</p>
    </div>
  );
};

export default ItemDetail;