from django.contrib import admin

# Register your models here.
from .models.plans import Plans

class PlansAdmin(admin.ModelAdmin):
	class Meta:
		model = Plans

admin.site.register(Plans, PlansAdmin)