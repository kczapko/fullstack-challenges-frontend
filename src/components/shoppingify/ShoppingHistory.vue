<template lang="pug">
section.history
  header.history__header
    h1.history__title Shopping history
  section.history__section
    h2.history__section-title.font-500
      time.history__section-time(datetime="2020-08") August 2020
    ul.history__list
      li.history__list-item
        a.history__entry(href="#")
          span.history__entry-name Grocery List
          time.history__entry-date(datetime="2020-08-27") Mon 27.08.2020
          span.history__entry-status.history__entry-status--completed completed
      li.history__list-item
        a.history__entry(href="#")
          span.history__entry-name Eero's farewell party
          time.history__entry-date(datetime="2020-08-24") Mon 24.08.2020
          span.history__entry-status.history__entry-status--completed completed
  section.history__section
    h2.history__section-title.font-500
      time.history__section-time(datetime="2020-07") July 2020
    ul.history__list
      li.history__list-item
        a.history__entry(href="#")
          span.history__entry-name Board game week 2
          time.history__entry-date(datetime="2020-07-27") Mon 27.07.2020
          span.history__entry-status.history__entry-status--completed completed
      li.history__list-item
        a.history__entry(href="#")
          span.history__entry-name Grocery List
          time.history__entry-date(datetime="2020-07-16") Mon 16.07.2020
          span.history__entry-status.history__entry-status--cancelled cancelled
</template>

<script>
export default {
  name: 'ShoppingHistory',
};
</script>
