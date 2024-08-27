
from django.db import models

class Tarefa(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    data = models.DateField()
    concluida = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo