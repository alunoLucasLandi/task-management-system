from django.contrib import admin
from django.urls import path, include
from tarefas import views  # Importa as views do app tarefas

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tarefas/<int:id>/editar/', views.editar_tarefa, name='editar_tarefa'),
    path('tarefas/criar/', views.criar_tarefa, name='criar_tarefa'),  # Adiciona a rota para criar tarefa
    path('tarefas/', views.listar_tarefas, name='listar_tarefas'),
    path('tarefas/<int:id>/', views.detalhar_tarefa, name='detalhar_tarefa'),
    path('tarefas/<int:id>/excluir/', views.excluir_tarefa, name='excluir_tarefa'),
]