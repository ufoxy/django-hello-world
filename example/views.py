import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from .models import Movie

def index(request):
    return Response("Hello World")

class MovieListView(APIView):
    OMDB_API_KEY = settings.SECRET_KEY  # Chave secreta da OMDb API (oculta na .env)

    def get(self, request):
        search = request.query_params.get('search', None) # Parâmetro para título
        year = request.query_params.get('year', None)  # Parâmetro para ano
        if not search:
            return Response({'error': 'Parâmetro de pesquisa é necessário.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica se já existem filmes no banco de dados
        movies = Movie.objects.filter(title__icontains=search)

        # Se o ano for fornecido, filtra os filmes pelo ano
        if year:
            movies = movies.filter(year=year)

        if not movies.exists():
            # Se não existirem, busca na OMDb API
            url = f'http://www.omdbapi.com/?apikey={self.OMDB_API_KEY}&s={search}'
            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()
                if data['Response'] == 'True':
                    for movie_data in data['Search']:
                        # Para cada filme encontrado, busca detalhes e salva no banco de dados
                        detail_url = f"http://www.omdbapi.com/?apikey={self.OMDB_API_KEY}&i={movie_data['imdbID']}"
                        detail_response = requests.get(detail_url)
                        if detail_response.status_code == 200:
                            detail_data = detail_response.json()
                            # Cria um novo objeto Movie e salva no banco de dados
                            Movie.objects.create(
                                title=detail_data.get('Title'),
                                year=detail_data.get('Year'),
                                released=detail_data.get('Released'),
                                runtime=detail_data.get('Runtime'),
                                genre=detail_data.get('Genre'),
                                poster=detail_data.get('Poster'),
                                metascore=detail_data.get('Metascore'),
                                imdb_rating=detail_data.get('imdbRating'),
                            )
                    # Busca novamente os filmes do banco de dados
                    movies = Movie.objects.filter(title__icontains=search)

                    # Se o ano for fornecido, filtra os filmes pelo ano novamente
                    if year:
                        movies = movies.filter(year=year)

        # Paginação
        paginator = PageNumberPagination()
        paginator.page_size = 5  # Define o número de resultados por página
        paginated_movies = paginator.paginate_queryset(movies, request)

        # Serializa os dados para a resposta
        response_data = [
            {
                'Title': movie.title,
                'Year': movie.year,
                'Released': movie.released,
                'Runtime': movie.runtime,
                'Genre': movie.genre,
                'Poster': movie.poster,
                'Metascore': movie.metascore,
                'imdbRating': movie.imdb_rating,
            }
            for movie in paginated_movies
        ]

        return paginator.get_paginated_response(response_data)