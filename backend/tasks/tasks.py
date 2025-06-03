from celery import shared_task


@shared_task
def notify_task_created(task_title, task_user):
    '''We can use SMTP to notify user via email, but for assessment purposes i added print only.'''
    print(f"[Notification] New task added by {task_user}: {task_title}")
