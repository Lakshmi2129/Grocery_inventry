from django.urls import path
from .views import *

urlpatterns = [
    path('',Home, name = 'Home'),
  path('add_grocery_item',add_grocery_item, name = 'add_grocery_item'),
]