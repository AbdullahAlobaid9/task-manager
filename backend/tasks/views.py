from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer
from .tasks import notify_task_created


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(user=user)

        # Optional filtering
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')
        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        return queryset

    def perform_create(self, serializer):
        task = serializer.save(user=self.request.user)
        notify_task_created.delay(task.title, self.request.user.username)
