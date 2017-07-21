# coding:utf-8
from django import template

from geolocation.models import REGIONS

register = template.Library()


@register.inclusion_tag('geolocation/tags/location.html', takes_context=True)
def get_location(context):
    regions = [reg['title'] for reg in REGIONS]
    regions.sort()
    return {'regions': regions}
