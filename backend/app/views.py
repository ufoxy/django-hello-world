import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .models import Movie

class MovieListView(APIView):
    OMDB_API_KEY = 'd4d2fab4'  # Chave secreta da OMDb API

    def get(self, request):
        search = request.query_params.get('search', None)  # Parâmetro para título
        year = request.query_params.get('year', None)  # Parâmetro para ano

        if not search:
            return Response({'error': 'Parâmetro de pesquisa é necessário.'}, status=status.HTTP_400_BAD_REQUEST)

        # Busca na OMDb API
        url = f'http://www.omdbapi.com/?apikey={self.OMDB_API_KEY}&s={search}'
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            if data['Response'] == 'True':
                movies_data = data['Search']
                movies = []

                # Para cada filme encontrado, busca detalhes e cria objetos Movie
                for movie_data in movies_data:
                    detail_url = f"http://www.omdbapi.com/?apikey={self.OMDB_API_KEY}&i={movie_data['imdbID']}"
                    detail_response = requests.get(detail_url)

                    if detail_response.status_code == 200:
                        detail_data = detail_response.json()
                        thumbnail = {
                            "regular": {
                                "small": detail_data.get('Poster'),
                                "medium": detail_data.get('Poster'),
                                "large": detail_data.get('Poster'),
                            }
                        }
                        movie = Movie(
                            title=detail_data.get('Title'),
                            year=detail_data.get('Year'),
                            category=detail_data.get('Genre'),
                            rating=detail_data.get('Rated'),
                            thumbnail=thumbnail
                        )
                        movies.append(movie)

                # Se o ano for fornecido, filtra os filmes pelo ano
                if year:
                    movies = [movie for movie in movies if str(movie.year) == year]

                # Paginação
                paginator = PageNumberPagination()
                paginator.page_size = 5  # Define o número de resultados por página
                paginated_movies = paginator.paginate_queryset(movies, request)

                # Serializa os dados para a resposta
                response_data = [movie.to_dict() for movie in paginated_movies]

                return paginator.get_paginated_response(response_data)
            else:
                return Response({'error': data.get('Error', 'Erro ao buscar filmes.')}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Erro ao acessar a OMDb API.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)