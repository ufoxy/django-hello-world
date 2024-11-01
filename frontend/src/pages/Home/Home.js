import React, { useEffect, useState, useRef } from "react";
import axios from 'axios'; // Importa o axios
import '../Home/Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { useSelector } from 'react-redux';
import Tranding from "../../components/Tranding/Tranding";
import { useDispatch } from 'react-redux';
import { setValue } from "../../redux/slices/searchSlice";

function Home() {
	const data = useSelector((state) => state.bookmarkedSlice.DATA);
	const searchValue = useSelector((state) => state.searchSlice.value);
	const [apiData, setApiData] = useState([]); // Para armazenar os dados da API
	const [itemsCount, setItemsCount] = useState(0);
	const wrap = useRef('');
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(setValue(''));
	}, [dispatch]);

	useEffect(() => {
		if (searchValue) {
			// Função para buscar dados na API
			const fetchData = async () => {
				try {
					const response = await axios.get(`https://zmovies-backend.vercel.app/api/movies/?search=${searchValue}`, {
						params: { query: searchValue } // Envia o parâmetro de consulta
					});
					setApiData(response.data); // Atualiza o estado com os dados da API
				} catch (error) {
					console.error('Erro ao buscar dados:', error);
				}
			};

			fetchData();
		} else {
			// Se não houver searchValue, reseta os dados da API
			setApiData([]);
		}
	}, [searchValue]);

	useEffect(() => {
		setItemsCount(wrap.current ? wrap.current.childElementCount : 0);
	}, [searchValue, apiData]); // Atualiza o contador de itens baseado no searchValue e na apiData

	return (
		<>
			<Navbar />
			<section className="home">
				<div className="container">
					<Search placeholder={"Search for movies or TV series"} />
					{searchValue && <span className='search-result show'>Found {itemsCount} results for "{searchValue}"</span>}
					{!searchValue && <Tranding data={data} />}
					{!searchValue && <h2 className="recomended__title heading">Recommended for you</h2>}
					<ul className="wrapper" ref={wrap}>
						{(searchValue ? apiData : data).filter((item) => {
							if (!searchValue) {
								return item; // Retorna todos os itens se não houver searchValue
							}
							return item.title.toLowerCase().includes(searchValue.toLowerCase()); // Filtra os itens baseados no searchValue
						}).map((item) =>
							<Card
								key={item.id}
								id={item.id}
								title={item.title}
								thumbnail={item.thumbnail.regular.medium}
								year={item.year}
								rating={item.rating}
								category={item.category}
								bookmark={item.isBookmarked}
							/>
						)}
					</ul>
				</div>
			</section>
		</>
	);
}

export default Home;