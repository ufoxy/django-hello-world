import React from 'react';
import './../TrandingCard/TrandingCard.css';
import './../Card/Card.css'
import { ReactComponent as BookmarkEmpty } from '../../assets/icon-bookmark-empty.svg';
import { NavLink } from 'react-router-dom';
import playIcon from '../../assets/icon-play.svg';
import { useDispatch } from 'react-redux';
import { addBookmark } from './../../redux/slices/bookmarkedSlice';
import { showFilmPage } from '../../redux/slices/playerSlice';
import iconMovie from '../../assets/icon-category-movie.svg';
import iconTV from '../../assets/icon-category-tv-series.svg';

function TrandingCard({title, thumbnail, year, category, rating, bookmark, id}) {

	const icons = {
		"Movie" : iconMovie,
		"TV Series" : iconTV
	}

    const dispatch = useDispatch();

    function handleBookmarkClick(id) {
		dispatch(addBookmark({ id, isBookmarked: true }));
		if (bookmark === true) {
			dispatch(addBookmark({ id, isBookmarked: false }));
		}
	}

    return (
        <div className="tranding__card" key={title} style={{ backgroundImage: "url(" + `${thumbnail}` + ")" }}>
            <div className="card-info">
                <div className="card-info__wrapper">
                    <span className="year body-m">{year}</span>
                    <span className="category body-m">
                        <img className="category_icon" src={icons[category]} alt="icon" />
                        {category}
                    </span>
                    <span className="rating body-m">{rating}</span>
                </div>
                <h2 className="tranding__card-title">{title}</h2>
                <button className='card__btn-bookmark' onClick={() => handleBookmarkClick(id)}>
					<BookmarkEmpty className={bookmark ? "bookmark-icon active" : "bookmark-icon"} />
				</button>
            </div>
        </div>
    );
}

export default TrandingCard;