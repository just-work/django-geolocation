=====
Polls
=====

Polls is a simple Django app to conduct Web-based polls. For each
question, visitors can choose between a fixed number of answers.

Detailed documentation is in the "docs" directory.

Quick start
-----------

1.  Install package with tag version.
    pip install https://github.com/just-work/django-geolocation/archive/1.1.zip

2. Add to INSTALLED_APPS
    'geolocation'

3. Create you template if need extend it from 'geolocation/tags/base_location.html'
    'templates/geolocation/tags/location.html'

4. Put templatetags named "get_location" to your template with loading location_tags
