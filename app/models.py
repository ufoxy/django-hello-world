from django.db import models

# Definindo um modelo para representar um filme
class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.CharField(max_length=4)
    released = models.CharField(max_length=50)
    runtime = models.CharField(max_length=50)
    genre = models.CharField(max_length=100)
    poster = models.URLField()
    metascore = models.CharField(max_length=10, blank=True, null=True)
    imdb_rating = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.title
