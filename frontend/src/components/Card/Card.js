import React from 'react';
import '../Card/Card.css';
import playIcon from '../../assets/icon-play.svg';
import { NavLink } from "react-router-dom";
import { ReactComponent as BookmarkEmpty } from '../../assets/icon-bookmark-empty.svg';
import { useDispatch } from 'react-redux';
import { addBookmark } from './../../redux/slices/bookmarkedSlice';
import { showFilmPage } from '../../redux/slices/playerSlice';
import iconMovie from '../../assets/icon-category-movie.svg';
import iconTV from '../../assets/icon-category-tv-series.svg';

function Card({ title, thumbnail, year, rating, category, id, bookmark }) {

	const icons = {
		"Movie" : iconMovie,
		"TV Series" : iconTV
	}

	const dispatch = useDispatch()

	function handleBookmarkClick(id) {
		dispatch(addBookmark({ id, isBookmarked: true }));
		if (bookmark === true) {
			dispatch(addBookmark({ id, isBookmarked: false }));
		}
	}

	const capitalized = category.charAt(0).toUpperCase() + category.slice(1);

	return (
		<li className='card'>
			<div className='card__top' style={{ backgroundImage: "url(" + `${thumbnail}` + ")" }}>
				<button className='card__btn-bookmark' onClick={() => handleBookmarkClick(id)}>
					<BookmarkEmpty className={bookmark ? "bookmark-icon active" : "bookmark-icon"} />
				</button>
			</div>
			<div className='card__bottom'>
				<div className='card__information'>
					<span className='year'>{year}</span>
					<span className='category'>
						<img className='category__icon' src={icons[capitalized]} alt="category-icon" />
						{capitalized}
					</span>
					<span className='rating'>{rating}</span>
				</div>
				<h3 className='card__title heading-xs'>{title}</h3>
			</div>
		</li>
	);
}

export default Card;