import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

def index(request):
    return Response("Hello World")

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
                movies = data['Search']

                # Se o ano for fornecido, filtra os filmes pelo ano
                if year:
                    movies = [movie for movie in movies if movie.get('Year') == year]

                # Paginação
                paginator = PageNumberPagination()
                paginator.page_size = 5  # Define o número de resultados por página
                paginated_movies = paginator.paginate_queryset(movies, request)

                # Serializa os dados para a resposta
                response_data = [
                    {
                        'Title': movie['Title'],
                        'Year': movie['Year'],
                        'Released': movie.get('Released', 'N/A'),  # Adicionando Released, caso não esteja disponível
                        'Runtime': movie.get('Runtime', 'N/A'),    # Adicionando Runtime, caso não esteja disponível
                        'Genre': movie.get('Genre', 'N/A'),        # Adicionando Genre, caso não esteja disponível
                        'Poster': movie.get('Poster', 'N/A'),      # Adicionando Poster, caso não esteja disponível
                        'Metascore': movie.get('Metascore', 'N/A'),# Adicionando Metascore, caso não esteja disponível
                        'imdbRating': movie.get('imdbRating', 'N/A'), # Adicionando imdbRating, caso não esteja disponível
                    }
                    for movie in paginated_movies
                ]

                return paginator.get_paginated_response(response_data)
            else:
                return Response({'error': data.get('Error', 'Erro ao buscar filmes.')}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Erro ao acessar a OMDb API.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)