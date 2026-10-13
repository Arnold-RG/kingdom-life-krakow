/* YouVersion Bible App links for Kingdom Life Kraków
   App Store: https://apps.apple.com/app/id282935706
   Web / deep links open in the Bible App when installed. */
window.KLBible = {
  appStore: "https://apps.apple.com/app/id282935706",
  webHome: "https://www.bible.com",
  verseOfDay: "https://www.bible.com/verse-of-the-day",
  /* KJV on bible.com — matches the campus daily-word wording */
  versionId: "1",

  plan: function (slug) {
    return "https://www.bible.com/reading-plans/" + slug;
  },

  searchPlans: function (query) {
    return "https://www.bible.com/search/plans?query=" + encodeURIComponent(query);
  },

  /* OSIS like JHN.3.16 or PHP.4.6-PHP.4.7 */
  verse: function (osis) {
    return "https://www.bible.com/bible/" + this.versionId + "/" + osis;
  },

  book: function (osisBookChapter) {
    return "https://www.bible.com/bible/" + this.versionId + "/" + osisBookChapter;
  }
};
