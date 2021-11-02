# t-ott.dev: My Personal Website

Built using the [Phantom](https://https://github.com/jamigibbs/phantom) theme for for [Jekyll](http://jekyllrb.com/).

## Theme Features

### Navigation

Navigation can be customized in `_config.yml` under the `nav_item` key. Default settings:

Set the `nav_enable` variable to false in `_config.yml` to disable navigation.

### Contact Form

You can display a contact form within the modal window template. This template is already setup to use the [Formspree](https://formspree.io) email system.

Place the modal window template in any place you'd like the user to click for the contact form.
The template will display a link to click for the contact form modal window:

```liquid
{% include contact.html %}
{% include contact-modal.html %}
```

### Animation Effects

Animations with CSS classes are baked into the theme. To animate a section or element, simply add the animation classes:

```html
<div id="about-me" class="wow fadeIn">
  I'm the coolest!
</div>
```

For a complete list of animations, see the [animation list](http://daneden.github.io/animate.css/).

### Pagination

By default, pagination on the home page will activate after 10 posts. You can change this within `_config.yml`. You can add the pagination to other layouts with:

```liquid
  {% for post in paginator.posts %}
    {% include post-content.html %}
  {% endfor %}

  {% include pagination.html %}
```

Read more about the [pagination plugin](http://jekyllrb.com/docs/pagination/).

## Updates Made to Original Theme
- Updated Font Awesome tags throughout ```_includes``` to support newest version
- Added Kaggle link/logo to home page
- Implemented a simple archive page layout ```/_layouts/archive.html``` which lists each post by date.

## Updates Wanted?
- For some reason the white container background on the home page is ever so slightly wider than on the other pages. Fix this in the CSS?
- Expand the About section, perhaps link to a PDF resume.
- Once more posts are added, the Archive may be better to organize by month, year, or topic. Or maybe let the user sort by any of those?
- Instead of manually specifying if a post as ```position: left``` or ```position: right```, it would be easier if it just automatically altered between right and left based on the order of posts.

## Credit

* Jeykll Phantom Theme, https://https://github.com/jamigibbs/phantom, (C) 2016 Jami Gibbs, [MIT](https://github.com/jamigibbs/phantom/blob/master/LICENSE)

* Bootstrap, http://getbootstrap.com/, (C) 2011 - 2016 Twitter, Inc., [MIT](https://github.com/twbs/bootstrap/blob/master/LICENSE)

* Wow, https://github.com/matthieua/WOW, (C) 2014 - 2016 Matthieu Aussaguel
, [GPL](https://github.com/matthieua/WOW#open-source-license)

* Animate.css, https://github.com/daneden/animate.css, (C) 2016 Daniel Eden, [MIT](https://github.com/daneden/animate.css/blob/master/LICENSE)
