import random

class Movie:
    def __init__(self, title, year, category, rating, thumbnail):
        self.id = random.randint(1, 10000)  # Gera um ID aleatório entre 1 e 10000
        self.title = title
        self.year = year
        self.category = category
        self.rating = rating
        self.isBookmarked = False
        self.isTrending = False
        self.thumbnail = thumbnail

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "year": self.year,
            "category": self.category,
            "rating": self.rating,
            "isBookmarked": self.isBookmarked,
            "isTrending": self.isTrending,
            "thumbnail": self.thumbnail,
        }
    