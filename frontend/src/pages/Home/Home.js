import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import '../Home/Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { useSelector } from 'react-redux';
import Tranding from "../../components/Tranding/Tranding";
import { useDispatch } from 'react-redux';
import { setValue } from "../../redux/slices/searchSlice";
import defaultThumbnail from '../../assets/default-thumbnail.jpg';

function Home() {
	const data = useSelector((state) => state.bookmarkedSlice.DATA);
	const searchValue = useSelector((state) => state.searchSlice.value.searchValue);
	const yearValue = useSelector((state) => state.searchSlice.value.year);
	const [apiData, setApiData] = useState([]);
	const [itemsCount, setItemsCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const wrap = useRef('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setValue(''));
	}, [dispatch]);

	useEffect(() => {
		if (searchValue) {
			const fetchData = async (page = 1) => {
				setLoading(true);
				try {
					// Monta a URL da requisição
					const response = await axios.get('https://zmovies-backend.vercel.app/api/movies/', {
						params: {
							search: searchValue,
							year: yearValue || undefined, // Inclui o ano apenas se ele estiver definido
							page: page
						}
					});
					console.log(response.data);
					setApiData((prevData) => [...prevData, ...response.data.results]);
				} catch (error) {
					console.error('Erro ao buscar dados:', error);
				} finally {
					setLoading(false);
				}
			};

			fetchData(currentPage);
		} else {
			setApiData([]);
			setCurrentPage(1);
		}
	}, [searchValue, yearValue, currentPage]); // Adiciona yearValue como dependência

	useEffect(() => {
		setItemsCount(wrap.current ? wrap.current.childElementCount : 0);
	}, [searchValue, apiData]);

	useEffect(() => {
		setCurrentPage(1);
		setApiData([]);
	}, [searchValue, yearValue]); // Reseta a página e os dados quando o valor da pesquisa ou o ano mudam

	const loadMore = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const getThumbnail = (item) => {
		const large = item.thumbnail?.regular?.large;
		const medium = item.thumbnail?.regular?.medium;
		const small = item.thumbnail?.regular?.small;

		if (large && large !== 'N/A') return large;
		if (medium && medium !== 'N/A') return medium;
		if (small && small !== 'N/A') return small;

		return defaultThumbnail;
	};

	return (
		<>
			<Navbar />
			<section className="home">
				<div className="container">
					<Search placeholder={"Search for movies or TV series"} />
					{loading && <div className="loading-spinner">Carregando...</div>}
					{searchValue && !loading? <span className='search-result show'>Found {itemsCount} results for "{searchValue}"</span>: <></>}
					{!searchValue && <Tranding data={data} />}
					{!searchValue && <h2 className="recomended__title heading">Recommended for you</h2>}
					<ul className="wrapper" ref={wrap}>
						{(searchValue ? apiData : data).filter((item) => {
							if (!searchValue) {
								return item;
							}
							return item.title.toLowerCase().includes(searchValue.toLowerCase());
						}).map((item) =>
							<Card
								key={item.id}
								id={item.id}
								title={item.title}
								thumbnail={getThumbnail(item)}
								year={item.year}
								rating={item.rating}
								category={item.category}
								bookmark={item.isBookmarked}
							/>
						)}
					</ul>
					{searchValue && (
						<button onClick={loadMore} className="load-more">
							Load More
						</button>
					)}
				</div>
			</section>
		</>
	);
}

export default Home;