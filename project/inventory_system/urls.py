from django.contrib import admin  # Import the admin module
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin URL
    path('api/', include('inventory.urls')),  # Include your app's URLs
]
