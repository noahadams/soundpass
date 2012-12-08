from django.views.generic import FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django.contrib.auth import login, get_backends



class SignupView(FormView):
    form_class = UserCreationForm
    success_url = '/'
    template_name = 'signup.html'

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password1']

        user = User.objects.create_user(username, '', password)
        user.save()

        backend = get_backends()[0]
        user.backend = '%s.%s' % (backend.__module__, backend.__class__.__name__)
        
        login(self.request, user)
        return super(SignupView, self).form_valid(form)







