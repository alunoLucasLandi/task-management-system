from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Tarefa
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def criar_tarefa(request):
    if request.method == "POST":
        dados = json.loads(request.body.decode('utf-8'))

        titulo = dados.get('titulo')
        descricao = dados.get('descricao')
        data = dados.get('data')
        concluida = dados.get('concluida') == True

        Tarefa.objects.create(titulo=titulo, descricao=descricao, data=data, concluida=concluida)
        return JsonResponse({'status': 'Tarefa criada com sucesso!'})
    return JsonResponse({'status': 'Método não permitido.'}, status=405)

@csrf_exempt
def listar_tarefas(request):
    tarefas = Tarefa.objects.all()
    tarefas_lista = list(tarefas.values())
    return JsonResponse(tarefas_lista, safe=False)

@csrf_exempt
def detalhar_tarefa(request, id):
    tarefa = get_object_or_404(Tarefa, id=id)
    return JsonResponse({
        'id': tarefa.id,
        'titulo': tarefa.titulo,
        'descricao': tarefa.descricao,
        'data': tarefa.data,
        'concluida': tarefa.concluida
    })

@csrf_exempt
def editar_tarefa(request, id):
    tarefa = get_object_or_404(Tarefa, id=id)

    if request.method == "POST":
        # Carregar o corpo da requisição como JSON
        dados = json.loads(request.body.decode('utf-8'))

        # Verificar e atualizar apenas se o campo foi enviado e não é vazio
        if 'titulo' in dados and dados['titulo']:
            tarefa.titulo = dados['titulo']

        if 'descricao' in dados and dados['descricao']:
            tarefa.descricao = dados['descricao']

        if 'data' in dados and dados['data']:
            tarefa.data = dados['data']

        if 'concluida' in dados and dados['concluida'] is not None:
            tarefa.concluida = dados['concluida'] == True

        tarefa.save()
        return JsonResponse({'status': 'Tarefa editada com sucesso!'})
    
    return JsonResponse({'status': 'Método não permitido.'}, status=405)