from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('api/candlestick-data/', views.candlestick_data, name='candlestick_data'),
    path('api/line-chart-data/', views.line_chart_data, name='line_chart_data'),
    path('api/bar-chart-data/', views.bar_chart_data, name='bar_chart_data'),
    path('api/pie-chart-data/', views.pie_chart_data, name='pie_chart_data'),
    path('', views.Home.as_view(), name='home'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
